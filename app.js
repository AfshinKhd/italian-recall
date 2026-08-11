(() => {
  "use strict";

  const WORDS = Array.isArray(window.ITALIAN_RECALL_WORDS) ? window.ITALIAN_RECALL_WORDS : [];
  const DAY = 86400000;
  const MINUTE = 60000;

  const DOC_KEY = "italianRecall.document.v3";
  const LEGACY_KEYS = ["italianRecall.v2.document", "italianRecallProgress.v1"];
  const HANDLE_DB = "italianRecall.handles.v1";
  const HANDLE_STORE = "handles";
  const HANDLE_KEY = "progressFile";

  const DEFAULT_SETTINGS = {
    direction: "mixed",
    type: "all",
    tense: "presente",
    newLimit: 10
  };

  const el = id => document.getElementById(id);

  const state = {
    words: WORDS,
    doc: loadDocument(),
    queue: [],
    current: null,
    currentDirection: "en-it",
    revealed: false,
    done: 0,
    initialCount: 0,
    fileHandle: null,
    filePermission: "none",
    saveTimer: null,
    syncPromise: null
  };

  function now() { return Date.now(); }

  function normalizeDocument(raw) {
    const base = {
      version: 3,
      updatedAt: 0,
      settingsUpdatedAt: 0,
      settings: { ...DEFAULT_SETTINGS },
      progress: {}
    };

    if (!raw || typeof raw !== "object") return base;

    const incomingSettings = raw.settings && typeof raw.settings === "object"
      ? raw.settings
      : {};

    return {
      version: 3,
      updatedAt: Number(raw.updatedAt) || 0,
      settingsUpdatedAt: Number(raw.settingsUpdatedAt || raw.updatedAt) || 0,
      settings: { ...DEFAULT_SETTINGS, ...incomingSettings },
      progress: raw.progress && typeof raw.progress === "object" ? raw.progress : {}
    };
  }

  function loadDocument() {
    try {
      const current = JSON.parse(localStorage.getItem(DOC_KEY));
      if (current) return normalizeDocument(current);
    } catch {}

    for (const key of LEGACY_KEYS) {
      try {
        const legacy = JSON.parse(localStorage.getItem(key));
        if (!legacy) continue;

        // V1 was just a map of card ids -> progress.
        const migrated = legacy.progress
          ? normalizeDocument(legacy)
          : normalizeDocument({ progress: legacy });

        localStorage.setItem(DOC_KEY, JSON.stringify(migrated));
        return migrated;
      } catch {}
    }
    return normalizeDocument(null);
  }

  function saveLocal({ settingsChanged = false } = {}) {
    const t = now();
    state.doc.updatedAt = t;
    if (settingsChanged) state.doc.settingsUpdatedAt = t;
    localStorage.setItem(DOC_KEY, JSON.stringify(state.doc));
  }

  function validateWords(words) {
    if (!Array.isArray(words) || !words.length) throw new Error("words.js contains no cards.");

    const ids = new Set();
    for (const w of words) {
      if (!w || !w.id || !w.kind || !w.english || !w.italian) {
        throw new Error("Every word needs id, kind, english, and italian.");
      }
      if (ids.has(w.id)) throw new Error(`Duplicate word id: ${w.id}`);
      ids.add(w.id);
    }
  }

  function mergeDocuments(localRaw, remoteRaw) {
    const local = normalizeDocument(localRaw);
    const remote = normalizeDocument(remoteRaw);

    const useRemoteSettings = remote.settingsUpdatedAt > local.settingsUpdatedAt;
    const merged = normalizeDocument(useRemoteSettings ? remote : local);
    merged.progress = {};

    const keys = new Set([
      ...Object.keys(local.progress),
      ...Object.keys(remote.progress)
    ]);

    for (const key of keys) {
      const a = local.progress[key];
      const b = remote.progress[key];

      if (!a) merged.progress[key] = b;
      else if (!b) merged.progress[key] = a;
      else {
        const aTime = Number(a.updatedAt || a.lastReviewed) || 0;
        const bTime = Number(b.updatedAt || b.lastReviewed) || 0;
        merged.progress[key] = aTime >= bTime ? a : b;
      }
    }

    merged.updatedAt = Math.max(local.updatedAt, remote.updatedAt, now());
    merged.settingsUpdatedAt = Math.max(local.settingsUpdatedAt, remote.settingsUpdatedAt);
    return merged;
  }

  function units() {
    const out = [];
    const settings = state.doc.settings;

    for (const word of state.words) {
      if (settings.type !== "all" && word.kind !== settings.type) continue;

      if (word.kind === "verb") {
        const tenseKeys = settings.tense === "mixed"
          ? Object.keys(word.tenses || {})
          : [settings.tense];

        for (const tense of tenseKeys) {
          const tenseData = word.tenses?.[tense];
          if (!tenseData) continue;
          out.push({
            key: `${word.id}::${tense}`,
            word,
            tense,
            tenseData
          });
        }
      } else {
        out.push({ key: word.id, word, tense: null, tenseData: null });
      }
    }
    return out;
  }

  function progressFor(key) {
    return {
      reps: 0,
      intervalDays: 0,
      due: 0,
      lastReviewed: null,
      lapses: 0,
      updatedAt: 0,
      ...(state.doc.progress[key] || {})
    };
  }

  function isNew(unit) {
    return !state.doc.progress[unit.key] || progressFor(unit.key).reps === 0;
  }

  function buildQueue(studyAhead = false) {
    const currentTime = now();
    const due = [];
    const fresh = [];
    const future = [];

    for (const unit of units()) {
      const p = progressFor(unit.key);
      if (isNew(unit)) fresh.push(unit);
      else if (p.due <= currentTime) due.push(unit);
      else future.push(unit);
    }

    due.sort((a, b) => progressFor(a.key).due - progressFor(b.key).due);
    future.sort((a, b) => progressFor(a.key).due - progressFor(b.key).due);

    const newLimit = Number(state.doc.settings.newLimit) || 10;
    let queue = [...due, ...fresh.slice(0, newLimit)];

    if (studyAhead && queue.length === 0) {
      queue = future.slice(0, Math.min(12, future.length));
    }

    state.queue = softShuffle(queue);
    state.done = 0;
    state.initialCount = state.queue.length;
    refreshStats();
    nextCard();
  }

  function softShuffle(items) {
    return items
      .map((item, index) => ({ item, key: index + Math.random() * 1.6 }))
      .sort((a, b) => a.key - b.key)
      .map(x => x.item);
  }

  function chooseDirection() {
    const direction = state.doc.settings.direction;
    if (direction !== "mixed") return direction;
    return Math.random() < 0.75 ? "en-it" : "it-en";
  }

  function nextCard() {
    state.revealed = false;
    el("answer").classList.remove("visible");
    el("rating").classList.remove("visible");
    el("showBtn").style.display = "";
    el("emptyState").classList.remove("visible");
    el("studyContent").style.display = "";

    state.current = state.queue.shift() || null;

    if (!state.current) {
      showEmpty();
      return;
    }

    state.currentDirection = chooseDirection();
    renderCard(state.current);
    updateProgressBar();
  }

  function renderCard(unit) {
    const word = unit.word;
    const reverse = state.currentDirection === "it-en";
    const isVerb = word.kind === "verb";

    el("typePill").textContent = isVerb ? "Verb" : (word.category || "Vocabulary");
    el("tensePill").style.display = isVerb ? "" : "none";
    el("tensePill").textContent = isVerb ? (unit.tenseData.label || unit.tense) : "";

    el("promptLabel").textContent = reverse ? "Italian → English" : "English → Italian";
    el("prompt").textContent = reverse ? word.italian : word.english;

    el("tenseHint").style.display = isVerb ? "inline-block" : "none";
    el("tenseHint").textContent = isVerb ? (unit.tenseData.label || unit.tense) : "";

    el("microHint").textContent = isVerb
      ? (reverse
          ? "Recall the English meaning, then produce all six forms."
          : "Recall the infinitive and all six forms.")
      : (reverse ? "Recall the English meaning." : "Recall the Italian word.");

    el("answerItalian").textContent = word.italian;
    el("answerMeaning").textContent = word.english;
    el("forms").innerHTML = "";
    el("metaRow").innerHTML = "";

    if (isVerb) {
      const forms = unit.tenseData.forms || {};
      [
        ["io", forms.io],
        ["tu", forms.tu],
        ["lui / lei", forms.luiLei],
        ["noi", forms.noi],
        ["voi", forms.voi],
        ["loro", forms.loro]
      ].forEach(([person, value]) => {
        const box = document.createElement("div");
        box.className = "form";
        const label = document.createElement("span");
        const strong = document.createElement("strong");
        label.textContent = person;
        strong.textContent = value || "—";
        box.append(label, strong);
        el("forms").appendChild(box);
      });

      el("forms").style.display = "grid";
      addMeta(unit.tenseData.label || unit.tense);
    } else {
      el("forms").style.display = "none";
      [
        word.category,
        word.article ? `article: ${word.article}` : null,
        word.gender,
        word.plural ? `plural: ${word.plural}` : null
      ].filter(Boolean).forEach(addMeta);
    }

    el("example").textContent = isVerb
      ? (unit.tenseData.example || word.example || "")
      : (word.example || "");

    el("counter").textContent = `${state.done + 1} / ${Math.max(state.initialCount, state.done + 1)}`;
    updateIntervalLabels(unit);
  }

  function addMeta(text) {
    const tag = document.createElement("span");
    tag.className = "meta-tag";
    tag.textContent = text;
    el("metaRow").appendChild(tag);
  }

  function reveal() {
    if (!state.current || state.revealed) return;
    state.revealed = true;
    el("answer").classList.add("visible");
    el("rating").classList.add("visible");
    el("showBtn").style.display = "none";
  }

  function intervalsFor(unit) {
    const p = progressFor(unit.key);
    const current = Math.max(0, Number(p.intervalDays) || 0);

    const hard = current > 0 ? Math.max(1, Math.round(current * 1.3)) : 1;
    const good = current > 0 ? Math.max(3, Math.round(current * 2.2)) : 3;
    const easy = current > 0 ? Math.max(7, Math.round(current * 3.2)) : 7;

    return {
      again: { ms: 10 * MINUTE, label: "10 min", days: 0 },
      hard: { ms: hard * DAY, label: formatDays(hard), days: hard },
      good: { ms: good * DAY, label: formatDays(good), days: good },
      easy: { ms: easy * DAY, label: formatDays(easy), days: easy }
    };
  }

  function formatDays(days) {
    if (days < 7) return `${days} day${days === 1 ? "" : "s"}`;
    if (days % 7 === 0 && days < 35) return `${days / 7} wk`;
    if (days >= 30) return `${Math.round(days / 30)} mo`;
    return `${days} days`;
  }

  function updateIntervalLabels(unit) {
    const x = intervalsFor(unit);
    el("againInterval").textContent = x.again.label;
    el("hardInterval").textContent = x.hard.label;
    el("goodInterval").textContent = x.good.label;
    el("easyInterval").textContent = x.easy.label;
  }

  function rate(rating) {
    if (!state.current || !state.revealed) return;

    const unit = state.current;
    const p = progressFor(unit.key);
    const selected = intervalsFor(unit)[rating];
    const t = now();

    if (rating === "again") {
      p.lapses = (p.lapses || 0) + (p.reps > 0 ? 1 : 0);
      p.intervalDays = 0;
      state.queue.push(unit);
      state.initialCount += 1;
    } else {
      p.intervalDays = selected.days;
    }

    p.reps = (p.reps || 0) + 1;
    p.lastReviewed = t;
    p.due = t + selected.ms;
    p.updatedAt = t;

    state.doc.progress[unit.key] = p;
    state.done += 1;

    saveLocal();
    scheduleFileSync();
    refreshStats();
    nextCard();
  }

  function showEmpty() {
    state.current = null;
    el("studyContent").style.display = "none";
    el("emptyState").classList.add("visible");
    updateProgressBar(true);
  }

  function refreshStats() {
    const t = now();
    let due = 0;
    let fresh = 0;
    let learned = 0;

    for (const unit of units()) {
      const p = progressFor(unit.key);
      if (isNew(unit)) {
        fresh += 1;
      } else {
        learned += 1;
        if (p.due <= t) due += 1;
      }
    }

    el("dueStat").textContent = due;
    el("newStat").textContent = fresh;
    el("learnedStat").textContent = learned;
  }

  function updateProgressBar(forceDone = false) {
    const total = Math.max(1, state.initialCount);
    const pct = forceDone ? 100 : Math.min(100, (state.done / total) * 100);
    el("progressBar").style.width = `${pct}%`;
  }

  function syncSettingsUI() {
    const s = state.doc.settings;
    el("directionSelect").value = s.direction;
    el("typeSelect").value = s.type;
    el("tenseSelect").value = s.tense;
    el("newLimitSelect").value = String(s.newLimit);
  }

  function saveSettings() {
    const s = state.doc.settings;
    s.direction = el("directionSelect").value;
    s.type = el("typeSelect").value;
    s.tense = el("tenseSelect").value;
    s.newLimit = Number(el("newLimitSelect").value);

    saveLocal({ settingsChanged: true });
    scheduleFileSync();
    buildQueue(false);
  }

  function showNotice(text, isError = false) {
    const box = el("notice");
    box.textContent = text || "";
    box.className = `notice${text ? " visible" : ""}${isError ? " error" : ""}`;
  }

  function setStorageStatus(text, kind = "") {
    el("syncText").textContent = text;
    el("syncDot").className = `dot ${kind}`;
  }

  // ---------- Shared progress file ----------
  // The app ALWAYS saves browser-local progress first.
  // When a FileSystemFileHandle is linked, it also merges and mirrors progress.json.

  function supportsFileSync() {
    return "showOpenFilePicker" in window &&
           "showSaveFilePicker" in window &&
           "indexedDB" in window;
  }

  function openHandleDb() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(HANDLE_DB, 1);
      request.onupgradeneeded = () => {
        if (!request.result.objectStoreNames.contains(HANDLE_STORE)) {
          request.result.createObjectStore(HANDLE_STORE);
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async function storeHandle(handle) {
    const db = await openHandleDb();
    await new Promise((resolve, reject) => {
      const tx = db.transaction(HANDLE_STORE, "readwrite");
      tx.objectStore(HANDLE_STORE).put(handle, HANDLE_KEY);
      tx.oncomplete = resolve;
      tx.onerror = () => reject(tx.error);
    });
    db.close();
  }

  async function loadHandle() {
    const db = await openHandleDb();
    const handle = await new Promise((resolve, reject) => {
      const tx = db.transaction(HANDLE_STORE, "readonly");
      const req = tx.objectStore(HANDLE_STORE).get(HANDLE_KEY);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    });
    db.close();
    return handle;
  }

  async function deleteHandle() {
    const db = await openHandleDb();
    await new Promise((resolve, reject) => {
      const tx = db.transaction(HANDLE_STORE, "readwrite");
      tx.objectStore(HANDLE_STORE).delete(HANDLE_KEY);
      tx.oncomplete = resolve;
      tx.onerror = () => reject(tx.error);
    });
    db.close();
  }

  async function permissionState(handle, request = false) {
    if (!handle) return "none";

    const options = { mode: "readwrite" };

    try {
      const current = await handle.queryPermission(options);
      if (current === "granted") return "granted";
      if (!request) return current;
      return await handle.requestPermission(options);
    } catch {
      return "denied";
    }
  }

  async function readProgressFile(handle) {
    const file = await handle.getFile();
    const text = await file.text();

    if (!text.trim()) return normalizeDocument(null);

    const parsed = JSON.parse(text);
    if (!parsed || typeof parsed !== "object") {
      throw new Error("The selected progress file is not valid JSON.");
    }
    return normalizeDocument(parsed);
  }

  async function writeProgressFile(handle, doc) {
    const writable = await handle.createWritable();
    await writable.write(JSON.stringify(doc, null, 2) + "\n");
    await writable.close();
  }

  async function linkExistingFile() {
    if (!supportsFileSync()) {
      showNotice("This browser does not support direct read/write progress files. Browser-local progress still works.", true);
      return;
    }

    try {
      const [handle] = await window.showOpenFilePicker({
        id: "italian-recall-progress",
        multiple: false,
        types: [{
          description: "Italian Recall progress",
          accept: { "application/json": [".json"] }
        }]
      });

      state.fileHandle = handle;
      await storeHandle(handle);

      const permission = await permissionState(handle, true);
      state.filePermission = permission;

      if (permission !== "granted") {
        updateFileUI();
        showNotice("The file is linked, but write permission was not granted.", true);
        return;
      }

      await syncWithLinkedFile({ requestPermission: false, announce: true });
    } catch (error) {
      if (error?.name !== "AbortError") {
        showNotice(`Could not link the progress file: ${error.message}`, true);
      }
    }
  }

  async function createProgressFile() {
    if (!supportsFileSync()) {
      showNotice("This browser does not support direct read/write progress files. Browser-local progress still works.", true);
      return;
    }

    try {
      const handle = await window.showSaveFilePicker({
        id: "italian-recall-progress",
        suggestedName: "progress.json",
        types: [{
          description: "Italian Recall progress",
          accept: { "application/json": [".json"] }
        }]
      });

      state.fileHandle = handle;
      await storeHandle(handle);

      const permission = await permissionState(handle, true);
      state.filePermission = permission;

      if (permission !== "granted") {
        updateFileUI();
        showNotice("The file was selected, but write permission was not granted.", true);
        return;
      }

      saveLocal();
      await writeProgressFile(handle, state.doc);
      updateFileUI();
      setStorageStatus("File synced", "ok");
      showNotice("progress.json created and linked. New reviews will be mirrored automatically.");
    } catch (error) {
      if (error?.name !== "AbortError") {
        showNotice(`Could not create progress.json: ${error.message}`, true);
      }
    }
  }

  async function syncWithLinkedFile({ requestPermission = false, announce = false } = {}) {
    if (!state.fileHandle) {
      if (announce) showNotice("No shared progress file is linked yet.", true);
      return;
    }

    if (state.syncPromise) return state.syncPromise;

    state.syncPromise = (async () => {
      try {
        setStorageStatus("Syncing…", "warn");

        const permission = await permissionState(state.fileHandle, requestPermission);
        state.filePermission = permission;

        if (permission !== "granted") {
          updateFileUI();
          setStorageStatus("Browser", "warn");
          if (announce) {
            showNotice("Chrome needs file permission before it can update progress.json. Click Sync now and allow access.", true);
          }
          return;
        }

        const remote = await readProgressFile(state.fileHandle);
        state.doc = mergeDocuments(state.doc, remote);
        saveLocal();
        await writeProgressFile(state.fileHandle, state.doc);

        syncSettingsUI();
        buildQueue(false);
        updateFileUI();
        setStorageStatus("File synced", "ok");
        if (announce) showNotice("Progress merged and synchronized with progress.json.");
      } catch (error) {
        setStorageStatus("Browser", "error");
        if (announce) showNotice(`Shared-file sync failed: ${error.message}`, true);
        else console.warn("Italian Recall file sync failed:", error);
      } finally {
        state.syncPromise = null;
      }
    })();

    return state.syncPromise;
  }

  function scheduleFileSync() {
    if (!state.fileHandle) return;
    clearTimeout(state.saveTimer);
    state.saveTimer = setTimeout(() => {
      // Automatic saves never trigger a new permission prompt.
      syncWithLinkedFile({ requestPermission: false, announce: false });
    }, 500);
  }

  async function unlinkFile() {
    state.fileHandle = null;
    state.filePermission = "none";
    try { await deleteHandle(); } catch {}
    updateFileUI();
    setStorageStatus("Browser", "");
    showNotice("Shared progress file unlinked. Browser-local progress is unchanged.");
  }

  function updateFileUI() {
    const supported = supportsFileSync();

    el("linkFileBtn").disabled = !supported;
    el("createFileBtn").disabled = !supported;
    el("syncNowBtn").disabled = !supported || !state.fileHandle;
    el("unlinkFileBtn").disabled = !state.fileHandle;

    if (!supported) {
      el("fileStatus").textContent = "Browser only";
      el("storageDetail").textContent =
        "This browser does not expose direct file read/write access. Progress is still saved automatically in browser storage.";
      el("fileSupportNote").textContent =
        "Use a recent Chromium-based browser for the optional shared progress.json feature.";
      return;
    }

    if (!state.fileHandle) {
      el("fileStatus").textContent = "Browser only";
      el("storageDetail").textContent =
        "Progress is saved automatically in this browser. Link progress.json in OneDrive if you want a second mirrored copy for cross-device use.";
      return;
    }

    const name = state.fileHandle.name || "progress.json";

    if (state.filePermission === "granted") {
      el("fileStatus").textContent = "File linked";
      el("storageDetail").textContent =
        `${name} is linked. Reviews are saved locally first, then merged into the shared file automatically.`;
    } else {
      el("fileStatus").textContent = "Permission needed";
      el("storageDetail").textContent =
        `${name} is remembered, but Chrome needs permission before it can read/write it in this session.`;
    }
  }

  async function restoreLinkedFile() {
    if (!supportsFileSync()) {
      updateFileUI();
      setStorageStatus("Browser", "");
      return;
    }

    try {
      const handle = await loadHandle();
      if (!handle) {
        updateFileUI();
        setStorageStatus("Browser", "");
        return;
      }

      state.fileHandle = handle;
      state.filePermission = await permissionState(handle, false);
      updateFileUI();

      if (state.filePermission === "granted") {
        await syncWithLinkedFile({ requestPermission: false, announce: false });
      } else {
        setStorageStatus("Browser", "warn");
      }
    } catch (error) {
      console.warn("Could not restore linked file handle:", error);
      setStorageStatus("Browser", "");
      updateFileUI();
    }
  }

  // ---------- Events ----------
  el("showBtn").addEventListener("click", reveal);
  document.querySelectorAll(".rate-btn").forEach(button => {
    button.addEventListener("click", () => rate(button.dataset.rating));
  });

  el("settingsBtn").addEventListener("click", () => el("settingsDialog").showModal());
  el("closeSettings").addEventListener("click", () => el("settingsDialog").close());

  ["directionSelect", "typeSelect", "tenseSelect", "newLimitSelect"].forEach(id => {
    el(id).addEventListener("change", saveSettings);
  });

  el("linkFileBtn").addEventListener("click", linkExistingFile);
  el("createFileBtn").addEventListener("click", createProgressFile);
  el("syncNowBtn").addEventListener("click", () => syncWithLinkedFile({
    requestPermission: true,
    announce: true
  }));
  el("unlinkFileBtn").addEventListener("click", unlinkFile);

  el("reloadDeckBtn").addEventListener("click", () => location.reload());

  el("resetBtn").addEventListener("click", () => {
    if (!confirm("Reset all spaced-repetition history? words.js will not be changed.")) return;

    state.doc.progress = {};
    saveLocal();
    scheduleFileSync();
    buildQueue(false);
    el("settingsDialog").close();
  });

  el("studyAheadBtn").addEventListener("click", () => buildQueue(true));

  document.addEventListener("keydown", event => {
    if (el("settingsDialog").open) return;

    if (event.code === "Space") {
      event.preventDefault();
      reveal();
      return;
    }

    if (!state.revealed) return;
    if (event.key === "1") rate("again");
    if (event.key === "2") rate("hard");
    if (event.key === "3") rate("good");
    if (event.key === "4") rate("easy");
  });

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible" &&
        state.fileHandle &&
        state.filePermission === "granted") {
      syncWithLinkedFile({ requestPermission: false, announce: false });
    }
  });

  async function boot() {
    try {
      validateWords(state.words);
    } catch (error) {
      showNotice(error.message, true);
      return;
    }

    syncSettingsUI();
    buildQueue(false);
    updateFileUI();

    if (location.protocol === "file:") {
      showNotice(
        "Local-file mode: browser progress works here too. For PC/phone sharing, link the same OneDrive progress.json file from Settings on each device."
      );
    }

    await restoreLinkedFile();
  }

  boot();
})();
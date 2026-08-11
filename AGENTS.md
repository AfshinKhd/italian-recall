# AGENTS.md — Italian Recall project context

## Purpose

Italian Recall is a small personal web app for recalling Italian vocabulary and verbs with active recall and spaced repetition.

Repository:
- GitHub: https://github.com/AfshinKhd/italian-recall
- GitHub Pages: https://afshinkhd.github.io/italian-recall/

The owner wants this project to stay simple, transparent, editable, and usable from both PC and phone. Do not turn it into a large framework or SaaS product unless explicitly requested.

## User preferences and product direction

- Preserve the current clean visual style, typography, spacious card layout, and Settings gear button.
- The UI should feel lightweight and focused, closer to a personal Anki-style recall tool than a full language-learning platform.
- Desktop and mobile layouts are equally important.
- Prefer plain HTML/CSS/JavaScript with no build step and no dependencies.
- Avoid Azure, Microsoft Graph, Entra app registration, backend servers, databases, accounts, or other heavy cloud setup unless the user explicitly changes direction.
- Do not require manual import/export as the normal workflow.
- Data files should remain easy to inspect and edit.
- `words.js` is intentionally outside the application logic so vocabulary can be edited directly.
- Keep the app usable offline after the files are available locally.

## Storage architecture

The project intentionally supports two intertwined approaches.

### Approach A — GitHub Pages / browser mode

- The same static project is hosted with GitHub Pages.
- Progress is saved automatically in browser `localStorage`.
- No login is required.
- Browser-local progress is the baseline and must always remain functional.
- The app must never lose a review because optional file sync failed.

### Approach B — local/OneDrive shared-file mode

- A copy of the project may live inside a OneDrive-synced directory.
- The user may open `index.html` directly in Chrome or use the GitHub Pages URL.
- Optional cross-device progress uses a user-selected `progress.json` file through the File System Access API.
- The user explicitly selects/grants access to `progress.json` on each device.
- File handles may be stored in IndexedDB so the app can remember the selected file.
- Permissions may need to be granted again in a later browser session. Never claim browser security can be bypassed.
- The app saves to `localStorage` first, then mirrors/merges with `progress.json`.
- Merge progress per review unit using its `updatedAt` timestamp. If the same review unit changed on two devices, newest wins.
- Settings also have a timestamp and should be merged without discarding card progress.
- Never auto-commit `progress.json` to Git; it is private user data.
- Do not try to rewrite JavaScript source files to store progress.

Important platform caveat:
- File System Access is a browser capability, not a OneDrive API.
- On Android/phone, whether the shared file can be selected depends on Chromium support and whether OneDrive is exposed through the system file picker.
- Always provide graceful fallback to browser-local progress.

## Learning model

Main task:
1. Show an English or Italian prompt.
2. User tries to recall the answer without hints.
3. Reveal the answer.
4. For verbs, show the infinitive plus all six person forms.
5. User rates recall: Again / Hard / Good / Easy.
6. Schedule next review.

Current initial intervals:
- Again: 10 minutes and place the review unit back into the current session.
- Hard: ~1 day.
- Good: ~3 days.
- Easy: ~7 days.
- Later successful reviews expand intervals.

Mixed recall direction should favor English -> Italian because production of Italian is the main goal, but include some Italian -> English recognition.

## Vocabulary/data model

Do not model the project as present-tense-only.

A verb is one lexical entry with extensible tense data. Current keys:
- `presente`
- `passato_prossimo`
- `futuro_semplice`

Each tense is a separate spaced-repetition review unit:
- `verb-vedere::presente`
- `verb-vedere::passato_prossimo`
- `verb-vedere::futuro_semplice`

Future tenses/moods can be added without redesigning the whole schema.

General vocabulary is not noun-only. Supported concepts include:
- noun
- adjective
- adverb
- expression
- phrase
- other

Nouns may include article, gender, and plural. Other vocabulary should not be forced to contain noun-only fields.

Card IDs must be stable after study begins. If changing IDs or schema, provide backward migration so existing progress is preserved.

## Important files

- `index.html` — UI and styles.
- `app.js` — recall logic, spaced repetition, local storage, optional shared-file sync.
- `words.js` — editable Italian deck.
- `progress.json` — local/private shared progress file; ignored by Git.
- `README.md` — intentionally short end-user instructions.
- `AGENTS.md` — project context and Codex instructions.
- `.gitignore` — excludes private/runtime/editor files.

## Coding conventions

- Prefer readable browser-native JavaScript.
- No framework unless clearly justified and requested.
- No external CDN dependencies for core operation.
- Use feature detection for browser APIs.
- Do not make file-sync failure block studying.
- Escape or use `textContent` for vocabulary values; do not inject user-controlled vocabulary through unsafe HTML.
- Keep accessibility basics: semantic buttons, labels, touch-friendly targets, responsive layout.
- Preserve keyboard shortcuts unless there is a good reason to change them:
  - Space: reveal
  - 1: Again
  - 2: Hard
  - 3: Good
  - 4: Easy
- Keep settings compact; avoid unnecessary configuration.

## Testing expectations

After JavaScript changes:
- Run a syntax check (`node --check app.js` when Node is available).
- Open the page and check browser console for errors.
- Test a typical desktop viewport.
- Test a phone-sized viewport.
- Test reveal and all four rating buttons.
- Test Present, Passato prossimo, Future, and Mixed.
- Test verbs and general vocabulary.
- Verify localStorage survives reload.
- If modifying file sync, test:
  - unsupported-browser fallback,
  - link existing `progress.json`,
  - create file,
  - read/merge/write,
  - permission-not-granted behavior,
  - unlink behavior,
  - local progress remains intact when file operations fail.

## Git / repository expectations

- Keep generated zips, logs, editor state, caches, secrets, and private progress out of Git.
- `progress.json` must remain ignored.
- Do not add credentials or tokens to the repository.
- Prefer small focused commits.
- Do not change the public GitHub Pages deployment structure without a reason; `index.html` should remain usable from repository root.

## How to work with the owner

- The owner prefers step-by-step changes for setup/configuration tasks.
- For implementation tasks, make a best effort and show the result rather than introducing unnecessary infrastructure.
- When a platform limitation exists, state it plainly and design the simplest graceful fallback.
- Keep explanations practical and relatively brief.

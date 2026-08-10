(() => {
  "use strict";

  const CONFIG = window.ITALIAN_RECALL_CONFIG || {};
  const STARTER_WORDS = Array.isArray(window.ITALIAN_RECALL_STARTER_WORDS) ? window.ITALIAN_RECALL_STARTER_WORDS : [];
  const GRAPH = "https://graph.microsoft.com/v1.0";
  const DAY = 86400000;
  const MINUTE = 60000;
  const CACHE_KEY = "italianRecall.v2.document";
  const WORDS_CACHE_KEY = "italianRecall.v2.words";
  const TOKEN_KEY = "italianRecall.v2.oauth";
  const PKCE_KEY = "italianRecall.v2.pkce";
  const DEFAULT_SETTINGS = { direction:"mixed", type:"all", tense:"presente", newLimit:10 };

  const el = id => document.getElementById(id);

  const state = {
    words: loadJson(WORDS_CACHE_KEY, STARTER_WORDS),
    doc: normalizeDoc(loadJson(CACHE_KEY, null)),
    queue: [], current: null, revealed:false, done:0, initialCount:0,
    currentDirection:"en-it", appFolder:null, auth:null, cloudReady:false,
    saveTimer:null, syncPromise:null, lastCloudLoad:0
  };

  function normalizeDoc(doc) {
    const base = { version:2, updatedAt:0, settings:{...DEFAULT_SETTINGS}, progress:{} };
    if (!doc || typeof doc !== "object") return base;
    return {
      version:2,
      updatedAt:Number(doc.updatedAt)||0,
      settings:{...DEFAULT_SETTINGS, ...(doc.settings||{})},
      progress:(doc.progress && typeof doc.progress === "object") ? doc.progress : {}
    };
  }
  function loadJson(key, fallback){try{const v=JSON.parse(localStorage.getItem(key));return v??fallback}catch{return fallback}}
  function saveLocal(){ state.doc.updatedAt=Date.now(); localStorage.setItem(CACHE_KEY,JSON.stringify(state.doc)); }
  function saveWordsLocal(){ localStorage.setItem(WORDS_CACHE_KEY,JSON.stringify(state.words)); }
  function configured(){return CONFIG.clientId && !String(CONFIG.clientId).includes("PASTE_")}
  function redirectUri(){return CONFIG.redirectUri || `${location.origin}${location.pathname}`}
  function authority(){return `https://login.microsoftonline.com/${CONFIG.authorityTenant||"common"}/oauth2/v2.0`}
  function scopes(){return Array.isArray(CONFIG.scopes)?CONFIG.scopes:["openid","profile","offline_access","https://graph.microsoft.com/Files.ReadWrite.AppFolder"]}

  function b64url(bytes){return btoa(String.fromCharCode(...bytes)).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/g,"")}
  function randomString(bytes=48){const a=new Uint8Array(bytes);crypto.getRandomValues(a);return b64url(a)}
  async function sha256(text){return new Uint8Array(await crypto.subtle.digest("SHA-256",new TextEncoder().encode(text)))}

  async function startLogin(){
    if(!configured()){showNotice("Add your Microsoft Entra Application (client) ID to config.js first.",true);return}
    if(location.protocol==="file:"){showNotice("Microsoft sign-in needs the app to be hosted (for example on GitHub Pages) with an HTTPS SPA redirect URI.",true);return}
    const verifier=randomString(64), challenge=b64url(await sha256(verifier)), oauthState=randomString(24);
    sessionStorage.setItem(PKCE_KEY,JSON.stringify({verifier,state:oauthState,redirectUri:redirectUri()}));
    const q=new URLSearchParams({client_id:CONFIG.clientId,response_type:"code",redirect_uri:redirectUri(),response_mode:"query",scope:scopes().join(" "),state:oauthState,code_challenge:challenge,code_challenge_method:"S256",prompt:"select_account"});
    location.assign(`${authority()}/authorize?${q}`);
  }

  async function handleOAuthReturn(){
    const p=new URLSearchParams(location.search); if(!p.has("code")&&!p.has("error")) return false;
    if(p.has("error")){showNotice(`Microsoft sign-in failed: ${p.get("error_description")||p.get("error")}`,true);cleanOAuthUrl();return true}
    const pending=loadSession(PKCE_KEY); if(!pending||pending.state!==p.get("state")){showNotice("Sign-in state check failed. Please connect OneDrive again.",true);cleanOAuthUrl();return true}
    try{
      const body=new URLSearchParams({client_id:CONFIG.clientId,grant_type:"authorization_code",code:p.get("code"),redirect_uri:pending.redirectUri,code_verifier:pending.verifier,scope:scopes().join(" ")});
      const r=await fetch(`${authority()}/token`,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body});
      const data=await r.json(); if(!r.ok) throw new Error(data.error_description||data.error||`HTTP ${r.status}`);
      storeToken(data); sessionStorage.removeItem(PKCE_KEY); cleanOAuthUrl(); showNotice("OneDrive connected. Loading your private study data…");
    }catch(e){showNotice(`Could not finish Microsoft sign-in: ${e.message}`,true);cleanOAuthUrl()}
    return true;
  }
  function loadSession(key){try{return JSON.parse(sessionStorage.getItem(key))}catch{return null}}
  function cleanOAuthUrl(){history.replaceState({},document.title,`${location.pathname}${location.hash||""}`)}
  function storeToken(data){
    const old=loadJson(TOKEN_KEY,{}); const token={accessToken:data.access_token||old.accessToken||null,refreshToken:data.refresh_token||old.refreshToken||null,idToken:data.id_token||old.idToken||null,expiresAt:Date.now()+Math.max(60,(Number(data.expires_in)||3600)-90)*1000};
    localStorage.setItem(TOKEN_KEY,JSON.stringify(token)); state.auth=token; updateAccountUI();
  }
  function clearToken(){localStorage.removeItem(TOKEN_KEY);state.auth=null;state.cloudReady=false;state.appFolder=null;updateAccountUI();setSyncStatus("Local","warn")}
  function decodeJwt(token){try{const s=token.split(".")[1].replace(/-/g,"+").replace(/_/g,"/");return JSON.parse(decodeURIComponent(Array.from(atob(s),c=>"%"+c.charCodeAt(0).toString(16).padStart(2,"0")).join("")))}catch{return {}}}

  async function accessToken(force=false){
    let t=state.auth||loadJson(TOKEN_KEY,null); state.auth=t;
    if(!t) return null;
    if(!force && t.accessToken && t.expiresAt>Date.now()) return t.accessToken;
    if(!t.refreshToken){clearToken();return null}
    try{
      const body=new URLSearchParams({client_id:CONFIG.clientId,grant_type:"refresh_token",refresh_token:t.refreshToken,redirect_uri:redirectUri(),scope:scopes().join(" ")});
      const r=await fetch(`${authority()}/token`,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body}); const data=await r.json();
      if(!r.ok) throw new Error(data.error_description||data.error); storeToken(data); return state.auth.accessToken;
    }catch(e){console.warn("Token refresh failed",e);clearToken();return null}
  }

  async function graphFetch(path,options={},retry=true){
    const token=await accessToken(); if(!token) throw new Error("NOT_SIGNED_IN");
    const headers=new Headers(options.headers||{}); headers.set("Authorization",`Bearer ${token}`);
    const r=await fetch(`${GRAPH}${path}`,{...options,headers});
    if(r.status===401 && retry){await accessToken(true);return graphFetch(path,options,false)}
    return r;
  }
  async function ensureAppFolder(){
    const r=await graphFetch("/me/drive/special/approot"); if(!r.ok) throw new Error(await graphError(r));
    state.appFolder=await r.json(); state.cloudReady=true; updateAccountUI(); return state.appFolder;
  }
  async function graphError(r){try{const x=await r.json();return x.error?.message||`Microsoft Graph HTTP ${r.status}`}catch{return `Microsoft Graph HTTP ${r.status}`}}
  function filePath(name){return `/me/drive/special/approot:/${encodeURIComponent(name)}:/content`}
  async function getCloudJson(name){
    const r=await graphFetch(filePath(name)); if(r.status===404) return null; if(!r.ok) throw new Error(await graphError(r));
    return await r.json();
  }
  async function putCloudJson(name,value){
    const r=await graphFetch(filePath(name),{method:"PUT",headers:{"Content-Type":"application/json;charset=utf-8"},body:JSON.stringify(value,null,2)}); if(!r.ok) throw new Error(await graphError(r)); return r.json();
  }

  function mergeDocs(local,remote){
    const a=normalizeDoc(local), b=normalizeDoc(remote); const out=normalizeDoc(a.updatedAt>=b.updatedAt?a:b);
    out.progress={}; const keys=new Set([...Object.keys(a.progress),...Object.keys(b.progress)]);
    for(const k of keys){const x=a.progress[k],y=b.progress[k]; if(!x)out.progress[k]=y;else if(!y)out.progress[k]=x;else out.progress[k]=(Number(x.updatedAt)||0)>=(Number(y.updatedAt)||0)?x:y}
    out.updatedAt=Math.max(a.updatedAt,b.updatedAt,Date.now()); return out;
  }

  async function initializeCloud(){
    if(!configured()) {updateAccountUI();return}
    state.auth=loadJson(TOKEN_KEY,null); updateAccountUI(); if(!state.auth) return;
    try{
      setSyncStatus("Connecting…","warn"); await ensureAppFolder();
      let remoteWords=await getCloudJson("words.json");
      if(!Array.isArray(remoteWords)){remoteWords=STARTER_WORDS;await putCloudJson("words.json",remoteWords)}
      validateWords(remoteWords); state.words=remoteWords; saveWordsLocal();
      const remoteDoc=await getCloudJson("progress.json");
      if(remoteDoc){state.doc=mergeDocs(state.doc,remoteDoc)} else {saveLocal();await putCloudJson("progress.json",state.doc)}
      saveLocal(); await putCloudJson("progress.json",state.doc); state.lastCloudLoad=Date.now();
      setSyncStatus("Synced","ok"); showNotice(""); syncSettingsUI(); buildQueue(false); updateAccountUI();
    }catch(e){console.warn(e); setSyncStatus("Local","warn"); showNotice(`OneDrive sync is unavailable right now. Your progress is still saved locally. ${friendlyCloudError(e)}`,true); updateAccountUI()}
  }
  function friendlyCloudError(e){const m=String(e.message||e);if(m.includes("NOT_SIGNED_IN"))return "Connect OneDrive again.";return m}

  async function syncNow(showSuccess=true){
    if(!state.auth){if(showSuccess)showNotice("Connect OneDrive first.",true);return}
    if(state.syncPromise) return state.syncPromise;
    state.syncPromise=(async()=>{
      try{setSyncStatus("Syncing…","warn");if(!state.cloudReady)await ensureAppFolder();
        const remote=await getCloudJson("progress.json"); state.doc=remote?mergeDocs(state.doc,remote):state.doc; saveLocal(); await putCloudJson("progress.json",state.doc);
        setSyncStatus("Synced","ok"); if(showSuccess)showNotice("Synced with OneDrive."); buildQueue(false);
      }catch(e){setSyncStatus("Local","warn");if(showSuccess)showNotice(`Could not sync: ${friendlyCloudError(e)}`,true)}finally{state.syncPromise=null}
    })(); return state.syncPromise;
  }
  function scheduleCloudSave(){clearTimeout(state.saveTimer);state.saveTimer=setTimeout(()=>syncNow(false),700)}

  async function reloadWords(){
    if(!state.auth){showNotice("Connect OneDrive first.",true);return}
    try{setSyncStatus("Loading…","warn");if(!state.cloudReady)await ensureAppFolder();const w=await getCloudJson("words.json");
      if(!Array.isArray(w))throw new Error("words.json is not a JSON array");validateWords(w);state.words=w;saveWordsLocal();buildQueue(false);setSyncStatus("Synced","ok");showNotice("words.json reloaded from OneDrive.")
    }catch(e){setSyncStatus("Local","warn");showNotice(`Could not reload words: ${friendlyCloudError(e)}`,true)}
  }
  function validateWords(words){const ids=new Set();for(const w of words){if(!w||!w.id||!w.kind||!w.english||!w.italian)throw new Error("A word entry is missing id, kind, english, or italian.");if(ids.has(w.id))throw new Error(`Duplicate word id: ${w.id}`);ids.add(w.id)}}

  function units(){
    const out=[]; const s=state.doc.settings;
    for(const w of state.words){
      if(s.type!=="all" && w.kind!==s.type) continue;
      if(w.kind==="verb"){
        const keys=s.tense==="mixed"?Object.keys(w.tenses||{}):[s.tense];
        for(const tense of keys){const td=w.tenses?.[tense];if(td)out.push({key:`${w.id}::${tense}`,word:w,tense,tenseData:td})}
      } else out.push({key:w.id,word:w,tense:null,tenseData:null});
    }
    return out;
  }
  function progressFor(key){return {...{reps:0,intervalDays:0,due:0,lastReviewed:null,lapses:0,updatedAt:0},...(state.doc.progress[key]||{})}}
  function isNew(u){return !state.doc.progress[u.key]||progressFor(u.key).reps===0}
  function buildQueue(ahead=false){
    const now=Date.now(),due=[],fresh=[],future=[];for(const u of units()){const p=progressFor(u.key);if(isNew(u))fresh.push(u);else if(p.due<=now)due.push(u);else future.push(u)}
    due.sort((a,b)=>progressFor(a.key).due-progressFor(b.key).due);future.sort((a,b)=>progressFor(a.key).due-progressFor(b.key).due);
    const newUnits=fresh.slice(0,Number(state.doc.settings.newLimit)||10);let q=[...due,...newUnits];if(ahead&&q.length===0)q=future.slice(0,Math.min(12,future.length));
    state.queue=softShuffle(q);state.done=0;state.initialCount=state.queue.length;refreshStats();nextCard();
  }
  function softShuffle(a){return a.map((x,i)=>({x,k:i+Math.random()*1.6})).sort((a,b)=>a.k-b.k).map(v=>v.x)}
  function chooseDirection(){const d=state.doc.settings.direction;if(d!=="mixed")return d;return Math.random()<.75?"en-it":"it-en"}
  function nextCard(){
    state.revealed=false;el("answer").classList.remove("visible");el("rating").classList.remove("visible");el("showBtn").style.display="";el("emptyState").classList.remove("visible");el("setupState").classList.remove("visible");el("studyContent").style.display="";
    state.current=state.queue.shift()||null;if(!state.current){showEmpty();return}state.currentDirection=chooseDirection();renderCard(state.current);updateProgressBar();
  }
  function renderCard(u){
    const w=u.word,reverse=state.currentDirection==="it-en",verb=w.kind==="verb";
    el("typePill").textContent=verb?"Verb":(w.category||"Vocabulary");el("tensePill").style.display=verb?"":"none";el("tensePill").textContent=verb?(u.tenseData.label||u.tense):"";
    el("promptLabel").textContent=reverse?"Italian → English":"English → Italian";el("prompt").textContent=reverse?w.italian:w.english;
    el("tenseHint").style.display=verb?"inline-block":"none";el("tenseHint").textContent=verb?`${u.tenseData.label||u.tense} tense`:"";
    el("microHint").textContent=verb?(reverse?"Recall the English meaning, then produce all six forms.":"Recall the infinitive and all six forms."):(reverse?"Recall the English meaning.":"Recall the Italian word.");
    el("answerItalian").textContent=w.italian;el("answerMeaning").textContent=w.english;el("forms").innerHTML="";el("metaRow").innerHTML="";
    if(verb){const f=u.tenseData.forms||{};[["io",f.io],["tu",f.tu],["lui / lei",f.luiLei],["noi",f.noi],["voi",f.voi],["loro",f.loro]].forEach(([person,val])=>{const d=document.createElement("div");d.className="form";const a=document.createElement("span"),b=document.createElement("strong");a.textContent=person;b.textContent=val||"—";d.append(a,b);el("forms").appendChild(d)});el("forms").style.display="grid";
      addMeta(u.tenseData.label||u.tense);
    }else{el("forms").style.display="none";[w.category,w.article?`article: ${w.article}`:null,w.gender,w.plural?`plural: ${w.plural}`:null].filter(Boolean).forEach(addMeta)}
    el("example").textContent=verb?(u.tenseData.example||w.example||""):(w.example||"");el("counter").textContent=`${state.done+1} / ${Math.max(state.initialCount,state.done+1)}`;updateIntervalLabels(u);
  }
  function addMeta(t){const x=document.createElement("span");x.className="meta-tag";x.textContent=t;el("metaRow").appendChild(x)}
  function reveal(){if(!state.current||state.revealed)return;state.revealed=true;el("answer").classList.add("visible");el("rating").classList.add("visible");el("showBtn").style.display="none"}
  function intervals(u){const p=progressFor(u.key),cur=Math.max(0,Number(p.intervalDays)||0);const hard=cur>0?Math.max(1,Math.round(cur*1.3)):1,good=cur>0?Math.max(3,Math.round(cur*2.2)):3,easy=cur>0?Math.max(7,Math.round(cur*3.2)):7;return{again:{ms:10*MINUTE,label:"10 min",days:0},hard:{ms:hard*DAY,label:fmtDays(hard),days:hard},good:{ms:good*DAY,label:fmtDays(good),days:good},easy:{ms:easy*DAY,label:fmtDays(easy),days:easy}}}
  function fmtDays(d){if(d<7)return `${d} day${d===1?"":"s"}`;if(d%7===0&&d<35)return `${d/7} wk`;if(d>=30)return `${Math.round(d/30)} mo`;return `${d} days`}
  function updateIntervalLabels(u){const x=intervals(u);el("againInterval").textContent=x.again.label;el("hardInterval").textContent=x.hard.label;el("goodInterval").textContent=x.good.label;el("easyInterval").textContent=x.easy.label}
  function rate(rating){
    if(!state.current||!state.revealed)return;const u=state.current,p=progressFor(u.key),x=intervals(u)[rating],now=Date.now();
    if(rating==="again"){p.lapses=(p.lapses||0)+(p.reps>0?1:0);p.intervalDays=0;state.queue.push(u);state.initialCount+=1}else p.intervalDays=x.days;
    p.reps=(p.reps||0)+1;p.lastReviewed=now;p.due=now+x.ms;p.updatedAt=now;state.doc.progress[u.key]=p;state.done+=1;saveLocal();scheduleCloudSave();refreshStats();nextCard();
  }
  function showEmpty(){state.current=null;el("studyContent").style.display="none";el("emptyState").classList.add("visible");updateProgressBar(true)}
  function refreshStats(){const now=Date.now();let due=0,fresh=0,learned=0;for(const u of units()){const p=progressFor(u.key);if(isNew(u))fresh++;else{learned++;if(p.due<=now)due++}}el("dueStat").textContent=due;el("newStat").textContent=fresh;el("learnedStat").textContent=learned}
  function updateProgressBar(done=false){const total=Math.max(1,state.initialCount),pct=done?100:Math.min(100,(state.done/total)*100);el("progressBar").style.width=`${pct}%`}

  function syncSettingsUI(){const s=state.doc.settings;el("directionSelect").value=s.direction;el("typeSelect").value=s.type;el("tenseSelect").value=s.tense;el("newLimitSelect").value=String(s.newLimit)}
  function saveSettings(){const s=state.doc.settings;s.direction=el("directionSelect").value;s.type=el("typeSelect").value;s.tense=el("tenseSelect").value;s.newLimit=Number(el("newLimitSelect").value);saveLocal();scheduleCloudSave();buildQueue(false)}
  function setSyncStatus(text,kind=""){el("syncText").textContent=text;el("syncDot").className=`dot ${kind}`}
  function showNotice(text,error=false){const n=el("notice");n.textContent=text||"";n.className=`notice${text?" visible":""}${error?" error":""}`}
  function updateAccountUI(){
    const token=state.auth||loadJson(TOKEN_KEY,null);const configuredOk=configured();el("signInBtn").textContent=token?"Disconnect":"Connect OneDrive";el("syncNowBtn").disabled=!token;el("reloadWordsBtn").disabled=!token;el("openFolderBtn").disabled=!state.appFolder?.webUrl;
    if(token){const c=decodeJwt(token.idToken||"");el("accountStatus").textContent=state.cloudReady?"Connected":"Signed in";el("accountTitle").textContent=c.name||c.preferred_username||"Microsoft account";el("accountDetail").textContent=state.appFolder?`Private folder: Apps/${state.appFolder.name||"Italian Recall"}. Automatic progress sync is enabled.`:"Signed in. The app will create/open its private OneDrive App Folder automatically."}
    else{el("accountStatus").textContent=configuredOk?"Not connected":"Setup required";el("accountTitle").textContent="OneDrive sync";el("accountDetail").textContent=configuredOk?"Connect a Microsoft account. Each user gets a separate private App Folder in their own OneDrive.":"Paste the Microsoft Entra Application (client) ID into config.js first."}
  }

  el("showBtn").addEventListener("click",reveal);document.querySelectorAll(".rate-btn").forEach(b=>b.addEventListener("click",()=>rate(b.dataset.rating)));
  el("settingsBtn").addEventListener("click",()=>el("settingsDialog").showModal());el("setupSettingsBtn").addEventListener("click",()=>el("settingsDialog").showModal());el("closeSettings").addEventListener("click",()=>el("settingsDialog").close());
  ["directionSelect","typeSelect","tenseSelect","newLimitSelect"].forEach(id=>el(id).addEventListener("change",saveSettings));
  el("signInBtn").addEventListener("click",async()=>{if(state.auth||loadJson(TOKEN_KEY,null)){clearToken();showNotice("OneDrive disconnected. Local study data is kept on this device.");}else await startLogin()});
  el("syncNowBtn").addEventListener("click",()=>syncNow(true));el("reloadWordsBtn").addEventListener("click",reloadWords);el("openFolderBtn").addEventListener("click",()=>{if(state.appFolder?.webUrl)window.open(state.appFolder.webUrl,"_blank","noopener")});
  el("resetBtn").addEventListener("click",()=>{if(!confirm("Reset all spaced-repetition history? Your words.json will not be changed."))return;state.doc.progress={};saveLocal();scheduleCloudSave();buildQueue(false);el("settingsDialog").close()});
  el("studyAheadBtn").addEventListener("click",()=>buildQueue(true));
  document.addEventListener("keydown",e=>{if(el("settingsDialog").open)return;if(e.code==="Space"){e.preventDefault();reveal();return}if(!state.revealed)return;if(e.key==="1")rate("again");if(e.key==="2")rate("hard");if(e.key==="3")rate("good");if(e.key==="4")rate("easy")});
  window.addEventListener("online",()=>{if(state.auth)syncNow(false)});
  document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="visible"&&state.auth&&Date.now()-state.lastCloudLoad>60000)reloadWords()});

  async function boot(){
    try{validateWords(state.words)}catch(e){state.words=STARTER_WORDS;saveWordsLocal();showNotice(`Cached words were invalid; using starter deck. ${e.message}`,true)}
    syncSettingsUI();updateAccountUI();setSyncStatus(state.auth?"Connecting…":"Local",state.auth?"warn":"");buildQueue(false);
    await handleOAuthReturn();state.auth=loadJson(TOKEN_KEY,null);updateAccountUI();if(state.auth)await initializeCloud();
    if(!configured()){showNotice("V2 is ready in local mode. To enable automatic OneDrive sync, add your Entra client ID in config.js and host it on GitHub Pages.")}
  }
  boot();
})();

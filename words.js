// Italian Recall deck.
// Edit this file to add verbs, vocabulary, adjectives, expressions, and future tenses.
// Keep every `id` stable after you start studying it, because progress is keyed by id + tense.

window.ITALIAN_RECALL_WORDS = [
  {
    "id": "verb-essere",
    "kind": "verb",
    "english": "be",
    "italian": "essere",
    "tenses": {
      "presente": {
        "label": "Present",
        "forms": {"io":"sono","tu":"sei","luiLei":"è","noi":"siamo","voi":"siete","loro":"sono"},
        "example": "Sono a Genova."
      },
      "passato_prossimo": {
        "label": "Passato prossimo",
        "forms": {"io":"sono stato/a","tu":"sei stato/a","luiLei":"è stato/a","noi":"siamo stati/e","voi":"siete stati/e","loro":"sono stati/e"},
        "example": "Sono stato a Milano ieri."
      },
      "futuro_semplice": {
        "label": "Future",
        "forms": {"io":"sarò","tu":"sarai","luiLei":"sarà","noi":"saremo","voi":"sarete","loro":"saranno"},
        "example": "Sarò al lavoro domani."
      }
    }
  },
  {
    "id": "verb-avere",
    "kind": "verb",
    "english": "have",
    "italian": "avere",
    "tenses": {
      "presente": {"label":"Present","forms":{"io":"ho","tu":"hai","luiLei":"ha","noi":"abbiamo","voi":"avete","loro":"hanno"},"example":"Ho un appuntamento oggi."},
      "passato_prossimo": {"label":"Passato prossimo","forms":{"io":"ho avuto","tu":"hai avuto","luiLei":"ha avuto","noi":"abbiamo avuto","voi":"avete avuto","loro":"hanno avuto"},"example":"Ho avuto molto lavoro."},
      "futuro_semplice": {"label":"Future","forms":{"io":"avrò","tu":"avrai","luiLei":"avrà","noi":"avremo","voi":"avrete","loro":"avranno"},"example":"Avrò più tempo domani."}
    }
  },
  {
    "id": "verb-fare",
    "kind": "verb",
    "english": "do / make",
    "italian": "fare",
    "tenses": {
      "presente": {"label":"Present","forms":{"io":"faccio","tu":"fai","luiLei":"fa","noi":"facciamo","voi":"fate","loro":"fanno"},"example":"Faccio una domanda."},
      "passato_prossimo": {"label":"Passato prossimo","forms":{"io":"ho fatto","tu":"hai fatto","luiLei":"ha fatto","noi":"abbiamo fatto","voi":"avete fatto","loro":"hanno fatto"},"example":"Ho fatto tutto ieri."},
      "futuro_semplice": {"label":"Future","forms":{"io":"farò","tu":"farai","luiLei":"farà","noi":"faremo","voi":"farete","loro":"faranno"},"example":"Farò la spesa più tardi."}
    }
  },
  {
    "id": "verb-andare",
    "kind": "verb",
    "english": "go",
    "italian": "andare",
    "tenses": {
      "presente": {"label":"Present","forms":{"io":"vado","tu":"vai","luiLei":"va","noi":"andiamo","voi":"andate","loro":"vanno"},"example":"Vado al lavoro in autobus."},
      "passato_prossimo": {"label":"Passato prossimo","forms":{"io":"sono andato/a","tu":"sei andato/a","luiLei":"è andato/a","noi":"siamo andati/e","voi":"siete andati/e","loro":"sono andati/e"},"example":"Sono andato in centro ieri."},
      "futuro_semplice": {"label":"Future","forms":{"io":"andrò","tu":"andrai","luiLei":"andrà","noi":"andremo","voi":"andrete","loro":"andranno"},"example":"Andrò a Roma il mese prossimo."}
    }
  },
  {
    "id": "verb-venire",
    "kind": "verb",
    "english": "come",
    "italian": "venire",
    "tenses": {
      "presente": {"label":"Present","forms":{"io":"vengo","tu":"vieni","luiLei":"viene","noi":"veniamo","voi":"venite","loro":"vengono"},"example":"Vengo domani mattina."},
      "passato_prossimo": {"label":"Passato prossimo","forms":{"io":"sono venuto/a","tu":"sei venuto/a","luiLei":"è venuto/a","noi":"siamo venuti/e","voi":"siete venuti/e","loro":"sono venuti/e"},"example":"Sono venuto qui in autobus."},
      "futuro_semplice": {"label":"Future","forms":{"io":"verrò","tu":"verrai","luiLei":"verrà","noi":"verremo","voi":"verrete","loro":"verranno"},"example":"Verrò dopo il lavoro."}
    }
  },
  {
    "id": "verb-vedere",
    "kind": "verb",
    "english": "see",
    "italian": "vedere",
    "tenses": {
      "presente": {"label":"Present","forms":{"io":"vedo","tu":"vedi","luiLei":"vede","noi":"vediamo","voi":"vedete","loro":"vedono"},"example":"Vedo il mare dalla finestra."},
      "passato_prossimo": {"label":"Passato prossimo","forms":{"io":"ho visto","tu":"hai visto","luiLei":"ha visto","noi":"abbiamo visto","voi":"avete visto","loro":"hanno visto"},"example":"Ho visto Anna ieri."},
      "futuro_semplice": {"label":"Future","forms":{"io":"vedrò","tu":"vedrai","luiLei":"vedrà","noi":"vedremo","voi":"vedrete","loro":"vedranno"},"example":"Vedrò il risultato domani."}
    }
  },
  {
    "id": "verb-sapere",
    "kind": "verb",
    "english": "know",
    "italian": "sapere",
    "tenses": {
      "presente": {"label":"Present","forms":{"io":"so","tu":"sai","luiLei":"sa","noi":"sappiamo","voi":"sapete","loro":"sanno"},"example":"Non so la risposta."},
      "passato_prossimo": {"label":"Passato prossimo","forms":{"io":"ho saputo","tu":"hai saputo","luiLei":"ha saputo","noi":"abbiamo saputo","voi":"avete saputo","loro":"hanno saputo"},"example":"Ho saputo la notizia ieri."},
      "futuro_semplice": {"label":"Future","forms":{"io":"saprò","tu":"saprai","luiLei":"saprà","noi":"sapremo","voi":"saprete","loro":"sapranno"},"example":"Lo saprò domani."}
    }
  },
  {
    "id": "verb-potere",
    "kind": "verb",
    "english": "can / be able to",
    "italian": "potere",
    "tenses": {
      "presente": {"label":"Present","forms":{"io":"posso","tu":"puoi","luiLei":"può","noi":"possiamo","voi":"potete","loro":"possono"},"example":"Posso entrare?"},
      "passato_prossimo": {"label":"Passato prossimo","forms":{"io":"ho potuto","tu":"hai potuto","luiLei":"ha potuto","noi":"abbiamo potuto","voi":"avete potuto","loro":"hanno potuto"},"example":"Ho potuto finire il lavoro."},
      "futuro_semplice": {"label":"Future","forms":{"io":"potrò","tu":"potrai","luiLei":"potrà","noi":"potremo","voi":"potrete","loro":"potranno"},"example":"Potrò venire domani."}
    }
  },
  {
    "id": "verb-volere",
    "kind": "verb",
    "english": "want",
    "italian": "volere",
    "tenses": {
      "presente": {"label":"Present","forms":{"io":"voglio","tu":"vuoi","luiLei":"vuole","noi":"vogliamo","voi":"volete","loro":"vogliono"},"example":"Voglio imparare l'italiano."},
      "passato_prossimo": {"label":"Passato prossimo","forms":{"io":"ho voluto","tu":"hai voluto","luiLei":"ha voluto","noi":"abbiamo voluto","voi":"avete voluto","loro":"hanno voluto"},"example":"Ho voluto provare."},
      "futuro_semplice": {"label":"Future","forms":{"io":"vorrò","tu":"vorrai","luiLei":"vorrà","noi":"vorremo","voi":"vorrete","loro":"vorranno"},"example":"Vorrò riposare dopo il viaggio."}
    }
  },
  {
    "id": "verb-dovere",
    "kind": "verb",
    "english": "must / have to",
    "italian": "dovere",
    "tenses": {
      "presente": {"label":"Present","forms":{"io":"devo","tu":"devi","luiLei":"deve","noi":"dobbiamo","voi":"dovete","loro":"devono"},"example":"Devo andare al lavoro."},
      "passato_prossimo": {"label":"Passato prossimo","forms":{"io":"ho dovuto","tu":"hai dovuto","luiLei":"ha dovuto","noi":"abbiamo dovuto","voi":"avete dovuto","loro":"hanno dovuto"},"example":"Ho dovuto aspettare."},
      "futuro_semplice": {"label":"Future","forms":{"io":"dovrò","tu":"dovrai","luiLei":"dovrà","noi":"dovremo","voi":"dovrete","loro":"dovranno"},"example":"Dovrò partire presto."}
    }
  },
  {
    "id": "verb-parlare",
    "kind": "verb",
    "english": "speak",
    "italian": "parlare",
    "tenses": {
      "presente": {"label":"Present","forms":{"io":"parlo","tu":"parli","luiLei":"parla","noi":"parliamo","voi":"parlate","loro":"parlano"},"example":"Parlo un po' italiano."},
      "passato_prossimo": {"label":"Passato prossimo","forms":{"io":"ho parlato","tu":"hai parlato","luiLei":"ha parlato","noi":"abbiamo parlato","voi":"avete parlato","loro":"hanno parlato"},"example":"Ho parlato con il proprietario."},
      "futuro_semplice": {"label":"Future","forms":{"io":"parlerò","tu":"parlerai","luiLei":"parlerà","noi":"parleremo","voi":"parlerete","loro":"parleranno"},"example":"Parlerò con lei domani."}
    }
  },
  {
    "id": "verb-prendere",
    "kind": "verb",
    "english": "take",
    "italian": "prendere",
    "tenses": {
      "presente": {"label":"Present","forms":{"io":"prendo","tu":"prendi","luiLei":"prende","noi":"prendiamo","voi":"prendete","loro":"prendono"},"example":"Prendo l'autobus alle otto."},
      "passato_prossimo": {"label":"Passato prossimo","forms":{"io":"ho preso","tu":"hai preso","luiLei":"ha preso","noi":"abbiamo preso","voi":"avete preso","loro":"hanno preso"},"example":"Ho preso un caffè."},
      "futuro_semplice": {"label":"Future","forms":{"io":"prenderò","tu":"prenderai","luiLei":"prenderà","noi":"prenderemo","voi":"prenderete","loro":"prenderanno"},"example":"Prenderò il treno domani."}
    }
  },
  {
    "id": "verb-mettere",
    "kind": "verb",
    "english": "put",
    "italian": "mettere",
    "tenses": {
      "presente": {"label":"Present","forms":{"io":"metto","tu":"metti","luiLei":"mette","noi":"mettiamo","voi":"mettete","loro":"mettono"},"example":"Metto le chiavi sul tavolo."},
      "passato_prossimo": {"label":"Passato prossimo","forms":{"io":"ho messo","tu":"hai messo","luiLei":"ha messo","noi":"abbiamo messo","voi":"avete messo","loro":"hanno messo"},"example":"Ho messo tutto nello zaino."},
      "futuro_semplice": {"label":"Future","forms":{"io":"metterò","tu":"metterai","luiLei":"metterà","noi":"metteremo","voi":"metterete","loro":"metteranno"},"example":"Metterò il documento qui."}
    }
  },
  {
    "id": "verb-uscire",
    "kind": "verb",
    "english": "go out / leave",
    "italian": "uscire",
    "tenses": {
      "presente": {"label":"Present","forms":{"io":"esco","tu":"esci","luiLei":"esce","noi":"usciamo","voi":"uscite","loro":"escono"},"example":"Esco dal laboratorio alle sei."},
      "passato_prossimo": {"label":"Passato prossimo","forms":{"io":"sono uscito/a","tu":"sei uscito/a","luiLei":"è uscito/a","noi":"siamo usciti/e","voi":"siete usciti/e","loro":"sono usciti/e"},"example":"Sono uscito tardi ieri."},
      "futuro_semplice": {"label":"Future","forms":{"io":"uscirò","tu":"uscirai","luiLei":"uscirà","noi":"usciremo","voi":"uscirete","loro":"usciranno"},"example":"Uscirò dopo cena."}
    }
  },
  {
    "id": "verb-trovare",
    "kind": "verb",
    "english": "find",
    "italian": "trovare",
    "tenses": {
      "presente": {"label":"Present","forms":{"io":"trovo","tu":"trovi","luiLei":"trova","noi":"troviamo","voi":"trovate","loro":"trovano"},"example":"Trovo un nuovo appartamento."},
      "passato_prossimo": {"label":"Passato prossimo","forms":{"io":"ho trovato","tu":"hai trovato","luiLei":"ha trovato","noi":"abbiamo trovato","voi":"avete trovato","loro":"hanno trovato"},"example":"Ho trovato le chiavi."},
      "futuro_semplice": {"label":"Future","forms":{"io":"troverò","tu":"troverai","luiLei":"troverà","noi":"troveremo","voi":"troverete","loro":"troveranno"},"example":"Troverò una soluzione."}
    }
  },

  {"id":"vocab-casa","kind":"vocab","category":"noun","english":"house / home","italian":"casa","article":"la","gender":"feminine","plural":"case","example":"La casa è vicino al centro."},
  {"id":"vocab-lavoro","kind":"vocab","category":"noun","english":"work / job","italian":"lavoro","article":"il","gender":"masculine","plural":"lavori","example":"Vado al lavoro ogni mattina."},
  {"id":"vocab-sedia","kind":"vocab","category":"noun","english":"chair","italian":"sedia","article":"la","gender":"feminine","plural":"sedie","example":"La sedia è vicino alla finestra."},
  {"id":"vocab-finestra","kind":"vocab","category":"noun","english":"window","italian":"finestra","article":"la","gender":"feminine","plural":"finestre","example":"Apro la finestra."},
  {"id":"vocab-strada","kind":"vocab","category":"noun","english":"street / road","italian":"strada","article":"la","gender":"feminine","plural":"strade","example":"La strada è molto stretta."},
  {"id":"vocab-appuntamento","kind":"vocab","category":"noun","english":"appointment","italian":"appuntamento","article":"l'","gender":"masculine","plural":"appuntamenti","example":"Ho un appuntamento domani."},
  {"id":"vocab-bolletta","kind":"vocab","category":"noun","english":"utility bill","italian":"bolletta","article":"la","gender":"feminine","plural":"bollette","example":"La bolletta è intestata a mio nome."},
  {"id":"vocab-affitto","kind":"vocab","category":"noun","english":"rent","italian":"affitto","article":"l'","gender":"masculine","plural":"affitti","example":"Pago l'affitto ogni mese."},
  {"id":"vocab-veloce","kind":"vocab","category":"adjective","english":"fast / quick","italian":"veloce","example":"Il treno è veloce."},
  {"id":"vocab-presto","kind":"vocab","category":"adverb","english":"early / soon","italian":"presto","example":"Devo partire presto."},
  {"id":"phrase-avere-bisogno","kind":"vocab","category":"expression","english":"to need","italian":"avere bisogno di","example":"Ho bisogno di aiuto."},
  {"id":"phrase-non-fa-niente","kind":"vocab","category":"expression","english":"it doesn't matter / no problem","italian":"non fa niente","example":"Non fa niente, possiamo farlo domani."}
];

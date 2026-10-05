// Italian Recall deck.
// Keep every id stable after study begins because progress is keyed by id + tense.
// All cards use the same core fields: id, kind, order, english, and italian.
// Optional card fields: category, article, gender, plural, examples, notes, and activeRecall.
// activeRecall uses { family: "...", detail: "short keyword cue" }; related cards share the same family.
// Notes can be plain strings or { label: "...", value: "..." } for labeled blocks.
// Verbs store examples and optional notes inside each tense.

window.ITALIAN_RECALL_WORDS = [
  {
    "id": "verb-dovere",
    "kind": "verb",
    "order": 10,
    "english": "must / have to",
    "italian": "dovere",
    "activeRecall": {
      "family": "Modal verbs",
      "detail": "Obligation · + infinitive"
    },
    "tenses": {
      "presente": {
        "label": "Present",
        "forms": {
          "io": "devo",
          "tu": "devi",
          "luiLei": "deve",
          "noi": "dobbiamo",
          "voi": "dovete",
          "loro": "devono"
        },
        "examples": [
          "Devo andare al lavoro."
        ]
      },
      "passato_prossimo": {
        "label": "Passato prossimo",
        "forms": {
          "io": "ho dovuto",
          "tu": "hai dovuto",
          "luiLei": "ha dovuto",
          "noi": "abbiamo dovuto",
          "voi": "avete dovuto",
          "loro": "hanno dovuto"
        },
        "examples": [
          "Ho dovuto aspettare."
        ]
      },
      "futuro_semplice": {
        "label": "Future",
        "forms": {
          "io": "dovrò",
          "tu": "dovrai",
          "luiLei": "dovrà",
          "noi": "dovremo",
          "voi": "dovrete",
          "loro": "dovranno"
        },
        "examples": [
          "Dovrò partire presto."
        ]
      }
    }
  },
  {
    "id": "verb-venire",
    "kind": "verb",
    "order": 20,
    "english": "come",
    "italian": "venire",
    "activeRecall": {
      "family": "Movement verbs",
      "detail": "Toward speaker / destination"
    },
    "tenses": {
      "presente": {
        "label": "Present",
        "forms": {
          "io": "vengo",
          "tu": "vieni",
          "luiLei": "viene",
          "noi": "veniamo",
          "voi": "venite",
          "loro": "vengono"
        },
        "examples": [
          "Vengo domani mattina."
        ]
      },
      "passato_prossimo": {
        "label": "Passato prossimo",
        "forms": {
          "io": "sono venuto/a",
          "tu": "sei venuto/a",
          "luiLei": "è venuto/a",
          "noi": "siamo venuti/e",
          "voi": "siete venuti/e",
          "loro": "sono venuti/e"
        },
        "examples": [
          "Sono venuto qui in autobus."
        ]
      },
      "futuro_semplice": {
        "label": "Future",
        "forms": {
          "io": "verrò",
          "tu": "verrai",
          "luiLei": "verrà",
          "noi": "verremo",
          "voi": "verrete",
          "loro": "verranno"
        },
        "examples": [
          "Verrò dopo il lavoro."
        ]
      }
    }
  },
  {
    "id": "verb-potere",
    "kind": "verb",
    "order": 30,
    "english": "can / be able to",
    "italian": "potere",
    "activeRecall": {
      "family": "Modal verbs",
      "detail": "Ability / permission · + infinitive"
    },
    "tenses": {
      "presente": {
        "label": "Present",
        "forms": {
          "io": "posso",
          "tu": "puoi",
          "luiLei": "può",
          "noi": "possiamo",
          "voi": "potete",
          "loro": "possono"
        },
        "examples": [
          "Posso entrare?"
        ]
      },
      "passato_prossimo": {
        "label": "Passato prossimo",
        "forms": {
          "io": "ho potuto",
          "tu": "hai potuto",
          "luiLei": "ha potuto",
          "noi": "abbiamo potuto",
          "voi": "avete potuto",
          "loro": "hanno potuto"
        },
        "examples": [
          "Ho potuto finire il lavoro."
        ]
      },
      "futuro_semplice": {
        "label": "Future",
        "forms": {
          "io": "potrò",
          "tu": "potrai",
          "luiLei": "potrà",
          "noi": "potremo",
          "voi": "potrete",
          "loro": "potranno"
        },
        "examples": [
          "Potrò venire domani."
        ]
      }
    }
  },
  {
    "id": "verb-sapere",
    "kind": "verb",
    "order": 40,
    "english": "know",
    "italian": "sapere",
    "activeRecall": {
      "family": "Knowing and perceiving",
      "detail": "Facts · knowing how"
    },
    "tenses": {
      "presente": {
        "label": "Present",
        "forms": {
          "io": "so",
          "tu": "sai",
          "luiLei": "sa",
          "noi": "sappiamo",
          "voi": "sapete",
          "loro": "sanno"
        },
        "examples": [
          "Non so la risposta."
        ]
      },
      "passato_prossimo": {
        "label": "Passato prossimo",
        "forms": {
          "io": "ho saputo",
          "tu": "hai saputo",
          "luiLei": "ha saputo",
          "noi": "abbiamo saputo",
          "voi": "avete saputo",
          "loro": "hanno saputo"
        },
        "examples": [
          "Ho saputo la notizia ieri."
        ]
      },
      "futuro_semplice": {
        "label": "Future",
        "forms": {
          "io": "saprò",
          "tu": "saprai",
          "luiLei": "saprà",
          "noi": "sapremo",
          "voi": "saprete",
          "loro": "sapranno"
        },
        "examples": [
          "Lo saprò domani."
        ]
      }
    }
  },
  {
    "id": "verb-vedere",
    "kind": "verb",
    "order": 50,
    "english": "see",
    "italian": "vedere",
    "activeRecall": {
      "family": "Knowing and perceiving",
      "detail": "See · irregular participle: visto"
    },
    "tenses": {
      "presente": {
        "label": "Present",
        "forms": {
          "io": "vedo",
          "tu": "vedi",
          "luiLei": "vede",
          "noi": "vediamo",
          "voi": "vedete",
          "loro": "vedono"
        },
        "examples": [
          "Vedo il mare dalla finestra."
        ]
      },
      "passato_prossimo": {
        "label": "Passato prossimo",
        "forms": {
          "io": "ho visto",
          "tu": "hai visto",
          "luiLei": "ha visto",
          "noi": "abbiamo visto",
          "voi": "avete visto",
          "loro": "hanno visto"
        },
        "examples": [
          "Ho visto Anna ieri."
        ]
      },
      "futuro_semplice": {
        "label": "Future",
        "forms": {
          "io": "vedrò",
          "tu": "vedrai",
          "luiLei": "vedrà",
          "noi": "vedremo",
          "voi": "vedrete",
          "loro": "vedranno"
        },
        "examples": [
          "Vedrò il risultato domani."
        ]
      }
    }
  },
  {
    "id": "verb-dormire",
    "kind": "verb",
    "order": 60,
    "english": "sleep",
    "italian": "dormire",
    "tenses": {
      "presente": {
        "label": "Present",
        "forms": {
          "io": "dormo",
          "tu": "dormi",
          "luiLei": "dorme",
          "noi": "dormiamo",
          "voi": "dormite",
          "loro": "dormono"
        },
        "examples": [
          "Dormo otto ore ogni notte."
        ]
      },
      "passato_prossimo": {
        "label": "Passato prossimo",
        "forms": {
          "io": "ho dormito",
          "tu": "hai dormito",
          "luiLei": "ha dormito",
          "noi": "abbiamo dormito",
          "voi": "avete dormito",
          "loro": "hanno dormito"
        },
        "examples": [
          "Ho dormito bene."
        ]
      },
      "futuro_semplice": {
        "label": "Future",
        "forms": {
          "io": "dormirò",
          "tu": "dormirai",
          "luiLei": "dormirà",
          "noi": "dormiremo",
          "voi": "dormirete",
          "loro": "dormiranno"
        },
        "examples": [
          "Dormirò fino a tardi domani."
        ]
      }
    }
  },
  {
    "id": "verb-andare",
    "kind": "verb",
    "order": 70,
    "english": "go",
    "italian": "andare",
    "activeRecall": {
      "family": "Movement verbs",
      "detail": "Away from speaker / to another place"
    },
    "tenses": {
      "presente": {
        "label": "Present",
        "forms": {
          "io": "vado",
          "tu": "vai",
          "luiLei": "va",
          "noi": "andiamo",
          "voi": "andate",
          "loro": "vanno"
        },
        "examples": [
          "Vado al lavoro in autobus."
        ]
      },
      "passato_prossimo": {
        "label": "Passato prossimo",
        "forms": {
          "io": "sono andato/a",
          "tu": "sei andato/a",
          "luiLei": "è andato/a",
          "noi": "siamo andati/e",
          "voi": "siete andati/e",
          "loro": "sono andati/e"
        },
        "examples": [
          "Sono andato in centro ieri."
        ]
      },
      "futuro_semplice": {
        "label": "Future",
        "forms": {
          "io": "andrò",
          "tu": "andrai",
          "luiLei": "andrà",
          "noi": "andremo",
          "voi": "andrete",
          "loro": "andranno"
        },
        "examples": [
          "Andrò a Roma il mese prossimo."
        ]
      }
    }
  },
  {
    "id": "verb-bere",
    "kind": "verb",
    "order": 80,
    "english": "drink",
    "italian": "bere",
    "tenses": {
      "presente": {
        "label": "Present",
        "forms": {
          "io": "bevo",
          "tu": "bevi",
          "luiLei": "beve",
          "noi": "beviamo",
          "voi": "bevete",
          "loro": "bevono"
        },
        "examples": [
          "Bevo un caffè al mattino."
        ]
      },
      "passato_prossimo": {
        "label": "Passato prossimo",
        "forms": {
          "io": "ho bevuto",
          "tu": "hai bevuto",
          "luiLei": "ha bevuto",
          "noi": "abbiamo bevuto",
          "voi": "avete bevuto",
          "loro": "hanno bevuto"
        },
        "examples": [
          "Ho bevuto molta acqua."
        ]
      },
      "futuro_semplice": {
        "label": "Future",
        "forms": {
          "io": "berrò",
          "tu": "berrai",
          "luiLei": "berrà",
          "noi": "berremo",
          "voi": "berrete",
          "loro": "berranno"
        },
        "examples": [
          "Berrò qualcosa più tardi."
        ]
      }
    }
  },
  {
    "id": "verb-volere",
    "kind": "verb",
    "order": 90,
    "english": "want",
    "italian": "volere",
    "activeRecall": {
      "family": "Modal verbs",
      "detail": "Desire / intention · + infinitive"
    },
    "tenses": {
      "presente": {
        "label": "Present",
        "forms": {
          "io": "voglio",
          "tu": "vuoi",
          "luiLei": "vuole",
          "noi": "vogliamo",
          "voi": "volete",
          "loro": "vogliono"
        },
        "examples": [
          "Voglio imparare l'italiano."
        ]
      },
      "passato_prossimo": {
        "label": "Passato prossimo",
        "forms": {
          "io": "ho voluto",
          "tu": "hai voluto",
          "luiLei": "ha voluto",
          "noi": "abbiamo voluto",
          "voi": "avete voluto",
          "loro": "hanno voluto"
        },
        "examples": [
          "Ho voluto provare."
        ]
      },
      "futuro_semplice": {
        "label": "Future",
        "forms": {
          "io": "vorrò",
          "tu": "vorrai",
          "luiLei": "vorrà",
          "noi": "vorremo",
          "voi": "vorrete",
          "loro": "vorranno"
        },
        "examples": [
          "Vorrò riposare dopo il viaggio."
        ]
      }
    }
  },
  {
    "id": "verb-prestare",
    "kind": "verb",
    "order": 100,
    "english": "lend",
    "italian": "prestare",
    "tenses": {
      "presente": {
        "label": "Present",
        "forms": {
          "io": "presto",
          "tu": "presti",
          "luiLei": "presta",
          "noi": "prestiamo",
          "voi": "prestate",
          "loro": "prestano"
        },
        "examples": [
          "Presto il libro a Marco."
        ]
      },
      "passato_prossimo": {
        "label": "Passato prossimo",
        "forms": {
          "io": "ho prestato",
          "tu": "hai prestato",
          "luiLei": "ha prestato",
          "noi": "abbiamo prestato",
          "voi": "avete prestato",
          "loro": "hanno prestato"
        },
        "examples": [
          "Ho prestato la macchina a un amico."
        ]
      },
      "futuro_semplice": {
        "label": "Future",
        "forms": {
          "io": "presterò",
          "tu": "presterai",
          "luiLei": "presterà",
          "noi": "presteremo",
          "voi": "presterete",
          "loro": "presteranno"
        },
        "examples": [
          "Ti presterò la mia bicicletta."
        ]
      }
    }
  },
  {
    "id": "verb-prendere",
    "kind": "verb",
    "order": 110,
    "english": "take",
    "italian": "prendere",
    "tenses": {
      "presente": {
        "label": "Present",
        "forms": {
          "io": "prendo",
          "tu": "prendi",
          "luiLei": "prende",
          "noi": "prendiamo",
          "voi": "prendete",
          "loro": "prendono"
        },
        "examples": [
          "Prendo l'autobus alle otto."
        ]
      },
      "passato_prossimo": {
        "label": "Passato prossimo",
        "forms": {
          "io": "ho preso",
          "tu": "hai preso",
          "luiLei": "ha preso",
          "noi": "abbiamo preso",
          "voi": "avete preso",
          "loro": "hanno preso"
        },
        "examples": [
          "Ho preso un caffè."
        ]
      },
      "futuro_semplice": {
        "label": "Future",
        "forms": {
          "io": "prenderò",
          "tu": "prenderai",
          "luiLei": "prenderà",
          "noi": "prenderemo",
          "voi": "prenderete",
          "loro": "prenderanno"
        },
        "examples": [
          "Prenderò il treno domani."
        ]
      }
    }
  },
  {
    "id": "vocab-sempre",
    "kind": "vocab",
    "order": 120,
    "category": "adverb",
    "english": "always",
    "italian": "sempre",
    "activeRecall": {
      "family": "Frequency adverbs",
      "detail": "Usually after conjugated verb"
    },
    "examples": [
      "Io vado sempre al cinema."
    ]
  },
  {
    "id": "vocab-spesso",
    "kind": "vocab",
    "order": 130,
    "category": "adverb",
    "english": "often",
    "italian": "spesso",
    "activeRecall": {
      "family": "Frequency adverbs",
      "detail": "Before / after verb"
    },
    "examples": [
      "Spesso vado al cinema.",
      "Vado spesso al cinema."
    ],
    "notes": [
      { "label": "Position", "value": "Before / after verb" }
    ]
  },
  {
    "id": "vocab-di-solito",
    "kind": "vocab",
    "order": 140,
    "category": "adverbial phrase",
    "english": "usually",
    "italian": "di solito",
    "activeRecall": {
      "family": "Frequency adverbs",
      "detail": "Often at sentence start"
    },
    "examples": [
      "Di solito vado al lavoro in autobus."
    ],
    "notes": [
      { "label": "Position", "value": "Often at sentence start" }
    ]
  },
  {
    "id": "vocab-qualche-volta",
    "kind": "vocab",
    "order": 150,
    "category": "adverbial phrase",
    "english": "sometimes",
    "italian": "qualche volta",
    "activeRecall": {
      "family": "Frequency adverbs",
      "detail": "Often at sentence start"
    },
    "examples": [
      "Qualche volta vado al cinema."
    ],
    "notes": [
      { "label": "Position", "value": "Often at sentence start" }
    ]
  },
  {
    "id": "vocab-mai",
    "kind": "vocab",
    "order": 160,
    "category": "adverb",
    "english": "never / ever",
    "italian": "mai",
    "activeRecall": {
      "family": "Frequency adverbs",
      "detail": "Never: non + verb + mai"
    },
    "examples": [
      "Non ascolto mai la musica."
    ],
    "notes": [
      { "label": "Never", "value": "non + conjugated verb + mai" }
    ]
  },
  {
    "id": "phrase-che-ore-sono",
    "kind": "vocab",
    "order": 170,
    "category": "phrase",
    "english": "what time is it?",
    "italian": "che ore sono?",
    "activeRecall": {
      "family": "Useful questions",
      "detail": "Time · sono le…"
    },
    "examples": [
      "Sono le due.",
      "Sono le quattordici e quindici.",
      "Sono le due e tre quarti.",
      "Sono le tre meno venti."
    ],
    "notes": [
      { "label": "Time", "value": "sono le… · one o’clock: è l’una" }
    ]
  },
  {
    "id": "phrase-quanto-viene-camera",
    "kind": "vocab",
    "order": 180,
    "category": "phrase",
    "english": "how much is the room?",
    "italian": "quanto viene la camera?",
    "activeRecall": {
      "family": "Useful questions",
      "detail": "Price · viene = costs"
    },
    "examples": [
      "Viene 120 euro a persona."
    ]
  },
  {
    "id": "tip-qualche-singolare",
    "kind": "vocab",
    "order": 190,
    "category": "grammar tip",
    "english": "some + singular noun",
    "italian": "qualche + singular",
    "activeRecall": {
      "family": "Choosing ‘some’",
      "detail": "Singular noun · plural meaning"
    },
    "examples": [
      "Ho qualche domanda."
    ]
  },
  {
    "id": "tip-alcuni-plurale",
    "kind": "vocab",
    "order": 200,
    "category": "grammar tip",
    "english": "some + plural noun",
    "italian": "alcuni / alcune + plural",
    "activeRecall": {
      "family": "Choosing ‘some’",
      "detail": "alcuni: masculine · alcune: feminine"
    },
    "examples": [
      "Ho alcuni libri.",
      "Ho alcune domande."
    ]
  },
  {
    "id": "verb-essere",
    "kind": "verb",
    "order": 210,
    "english": "be",
    "italian": "essere",
    "tenses": {
      "presente": {
        "label": "Present",
        "forms": {
          "io": "sono",
          "tu": "sei",
          "luiLei": "è",
          "noi": "siamo",
          "voi": "siete",
          "loro": "sono"
        },
        "examples": [
          "Sono a Genova."
        ]
      },
      "passato_prossimo": {
        "label": "Passato prossimo",
        "forms": {
          "io": "sono stato/a",
          "tu": "sei stato/a",
          "luiLei": "è stato/a",
          "noi": "siamo stati/e",
          "voi": "siete stati/e",
          "loro": "sono stati/e"
        },
        "examples": [
          "Sono stato a Milano ieri."
        ]
      },
      "futuro_semplice": {
        "label": "Future",
        "forms": {
          "io": "sarò",
          "tu": "sarai",
          "luiLei": "sarà",
          "noi": "saremo",
          "voi": "sarete",
          "loro": "saranno"
        },
        "examples": [
          "Sarò al lavoro domani."
        ]
      }
    }
  },
  {
    "id": "verb-avere",
    "kind": "verb",
    "order": 220,
    "english": "have",
    "italian": "avere",
    "tenses": {
      "presente": {
        "label": "Present",
        "forms": {
          "io": "ho",
          "tu": "hai",
          "luiLei": "ha",
          "noi": "abbiamo",
          "voi": "avete",
          "loro": "hanno"
        },
        "examples": [
          "Ho un appuntamento oggi."
        ]
      },
      "passato_prossimo": {
        "label": "Passato prossimo",
        "forms": {
          "io": "ho avuto",
          "tu": "hai avuto",
          "luiLei": "ha avuto",
          "noi": "abbiamo avuto",
          "voi": "avete avuto",
          "loro": "hanno avuto"
        },
        "examples": [
          "Ho avuto molto lavoro."
        ]
      },
      "futuro_semplice": {
        "label": "Future",
        "forms": {
          "io": "avrò",
          "tu": "avrai",
          "luiLei": "avrà",
          "noi": "avremo",
          "voi": "avrete",
          "loro": "avranno"
        },
        "examples": [
          "Avrò più tempo domani."
        ]
      }
    }
  },
  {
    "id": "verb-fare",
    "kind": "verb",
    "order": 230,
    "english": "do / make",
    "italian": "fare",
    "tenses": {
      "presente": {
        "label": "Present",
        "forms": {
          "io": "faccio",
          "tu": "fai",
          "luiLei": "fa",
          "noi": "facciamo",
          "voi": "fate",
          "loro": "fanno"
        },
        "examples": [
          "Faccio una domanda."
        ]
      },
      "passato_prossimo": {
        "label": "Passato prossimo",
        "forms": {
          "io": "ho fatto",
          "tu": "hai fatto",
          "luiLei": "ha fatto",
          "noi": "abbiamo fatto",
          "voi": "avete fatto",
          "loro": "hanno fatto"
        },
        "examples": [
          "Ho fatto tutto ieri."
        ]
      },
      "futuro_semplice": {
        "label": "Future",
        "forms": {
          "io": "farò",
          "tu": "farai",
          "luiLei": "farà",
          "noi": "faremo",
          "voi": "farete",
          "loro": "faranno"
        },
        "examples": [
          "Farò la spesa più tardi."
        ]
      }
    }
  },
  {
    "id": "verb-parlare",
    "kind": "verb",
    "order": 240,
    "english": "speak",
    "italian": "parlare",
    "tenses": {
      "presente": {
        "label": "Present",
        "forms": {
          "io": "parlo",
          "tu": "parli",
          "luiLei": "parla",
          "noi": "parliamo",
          "voi": "parlate",
          "loro": "parlano"
        },
        "examples": [
          "Parlo un po' italiano."
        ]
      },
      "passato_prossimo": {
        "label": "Passato prossimo",
        "forms": {
          "io": "ho parlato",
          "tu": "hai parlato",
          "luiLei": "ha parlato",
          "noi": "abbiamo parlato",
          "voi": "avete parlato",
          "loro": "hanno parlato"
        },
        "examples": [
          "Ho parlato con il proprietario."
        ]
      },
      "futuro_semplice": {
        "label": "Future",
        "forms": {
          "io": "parlerò",
          "tu": "parlerai",
          "luiLei": "parlerà",
          "noi": "parleremo",
          "voi": "parlerete",
          "loro": "parleranno"
        },
        "examples": [
          "Parlerò con lei domani."
        ]
      }
    }
  },
  {
    "id": "verb-mettere",
    "kind": "verb",
    "order": 250,
    "english": "put",
    "italian": "mettere",
    "tenses": {
      "presente": {
        "label": "Present",
        "forms": {
          "io": "metto",
          "tu": "metti",
          "luiLei": "mette",
          "noi": "mettiamo",
          "voi": "mettete",
          "loro": "mettono"
        },
        "examples": [
          "Metto le chiavi sul tavolo."
        ]
      },
      "passato_prossimo": {
        "label": "Passato prossimo",
        "forms": {
          "io": "ho messo",
          "tu": "hai messo",
          "luiLei": "ha messo",
          "noi": "abbiamo messo",
          "voi": "avete messo",
          "loro": "hanno messo"
        },
        "examples": [
          "Ho messo tutto nello zaino."
        ]
      },
      "futuro_semplice": {
        "label": "Future",
        "forms": {
          "io": "metterò",
          "tu": "metterai",
          "luiLei": "metterà",
          "noi": "metteremo",
          "voi": "metterete",
          "loro": "metteranno"
        },
        "examples": [
          "Metterò il documento qui."
        ]
      }
    }
  },
  {
    "id": "verb-uscire",
    "kind": "verb",
    "order": 260,
    "english": "go out / leave",
    "italian": "uscire",
    "activeRecall": {
      "family": "Movement verbs",
      "detail": "Go out / leave an enclosed place"
    },
    "tenses": {
      "presente": {
        "label": "Present",
        "forms": {
          "io": "esco",
          "tu": "esci",
          "luiLei": "esce",
          "noi": "usciamo",
          "voi": "uscite",
          "loro": "escono"
        },
        "examples": [
          "Esco dal laboratorio alle sei."
        ]
      },
      "passato_prossimo": {
        "label": "Passato prossimo",
        "forms": {
          "io": "sono uscito/a",
          "tu": "sei uscito/a",
          "luiLei": "è uscito/a",
          "noi": "siamo usciti/e",
          "voi": "siete usciti/e",
          "loro": "sono usciti/e"
        },
        "examples": [
          "Sono uscito tardi ieri."
        ]
      },
      "futuro_semplice": {
        "label": "Future",
        "forms": {
          "io": "uscirò",
          "tu": "uscirai",
          "luiLei": "uscirà",
          "noi": "usciremo",
          "voi": "uscirete",
          "loro": "usciranno"
        },
        "examples": [
          "Uscirò dopo cena."
        ]
      }
    }
  },
  {
    "id": "verb-trovare",
    "kind": "verb",
    "order": 270,
    "english": "find",
    "italian": "trovare",
    "tenses": {
      "presente": {
        "label": "Present",
        "forms": {
          "io": "trovo",
          "tu": "trovi",
          "luiLei": "trova",
          "noi": "troviamo",
          "voi": "trovate",
          "loro": "trovano"
        },
        "examples": [
          "Trovo un nuovo appartamento."
        ]
      },
      "passato_prossimo": {
        "label": "Passato prossimo",
        "forms": {
          "io": "ho trovato",
          "tu": "hai trovato",
          "luiLei": "ha trovato",
          "noi": "abbiamo trovato",
          "voi": "avete trovato",
          "loro": "hanno trovato"
        },
        "examples": [
          "Ho trovato le chiavi."
        ]
      },
      "futuro_semplice": {
        "label": "Future",
        "forms": {
          "io": "troverò",
          "tu": "troverai",
          "luiLei": "troverà",
          "noi": "troveremo",
          "voi": "troverete",
          "loro": "troveranno"
        },
        "examples": [
          "Troverò una soluzione."
        ]
      }
    }
  },
  {
    "id": "vocab-casa",
    "kind": "vocab",
    "order": 280,
    "category": "noun",
    "english": "house / home",
    "italian": "casa",
    "article": "la",
    "gender": "feminine",
    "plural": "case",
    "activeRecall": {
      "family": "Home and renting",
      "detail": "House / home"
    },
    "examples": [
      "La casa è vicino al centro."
    ]
  },
  {
    "id": "vocab-lavoro",
    "kind": "vocab",
    "order": 290,
    "category": "noun",
    "english": "work / job",
    "italian": "lavoro",
    "article": "il",
    "gender": "masculine",
    "plural": "lavori",
    "examples": [
      "Vado al lavoro ogni mattina."
    ]
  },
  {
    "id": "vocab-sedia",
    "kind": "vocab",
    "order": 300,
    "category": "noun",
    "english": "chair",
    "italian": "sedia",
    "article": "la",
    "gender": "feminine",
    "plural": "sedie",
    "examples": [
      "La sedia è vicino alla finestra."
    ]
  },
  {
    "id": "vocab-finestra",
    "kind": "vocab",
    "order": 310,
    "category": "noun",
    "english": "window",
    "italian": "finestra",
    "article": "la",
    "gender": "feminine",
    "plural": "finestre",
    "examples": [
      "Apro la finestra."
    ]
  },
  {
    "id": "vocab-strada",
    "kind": "vocab",
    "order": 320,
    "category": "noun",
    "english": "street / road",
    "italian": "strada",
    "article": "la",
    "gender": "feminine",
    "plural": "strade",
    "examples": [
      "La strada è molto stretta."
    ]
  },
  {
    "id": "vocab-appuntamento",
    "kind": "vocab",
    "order": 330,
    "category": "noun",
    "english": "appointment",
    "italian": "appuntamento",
    "article": "l'",
    "gender": "masculine",
    "plural": "appuntamenti",
    "examples": [
      "Ho un appuntamento domani."
    ]
  },
  {
    "id": "vocab-bolletta",
    "kind": "vocab",
    "order": 340,
    "category": "noun",
    "english": "utility bill",
    "italian": "bolletta",
    "article": "la",
    "gender": "feminine",
    "plural": "bollette",
    "activeRecall": {
      "family": "Home and renting",
      "detail": "Utility / household bill"
    },
    "examples": [
      "La bolletta è intestata a mio nome."
    ]
  },
  {
    "id": "vocab-affitto",
    "kind": "vocab",
    "order": 350,
    "category": "noun",
    "english": "rent",
    "italian": "affitto",
    "article": "l'",
    "gender": "masculine",
    "plural": "affitti",
    "activeRecall": {
      "family": "Home and renting",
      "detail": "Rent payment"
    },
    "examples": [
      "Pago l'affitto ogni mese."
    ]
  },
  {
    "id": "vocab-veloce",
    "kind": "vocab",
    "order": 360,
    "category": "adjective",
    "english": "fast / quick",
    "italian": "veloce",
    "examples": [
      "Il treno è veloce."
    ]
  },
  {
    "id": "vocab-presto",
    "kind": "vocab",
    "order": 370,
    "category": "adverb",
    "english": "early / soon",
    "italian": "presto",
    "examples": [
      "Devo partire presto."
    ]
  },
  {
    "id": "phrase-avere-bisogno",
    "kind": "vocab",
    "order": 380,
    "category": "expression",
    "english": "to need",
    "italian": "avere bisogno di",
    "examples": [
      "Ho bisogno di aiuto."
    ]
  },
  {
    "id": "phrase-non-fa-niente",
    "kind": "vocab",
    "order": 390,
    "category": "expression",
    "english": "it doesn't matter / no problem",
    "italian": "non fa niente",
    "examples": [
      "Non fa niente, possiamo farlo domani."
    ]
  },
  {
    "id": "phrase-secondo-me",
    "kind": "vocab",
    "order": 400,
    "category": "expression",
    "english": "in my opinion / I think",
    "italian": "secondo me",
    "notes": [
      { "label": "Pattern", "value": "secondo + person · secondo me / secondo te" }
    ],
    "examples": [
      "Secondo me, questo libro è interessante."
    ]
  },
  {
    "id": "verb-spegnere",
    "kind": "verb",
    "order": 410,
    "english": "turn off / switch off",
    "italian": "spegnere",
    "activeRecall": {
      "family": "On / off",
      "detail": "OFF · luce / TV"
    },
    "notes": [
      { "label": "Use with", "value": "spegnere la luce · spegnere il computer" }
    ],
    "tenses": {
      "presente": {
        "label": "Present",
        "forms": {
          "io": "spengo",
          "tu": "spegni",
          "luiLei": "spegne",
          "noi": "spegniamo",
          "voi": "spegnete",
          "loro": "spengono"
        },
        "examples": [
          "Spengo la luce prima di dormire."
        ]
      },
      "passato_prossimo": {
        "label": "Passato prossimo",
        "forms": {
          "io": "ho spento",
          "tu": "hai spento",
          "luiLei": "ha spento",
          "noi": "abbiamo spento",
          "voi": "avete spento",
          "loro": "hanno spento"
        },
        "notes": [
          { "label": "Past participle", "value": "spegnere → spento · auxiliary: avere" }
        ],
        "examples": [
          "Ho spento il computer."
        ]
      },
      "futuro_semplice": {
        "label": "Future",
        "forms": {
          "io": "spegnerò",
          "tu": "spegnerai",
          "luiLei": "spegnerà",
          "noi": "spegneremo",
          "voi": "spegnerete",
          "loro": "spegneranno"
        },
        "examples": [
          "Spegnerò la TV prima di uscire."
        ]
      }
    }
  },
  {
    "id": "verb-accendere",
    "kind": "verb",
    "order": 420,
    "english": "turn on / switch on",
    "italian": "accendere",
    "activeRecall": {
      "family": "On / off",
      "detail": "ON · luce / TV"
    },
    "notes": [
      { "label": "Use with", "value": "accendere la luce · accendere il computer" }
    ],
    "tenses": {
      "presente": {
        "label": "Present",
        "forms": {
          "io": "accendo",
          "tu": "accendi",
          "luiLei": "accende",
          "noi": "accendiamo",
          "voi": "accendete",
          "loro": "accendono"
        },
        "examples": [
          "Accendo la luce."
        ]
      },
      "passato_prossimo": {
        "label": "Passato prossimo",
        "forms": {
          "io": "ho acceso",
          "tu": "hai acceso",
          "luiLei": "ha acceso",
          "noi": "abbiamo acceso",
          "voi": "avete acceso",
          "loro": "hanno acceso"
        },
        "notes": [
          { "label": "Past participle", "value": "accendere → acceso · auxiliary: avere" }
        ],
        "examples": [
          "Ho acceso il computer."
        ]
      },
      "futuro_semplice": {
        "label": "Future",
        "forms": {
          "io": "accenderò",
          "tu": "accenderai",
          "luiLei": "accenderà",
          "noi": "accenderemo",
          "voi": "accenderete",
          "loro": "accenderanno"
        },
        "examples": [
          "Accenderò la TV dopo cena."
        ]
      }
    }
  },
  {
    "id": "vocab-colazione",
    "kind": "vocab",
    "order": 430,
    "category": "noun",
    "english": "breakfast",
    "italian": "colazione",
    "article": "la",
    "gender": "feminine",
    "plural": "colazioni",
    "activeRecall": {
      "family": "Breakfast",
      "detail": "Noun · the meal"
    },
    "notes": [
      { "label": "Noun ↔ expression", "value": "la colazione ↔ fare colazione" }
    ],
    "examples": [
      "La colazione è pronta."
    ]
  },
  {
    "id": "phrase-fare-colazione",
    "kind": "vocab",
    "order": 440,
    "category": "expression",
    "english": "have breakfast",
    "italian": "fare colazione",
    "activeRecall": {
      "family": "Breakfast",
      "detail": "Action · fare + colazione"
    },
    "notes": [
      { "label": "Noun ↔ expression", "value": "la colazione ↔ fare colazione" },
      { "label": "Verb", "value": "fare → faccio · ho fatto · farò" }
    ],
    "examples": [
      "Faccio colazione alle otto.",
      "Ho fatto colazione al bar.",
      "Farò colazione a casa."
    ]
  },
  {
    "id": "vocab-pranzo",
    "kind": "vocab",
    "order": 450,
    "category": "noun",
    "english": "lunch",
    "italian": "pranzo",
    "article": "il",
    "gender": "masculine",
    "plural": "pranzi",
    "activeRecall": {
      "family": "Lunch",
      "detail": "Noun · the meal"
    },
    "notes": [
      { "label": "Noun ↔ verb", "value": "il pranzo ↔ pranzare" }
    ],
    "examples": [
      "Il pranzo è pronto."
    ]
  },
  {
    "id": "verb-pranzare",
    "kind": "verb",
    "order": 460,
    "english": "have lunch / eat lunch",
    "italian": "pranzare",
    "activeRecall": {
      "family": "Lunch",
      "detail": "Verb · have lunch"
    },
    "notes": [
      { "label": "Noun ↔ verb", "value": "il pranzo ↔ pranzare" }
    ],
    "tenses": {
      "presente": {
        "label": "Present",
        "forms": {
          "io": "pranzo",
          "tu": "pranzi",
          "luiLei": "pranza",
          "noi": "pranziamo",
          "voi": "pranzate",
          "loro": "pranzano"
        },
        "examples": [
          "Pranzo a mezzogiorno."
        ]
      },
      "passato_prossimo": {
        "label": "Passato prossimo",
        "forms": {
          "io": "ho pranzato",
          "tu": "hai pranzato",
          "luiLei": "ha pranzato",
          "noi": "abbiamo pranzato",
          "voi": "avete pranzato",
          "loro": "hanno pranzato"
        },
        "examples": [
          "Ho pranzato con un amico."
        ]
      },
      "futuro_semplice": {
        "label": "Future",
        "forms": {
          "io": "pranzerò",
          "tu": "pranzerai",
          "luiLei": "pranzerà",
          "noi": "pranzeremo",
          "voi": "pranzerete",
          "loro": "pranzeranno"
        },
        "examples": [
          "Pranzerò a casa."
        ]
      }
    }
  },
  {
    "id": "vocab-cena",
    "kind": "vocab",
    "order": 470,
    "category": "noun",
    "english": "dinner",
    "italian": "cena",
    "article": "la",
    "gender": "feminine",
    "plural": "cene",
    "activeRecall": {
      "family": "Dinner",
      "detail": "Noun · the meal"
    },
    "notes": [
      { "label": "Noun ↔ verb", "value": "la cena ↔ cenare" }
    ],
    "examples": [
      "La cena è pronta."
    ]
  },
  {
    "id": "verb-cenare",
    "kind": "verb",
    "order": 480,
    "english": "have dinner / eat dinner",
    "italian": "cenare",
    "activeRecall": {
      "family": "Dinner",
      "detail": "Verb · have dinner"
    },
    "notes": [
      { "label": "Noun ↔ verb", "value": "la cena ↔ cenare" }
    ],
    "tenses": {
      "presente": {
        "label": "Present",
        "forms": {
          "io": "ceno",
          "tu": "ceni",
          "luiLei": "cena",
          "noi": "ceniamo",
          "voi": "cenate",
          "loro": "cenano"
        },
        "examples": [
          "Ceno alle otto."
        ]
      },
      "passato_prossimo": {
        "label": "Passato prossimo",
        "forms": {
          "io": "ho cenato",
          "tu": "hai cenato",
          "luiLei": "ha cenato",
          "noi": "abbiamo cenato",
          "voi": "avete cenato",
          "loro": "hanno cenato"
        },
        "examples": [
          "Ho cenato al ristorante."
        ]
      },
      "futuro_semplice": {
        "label": "Future",
        "forms": {
          "io": "cenerò",
          "tu": "cenerai",
          "luiLei": "cenerà",
          "noi": "ceneremo",
          "voi": "cenerete",
          "loro": "ceneranno"
        },
        "examples": [
          "Cenerò con gli amici."
        ]
      }
    }
  }
];

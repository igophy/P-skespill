// Sakens innhold. Se CONTENT.md før du endrer ID-er, avhør eller løsning.
window.FJELLRO = {
  "meta": {
    "id": "fjellro-001",
    "revision": 1,
    "title": "Den siste påsken på Fjellro.",
    "brand": "FJELLRO",
    "subtitle": "ET PÅSKEKRIMMYSTERIUM",
    "timeLabel": "LANGFREDAG · 21:30",
    "sceneLabel": "FJELLRO · LANGFREDAG",
    "heroLines": [
      "Den siste påsken",
      "på Fjellro."
    ],
    "heroDescription": "En snøstorm. Fire mistenkte. Én løgn for mye.\nArvid Berg er funnet død. Morderen er fortsatt her.",
    "caseLabel": "SAK 001",
    "duration": "15–25 MIN · SPILL ALENE ELLER SOM LAG",
    "heroAsset": "hotel",
    "heroAlt": "Fjellro høyfjellshotell i snøstormen",
    "firstRoomId": "library",
    "victimName": "Arvid Berg"
  },
  "clues": [
    {
      "id": "cup",
      "icon": "cup",
      "title": "Den siste koppen",
      "location": "BIBLIOTEKET",
      "text": "En halvfull tekopp på skrivebordet.",
      "detail": "Arvids kopp lukter svakt bittert. I søppelbøtten ligger en åpnet pose «Kveldsro» og en revet sukkerpose. I Arvids notatbok står det: «Legens ordre: ingen sukker.» En foreløpig analyse fra hotellets førstehjelpsutstyr viser et giftig planteekstrakt i sukkerrestene. Teen i kannen inneholder ikke gift."
    },
    {
      "id": "receipt",
      "icon": "receipt",
      "title": "Kjøkkenets kvittering",
      "location": "KJØKKENET",
      "text": "En liten utskrift, gjemt under en skål.",
      "detail": "Kl. 20:55: «1 kanne Kveldsro, 1 kopp. Til biblioteket. Hentes av gjest.» Kokken husker at Liv hentet brettet selv. Sukkerposene på kjøkkenet er hvite. Den revne posen ved Arvids kopp er blå."
    },
    {
      "id": "photo",
      "icon": "photo",
      "title": "Bildet fra påskequizen",
      "location": "SPISESALEN",
      "text": "Et gruppebilde med en viktig detalj.",
      "detail": "Et bilde tatt kl. 20:50 viser Liv med en blå sukkerpose ved kaffekoppen. På hennes stol henger en grønn jakke. Et annet bilde, kl. 21:05, viser Sander ved quizmikrofonen og Maja ved poengtavlen. Livs stol er tom. Liv er tilbake på et bilde fra kl. 21:15."
    },
    {
      "id": "letter",
      "icon": "letter",
      "title": "Et uåpnet brev",
      "location": "SKRIVEBORDET",
      "text": "Arvid skulle møte advokaten etter påske.",
      "detail": "Et utkast til et brev datert langfredag: «Liv. Jeg har funnet overføringene fra hotellets konto til ditt firma. 480 000 kroner. Hvis pengene ikke er tilbake tirsdag, går jeg til politiet.» Brevet ligger ved siden av Arvids avtalebok: «21:00 – Liv, biblioteket.»"
    },
    {
      "id": "door",
      "icon": "door",
      "title": "Kortleserens logg",
      "location": "BIBLIOTEKDØREN",
      "text": "Døren registrerer mer enn folk tror.",
      "detail": "Bibliotekets dør låses automatisk. Loggen viser: 20:42 – Arvids kort. 21:02 – gjestekort 04. Ingen andre kort er brukt før Maja åpner med hovedkortet kl. 21:28 og finner Arvid. Resepsjonens kortliste: 01 Maja (hovedkort), 02 Sander, 03 Henrik, 04 Liv. Ingen åpne vinduer eller andre innganger."
    },
    {
      "id": "clock",
      "icon": "clock",
      "title": "Arvids smartklokke",
      "location": "VED LENESTOLEN",
      "text": "Den siste registrerte pulsen.",
      "detail": "Klokken viser normal puls til kl. 21:08, deretter brå forverring. Siste puls registreres kl. 21:12. Plantegiften virker etter 5–10 minutter. Hendelsen passer med at Arvid drakk forgiftet te kort etter møtet kl. 21:02. Klokken viser ingen fall eller fysisk kamp."
    }
  ],
  "people": [
    {
      "id": "liv",
      "name": "Liv Berg",
      "role": "Søsteren · økonomiansvarlig",
      "icon": "LB",
      "intro": "«Vi krangler, som søsken gjør. Det betyr ingenting.»",
      "qa": [
        [
          "Hvor var du klokken ni?",
          "Jeg var med på quizen hele kvelden. Sander kan sikkert bekrefte det."
        ],
        [
          "Hvem bar teen til Arvid?",
          "Jeg hentet den klokken fem på ni. Satte den utenfor biblioteket og gikk rett tilbake. Jeg gikk aldri inn."
        ],
        [
          "Hva vet du om hotellets økonomi?",
          "Arvid tok alle avgjørelser. Jeg førte bare regnskapet. Han hadde ingen grunn til å anklage meg."
        ]
      ],
      "portrait": "liv",
      "suspect": true
    },
    {
      "id": "sander",
      "name": "Sander Vik",
      "role": "Turlederen · quizvert",
      "icon": "SV",
      "intro": "«Alle så meg. Jeg hadde jo mikrofonen.»",
      "qa": [
        [
          "Hvor var du klokken ni?",
          "Jeg ledet quizen fra 20:45 til 21:20. Flere tok bilder underveis. Maja holdt styr på poengene."
        ],
        [
          "Var Liv der hele tiden?",
          "Nei. Hun gikk før andre runde, litt før ni, og kom tilbake rundt kvart over. Jeg antok hun var på toalettet."
        ],
        [
          "Hadde du noe imot Arvid?",
          "Han ville si opp avtalen min. Jeg var sint, men jeg hadde allerede fått jobb på nabohotellet."
        ]
      ],
      "portrait": "sander",
      "suspect": true
    },
    {
      "id": "maja",
      "name": "Maja Strand",
      "role": "Resepsjonisten · fant avdøde",
      "icon": "MS",
      "intro": "«Han pleide alltid å svare når jeg banket.»",
      "qa": [
        [
          "Hvor var du klokken ni?",
          "Jeg hjalp Sander med quizen. Da den var ferdig, ryddet jeg og gikk til biblioteket 21:28. Arvid svarte ikke, så jeg brukte hovedkortet."
        ],
        [
          "Hva vet du om nøkkelkortene?",
          "Alle fikk ett personlig kort. Ingen meldte et kort mistet. Liv ba meg aktivere bibliotektilgang på sitt kort klokken 20:30 fordi Arvid ville snakke med henne."
        ],
        [
          "Hvorfor skulle Arvid snakke med Liv?",
          "Han virket sint og sa at regnskapet ikke stemte. Jeg vet ikke mer."
        ]
      ],
      "portrait": "maja",
      "suspect": true
    },
    {
      "id": "henrik",
      "name": "Henrik Dahl",
      "role": "Kokken · laget teen",
      "icon": "HD",
      "intro": "«Jeg vet hva som var i den kannen.»",
      "qa": [
        [
          "Hvor var du klokken ni?",
          "På videosamtale med datteren min fra 20:58 til 21:18, ved kjøkkenbenken. Telefonloggen viser varigheten."
        ],
        [
          "Hvordan ble teen laget?",
          "Kveldsro, som vanlig. Jeg smakte fra kannen før servering. Liv hentet brettet. Arvid brukte aldri sukker, så jeg la ikke ved noe."
        ],
        [
          "Hvem hadde tilgang til plantegift?",
          "Det gamle herbariumskapet i gangen er ulåst. Alle kunne ta noe derfra. Arvid ville stenge kjøkkenet mitt etter sesongen, men vi hadde avtalt sluttpakke."
        ]
      ],
      "portrait": "henrik",
      "suspect": true
    }
  ],
  "rooms": [
    {
      "id": "library",
      "name": "Biblioteket",
      "description": "Her sluttet Arvids siste kveld.",
      "sub": "ÅSTEDET",
      "clues": [
        "cup",
        "letter",
        "door",
        "clock"
      ],
      "spots": {
        "cup": [
          29.9,
          69.7
        ],
        "letter": [
          47.5,
          73.9
        ],
        "door": [
          19.2,
          49.7
        ],
        "clock": [
          85.1,
          71
        ]
      },
      "asset": "library"
    },
    {
      "id": "kitchen",
      "name": "Kjøkkenet",
      "description": "Teen begynte sin reise her.",
      "sub": "FØLG SPORENE",
      "clues": [
        "receipt"
      ],
      "spots": {
        "receipt": [
          49.4,
          69.4
        ]
      },
      "asset": "kitchen"
    },
    {
      "id": "dining",
      "name": "Spisesalen",
      "description": "En quiz. Et bilde. Et alibi.",
      "sub": "SAMMENHOLD ALIBIENE",
      "clues": [
        "photo"
      ],
      "spots": {
        "photo": [
          37.7,
          76.4
        ]
      },
      "asset": "dining"
    }
  ],
  "deductions": [
    {
      "id": "alibi",
      "pair": [
        "door",
        "photo"
      ],
      "title": "Et alibi som sprekker",
      "text": "Kort 04 åpner biblioteket mens Livs stol i spisesalen er tom. Begge spor motsier forklaringen om at hun var på quizen hele tiden."
    },
    {
      "id": "poison",
      "pair": [
        "cup",
        "receipt"
      ],
      "title": "Giften kom etter kjøkkenet",
      "text": "Teen i kannen var ren. Kjøkkenet bruker hvite sukkerposer, mens posen ved koppen er blå. Giften ble tilsatt ved serveringen."
    },
    {
      "id": "motive",
      "pair": [
        "letter",
        "door"
      ],
      "title": "Et møte med et motiv",
      "text": "Arvid ville anmelde Liv for underslag. Han avtalte et møte klokken ni, og kortet hennes åpner døren kl. 21:02."
    }
  ],
  "hints": [
    "Tidspunktet er avgjørende. Sammenhold bildet fra quizen med forklaringene om hvem som var i spisesalen.",
    "Den som laget teen trenger ikke å ha forgiftet den. Hva ble tilsatt etter at kannen forlot kjøkkenet?",
    "Gjestekort 04 åpnet biblioteket kl. 21:02. Sammenhold kortlisten, den blå sukkerposen og brevet på skrivebordet."
  ],
  "confrontation": {
    "personId": "liv",
    "requiresClues": [
      "door",
      "photo"
    ],
    "requiresQuestions": [
      "liv0",
      "liv1"
    ],
    "question": "Kortloggen og bildene motsier deg. Hva skjedde egentlig?",
    "answer": "Greit. Jeg gikk inn i biblioteket. Arvid ville snakke om pengene. Jeg var ute igjen noen minutter senere. Men det betyr ikke at jeg drepte ham."
  },
  "methods": [
    [
      "tea",
      "Gift i tekannen",
      "Tilsatt på kjøkkenet",
      "cup"
    ],
    [
      "sugar",
      "Gift i en sukkerpose",
      "Tilsatt ved servering",
      "receipt"
    ],
    [
      "force",
      "Et fysisk angrep",
      "Under møtet i biblioteket",
      "heart"
    ]
  ],
  "motives": [
    [
      "job",
      "Mistet jobben",
      "Hevn etter en oppsigelse",
      "file"
    ],
    [
      "money",
      "Skjule underslag",
      "Unngå en politianmeldelse",
      "money"
    ],
    [
      "inherit",
      "Arve hotellet",
      "Overta Arvids eiendom",
      "home"
    ]
  ],
  "solution": {
    "personId": "liv",
    "methodId": "sugar",
    "motiveId": "money"
  },
  "timeline": {
    "base": [
      [
        "20:45",
        "Påskequizen begynner",
        "Sander leder quizen i spisesalen."
      ],
      [
        "21:28",
        "Arvid blir funnet",
        "Maja åpner biblioteket med hovedkortet."
      ],
      [
        "21:30",
        "Etterforskningen begynner",
        "Politiet er varslet, men snøstormen stenger veien."
      ]
    ],
    "discoveries": [
      {
        "clueId": "receipt",
        "event": [
          "20:55",
          "Liv henter teen",
          "Kjøkkenets kvittering registrerer brettet til biblioteket."
        ]
      },
      {
        "clueId": "door",
        "event": [
          "21:02",
          "Gjestekort 04 brukes",
          "Livs kort åpner biblioteket."
        ]
      },
      {
        "clueId": "photo",
        "event": [
          "21:05",
          "En tom stol",
          "Bildet viser Sander og Maja på quizen. Livs stol er tom."
        ]
      },
      {
        "clueId": "clock",
        "event": [
          "21:12",
          "Siste registrerte puls",
          "Arvids smartklokke registrerer siste puls."
        ]
      }
    ]
  },
  "intro": [
    {
      "title": "Hotellet er isolert.",
      "text": "Jeg fant Arvid i biblioteket. Han svarte ikke da jeg banket. Politiet sier de ikke kommer frem før stormen løyer. Kan du finne ut hva som skjedde?",
      "label": "Maja · resepsjonist",
      "portrait": "maja"
    },
    {
      "title": "Ingen kan forlate Fjellro.",
      "text": "Begynn i biblioteket. Undersøk sporene, besøk de andre rommene og avhør gjestene. Svarene deres lagres i saksmappen.",
      "label": "DITT OPPDRAG",
      "portrait": null
    },
    {
      "title": "Du trenger en forklaring.",
      "text": "Knytt bevisene sammen på tavlen. Når du er klar, velger du gjerningsperson, metode og motiv. Du kan alltid gå tilbake og lete videre.",
      "label": "SLIK LØSER DU SAKEN",
      "portrait": null
    }
  ],
  "verdictSteps": [
    [
      "GJERNINGSPERSON",
      "Hvem tok livet av Arvid?",
      "Velg den personen du mener bevisene peker mot."
    ],
    [
      "METODE",
      "Hvordan ble drapet utført?",
      "Se etter detaljen som forklarer hvordan giften kom frem."
    ],
    [
      "MOTIV",
      "Hvorfor måtte Arvid dø?",
      "Velg motivet som støttes av funnene dine."
    ],
    [
      "DIN KONKLUSJON",
      "Holder teorien din?",
      "Se gjennom valgene før du leverer forklaringen."
    ]
  ],
  "verdictFeedback": "Ikke alle sporene støtter denne forklaringen. Undersøk alibiene, sukkerposen og brevet igjen. Saken er fortsatt åpen.",
  "ending": {
    "title": "Snøen skjulte ikke sannheten.",
    "subtitle": "Du har løst mysteriet på Fjellro.",
    "paragraphs": [
      "Liv drepte Arvid for å skjule underslaget på 480 000 kroner. Hun hentet ufarlig te på kjøkkenet, åpnet biblioteket med kort 04 kl. 21:02 og tilsatte plantegift fra en blå sukkerpose.",
      "Arvid brukte aldri sukker. Restene i koppen viser derfor en bevisst tilsetning. Liv hevdet at hun aldri gikk inn, men kortloggen avslører henne. Bildene og Sanders forklaring motbeviser quizalibiet. Brevet viser motivet: Arvid skulle gå til politiet.",
      "Smartklokken plasserer dødsfallet få minutter etter besøket. Teen i kannen var ren, og sporene støtter de øvrige mistenktes forklaringer."
    ],
    "epilogue": "Da brøytebilen når Fjellro neste morgen, ligger saksmappen klar. Liv har ingen flere forklaringer. Utenfor bryter påskesolen gjennom skyene."
  }
};

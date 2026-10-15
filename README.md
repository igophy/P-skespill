# Fjellro – et påskekrimmysterium

Et norsk detektivspill med mobilappfølelse. En snøstorm isolerer Fjellro høyfjellshotell. Hotelleier Arvid Berg er funnet død, og morderen er fortsatt på hotellet.

**Spill på nett:** https://igophy.github.io/P-skespill/

Spillet tar cirka 15–25 minutter, alene eller som et lag. Inneholder et fiktivt drap uten grafiske beskrivelser.

## Spillet

- Kompakt saksstart og en tydelig knapp som fører direkte til neste rom eller person.
- Tre illustrerte rom med trykkbare spor og animert undersøkelse.
- Fire mistenkte med samtalebobler og neste spørsmål fast nederst. Andre spørsmål velges fra en egen liste. Nye bevis åpner en ekstra konfrontasjon.
- Bevis åpnes direkte ved trykk. Kobling av to spor skjer i en egen visning med tydelig valgstatus.
- Tidslinje, avhørsnotater og egne notater.
- Anklage i fire steg: person, metode, motiv og gjennomgang.
- Tre hint, poeng ved løsning og en epilog.
- Fast bunnmeny med direkte tilgang til rom, avhør, bevis og løsning. Viktige knapper er synlige mens lengre tekst skrolles for seg.

Fremdriften lagres lokalt i nettleseren. Lagrede spill fra den første versjonen videreføres. Det finnes ett fast mysterium: «Start på nytt» tømmer notatene og funnene, men endrer ikke løsningen.

## På hjemskjermen

Åpne spillets nettadresse på mobilen.

- **iPhone/iPad:** Åpne i Safari, trykk Del og velg **Legg til på Hjem-skjerm**.
- **Android:** Velg **Installer app** eller **Legg til på startsiden** i Chrome-menyen.

Dette er en installerbar nettapp (PWA). Den åpnes uten nettleserens vanlige navigasjon etter installasjon. Etter første vellykkede nettbesøk er spillet tilgjengelig uten nett i nettlesere som støtter service workers. Første nedlasting og appinstallasjon trenger nett. Ved en oppdatering lastes spillet inn på nytt når den nye versjonen er klar. Lagrede spor, svar og notater tas med videre så lenge saken har samme innholdsrevisjon.

## Kjør lokalt

Ingen bygging eller pakkeinstallasjon er nødvendig. Kjør fra repoets rot:

```sh
python3 -m http.server 8000
```

Åpne http://localhost:8000. `index.html` kan også åpnes direkte som fil, men appinstallasjon og offline-lagring krever HTTPS eller localhost.

## GitHub Pages

Repoet er klart for **Settings → Pages → Deploy from a branch → main → / (root)**. GitHub Pages publiserer HTML, CSS, JavaScript og illustrasjonene som de er.

## Designinspirasjon

Samspillet mellom rom, bevis og avhør er inspirert av etablerte mobilspill:

- [Duskwood – Everbytes offisielle pressepakke](https://everbytestudio.com/Press/sheet.php?p=duskwood): messengerbasert etterforskning og karakterprofiler.
- [An Elmwood Trail – Techyonic](https://techyonic.itch.io/an-elmwood-trail): chatsamtaler, mistenkttavle og hint.
- [Criminal Case – offisiell App Store-side](https://apps.apple.com/us/app/criminal-case-hidden-objects/id767473889): undersøk åsted, analyser bevis, avhør og anklag.

Historien, grafikken og grensesnittet i Fjellro er originale. Det brukes ingen innholdsfiler fra disse spillene.

## Endre historie, personer og løsning senere

Alt saksinnhold er samlet i [game-data.js](game-data.js): historien, karakterene, hvilke personer som er mistenkte, avhør, spor, hint, konfrontasjon, løsning og oppklaring. Spillmotoren bruker konfigurasjonen uten egne regler for bestemte personnavn eller en bestemt gjerningsperson.

Se [CONTENT.md](CONTENT.md) for en norsk redigeringsveiledning. Antall personer, mistenkte, spørsmål, spor og forbindelser beregnes fra dataene. En person kan være et vitne som avhøres uten å være et mulig valg i anklagen (`suspect: false`). Endringer som gjør tidligere funn ugyldige får en ny `meta.revision`.

Kontroller innholdet fra repoets rot:

```sh
node prepare-release.mjs
```

Kommandoen validerer referanser, romplasseringer, alternativer i løsningen og illustrasjoner, og oppdaterer offline-versjonen automatisk. Publiser den oppdaterte `sw.js` sammen med innholdet, slik at eksisterende installasjoner mottar endringene. Historielogikken må også gjennomspilles.

## Teknisk og kontroll

Vanlig HTML, CSS og JavaScript med separate skjermer og hashbasert navigasjon. Ingen eksterne biblioteker, skrifter, server eller database kreves. Lyden er av som standard. Redusert bevegelse følger enhetens innstillinger.

Playwright/Chromium-kontroll sjekker at meny og primærknapper er synlige **før** automatisk skrolling ved 320×568, 390×844 og 1366×900. En full spillrunde er kontrollert med alle spor, svar, konfrontasjon, beviskoblinger og løsning. I tillegg er gammel fremdrift, innholdsrevisjon, alternativ historie med andre mistenkte og en annen løsning, samt offline-bruk kontrollert. Native appinstallasjon på fysiske telefoner er ikke testet.

# Fjellro – et påskekrimmysterium

Et norsk detektivspill med mobilappfølelse. En snøstorm isolerer Fjellro høyfjellshotell. Hotelleier Arvid Berg er funnet død, og morderen er fortsatt på hotellet.

**Spill på nett:** https://igophy.github.io/P-skespill/

Spillet tar cirka 15–25 minutter, alene eller som et lag. Inneholder et fiktivt drap uten grafiske beskrivelser.

## Spillet

- Egen saksstart og en kort introduksjon til oppdraget.
- Tre illustrerte rom med trykkbare spor og animert undersøkelse.
- Fire mistenkte med samtalebobler og spørsmål som valgknapper. Nye bevis åpner en ekstra konfrontasjon.
- En bevistavle der to spor kobles sammen til en konklusjon.
- Tidslinje, avhørsnotater og egne notater.
- Anklage i fire steg: person, metode, motiv og gjennomgang.
- Tre hint, poeng ved løsning og en epilog.
- Fast bunnmeny, sideoverganger, animasjoner, valgfri stemningslyd og originale illustrasjoner.

Fremdriften lagres lokalt i nettleseren. Lagrede spill fra den første versjonen videreføres. Det finnes ett fast mysterium: «Start på nytt» tømmer notatene og funnene, men endrer ikke løsningen.

## På hjemskjermen

Åpne spillets nettadresse på mobilen.

- **iPhone/iPad:** Åpne i Safari, trykk Del og velg **Legg til på Hjem-skjerm**.
- **Android:** Velg **Installer app** eller **Legg til på startsiden** i Chrome-menyen.

Dette er en installerbar nettapp (PWA). Den åpnes uten nettleserens vanlige navigasjon etter installasjon. Etter første vellykkede nettbesøk er spillet tilgjengelig uten nett i nettlesere som støtter service workers. Første nedlasting og appinstallasjon trenger nett. Lukk gamle spillfaner og åpne appen igjen etter en ny versjon for å aktivere oppdateringen.

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

## Teknisk og kontroll

Vanlig HTML, CSS og JavaScript med separate skjermer og hashbasert navigasjon. Ingen eksterne biblioteker, eksterne skrifter, server eller database kreves. SVG-illustrasjoner, ikoner og lyden er inkludert eller genereres lokalt. Lyd er av som standard. Redusert bevegelse følger enhetens innstillinger.

Kontrollert med Playwright/Chromium: en full spillrunde med alle spor og spørsmål, konfrontasjon, beviskoblinger, feil og riktig anklage, poeng, notater, nullstilling, videreføring av gamle spill, blokkert lokal lagring, redusert bevegelse og offline-bruk. Skjermbredder fra 320 til 1366 piksler er kontrollert. Native appinstallasjon på fysisk iPhone og Android er ikke testet.

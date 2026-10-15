# Endre innholdet i påskekrimspillet

Hele saken ligger i [game-data.js](game-data.js), i objektet `window.FJELLRO`. Her redigerer du historien, karakterene, sporene, de mistenkte og løsningen. Spillmotoren i `app.js` bruker disse dataene. Det er ingen byggeprosess for å redigere teksten.

Ta gjerne en kopi av `game-data.js` før en større omskriving. La filen fortsatt begynne med `window.FJELLRO = {` og slutte med `};`. Bruk anførselstegn rundt tekst, komma mellom feltene og `\n` for linjeskift i en tekststreng.

## Tekst og karakterer

- `meta`: saks-ID, revisjon, tittel, merke, undertittel, tids- og stedsmerking, forsidetekst, bakgrunnsbilde og første rom. `heroLines` gir de to tittellinjene. `victimName` beskriver offeret.
- `people`: karakterenes `name`, `role`, åpningsreplikk (`intro`), portrett og avhør. Hvert element i `qa` er `["Spørsmål", "Svar"]`.
- `clues`: sporets tittel, sted, korte beskrivelse (`text`) og innholdet etter undersøkelse (`detail`).
- `rooms`: navn, rombeskrivelse, liten overskrift (`sub`), illustrasjon og hvilke spor som finnes i rommet.
- `intro`: introduksjonens sider, med `title`, `text`, `label` og valgfritt `portrait`. Bruk `null` når siden ikke skal ha portrett.
- `timeline`: `base` vises fra starten. Hver post i `discoveries` vises etter at spilleren har funnet det angitte `clueId`. En hendelse har formen `["21:02", "Overskrift", "Beskrivelse"]`.
- `deductions`: forbindelser mellom to spor, med `pair`, `title` og `text`.
- `hints`: hint i den rekkefølgen spilleren får dem.
- `verdictSteps` og `verdictFeedback`: tekster i anklagen og ved feil forklaring.
- `ending`: sluttittel, undertittel, forklarende avsnitt og epilog.

Navn og fritekst kan endres direkte. Et nytt navn må også oppdateres i alle replikkene, sporene, tidslinjen, hintene og oppklaringen der den gamle personen er nevnt. Tekstene kobles ikke automatisk til personnavn.

## Velg hvem som er mistenkt

Hver person har et eksplisitt flagg:

```js
"suspect": true
```

`true` gjør personen valgbart som gjerningsperson. `false` beholder personen som en karakter som kan avhøres, men fjerner personen fra anklagens personvalg. En skyldig person må ha `suspect: true`.

`portrait` er illustrasjonens filnavn uten `.svg`, for eksempel `"liv"` for `assets/liv.svg`. Du kan gi personen et nytt navn uten å bytte ID eller illustrasjon. For nye illustrasjoner legger du den tilsvarende SVG-filen i `assets/`. Publiseringskommandoen nedenfor tar automatisk nye filer med i offline-ressursene.

## Bytt gjerningsperson, metode eller motiv

Løsningen står samlet ett sted:

```js
"solution": {
  "personId": "liv",
  "methodId": "sugar",
  "motiveId": "money"
}
```

`personId` må finnes i `people`, `methodId` må være første felt i et alternativ i `methods`, og `motiveId` må være første felt i et alternativ i `motives`. Alternativene har formen `["id", "Tittel", "Kort beskrivelse", "ikon"]`.

Når du endrer løsningen, må du også skrive om bevisene som underbygger den: spor, avhør, alibier, forbindelser, konfrontasjon, tidslinje, hint og sluttforklaring. Å bytte `solution` endrer hva spillet godtar som riktig svar; det skriver ikke om resten av historien.

## Konfrontasjonen

`confrontation` styrer hvem som kan konfronteres, og når det ekstra spørsmålet blir tilgjengelig:

```js
"personId": "liv",
"requiresClues": ["door", "photo"],
"requiresQuestions": ["liv0", "liv1"],
"question": "Spørsmålet som stilles",
"answer": "Personens nye forklaring"
```

Alle oppførte spor må være funnet og alle oppførte spørsmål må være stilt. Spørsmåls-ID består av personens ID og spørsmålets posisjon fra null: `liv0` er Livs første spørsmål, `liv1` er det andre. Oppdater kravene hvis spørsmål legges til eller bytter rekkefølge.

## Plasser spor i rommene

Et rom lister sine spor i `clues`. `spots` gir hvert spor en plassering i prosent på illustrasjonen, fra venstre og fra toppen:

```js
"clues": ["cup", "letter"],
"spots": {
  "cup": [29.9, 69.7],
  "letter": [47.5, 73.9]
}
```

Hvert spor skal ha en plassering og høre til nøyaktig ett rom. Rommets `asset` viser til illustrasjonens filnavn uten `.svg`. `meta.firstRoomId` må vise til et eksisterende rom.

Sporenes `icon` er navnet på et ikon i spillmotoren. Tilgjengelige ikoner omfatter `cup`, `receipt`, `photo`, `letter`, `door`, `clock`, `book`, `money`, `heart`, `search`, `file`, `home` og `chat`.

## Behold stabile ID-er

Feltet `id` brukes til koblinger, navigasjon og lagring. Behold ID-en når du bare endrer et navn eller en tekst. Liv kan for eksempel hete noe helt annet og fortsatt bruke `"id": "liv"`. Det gjør referansene enklere å vedlikeholde.

Hvis en ID likevel endres, oppdater alle referansene til den:

- Personer: `solution.personId`, `confrontation.personId`, `requiresQuestions` og portrettreferanser som faktisk skal endres.
- Spor: rommenes `clues` og `spots`, `deductions[].pair`, `confrontation.requiresClues` og `timeline.discoveries[].clueId`.
- Rom: `meta.firstRoomId`; behold et eget `asset` hvis samme illustrasjon skal brukes.
- Metoder og motiver: de tilsvarende ID-ene i `solution`.

Spørsmåls-ID-ene må være unike når person-ID og spørsmålsnummer kombineres. Bruk korte, unike ID-er med små bokstaver, tall og bindestrek. Behold `qa` som lister med spørsmål og svar.

## Revisjon, lagring og kontroll

Øk `meta.revision` med ett ved endringer som gjør tidligere funn eller svar ugyldige, for eksempel ny gjerningsperson, omskrevne bevis, endrede ID-er eller omstokking av spørsmål. En ny revisjon starter en ny sak på enheten og gjenbruker ikke den gamle fremdriften. Små rettelser i språk trenger vanligvis ingen ny revisjon. Bruk en ny `meta.id` hvis dette skal være en separat sak.

Før publisering kjører du denne kommandoen fra mappen med `game-data.js`:

```bash
node prepare-release.mjs
```

Kommandoen kontrollerer innholdet og oppdaterer offline-versjonen automatisk. Den registrerer også nye filer i `assets/`. Last opp den endrede `sw.js` sammen med resten av endringene. Dette er nødvendig for at installerte apper skal hente den nye historien. Du trenger ikke å endre cacheversjoner eller ressurslister manuelt.

For bare å kontrollere innholdet kan du kjøre `node validate-content.mjs`.

Kontrollen finner blant annet ugyldige referanser, dupliserte ID-er, feil i romplasseringer og en løsning som ikke peker på gyldige alternativer. Den kan ikke avgjøre om historien er logisk. Spill derfor gjennom saken og kontroller særlig tidsrekkefølgen, alibiene, sammenhengen mellom spor og svar og at oppklaringen forklarer alle sentrale funn.

Test også at en ny revisjon starter med tom sak, og at fremdrift fortsatt beholdes ved en vanlig gjenåpning med samme revisjon.

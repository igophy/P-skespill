# Fjellro – et påskekrimspill

Et interaktivt mysterium på norsk: Hotelleier Arvid Berg blir funnet død mens en snøstorm isolerer Fjellro høyfjellshotell. Undersøk seks spor, avhør fire mistenkte og lever en løsning.

## Spill lokalt

1. Last ned eller klon repoet.
2. Åpne `index.html` i en moderne nettleser.

Spillet tar omtrent 15–25 minutter og kan spilles alene eller sammen som et lag. Ingen installasjon eller bygging er nødvendig.

## Funksjoner

- Seks spor og tolv avhørssvar.
- Saksmappe som samler informasjonen du finner.
- Egne notater og lokal lagring av fremdriften når nettleseren tillater det.
- Tre hint og poeng ved riktig løsning.
- Responsiv utforming for mobil og datamaskin.

Det finnes ett fast mysterium. «Start på nytt» tømmer fremdriften og notatene. Spillet inneholder et fiktivt drap uten grafiske beskrivelser.

## GitHub Pages

For å gjøre spillet spillbart på nett, åpne repoets **Settings → Pages**. Velg **Deploy from a branch**, deretter **main** og **/ (root)**, og lagre. GitHub viser adressen når publiseringen er ferdig.

## Teknisk

Alt ligger i én HTML-fil med CSS, JavaScript og en SVG-illustrasjon. Google Fonts lastes når nettverk er tilgjengelig; ellers brukes lokale reservefonter. Ingen server, database eller eksterne JavaScript-biblioteker er nødvendig. Fremdriften lagres bare i spillerens nettleser.

Spillogikken er kontrollert for hint, feil og riktig løsning, poeng, lagring og nullstilling. Visuell testing i nettleser er foreløpig ikke utført.

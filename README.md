# raderwerk-site

Publieke, statische site van Raderwerk op GitHub Pages. De site bevat home, werkwijze, diensten, case-overzicht, transparantie, contact en vier casepagina's. De cases zijn lopende opdrachten: er worden geen onbevestigde resultaten of cijfers gepubliceerd.

## Stack

[Astro](https://astro.build), statisch en TypeScript strict. De productiebuild bevat tien HTML-pagina's zonder client-side JavaScript en gebruikt op GitHub Pages het basispad `/raderwerk-site/` voor alle interne pagina's en bestanden.

## Lokaal draaien

```sh
npm install
npm run dev       # localhost:4321
npm run check     # Astro- en TypeScript-controle
npm run build     # productiebuild naar ./dist
npm test          # build, metadata, actieve navigatie en interne href/src-links
npm run preview   # bekijk de build lokaal
npm run measure:lcp -- http://127.0.0.1:4321/raderwerk-site # schrijf evidence/lcp-mobile.json
```

Controleer zicht en toetsenbordbediening op 360, 768 en 1440 pixels. De skiplink, semantische navigatie en zichtbare focusstijl ondersteunen toetsenbordgebruik. De aangepaste tekstcombinaties meten minimaal 4,5:1; de contrasterende focusindicator meet minimaal 3,0:1 tegen aangrenzende achtergronden.

De mobiele LCP-meting gebruikt Chromium met een 360 × 800-viewport op 2×, 4× CPU-vertraging, 150 ms latency en 1,44 Mbit/s downloadsnelheid. Start eerst `npm run preview` en voer daarna het bovenstaande reproductiecommando uit. De gelogde resultaten staan in [`evidence/lcp-mobile.json`](evidence/lcp-mobile.json).

## Publicatie en poorten

Elke pull request doorloopt review en QA op een preview. Alleen een mens kan na de publicatiepoort naar `main` mergen; agents deployen niet zelfstandig. De previews van Kantelbeer en Spoorlinde worden vanuit hun eigen repositories gepubliceerd. Zoutkaap en Raderwerk staan als ‘in aanbouw’ vermeld.

De transparantiepagina maakt de ingezette AI, de vier menselijke poorten en de verantwoordelijkheid zichtbaar. De publieke kostenpagina volgt in een afzonderlijke opdracht zodra het goedgekeurde kostenboek daarvoor beschikbaar is; kosten worden hier niet vooruitlopend daarop ingevuld.

De cases bevatten schermafbeeldingen op 1440 × 900 pixels. Voor Kantelbeer en Spoorlinde zijn die van de gebouwde preview-repositories gemaakt. Omdat de previews van Zoutkaap en Raderwerk nog in aanbouw zijn, tonen die twee afbeeldingen aantoonbaar de huidige publieke casepagina en benoemt het bijschrift die afwijking; ze worden vervangen zodra de projectpreviews beschikbaar zijn.

## Fictieve cases

Zoutkaap, Kantelbeer en Spoorlinde zijn demonstratiebedrijven. Hun casepagina's tonen zichtbaar en in de voettekst: *“Demonstratiebedrijf van Raderwerk. Dit bedrijf bestaat niet.”* Raderwerk zelf is geen fictieve klant.

Zie `AGENTS.md` voor alle bijdragerregels.

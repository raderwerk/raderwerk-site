# raderwerk-site

Publieke, statische site van Raderwerk op GitHub Pages. De site bevat home, werkwijze, diensten, case-overzicht, contact en vier casepagina's. De cases zijn lopende opdrachten: er worden geen onbevestigde resultaten of cijfers gepubliceerd.

## Stack

[Astro](https://astro.build), statisch en TypeScript strict. De productiebuild bestaat uit negen HTML-pagina's zonder client-side JavaScript.

## Lokaal draaien

```sh
npm install
npm run dev       # localhost:4321
npm run check     # Astro- en TypeScript-controle
npm run build     # productiebuild naar ./dist
npm test          # build, paginatelling, metadata en interne links
npm run preview   # bekijk de build lokaal
```

Controleer zicht en toetsenbordbediening op 360, 768 en 1440 pixels. De skiplink, semantische navigatie en zichtbare focusstijl ondersteunen toetsenbordgebruik. Kleurcombinaties zijn gekozen voor minimaal WCAG AA-contrast.

## Publicatie en poorten

Elke pull request doorloopt review en QA op een preview. Alleen een mens kan na de publicatiepoort naar `main` mergen; agents deployen niet zelfstandig. De previews van Kantelbeer en Spoorlinde worden vanuit hun eigen repositories gepubliceerd. Zoutkaap en Raderwerk staan als ‘in aanbouw’ vermeld.

## Fictieve cases

Zoutkaap, Kantelbeer en Spoorlinde zijn demonstratiebedrijven. Hun casepagina's tonen zichtbaar en in de voettekst: *“Demonstratiebedrijf van Raderwerk. Dit bedrijf bestaat niet.”* Raderwerk zelf is geen fictieve klant.

Zie `AGENTS.md` voor alle bijdragerregels.

# raderwerk-site

## Doel

De eigen site van Raderwerk, gepubliceerd op GitHub Pages. Vier onderdelen: vier cases (drie bij fictieve klanten, één bij Raderwerk zelf), de pagina "Zo werken wij" met de poorten uitgelegd, een transparantiepagina (welke AI, welke poorten, wie verantwoordelijk) en een publieke kostenpagina die uit het kostenboek wordt gevoed.

## Klant

Raderwerk zelf. Zie `client-portfolio.md` (hoofdstuk 4) in de design-context voor de volledige beschrijving van dit engagement (P6/P7).

## Stack en waarom

[Astro](https://astro.build), statisch, TypeScript strict. Geen server nodig, bouwt naar platte HTML, en dat is precies wat een documentatie- en casesite nodig heeft. Deployt zonder extra infrastructuur naar GitHub Pages.

## Lokaal draaien

```sh
npm install
npm run dev       # localhost:4321
npm run check     # typecheck
npm run build     # productie-build naar ./dist
npm run preview   # bekijk de build lokaal
```

## Bijdragen via pull request

1. Vertak vanaf `main`.
2. Draai `npm run check` en `npm run build` lokaal; beide moeten slagen voordat je een PR opent.
3. Open de PR met het pull-request-template ingevuld: wat, waarom, bewijs, DoD-checklist, poort.
4. Een mens keurt goed en merget. Agents mergen, force-pushen en deployen nooit zelf.

Zie `AGENTS.md` voor de volledige regels voor Codex, Cursor en Claude in deze repo.

## Poorten

Deze repo volgt het poortmodel uit de Raderwerk-werkplaats: elke pull request doorloopt Agentreview en QA op preview, en gaat pas naar `main` na de menselijke poort "Merge of publicatie". Er wordt hier nooit zelfstandig gemerged of gedeployd door een agent.

## Footer-regel

De regel *"Demonstratiebedrijf van Raderwerk. Dit bedrijf bestaat niet."* hoort thuis op elke publieke pagina van een **fictieve** klant (Zoutkaap, Kantelbeer, Spoorlinde). Raderwerk zelf is geen fictieve klant, dus die regel staat niet op deze site. Pagina's die een fictieve case beschrijven, dragen de regel wel in hun eigen tekst.

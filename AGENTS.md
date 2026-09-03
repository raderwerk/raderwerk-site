# AGENTS.md

Voor Codex, Cursor en Claude die in deze repo werken.

## Scope van deze repo

`raderwerk-site` is de publieke site van Raderwerk op GitHub Pages: vier cases, de pagina "Zo werken wij" (de poorten), een transparantiepagina (welke AI, welke poorten, wie verantwoordelijk) en een publieke kostenpagina uit het kostenboek. Stack: Astro, TypeScript strict, statische build.

Werk alleen aan wat het issue vraagt. Ontbreekt er informatie om een acceptatiecriterium in te vullen, stel dan één scherpe vraag in een comment en stop; verzin niets over de klant, de inhoud of de cijfers.

## Definition of Done (dienst web/content, uit de spec)

- [ ] Elk acceptatiecriterium afgevinkt met een link naar bewijs
- [ ] Tests voor het gelukkige pad en minimaal één foutpad waar van toepassing; volledige suite groen, uitvoer in de PR
- [ ] `npm run check` en `npm run build` slagen lokaal en in CI
- [ ] PR geopend met beschrijving, groene CI en een preview-URL als attachment
- [ ] Twee onafhankelijke reviews afgerond, uit verschillende modelfamilies
- [ ] Toegankelijkheid: toetsenbordpad compleet, tekstcontrast minimaal 4,5:1, gemeten
- [ ] Werkt op 360, 768 en 1440 pixels breed
- [ ] Geen geheimen in de repo, geen productiecredentials gebruikt
- [ ] README bijgewerkt als het gedrag of de structuur verandert
- [ ] Fictieve casepagina's dragen de footer-regel: "Demonstratiebedrijf van Raderwerk. Dit bedrijf bestaat niet."

## PR-conventies

- Branchnaam: `feat/<ISSUE>-<korte-titel>` of `fix/<ISSUE>-<korte-titel>`.
- Commits en PR-teksten in het Engels. Deze repo's documentatie (README, AGENTS.md) is in het Nederlands.
- Vertak altijd vanaf `main`.
- Draai `npm run check` en `npm run build` voordat je een PR opent; zonder groene run is de PR niet klaar.
- Vul het pull-request-template volledig in: wat, waarom, bewijs, DoD-checklist, poort.
- Eén PR per issue, eén comment per run met wat je deed, het bewijs, en wat er nog openstaat.

## Verboden handelingen

- Nooit mergen naar `main`.
- Nooit force-pushen.
- Nooit deployen; de Pages-deploy loopt uitsluitend via de workflow op `main`, na een menselijke merge.
- Nooit geheimen, tokens of productiecredentials in de repo, in commits of in comments plaatsen.
- Nooit een status of label verlaten/zetten dat met een poort te maken heeft (`poort/akkoord`, `poort/afgekeurd`) — dat is aan de mens.
- Nooit rechtstreeks communiceren met een echt mens buiten deze werkplaats.

## Rolafsluiting

Sluit je bijdrage af met de rol die het werk deed, bijvoorbeeld:

```
**Ontwikkelaar · Opus 5 · run <id> · <tijd>**
```

Codex en Cursor tekenen niet handmatig: hun eigen agent-sessie is de handtekening.

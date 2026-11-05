# ADR-0003 : Tokens Penpot → thème Tailwind (`@theme`)

## Statut
Accepté (2026-11-05)

## Contexte
La bibliothèque Penpot (validée G3, `specs/visuel/penpot/maquette.md`) fixe les 10 couleurs FM, cinq couleurs dérivées (décisions Q-A1 à Q-A6 de G2 et survol mesuré) et les tailles de texte calées dans Chromium. Décisions communes : ADR-0001, ADR-0002 (`frontmentor/specs/adr/`).

## Décision
- `src/style.css` déclare les tokens dans un seul bloc `@theme` et vide la palette par défaut (`--color-*: initial`).
- Couleurs FM : `--color-blue-950`, `--color-purple-600`, `--color-blue-300`, `--color-blue-200`, `--color-red-500`, `--color-grey-500`, `--color-purple-200`, `--color-blue-100`, `--color-blue-50`, `--color-white` (valeurs `hsl()` du style-guide).
- Dérivées : `--color-grey-text` (Q-A1), `--color-red-text` (Q-A2), `--color-border` (Q-A3), `--color-purple-600-hover` (Q-A6), `--color-blue-950-hover` (survol mesuré).
- `--font-sans: "Ubuntu", sans-serif` (chargement : ADR-0004). Tailles de texte, rayons (carte, contrôles) et ombre de carte : un token par valeur répétée, d'après `maquette.md`.

## Conséquences
- Changer une couleur du design = changer une ligne de `@theme`.
- Fitness function (test « ADR-0003 » de `tests/statique.spec.js`) : aucune couleur (`#…`, `rgb(`, `hsl(`) dans `index.html`, `src/*.js`, ni dans `src/style.css` hors du bloc `@theme`.

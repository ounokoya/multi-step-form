# ADR-0007 : Interrupteur mensuel / annuel = case à cocher `role="switch"`

## Statut
Accepté (2026-11-05) — choix de Koya parmi deux options.

## Contexte
Q7 : l'interrupteur, ou un clic sur « Monthly » / « Yearly », change la période ; le libellé en gras suit la période (Q-B1) ; A3 : l'état est annoncé.

## Options
| Option | Pour | Contre |
|---|---|---|
| **`<input type="checkbox" role="switch">` (choisie)** | Espace, valeur dans le formulaire (ADR-0005) et état annoncé fournis par le navigateur | Style de la case à refaire en CSS |
| `<button role="switch" aria-checked>` | Style libre | État hors du formulaire ; clavier à câbler |

## Décision
- Une case nommée « Yearly billing », cochée = annuel ; « Monthly » et « Yearly » sont cliquables et choisissent chacun leur période (pas un simple basculement).

## Conséquences
- `pricing.js` lit la période dans `FormData` ; S13 et S17 vérifient le changement des prix.

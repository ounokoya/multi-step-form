# ADR-0005 : Les choix du visiteur vivent dans le formulaire ; un module par responsabilité

## Statut
Accepté (2026-11-05) — choix de Koya parmi deux options.

## Contexte
Les étapes partagent des données (forfait, période, options) que le récapitulatif réutilise ; « Go Back » et « Change » doivent tout garder (Q10, S18, S19).

## Options
| Option | Pour | Contre |
|---|---|---|
| **Le formulaire est l'état (choisie)** | Un seul `<form>` ; les champs gardent leurs valeurs ; prix et récapitulatif calculés avec `FormData` ; retours en arrière sans code de sauvegarde | Les calculs relisent le formulaire à chaque rendu |
| Objet d'état en JS | Très explicite | Double les valeurs des champs, à garder synchronisées |

## Décision
- Un seul `<form novalidate>` contient les 4 étapes et le remerciement ; une seule étape visible à la fois.
- Modules : `src/steps.js` (étape courante, navigation, focus sur le titre, annonce « Step N of 4 », marquage de l'étape), `src/validation.js` (étape 1 et choix du forfait, ADR-0006), `src/pricing.js` (prix selon la période, récapitulatif, total) ; `src/main.js` les relie.
- Les prix viennent d'une seule table (forfaits et options, mensuel ; annuel = × 10).

## Conséquences
- Tests par partie : `steps.js` → S9, S10, S18 à S21 ; `validation.js` → S5 à S8, S11 ; `pricing.js` → S13, S16, S17.
- Rien n'est envoyé ni enregistré (Q8) : la soumission est interceptée.

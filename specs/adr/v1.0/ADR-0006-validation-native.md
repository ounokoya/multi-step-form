# ADR-0006 : Validation par l'API native du navigateur, messages maison

## Statut
Accepté (2026-11-05) — choix de Koya parmi deux options.

## Contexte
Spec §5 : messages « This field is required », « Enter a valid email address », « Enter a valid phone number », « Please select a plan » ; un message disparaît avec sa cause ; focus sur le premier champ en erreur.

## Options
| Option | Pour | Contre |
|---|---|---|
| **API native (choisie)** | `required`, `type="email"`, `pattern` dans le HTML ; `novalidate` + `checkValidity()` ; méthode du Newsletter | Le `pattern` s'écrit avec la syntaxe d'expression régulière du navigateur (mode `v`) |
| Fonctions JS maison | Contrôle total | Réécrit ce que le navigateur sait faire |

## Décision
- Champs : `required` ; email `type="email"` ; téléphone `type="tel"` + `pattern` (Q3 : chiffres, espaces, `+`, parenthèses, 6 chiffres au moins). Forfaits : boutons radio `required`.
- Le message est choisi d'après `validity` (`valueMissing` → « This field is required » ; `typeMismatch` / `patternMismatch` → message de format) ; il est relié au champ (`aria-describedby`) et le champ porte `aria-invalid`.
- Pendant la saisie, un message n'est retiré que si sa cause a disparu (spec §5, S8).

## Conséquences
- Les règles restent lisibles dans le HTML ; le JS ne fait qu'afficher les messages.

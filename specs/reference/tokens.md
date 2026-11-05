# Tokens fournis par Frontend Mentor

> SDL-FM 1.2.0 Phase 1. Source : `style-guide.md` du starter. Seulement ce que FM fournit ; les valeurs mesurées viennent de l'analyse de la Phase 2 (`specs/visuel/`).

## Largeurs de maquette

| Maquette | Largeur | Images |
|---|---|---|
| Mobile | 375 px | `mobile-etape-1.jpg` (375 × 667), `mobile-etape-2-annuel.jpg` (375 × 761), les autres 375 × 695 |
| Desktop | 1440 px | `desktop-*.jpg` et `etats-etape-*.jpg` (1440 × 810) ; `apercu.jpg` (1440 × 1056) |

FM demande une page correcte et conforme WCAG de 320 px aux grands écrans. Pas de maquette tablette (proposition en Phase 3, Q9).

## Couleurs

| Nom FM | Valeur FM | Hex | Contraste sur blanc |
|---|---|---|---|
| Blue 950 | `hsl(213, 96%, 18%)` | `#02295A` | 14,3:1 |
| Purple 600 | `hsl(243, 100%, 62%)` | `#473DFF` | 6,2:1 |
| Blue 300 | `hsl(228, 100%, 84%)` | `#ADBEFF` | — |
| Blue 200 | `hsl(206, 94%, 87%)` | `#BFE2FD` | — (fond de l'étape courante ; chiffre Blue 950 à 10,6:1) |
| Red 500 | `hsl(354, 84%, 57%)` | `#ED3548` | **4,0:1** (< 4,5 pour le texte d'erreur) |
| Grey 500 | `hsl(231, 11%, 63%)` | `#9699AB` | **2,8:1** (< 4,5 pour le texte) |
| Purple 200 | `hsl(229, 24%, 87%)` | `#D6D9E6` | **1,4:1** (< 3 pour une bordure de champ) |
| Blue 100 | `hsl(218, 100%, 97%)` | `#F0F5FF` | fond de page |
| Blue 50 | `hsl(231, 100%, 99%)` | `#FAFBFF` | fond des zones claires |
| White | `hsl(0, 100%, 100%)` | `#FFFFFF` | — |

Les contrastes trop faibles sont repris dans l'inventaire de la Phase 2.

## Typographie

| Élément | Valeur FM |
|---|---|
| Famille | [Ubuntu](https://fonts.google.com/specimen/Ubuntu) — **fichiers fournis** dans `assets/fonts/` (Regular, Medium, Bold) |
| Graisses | 400, 500, 700 |
| Texte courant | 16 px |

## Assets (`assets/images/`)

| Fichier | Rôle |
|---|---|
| `bg-sidebar-desktop.svg` | Fond de la barre latérale des étapes (desktop) |
| `bg-sidebar-mobile.svg` | Fond du bandeau des étapes (mobile) |
| `icon-arcade.svg`, `icon-advanced.svg`, `icon-pro.svg` | Icônes des forfaits |
| `icon-checkmark.svg` | Coche des options |
| `icon-thank-you.svg` | Icône du remerciement |
| `favicon-32x32.png` | Favicon |

## Contenu (starter `index.html`)

| Étape | Contenu |
|---|---|
| Barre des étapes | Step 1 Your info · Step 2 Select plan · Step 3 Add-ons · Step 4 Summary |
| 1 · Personal info | Name (e.g. Stephen King), Email Address (e.g. stephenking@lorem.com), Phone Number (e.g. +1 234 567 890) |
| 2 · Select your plan | Arcade $9/mo, Advanced $12/mo, Pro $15/mo ; Monthly / Yearly (images : $90/yr, $120/yr, $150/yr, « 2 months free ») |
| 3 · Pick add-ons | Online service (Access to multiplayer games) +$1/mo ; Larger storage (Extra 1TB of cloud save) +$2/mo ; Customizable Profile (Custom theme on your profile) +$2/mo (images : +$10/yr, +$20/yr, +$20/yr) |
| 4 · Finishing up | Récapitulatif, « Change », Total (per month/year), Confirm |
| 5 · Thank you! | Message de remerciement, support@loremgaming.com |
| Boutons | Next Step, Go Back, Confirm |

## Images de référence

| Fichier | Original dans `design/` |
|---|---|
| `desktop-etape-1.jpg` … `desktop-etape-4-annuel.jpg`, `desktop-remerciement.jpg` | `desktop-design-step-*.jpg` |
| `mobile-etape-1.jpg` … `mobile-etape-4-annuel.jpg`, `mobile-remerciement.jpg` | `mobile-design-step-*.jpg` |
| `etats-etape-1.jpg` … `etats-etape-4.jpg` | `active-states-step-*.jpg` (survols, focus, erreurs) |
| `apercu.jpg` | `preview.jpg` |

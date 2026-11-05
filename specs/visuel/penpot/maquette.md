# Maquette Penpot — Multi-step form

> SDL-FM 1.2.0 Phase 3. Fichier Penpot : « multi-step-form », page « Multi-step form » (nom vérifié avant chaque écriture). Validée (G3, 2026-11-05).
> Décisions G2 appliquées : textes gris (Q-A1), message d'erreur (Q-A2), bordures (Q-A3), forfait choisi en 2 px (Q-A4), « STEP N » en Blue 200 (Q-A5), survol de Confirm (Q-A6), contour de focus clavier (Q-A7), libellé actif selon la période (Q-B1), « Arcade (Yearly) » (Q-B2), total sans « + » (Q-B3).

## Rendu des exports

L'exportateur de Penpot ne charge pas les polices ce jour-là (texte en serif, y compris pour des composants non modifiés). Les images de ce dossier viennent donc de l'**export SVG** de chaque cadre, sans ses règles `@font-face`, rendu dans Chromium avec les fichiers Ubuntu du starter (`assets/fonts/`). Dans le fichier Penpot, les textes sont en Ubuntu.

## Bibliothèque

### Couleurs

| Groupe | Nom | Valeur |
|---|---|---|
| FM | Blue 950, Purple 600, Blue 300, Blue 200, Red 500, Grey 500, Purple 200, Blue 100, Blue 50, White | valeurs de `tokens.md` |
| Dérivées G2 | Grey texte AA (Q-A1) | `#6B6F85` = `hsl(231, 11%, 47%)` |
| Dérivées G2 | Rouge erreur AA (Q-A2) | `#E11428` = `hsl(354, 84%, 48%)` |
| Dérivées G2 | Bordure AA (Q-A3) | `#888CA0` = `hsl(231, 11%, 58%)` |
| Dérivées G2 | Purple 600 survol AA (Q-A6) | `#645CFF` = `hsl(243, 100%, 68%)` |
| Dérivées | Blue 950 survol | `#164A8A` (mesuré sur l'image des états) |

### Typographie (Ubuntu, tailles calées sur la largeur des textes dans Chromium)

| Usage | Desktop | Mobile |
|---|---|---|
| Titre d'étape | 700, 32 px | 700, 24 px |
| Paragraphe | 400, 16 px | 400, 16 px, interligne 25 |
| Libellé de champ | 400, 14 px | 400, 12 px |
| Texte saisi, texte d'exemple | 500, 16 px | 500, 15 px |
| Boutons | 500, 16 px | 500, 14 px |
| Barre des étapes | « STEP 1 » 400, 12 px ; nom 700, 14 px, espacement 1 px, majuscules | chiffres seuls |
| Nom de forfait | 500, 16 px | 500, 16 px |
| Prix, descriptions, récapitulatif | 400, 14 px | 400, 12 à 14 px |
| « 2 months free » | 400, 12 px | 400, 12 px |
| Total | 700, 20 px | 700, 16 px |

## Composants (`composants.png`)

| Composant | États |
|---|---|
| Bouton Next Step | Normal (Blue 950) · Survol (`#164A8A`) · Focus clavier (contour 2 px Purple 600 décalé de 2 px) |
| Bouton Confirm | Normal (Purple 600) · Survol (`#645CFF`, Q-A6) |
| Go Back | Normal (Grey texte) · Survol (Blue 950) |
| Champ | Normal (bordure AA) · Survol (Purple 600) · Focus clavier (Purple 600 + contour) · Erreur (bordure Red 500, message rouge AA à droite du libellé) |
| Carte forfait | Normale · Survol (bordure Purple 600) · Choisie (bordure 2 px Purple 600 + fond Blue 50, Q-A4) |
| Option | Normale · Survol (bordure Purple 600) · Cochée (case Purple 600 + coche, bordure Purple 600, fond Blue 50) |
| Interrupteur | Mensuel · Annuel (libellé actif en Blue 950, Q-B1) |
| Change | Normal (Grey texte souligné) · Survol (Purple 600) |
| Étape | Normale (cercle blanc) · Courante (cercle plein Blue 200) |

## Écrans et seuils visuels (calibrage 1.1.0)

Écart = part des pixels dont un canal diffère de plus de 40 sur 255. Seuil de l'écran pour la Phase 7 = **max(5 %, écart + 1 point)**, arrondi au dixième supérieur.

| Écran Penpot | Image FM | Écart | Seuil Phase 7 |
|---|---|---|---|
| Desktop · Étape 1 | `desktop-etape-1.jpg` | 1,30 % | 5,0 % |
| Desktop · Étape 2 · mensuel | `desktop-etape-2-mensuel.jpg` | 1,08 % | 5,0 % |
| Desktop · Étape 2 · annuel | `desktop-etape-2-annuel.jpg` | 1,21 % | 5,0 % |
| Desktop · Étape 3 · mensuel | `desktop-etape-3-mensuel.jpg` | 1,61 % | 5,0 % |
| Desktop · Étape 3 · annuel | `desktop-etape-3-annuel.jpg` | 1,60 % | 5,0 % |
| Desktop · Étape 4 · mensuel | `desktop-etape-4-mensuel.jpg` | 1,07 % | 5,0 % |
| Desktop · Étape 4 · annuel | `desktop-etape-4-annuel.jpg` | 1,04 % | 5,0 % |
| Desktop · Remerciement | `desktop-remerciement.jpg` | 1,08 % | 5,0 % |
| Desktop · États étape 1 (erreur, focus, survol) | `etats-etape-1.jpg` | 1,50 % | 5,0 % |
| Desktop · États étape 2 (choisi, survols) | `etats-etape-2.jpg` | 1,11 % | 5,0 % |
| Desktop · États étape 3 (cochées, survol) | `etats-etape-3.jpg` | 1,76 % | 5,0 % |
| Desktop · États étape 4 (survols) | `etats-etape-4.jpg` | 1,53 % | 5,0 % |
| Mobile · Étape 1 (375 × 667) | `mobile-etape-1.jpg` | 4,59 % | **5,6 %** |
| Mobile · Étape 2 · mensuel (375 × 695) | `mobile-etape-2-mensuel.jpg` | 4,08 % | **5,1 %** |
| Mobile · Étape 2 · annuel (375 × 761) | `mobile-etape-2-annuel.jpg` | 4,26 % | **5,3 %** |
| Mobile · Étape 3 · mensuel | `mobile-etape-3-mensuel.jpg` | 5,01 % | **6,1 %** |
| Mobile · Étape 3 · annuel | `mobile-etape-3-annuel.jpg` | 5,05 % | **6,1 %** |
| Mobile · Étape 4 · mensuel | `mobile-etape-4-mensuel.jpg` | 3,58 % | 5,0 % |
| Mobile · Étape 4 · annuel | `mobile-etape-4-annuel.jpg` | 3,52 % | 5,0 % |
| Mobile · Remerciement | `mobile-remerciement.jpg` | 4,02 % | **5,1 %** |

Écrans sans image FM : **Tablette · Étape 1 et Étape 2 (proposition Q9)** — structure desktop dans une carte de 720 px, barre d'étapes de 220 px (image recadrée à gauche), colonne de 412 px, cartes de forfait de 124 px.

Notes :
- Les écarts mobiles viennent surtout du lissage du texte en 12 à 16 px (même constat que pour Newsletter et E-commerce) et des couleurs plus foncées décidées en G2 ; positions à ± 1–2 px.
- L'image FM écrit « Customizable profile » (le starter : « Customizable Profile ») : la maquette suit l'image.
- Les images d'états FM montrent des curseurs ; Playwright n'en dessine pas.

## Prototype (fondu 200 ms)

| Parcours | Enchaînement |
|---|---|
| **Desktop · parcours mensuel** | Étape 1 → Next Step → Étape 2 (interrupteur ⇄ annuel) → Étape 3 → Étape 4 → Confirm → Remerciement ; Go Back à chaque étape ; Change → Étape 2 |
| **Mobile · parcours** | Même enchaînement sur les écrans mobiles (barre du bas) |
| **Tablette · proposition** | Étape 1 ⇄ Étape 2 |

Simplifications : la validation (erreurs) et les survols sont montrés par les écrans d'états et les composants, pas simulés dans le prototype.

## Fichiers

- `desktop-*.png`, `etats-etape-*.png`, `mobile-*.png`, `tablette-*.png` : rendus des 22 écrans.
- `comparaison-*.png` : image FM | maquette | écarts en rouge (moitié de la taille), pour les 20 écrans calibrés.
- `composants.png` : les 23 composants et leurs états.
- `apercu-maquette.png` : aperçu des écrans principaux.

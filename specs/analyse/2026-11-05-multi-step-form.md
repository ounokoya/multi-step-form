# 2026-11-05 — Rapport d'exécution : Multi-step form

> SDL-FM 1.2.0, Phases 7 et 8. Tests sur le build de production (`vite build` + `vite preview`) ; parcours réel dans le navigateur intégré (serveur de développement lancé par l'app, `msf-dev`).

## 1. Tests automatiques (Phase 7)

`npm test` : **58 réussis sur 58** (9,6 s).

| Groupe | Scénarios | Résultat |
|---|---|---|
| Mise en page | S1 à S4 (320, 767, 768, 1023, 1024 px) | ✅ 8 / 8 |
| Étapes, validation, prix | S5 à S21 | ✅ 17 / 17 |
| Focus et axe-core | S22 ; S23 : 6 états × 1440 et 375 px | ✅ 13 / 13, aucune violation sérieuse ou critique |
| HTML (W3C Nu, local) | S24 | ✅ aucune erreur |
| Fitness ADR-0003 et ADR-0004 | couleurs seulement dans `@theme` ; rien hors du domaine, Ubuntu 400 / 500 / 700 | ✅ 2 / 2 |
| Visuel | S25 à S27, seuils calibrés en Phase 3 | ✅ 17 / 17 |

### Comparaison visuelle

| Écran | Image FM | Pixels différents | Seuil | Penpot (Phase 3) |
|---|---|---|---|---|
| Desktop · étape 1 | `desktop-etape-1.jpg` | 1,45 % | 5,0 % | 1,30 % |
| Desktop · étape 2 mensuel / annuel | `desktop-etape-2-*.jpg` | 1,67 % / 1,85 % | 5,0 % | 1,08 % / 1,21 % |
| Desktop · étape 3 mensuel / annuel | `desktop-etape-3-*.jpg` | 1,94 % / 1,95 % | 5,0 % | 1,61 % / 1,60 % |
| Desktop · étape 4 mensuel / annuel | `desktop-etape-4-*.jpg` | 1,39 % / 1,37 % | 5,0 % | 1,07 % / 1,04 % |
| Desktop · remerciement | `desktop-remerciement.jpg` | 1,86 % | 5,0 % | 1,08 % |
| Desktop · étape 1 en erreur | `etats-etape-1.jpg` | 2,23 % | 5,0 % | 1,50 % |
| Mobile · étape 1 | `mobile-etape-1.jpg` | 5,28 % | 5,6 % | 4,59 % |
| Mobile · étape 2 mensuel / annuel | `mobile-etape-2-*.jpg` | 4,79 % / 4,93 % | 5,1 % / 5,3 % | 4,08 % / 4,26 % |
| Mobile · étape 3 mensuel / annuel | `mobile-etape-3-*.jpg` | 5,80 % / 5,86 % | 6,1 % | 5,01 % / 5,05 % |
| Mobile · étape 4 mensuel / annuel | `mobile-etape-4-*.jpg` | 4,75 % / 4,71 % | 5,0 % | 3,58 % / 3,52 % |
| Mobile · remerciement | `mobile-remerciement.jpg` | 3,80 % | 5,1 % | 4,02 % |

Contrôle rouge fait avant le code (Phase 4) : 50 échecs pour la bonne raison sur le starter, 8 tests de garde.

## 2. Parcours réel (Phase 8)

| Étape du plan | 375 px | 768 px | 1440 px |
|---|---|---|---|
| Disposition | ✅ bandeau, carte flottante, barre fixée en bas | ✅ carte de 720 px centrée, barre d'étapes recadrée (Q9) | ✅ carte 940 × 600 |
| Étape 1 vide → Next Step | — | — | ✅ 3 « This field is required », champs invalides, focus sur Name |
| Saisie au clavier, email « koya@ », Entrée | — | — | ✅ seul « Enter a valid email address » reste, focus sur l'email ; corrigé → étape 2, « Step 2 of 4 » |
| Forfaits au clavier | — | — | ✅ Tab puis → : Advanced choisi |
| Clic sur « Yearly » | — | — | ✅ $90 / $120 / $150 par an, 3 « 2 months free » |
| Option Larger storage → récapitulatif | — | — | ✅ « Advanced (Yearly) » $120/yr, +$20/yr, « Total (per year) » $140/yr |
| Change → clic sur « Monthly » → récapitulatif | — | — | ✅ choix gardés ; « Advanced (Monthly) » $12/mo, +$2/mo, total $14/mo |
| Confirm | — | — | ✅ « Thank you! » focalisé, barre de boutons masquée, étape 4 marquée |
| Premier affichage | ✅ fond et icônes affichés dès l'ouverture | ✅ | ✅ |

## 3. Écarts relevés et suites

| # | Écart | Suite |
|---|---|---|
| E1 | Boutons radio des forfaits en `sr-only` : impossible de les cocher à la souris par leur centre (vu par les tests) | Corrigé : le bouton radio transparent couvre la carte |
| E2 | Mobile, étape 2 : cartes trop hautes et icône centrée au lieu d'être en haut ; titre 3 px trop bas | Corrigé (6,7 % → 4,8 %, 6,9 % → 4,9 %) |
| E3 | Mobile : Ubuntu rendue un peu plus large que dans les images FM ; le paragraphe se coupait ailleurs | Largeur du paragraphe limitée à 288 px en mobile, mesurée dans Chromium pour reproduire tous les retours à la ligne FM |
| E4 | Tests : prix présents à la fois dans une étape cachée et dans le récapitulatif (« strict mode ») | Tests corrigés : texte visible seulement |
| — | La coche des options est une image de fond chargée au premier clic | Accepté : SVG de 167 octets |

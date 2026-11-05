# Changelog

Format : [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/) · Versions : [SemVer](https://semver.org/lang/fr/).

## [1.0.1] — 2026-11-05

Correctifs issus des vérifications automatiques de Frontend Mentor (`specs/analyse/2026-11-05-rapport-fm.md`).

### Fixed
- La liste des étapes est nommée par `aria-labelledby` au lieu d'`aria-label`, refusé sur `<ol>` par l'outil de FM (R1).
- Les tailles de la barre d'étapes sont en `rem` au lieu de `px` (R2).

## [1.0.0] — 2026-11-05

Première version.

### Added
- Formulaire en 4 étapes dans un seul `<form>` : infos personnelles, forfait (Arcade, Advanced, Pro), options, récapitulatif, puis remerciement.
- Validation de l'étape 1 (champ vide, email mal formé, téléphone mal formé) et du choix du forfait, avec messages reliés aux champs et effacés dès que leur cause disparaît.
- Interrupteur mensuel / annuel (case `role="switch"`) ; « Monthly » et « Yearly » cliquables ; prix, « 2 months free », récapitulatif et total mis à jour.
- Go Back et Change sans perte des choix ; focus sur le titre et « Step N of 4 » annoncé à chaque étape ; étape courante marquée (`aria-current`).
- Mises en page mobile (< 768 px, barre de boutons fixée en bas), tablette (768–1023 px, proposition faute de maquette FM) et desktop (≥ 1024 px).
- États de survol, contour de focus de 2 px partout, transitions coupées avec `prefers-reduced-motion`.
- Contrastes AA : texte gris, texte d'erreur, bordures, « STEP N » et survol de Confirm plus soutenus que la maquette FM ; forfait choisi en 2 px.
- Police Ubuntu servie avec le site (Fontsource).
- 58 tests automatiques (Playwright, axe-core, W3C Nu) écrits depuis la spec avant le code.
- Déploiement sur GitHub Pages depuis la branche `gh-pages` (`npm run deploy`).

### Known issues
- Mobile : jusqu'à 5,9 % de pixels différents des images FM (seuils 5 à 6,1 %), surtout le lissage du texte en petite taille.

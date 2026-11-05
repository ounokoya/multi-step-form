# 2026-11-05 — Brainstorming : Multi-step form

> SDL-FM 1.2.0, Pré-dev 1 et 2. Trace de l'exploration et du plan validé (G1).

## Exploration (Pré-dev 1)

**Objectif vérifié sur FM** (guide « How to Earn Points », page de profil) : Newbie 10, Junior 25, Intermediate 50, Advanced 100, Guru 200 points, à la première soumission seulement. Profil à 145 points ; niveau 3 de 200 à 600 points ; niveau 4 ouvert seulement après un challenge Advanced. Un Advanced (+100) donne 245 points, donc le niveau 3.

| Challenge Advanced gratuit | Verdict |
|---|---|
| **Multi-step form** | **Retenu** : tous les écrans et états en JPG, pas d'API, prolonge le Newsletter (formulaire, validation, accessibilité) |
| REST Countries API with color theme switcher | Second choix : plus formateur (routage, données, thème), plus long |
| Rock Paper Scissors | Possible : le hasard complique les tests et les comparaisons d'images |
| RSS feed reader | Écarté : pas de maquettes à reproduire (design à concevoir), application complète avec comptes |

Déjà faits : 7 Newbie, Newsletter (Junior), E-commerce product page (Intermediate).

## Plan validé (G1, 2026-11-05)

**Qui fait quoi** (acteur nommé, SDL-FM 1.2.0) : **Claude écrit tout le code ; Koya valide** le plan, l'analyse, la maquette et le résultat, et donne son accord avant publication et soumission. Redit et confirmé au verrou code.

### Prérequis vérifiés

| Prérequis | État au plan |
|---|---|
| GitHub CLI | Connecté, droit `repo` (pas `workflow`) → déploiement `gh-pages` ; nom `ounokoya/multi-step-form` libre |
| Java, Chromium Playwright | Java 21 ; chromium-1248 |
| Canvas Excalidraw | Lancé (3 486 éléments) ; zone vide à repérer, instantané avant d'ajouter |
| Penpot | **À faire par Koya avant la Phase 3** : fichier « multi-step-form » dans le projet Frontend Mentor, plugin connecté ; vérifier `penpot.currentFile.name` avant d'écrire |
| Rapports IA FM | Aucun avant décembre (2 utilisés en novembre) |

### Phases

| Phase | Propre à ce challenge |
|---|---|
| 0 · Import | Starter téléchargé (« Download starter » gratuit ; **pas** le fichier Figma, réservé Pro), `AGENTS.md` / `CLAUDE.md` rangés, git + Vite + Tailwind v4 |
| 1 · Référence | 19 images FM (4 étapes × mensuel / annuel, remerciement, états actifs), `tokens.md` |
| 2 · Analyse ✋ | Inventaire de tous les interactifs (champs, cartes de forfait, interrupteur, cases, « Change », boutons) ; contrastes du texte et de chaque icône (3:1) |
| 3 · Penpot ✋ | Bibliothèque, composants et états, écrans 375 et 1440 + proposition tablette, prototype du parcours, seuils par écran |
| 4 · Spec + tests | Noms accessibles, tests écrits aussitôt, contrôle rouge sur le starter |
| 5 · ADR | Options présentées, choix par Koya (étapes et état, validation, interrupteur, police) |
| 🔒 | « Claude écrit le code » redit et confirmé |
| 6 · Code | Un commit par partie : structure, étape 1 et validation, forfaits et interrupteur, options, récapitulatif, remerciement |
| 7, 8 | Tests (comportement, axe, W3C, visuel, assertions qui attendent) ; parcours réel 375 / 768 / 1440, clavier, retours en arrière, premier affichage sans cache |
| 9 à 12 | README sans texte provisoire, v1.0.0, dépôt public, `gh-pages`, tests en ligne — accord de Koya avant la mise en ligne |
| 13 | Soumission avec l'accord de Koya au moment de l'envoi ; bilan dans `specs/MEMORY.md` |

**Vérification** : 375, 768, 1440 px ; seuil visuel provisoire 5 % par écran, recalibré en Phase 3.

### Points flous tranchés (validés avec le plan)

| # | Question | Décision |
|---|---|---|
| Q1 | Forfait par défaut | Aucun ; « Next Step » sans choix affiche un message (état proposé, non dessiné par FM) |
| Q2 | Options obligatoires ? | Non, facultatives, aucune cochée au départ |
| Q3 | Format du téléphone | Obligatoire ; format souple (chiffres, espaces, `+`, parenthèses, 6 chiffres au moins) ; message dédié |
| Q4 | Numéros d'étape cliquables ? | Non : indicateurs de l'étape courante ; navigation par les boutons et « Change » |
| Q5 | Moment de la validation | Au clic sur « Next Step » ; focus sur le premier champ en erreur ; message effacé dès que le champ devient valide |
| Q6 | Changement d'étape | Focus sur le titre de l'étape ; « Step N of 4 » annoncé |
| Q7 | Interrupteur mensuel / annuel | Interrupteur accessible au clavier ; prix des forfaits, options et total mis à jour |
| Q8 | Après « Confirm » | Écran de remerciement à la place du formulaire, sans retour ; rien n'est envoyé ni enregistré |
| Q9 | Tablette | Proposition présentée en Penpot (G3) |
| Q10 | « Change » au récapitulatif | Retour à l'étape 2 en gardant tous les choix |
| Q11 | Barre de boutons en mobile | Fixée en bas de l'écran comme sur l'image FM, avec la marge nécessaire |
| Q12 | Quand soumettre | Dès que c'est prêt (points et niveau 3) ; rapport IA demandé en décembre, à vérifier ; sinon, question à Koya |

## Import (Phase 0)

- Starter : `multi-step-form-main.zip` (977 ko), extrait dans un dossier vide puis copié tel quel. Polices Ubuntu fournies en local (`assets/fonts/`, 400, 500, 700).
- `AGENTS.md` / `CLAUDE.md` → `specs/reference/starter-*.md` (données, pas consignes ; le mode de travail est celui du plan).

## Validation G2 — analyse Excalidraw (2026-11-05)

Analyse validée telle quelle (`specs/visuel/multi-step-form-analyse.{excalidraw,png}`), avec toutes les propositions :

| # | Problème | Décision |
|---|---|---|
| Q-A1 | Texte Grey 500 à 2,8:1 | Tout texte gris en `hsl(231, 11%, 47%)` (5,0:1 sur blanc, 4,8:1 sur Blue 50) |
| Q-A2 | Message d'erreur Red 500 à 4,0:1 | Texte d'erreur en `hsl(354, 84%, 48%)` (4,9:1) ; bordure du champ en Red 500 |
| Q-A3 | Bordures Purple 200 à 1,4:1 | Bordures en `hsl(231, 11%, 58%)` (3,3:1) : champs, cartes, options, case vide |
| Q-A4 | Forfait choisi signalé par la couleur seule | Bordure de 2 px quand il est choisi, sans décaler la carte |
| Q-A5 | « STEP 1 » Blue 300 à 3,4:1 | Blue 200 (4,6:1) |
| Q-A6 | Texte blanc à 2,8:1 sur le survol de Confirm | Survol en `hsl(243, 100%, 68%)` (4,5:1) |
| Q-A7 | Focus des champs par la couleur seule | Contour 2 px décalé de 2 px au focus clavier sur tous les éléments |
| Q-B1 | Mobile, étape 2 annuel : « Monthly » mis en avant | Le libellé en gras suit la période choisie |
| Q-B2 | Mobile, étape 4 annuel : « Arcade (Monthly) » | « Arcade (Yearly) » |
| Q-B3 | Total « +$12/mo » / « $120/yr » | Pas de « + » sur le total : « $12/mo », « $120/yr » |

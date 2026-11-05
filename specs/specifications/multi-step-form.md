# Spec — Multi-step form

> SDL-FM 1.2.0 Phase 4. Sources : analyse validée (G2) `specs/visuel/multi-step-form-analyse.*`, maquette validée (G3) `specs/visuel/penpot/maquette.md`, décisions Q1 à Q12 et Q-A1 à Q-B3 dans `specs/brainstorming/2026-11-05-multi-step-form.md`.
> Cette spec dit **quoi** et **pourquoi**, jamais **comment**. Claude écrit le code, Koya valide ; les tests de `tests/` vérifient cette spec et servent de cible.

## 1. Objectif

Un formulaire d'abonnement en 4 étapes pour une plateforme de jeux : infos personnelles, forfait (mensuel ou annuel), options, récapitulatif, puis remerciement. Le visiteur peut revenir en arrière sans perdre ses choix, voit des messages d'erreur clairs et peut tout faire au clavier.

## 2. Composants et contenu

| Composant | Contenu |
|---|---|
| Étapes | 4 numéros ; desktop et tablette : « STEP N » + nom (YOUR INFO, SELECT PLAN, ADD-ONS, SUMMARY) ; étape courante marquée |
| Étape 1 · Personal info | « Please provide your name, email address, and phone number. » ; champs Name, Email Address, Phone Number (exemples du starter) |
| Étape 2 · Select your plan | « You have the option of monthly or yearly billing. » ; Arcade $9/mo, Advanced $12/mo, Pro $15/mo ; en annuel $90/yr, $120/yr, $150/yr + « 2 months free » ; interrupteur Monthly / Yearly |
| Étape 3 · Pick add-ons | « Add-ons help enhance your gaming experience. » ; Online service (Access to multiplayer games) +$1/mo ; Larger storage (Extra 1TB of cloud save) +$2/mo ; Customizable profile (Custom theme on your profile) +$2/mo ; en annuel ×10 et « /yr » |
| Étape 4 · Finishing up | « Double-check everything looks OK before confirming. » ; forfait « Arcade (Monthly) » + « Change » + prix ; options choisies et leurs prix ; « Total (per month) » ou « Total (per year) » et le total |
| Remerciement | Icône, « Thank you! », texte du starter (support@loremgaming.com) |
| Boutons | Next Step, Go Back (absent à l'étape 1), Confirm (étape 4) |
| Pied de page | « Challenge by Frontend Mentor. Coded by Koya Esdras. » (liens) |

Assets : `assets/` du starter (images, polices Ubuntu locales).

## 3. Tokens

Couleurs, typographie et mesures : `specs/reference/tokens.md` et la bibliothèque Penpot (`maquette.md`). Valeurs retenues en G2 :

| Token | Valeur | Usage |
|---|---|---|
| Texte gris | `hsl(231, 11%, 47%)` | Q-A1 : tout texte gris (paragraphes, prix, descriptions, Go Back, Change, récapitulatif, texte d'exemple) |
| Texte d'erreur | `hsl(354, 84%, 48%)` | Q-A2 ; la bordure du champ en erreur reste Red 500 |
| Bordure | `hsl(231, 11%, 58%)` | Q-A3 : champs, cartes, options, case vide |
| « STEP N » | Blue 200 | Q-A5 |
| Survol de Confirm | `hsl(243, 100%, 68%)` | Q-A6 |
| Survol de Next Step | `#164A8A` | mesuré |

## 4. Responsive

| Largeur | Disposition |
|---|---|
| < 768 px (mobile) | Bandeau d'étapes 375 × 172 (image mobile) avec 4 numéros ; carte blanche à 16 px des bords, à y = 101 ; boutons dans une barre blanche de 72 px fixée en bas de l'écran (Q11) ; champs 40 px de haut ; forfaits empilés |
| 768 – 1023 px (tablette, Q9) | Structure desktop dans une carte de 720 px centrée ; barre d'étapes de 220 px (image recadrée) ; colonne de contenu souple ; forfaits côte à côte |
| ≥ 1024 px (desktop) | Carte 940 × 600 centrée (à 1440 × 810 : x = 250, y = 105) ; barre d'étapes 274 × 568 à 16 px du bord ; colonne de contenu de 450 px à x = 640 ; boutons en bas de la colonne |

Pas de défilement horizontal de 320 px aux grands écrans.

## 5. États et interactions

| Sujet | Règle |
|---|---|
| Étape 1 · validation (Q5) | Au clic sur « Next Step » : champ vide → « This field is required » ; email mal formé → « Enter a valid email address » ; téléphone mal formé (Q3 : chiffres, espaces, `+`, parenthèses, 6 chiffres au moins) → « Enter a valid phone number ». Le message s'affiche à droite du libellé ; le champ est marqué invalide ; le focus va sur le premier champ en erreur. Un message disparaît dès que sa cause disparaît : « This field is required » dès que le champ n'est plus vide (comme sur l'image des états FM), un message de format dès que le format est bon ; le format est revérifié au clic suivant sur « Next Step ». Les espaces autour de la saisie sont ignorés. |
| Étape 2 · forfait (Q1) | Aucun forfait choisi au départ ; « Next Step » sans choix → « Please select a plan ». Un seul forfait à la fois. |
| Mensuel / annuel (Q7) | L'interrupteur, ou un clic sur « Monthly » / « Yearly », change la période. Les prix des forfaits, des options, du récapitulatif et du total suivent ; le libellé en gras est la période choisie (Q-B1). |
| Étape 3 · options (Q2) | Facultatives, aucune cochée au départ. |
| Étape 4 · récapitulatif | « Arcade (Monthly) » ou « Arcade (Yearly) » (Q-B2) ; les options choisies seulement ; total = forfait + options, sans « + » (Q-B3). « Change » ramène à l'étape 2 en gardant tous les choix (Q10). |
| Navigation | « Next Step » avance si l'étape est valide ; « Go Back » recule sans rien perdre. Les numéros d'étape ne sont pas cliquables (Q4). |
| Changement d'étape (Q6) | Le focus va sur le titre de la nouvelle étape ; « Step N of 4 » est annoncé ; l'étape courante est marquée dans la liste. |
| Confirmation (Q8) | « Confirm » affiche le remerciement à la place du formulaire, sans retour possible ; l'étape 4 reste marquée. Rien n'est envoyé ni enregistré. |
| Survols et focus | Voir l'inventaire de l'analyse (11 groupes) et les composants Penpot. Tout élément interactif a un état de survol et un **contour de focus de 2 px** décalé de 2 px (Q-A7) ; le forfait choisi a une bordure de 2 px (Q-A4). |
| Animations | Courtes (≈ 200 ms) ; aucune avec `prefers-reduced-motion: reduce`. |

## 6. Accessibilité

### Contrats

| # | Contrat |
|---|---|
| A1 | Chaque champ a un libellé ; chaque message d'erreur est relié à son champ et annoncé ; le champ en erreur est marqué invalide. |
| A2 | Les forfaits forment un groupe de boutons radio (flèches du clavier) ; les options sont des cases à cocher natives. |
| A3 | L'interrupteur annonce son état (activé = annuel). |
| A4 | Le changement d'étape est annoncé (« Step N of 4 ») et le focus va sur le titre. |
| A5 | L'étape courante est marquée dans la liste des étapes (`aria-current="step"`), pas seulement par la couleur. |
| A6 | Textes à 4,5:1 au moins, composants et icônes nécessaires à 3:1 (Q-A1 à Q-A6). |
| A7 | Contour de focus visible de 2 px sur tous les éléments interactifs (Q-A7). |

### Noms accessibles utilisés par les tests

| Élément | Rôle | Nom |
|---|---|---|
| Liste des étapes | list | « Steps » (4 éléments, l'étape courante a `aria-current="step"`) |
| Titres d'étape | heading | « Personal info », « Select your plan », « Pick add-ons », « Finishing up », « Thank you! » |
| Champs | textbox | « Name », « Email Address », « Phone Number » |
| Forfaits | radio | commence par « Arcade », « Advanced », « Pro » |
| Interrupteur | switch | « Yearly billing » |
| Options | checkbox | commence par « Online service », « Larger storage », « Customizable profile » |
| Boutons | button | « Next Step », « Go Back », « Confirm », « Change » |
| Annonce d'étape | status | contient « Step N of 4 » |

## 7. Critères d'acceptation

```
Mise en page
S1  Given 375 × 667   Then numéros d'étape visibles, noms d'étape cachés ; carte de 343 px à x = 16 ; « Next Step » collé à 16 px du bas et de la droite de l'écran
S2  Given 768 px      Then noms d'étape visibles (structure desktop) ; carte de 720 px centrée
S3  Given 1440 × 810  Then carte 940 × 600 en (250, 105) ; titre de l'étape à x = 640
S4  Given 320, 767, 768, 1023, 1024 px  Then pas de défilement horizontal

Étape 1
S5  Given champs vides            When « Next Step »  Then 3 × « This field is required », champs invalides, focus sur « Name », toujours l'étape 1
S6  Given email « vanessa@ »       When « Next Step »  Then « Enter a valid email address », focus sur « Email Address »
S7  Given téléphone « abc »        When « Next Step »  Then « Enter a valid phone number »
S8  Given erreurs « required »    When je tape dans « Name », puis « vanessa@ » dans « Email Address »  Then les deux messages disparaissent ; au « Next Step » suivant, « Enter a valid email address »
S9  Given 3 champs valides         When « Next Step »  Then titre « Select your plan » focalisé, « Step 2 of 4 » annoncé, étape 2 marquée
S10 Given étape 1                  Then pas de bouton « Go Back »

Étape 2
S11 Given aucun forfait            When « Next Step »  Then « Please select a plan », toujours l'étape 2
S12 Given « Advanced » choisi      When « Next Step »  Then étape 3
S13 Given mensuel                  When interrupteur  Then $90/yr, $120/yr, $150/yr et 3 × « 2 months free » ; interrupteur activé
S14 Given forfaits                 When flèche droite sur « Arcade » choisi  Then « Advanced » choisi (groupe radio)

Étapes 3 et 4
S15 Given aucune option            When « Next Step »  Then étape 4 (options facultatives)
S16 Given Arcade, Online service, Larger storage, mensuel  Then « Arcade (Monthly) » $9/mo, +$1/mo, +$2/mo, « Total (per month) » $12/mo
S17 Given les mêmes choix en annuel  Then « Arcade (Yearly) » $90/yr, +$10/yr, +$20/yr, « Total (per year) » $120/yr ; prix des options en /yr à l'étape 3
S18 Given récapitulatif            When « Change »  Then étape 2, forfait toujours choisi ; Next Step → options toujours cochées
S19 Given étape 2                  When « Go Back »  Then étape 1, champs toujours remplis
S20 Given étape 4                  When « Confirm »  Then « Thank you! », plus de bouton « Go Back » ni « Confirm », étape 4 marquée
S21 Given clavier seul             When je remplis tout (Tab, Espace, flèches, Entrée)  Then j'arrive au remerciement

Accessibilité et HTML
S22 Given étape 1 et étape 2 (1440 px)  When je parcours au Tab  Then chaque élément focalisé a un contour de 2 px au moins
S23 Given étapes 1 (vide et en erreur), 2, 3, 4, remerciement (1440 et 375)  Then axe-core : aucune violation sérieuse ou critique
S24 Given le HTML servi  Then validateur W3C Nu : aucune erreur

Visuel (seuils calibrés en Phase 3)
S25 Desktop 1440 × 810 : étape 1, 2 mensuel / annuel (Arcade choisi), 3 mensuel / annuel (2 options cochées), 4 mensuel / annuel, remerciement  vs desktop-*.jpg  ≤ 5,0 %
S26 Desktop 1440 × 810 : étape 1 en erreur (Name rempli, Next Step, puis « vanessamint@ » tapé dans Email ; Phone vide)  vs etats-etape-1.jpg  ≤ 5,0 %
S27 Mobile 375 : étape 1 (667) ≤ 5,6 % · 2 mensuel (695) ≤ 5,1 % · 2 annuel (761) ≤ 5,3 % · 3 mensuel / annuel (695) ≤ 6,1 % · 4 mensuel / annuel (695) ≤ 5,0 % · remerciement (695) ≤ 5,1 %
```

Écarts acceptés d'avance : couleurs plus foncées de G2 (Q-A1 à Q-A6) ; dans `etats-etape-1.jpg`, la saisie « vanessamint@ » est focalisée et « Next Step » survolé : la capture montre le focus mais pas le survol.

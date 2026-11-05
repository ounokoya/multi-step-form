# 2026-11-05 — Rapport Frontend Mentor (vérifications automatiques) : tri

> SDL-FM 1.2.0 Phase 13. Solution : https://www.frontendmentor.io/solutions/multi-step-form-with-tailwind-v4-native-validation-and-formdata-UGQKLcYaCP. Pas de rapport IA (crédits de novembre utilisés, Q12) : seules les vérifications automatiques ont tourné. Profil : **245 points, niveau 3** (niveau 4 à 600 points, ouvert grâce à ce premier Advanced).

## Résultat

2 remarques dans 2 catégories ; Accessibilité 0, JavaScript 0.

| # | Remarque FM | Verdict | Suite proposée |
|---|---|---|---|
| R1 | HTML, erreur : « `aria-label` cannot be used on this element » sur `<ol aria-label="Steps">` | ✅ Juste (le validateur W3C l'accepte, mais l'outil de FM réserve `aria-label` aux éléments interactifs et aux repères) | Nommer la liste par `aria-labelledby` vers un titre masqué « Steps » ; les tests (`getByRole('list', { name: 'Steps' })`) restent valables |
| R2 | CSS, avertissement : unités absolues (`height: 172px`, `width: 220px`, `width: 274px`) dans `src/style.css` | ✅ Juste | Passer ces 3 valeurs en `rem` (10,75 / 13,75 / 17,125 rem) ; le rendu ne change pas |

Les deux correctifs donneraient une v1.0.1, avec un nouveau passage des vérifications automatiques (« Regenerate report », gratuit pour ces vérifications).

## Suite donnée : v1.0.1 (2026-11-05)

- R1 : liste des étapes nommée par `aria-labelledby` (commit `fix(a11y)`), R2 : tailles en `rem` (commit `fix(css)`) ; 58 / 58 en local et en ligne ; tag `v1.0.1`, redéployé.
- Vérifications automatiques relancées sur FM : **0 remarque** (Accessibility 0, HTML 0, CSS 0, JavaScript 0).
- Maquette Penpot inchangée : aucun changement visuel.

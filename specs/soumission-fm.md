# Soumission Frontend Mentor — brouillon

> SDL-FM 1.2.0 Phase 13. Textes préparés pour le formulaire « Submit solution » du challenge. La soumission est publique et faite au nom de Koya : elle n'est envoyée qu'avec son accord, au moment de l'envoi.

## Informations générales

| Champ | Valeur |
|---|---|
| Solution title (70 caractères max) | Multi-step form with Tailwind v4, native validation & FormData |
| Repository URL | https://github.com/ounokoya/multi-step-form |
| Live site URL | https://ounokoya.github.io/multi-step-form/ |
| Tags (5 max, hors HTML/CSS/JS) | `tailwind-css`, `vite`, `accessibility`, `playwright` |
| Visibilité | Public |

Rapports IA : aucun crédit gratuit avant décembre (Q12) ; la soumission donne les points sans rapport.

## What are you most proud of, and what would you do differently next time?

I'm most proud of keeping the whole flow in one native form. Every step lives in the same `<form>`, so "Go Back" and "Change" keep all choices without any syncing code, and the summary and prices are computed from `FormData`. The 58 Playwright tests were written before the code, only use roles and accessible names, and also pass on the live site.

Next time, I'd check earlier how each design detail renders in the browser: the plan icons are top-aligned in the design, not centred, and I only caught it by comparing my screenshots with the mockup.

## What challenges did you encounter, and how did you overcome them?

- **Validation messages**: I used the browser's Constraint Validation API (`required`, `type="email"`, a `pattern` for the phone) with my own messages. Each message disappears as soon as its cause is gone, like in the design's active-state image.
- **Accessible plan cards**: a visually hidden radio button couldn't be clicked by its centre, so the native radio now covers the whole card with `opacity: 0` — mouse, arrow keys and screen readers all go through it.
- **Contrast**: several design colours were below WCAG (grey text 2.8:1, error text 4.0:1, borders 1.4:1). I darkened them and gave the selected plan a 2 px border so it isn't shown by colour alone.
- **Design inconsistencies**: the mobile yearly images highlight "Monthly" and show "Arcade (Monthly)" with yearly prices; the code follows the logic.
- **No tablet design**: I proposed a 720 px card layout in my Penpot mockup and validated it before coding.

## What specific areas of your project would you like help with?

1. All five steps are sections of one `<form>`, shown one at a time with `hidden`. Would you split them differently (separate forms, or a `<fieldset>` per step) for screen-reader users?
2. On each step change I move focus to the step heading and announce "Step 2 of 4" in a status region. Is that too much, or would you do only one of the two?
3. The billing switch is an `<input type="checkbox" role="switch">` with "Monthly" and "Yearly" as clickable text next to it. Is that pattern clear enough, or would you rather use two radio buttons?

// Étapes : section affichée, boutons, focus sur le titre, annonce « Step N of 4 », étape marquée
// ADR-0005 ; spec §5 (Q4, Q6, Q8, Q10)

const LAST = 4 // l'étape 5 est le remerciement

// canLeave(step) : l'étape peut-elle être quittée vers l'avant ? onShow(step) : appelée à chaque affichage
export function initSteps(form, { canLeave = () => true, onShow = () => {} } = {}) {
  const sections = [...form.querySelectorAll('[data-step]')]
  const items = [...document.querySelectorAll('[data-steps] li')]
  const back = form.querySelector('[data-back]')
  const next = form.querySelector('[data-next]')
  const confirm = form.querySelector('[data-confirm]')
  const nav = form.querySelector('[data-nav]')
  const announce = form.querySelector('[data-announce]')
  let current = 1

  function show(step, { focus = true } = {}) {
    current = step
    for (const section of sections) section.hidden = Number(section.dataset.step) !== step
    // Au remerciement, l'étape 4 reste marquée (Q8)
    items.forEach((item, i) => {
      if (i + 1 === Math.min(step, LAST)) item.setAttribute('aria-current', 'step')
      else item.removeAttribute('aria-current')
    })
    back.hidden = step === 1 || step > LAST
    next.hidden = step >= LAST
    confirm.hidden = step !== LAST
    nav.hidden = step > LAST
    onShow(step)
    if (step <= LAST) announce.textContent = `Step ${step} of ${LAST}`
    if (focus) sections[step - 1].querySelector('h1').focus() // Q6
  }

  // Next Step, Confirm et Entrée dans un champ passent tous par la soumission ; rien n'est envoyé (Q8)
  form.addEventListener('submit', (event) => {
    event.preventDefault()
    if (canLeave(current)) show(current + 1)
  })
  back.addEventListener('click', () => show(current - 1))
  form.querySelector('[data-change]').addEventListener('click', () => show(2)) // Q10

  show(1, { focus: false })
}

// Validation de l'étape 1 et du choix du forfait — ADR-0006 ; spec §5 (Q1, Q3, Q5)
// Les règles sont dans le HTML (required, type, pattern) ; ici on choisit et affiche le message.

const REQUIRED = 'This field is required'
const FORMAT = { email: 'Enter a valid email address', tel: 'Enter a valid phone number' }

// Cause de l'erreur d'un champ : 'required', 'format' ou null
function causeOf(input) {
  if (input.validity.valueMissing) return 'required'
  return input.validity.valid ? null : 'format'
}

function show(input, cause) {
  const message = document.getElementById(input.getAttribute('aria-describedby'))
  message.textContent = cause === 'required' ? REQUIRED : cause ? FORMAT[input.type] : ''
  if (cause) input.setAttribute('aria-invalid', 'true')
  else input.removeAttribute('aria-invalid')
  input.dataset.cause = cause ?? ''
}

// Renvoie canLeave(step) pour initSteps : l'étape peut-elle être quittée vers l'avant ?
export function initValidation(form) {
  const fields = [...form.querySelectorAll('[data-step="1"] input')]
  const planError = document.getElementById('plan-error')
  const plans = [...form.querySelectorAll('input[name="plan"]')]

  // Un message disparaît dès que sa cause disparaît ; le format est revérifié au Next Step suivant
  for (const input of fields) {
    input.addEventListener('input', () => {
      const cause = input.dataset.cause
      if ((cause === 'required' && input.value.trim() !== '') || (cause === 'format' && input.validity.valid)) show(input, null)
    })
  }
  for (const radio of plans) radio.addEventListener('change', () => { planError.textContent = '' })

  function personalInfo() {
    let first = null
    for (const input of fields) {
      input.value = input.value.trim()
      const cause = causeOf(input)
      show(input, cause)
      if (cause && !first) first = input
    }
    first?.focus()
    return !first
  }

  function planChosen() {
    if (plans.some((radio) => radio.checked)) return true
    planError.textContent = 'Please select a plan'
    plans[0].focus()
    return false
  }

  return (step) => (step === 1 ? personalInfo() : step === 2 ? planChosen() : true)
}

// Prix, période et récapitulatif — ADR-0005, ADR-0007 ; spec §5 (Q7, Q-B1 à Q-B3)

// Prix mensuels ; l'annuel vaut 10 mois (« 2 months free »)
const PLANS = { arcade: ['Arcade', 9], advanced: ['Advanced', 12], pro: ['Pro', 15] }
const ADDONS = { online: ['Online service', 1], storage: ['Larger storage', 2], profile: ['Customizable profile', 2] }

const price = (monthly, yearly, plus = false) => `${plus ? '+' : ''}$${yearly ? monthly * 10 : monthly}/${yearly ? 'yr' : 'mo'}`

// Renvoie renderSummary(), à appeler quand l'étape 4 s'affiche
export function initPricing(form) {
  const billing = form.elements.yearly // cochée = annuel

  function updatePrices() {
    const yearly = billing.checked
    for (const el of form.querySelectorAll('[data-price]')) {
      const [kind, key] = el.dataset.price.split(':')
      el.textContent = kind === 'plan' ? price(PLANS[key][1], yearly) : price(ADDONS[key][1], yearly, true)
    }
    for (const offer of form.querySelectorAll('[data-offer]')) offer.hidden = !yearly
  }

  billing.addEventListener('change', updatePrices)
  // Q7 : « Monthly » et « Yearly » choisissent chacun leur période
  for (const label of form.querySelectorAll('[data-period]')) {
    label.addEventListener('click', () => {
      billing.checked = label.dataset.period === 'yearly'
      updatePrices()
    })
  }
  updatePrices()

  const summary = (name) => form.querySelector(`[data-summary="${name}"]`)

  return function renderSummary() {
    const data = new FormData(form)
    const yearly = billing.checked
    const [planName, planPrice] = PLANS[data.get('plan')]
    const addons = data.getAll('addons').map((key) => ADDONS[key])

    summary('plan').textContent = `${planName} (${yearly ? 'Yearly' : 'Monthly'})` // Q-B2
    summary('plan-price').textContent = price(planPrice, yearly)
    summary('addons').replaceChildren(...addons.map(([name, monthly]) => {
      const item = document.createElement('li')
      item.className = 'flex justify-between'
      const label = Object.assign(document.createElement('span'), { className: 'text-grey-text', textContent: name })
      const amount = Object.assign(document.createElement('span'), { className: 'text-blue-950', textContent: price(monthly, yearly, true) })
      item.append(label, amount)
      return item
    }))
    summary('addons-block').hidden = addons.length === 0
    summary('total-label').textContent = `Total (per ${yearly ? 'year' : 'month'})`
    // Q-B3 : pas de « + » sur le total
    summary('total').textContent = price(planPrice + addons.reduce((sum, [, monthly]) => sum + monthly, 0), yearly)
  }
}

import './style.css'
import { initSteps } from './steps.js'
import { initValidation } from './validation.js'
import { initPricing } from './pricing.js'

const form = document.querySelector('form')
const renderSummary = initPricing(form)
initSteps(form, {
  canLeave: initValidation(form),
  onShow: (step) => { if (step === 4) renderSummary() },
})

import './style.css'
import { initSteps } from './steps.js'
import { initValidation } from './validation.js'

const form = document.querySelector('form')
initSteps(form, { canLeave: initValidation(form) })

import { readFileSync } from 'node:fs'
import { expect } from '@playwright/test'
import { PNG } from 'pngjs'
import jpeg from 'jpeg-js'

// Les tests ne s'appuient que sur la spec : noms accessibles (§6) et comportement (§5),
// jamais sur des classes ou une structure HTML précise.

export async function open(page, width, height = 810) {
  await page.setViewportSize({ width, height })
  await page.goto('./')
  await page.evaluate(() => document.fonts.ready)
}

export const field = (page, name) => page.getByRole('textbox', { name })
export const button = (page, name) => page.getByRole('button', { name, exact: true })
export const heading = (page, name) => page.getByRole('heading', { name })
export const steps = (page) => page.getByRole('list', { name: 'Steps' }).getByRole('listitem')
export const plan = (page, name) => page.getByRole('radio', { name: new RegExp(`^${name}`) })
export const addon = (page, name) => page.getByRole('checkbox', { name: new RegExp(`^${name}`, 'i') })
export const billing = (page) => page.getByRole('switch', { name: 'Yearly billing' })
export const announce = (page, n) => page.getByRole('status').filter({ hasText: `Step ${n} of 4` })
// Texte exact et visible : les étapes cachées contiennent les mêmes prix que le récapitulatif
export const shown = (page, text) => page.getByText(text, { exact: true }).locator('visible=true')

export const VALID = { name: 'Vanessa Mint', email: 'vanessamint@example.com', phone: '+1 234 567 890' }

export async function fillStep1(page, values = VALID) {
  await field(page, 'Name').fill(values.name)
  await field(page, 'Email Address').fill(values.email)
  await field(page, 'Phone Number').fill(values.phone)
}

// Va jusqu'à l'étape n (2 à 5 = remerciement) avec des choix valides
export async function reach(page, n, { yearly = false, choice = 'Arcade', addons = [] } = {}) {
  await fillStep1(page)
  await button(page, 'Next Step').click()
  await expect(heading(page, 'Select your plan')).toBeVisible()
  if (yearly) await billing(page).click()
  if (choice) await plan(page, choice).check()
  if (n === 2) return
  await button(page, 'Next Step').click()
  await expect(heading(page, 'Pick add-ons')).toBeVisible()
  for (const a of addons) await addon(page, a).check()
  if (n === 3) return
  await button(page, 'Next Step').click()
  await expect(heading(page, 'Finishing up')).toBeVisible()
  if (n === 4) return
  await button(page, 'Confirm').click()
  await expect(heading(page, 'Thank you!')).toBeVisible()
}

export const REFERENCE = new URL('../specs/reference/', import.meta.url)

// Part des pixels dont un canal diffère de plus de 40 (mesure du calibrage de la Phase 3)
export function diffRatio(screenshot, referenceFile) {
  const actual = PNG.sync.read(screenshot)
  const expected = jpeg.decode(readFileSync(new URL(referenceFile, REFERENCE)), { useTArray: true })
  if (actual.width !== expected.width || actual.height !== expected.height) {
    throw new Error(`capture ${actual.width}×${actual.height} ≠ référence ${expected.width}×${expected.height}`)
  }
  let different = 0
  for (let i = 0; i < actual.data.length; i += 4) {
    const delta = Math.max(
      Math.abs(actual.data[i] - expected.data[i]),
      Math.abs(actual.data[i + 1] - expected.data[i + 1]),
      Math.abs(actual.data[i + 2] - expected.data[i + 2]),
    )
    if (delta > 40) different++
  }
  return different / (actual.width * actual.height)
}

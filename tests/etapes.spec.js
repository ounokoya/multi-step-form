import { test, expect } from '@playwright/test'
import { open, field, button, heading, steps, plan, addon, billing, announce, shown, fillStep1, reach, VALID } from './helpers.js'

// Spec §5 — S5 à S21

test.beforeEach(async ({ page }) => {
  await open(page, 1440)
})

test('S5 — champs vides : 3 messages, champs invalides, focus sur Name, toujours l\'étape 1', async ({ page }) => {
  await button(page, 'Next Step').click()

  await expect(page.getByText('This field is required')).toHaveCount(3)
  for (const name of ['Name', 'Email Address', 'Phone Number']) await expect(field(page, name)).toHaveAttribute('aria-invalid', 'true')
  await expect(field(page, 'Name')).toBeFocused()
  await expect(heading(page, 'Personal info')).toBeVisible()
})

test('S6 — email mal formé : message de format, focus sur l\'email', async ({ page }) => {
  await fillStep1(page, { ...VALID, email: 'vanessa@' })
  await button(page, 'Next Step').click()

  await expect(page.getByText('Enter a valid email address')).toBeVisible()
  await expect(field(page, 'Email Address')).toBeFocused()
})

test('S7 — téléphone mal formé : message de format', async ({ page }) => {
  await fillStep1(page, { ...VALID, phone: 'abc' })
  await button(page, 'Next Step').click()

  await expect(page.getByText('Enter a valid phone number')).toBeVisible()
  await expect(field(page, 'Phone Number')).toBeFocused()
})

test('S8 — les messages disparaissent avec leur cause ; le format est revérifié au Next Step suivant', async ({ page }) => {
  await button(page, 'Next Step').click()
  await field(page, 'Name').fill(VALID.name)
  await field(page, 'Email Address').fill('vanessa@')

  await expect(page.getByText('This field is required')).toHaveCount(1)
  await expect(field(page, 'Name')).not.toHaveAttribute('aria-invalid', 'true')
  await button(page, 'Next Step').click()
  await expect(page.getByText('Enter a valid email address')).toBeVisible()
})

test('S9 — étape 1 valide : titre de l\'étape 2 focalisé, « Step 2 of 4 » annoncé, étape 2 marquée', async ({ page }) => {
  await fillStep1(page)
  await button(page, 'Next Step').click()

  await expect(heading(page, 'Select your plan')).toBeFocused()
  await expect(announce(page, 2)).toHaveCount(1)
  await expect(steps(page).nth(1)).toHaveAttribute('aria-current', 'step')
  await expect(steps(page).nth(0)).not.toHaveAttribute('aria-current', 'step')
})

test('S10 — Go Back présent à l\'étape 2, absent à l\'étape 1', async ({ page }) => {
  await reach(page, 2)
  await expect(button(page, 'Go Back')).toBeVisible()
  await button(page, 'Go Back').click()
  await expect(heading(page, 'Personal info')).toBeVisible()
  await expect(button(page, 'Go Back')).toBeHidden()
})

test('S11 — étape 2 sans forfait : message, toujours l\'étape 2', async ({ page }) => {
  await reach(page, 2, { choice: null })
  await button(page, 'Next Step').click()

  await expect(page.getByText('Please select a plan')).toBeVisible()
  await expect(heading(page, 'Select your plan')).toBeVisible()
})

test('S12 — Advanced choisi : passage à l\'étape 3', async ({ page }) => {
  await reach(page, 2, { choice: 'Advanced' })
  await expect(plan(page, 'Advanced')).toBeChecked()
  await button(page, 'Next Step').click()
  await expect(heading(page, 'Pick add-ons')).toBeVisible()
})

test('S13 — interrupteur : prix annuels et « 2 months free »', async ({ page }) => {
  await reach(page, 2, { choice: null })
  await billing(page).click()

  await expect(billing(page)).toBeChecked()
  for (const price of ['$90/yr', '$120/yr', '$150/yr']) await expect(shown(page, price)).toHaveCount(1)
  await expect(shown(page, '2 months free')).toHaveCount(3)
})

test('S14 — groupe radio : flèche droite passe d\'Arcade à Advanced', async ({ page }) => {
  await reach(page, 2)
  await plan(page, 'Arcade').focus()
  await page.keyboard.press('ArrowRight')
  await expect(plan(page, 'Advanced')).toBeChecked()
  await expect(plan(page, 'Arcade')).not.toBeChecked()
})

test('S15 — étape 3 sans option : passage à l\'étape 4', async ({ page }) => {
  await reach(page, 4)
  await expect(heading(page, 'Finishing up')).toBeVisible()
})

test('S16 — récapitulatif mensuel : forfait, options, total sans « + »', async ({ page }) => {
  await reach(page, 4, { addons: ['Online service', 'Larger storage'] })
  for (const text of ['Arcade (Monthly)', '$9/mo', '+$1/mo', '+$2/mo', 'Total (per month)', '$12/mo']) {
    await expect(shown(page, text)).toHaveCount(1)
  }
  await expect(shown(page, 'Customizable profile')).toHaveCount(0)
})

test('S17 — en annuel : prix des options en /yr, récapitulatif « Arcade (Yearly) », total $120/yr', async ({ page }) => {
  await reach(page, 3, { yearly: true })
  await expect(shown(page, '+$10/yr')).toHaveCount(1)
  await expect(shown(page, '+$20/yr')).toHaveCount(2)
  for (const a of ['Online service', 'Larger storage']) await addon(page, a).check()
  await button(page, 'Next Step').click()

  for (const text of ['Arcade (Yearly)', '$90/yr', '+$10/yr', '+$20/yr', 'Total (per year)', '$120/yr']) {
    await expect(shown(page, text)).toHaveCount(1)
  }
})

test('S18 — Change : retour à l\'étape 2, choix gardés', async ({ page }) => {
  await reach(page, 4, { choice: 'Pro', addons: ['Larger storage'] })
  await button(page, 'Change').click()

  await expect(heading(page, 'Select your plan')).toBeVisible()
  await expect(plan(page, 'Pro')).toBeChecked()
  await button(page, 'Next Step').click()
  await expect(addon(page, 'Larger storage')).toBeChecked()
})

test('S19 — Go Back : champs de l\'étape 1 toujours remplis', async ({ page }) => {
  await reach(page, 2)
  await button(page, 'Go Back').click()

  await expect(field(page, 'Name')).toHaveValue(VALID.name)
  await expect(field(page, 'Email Address')).toHaveValue(VALID.email)
  await expect(field(page, 'Phone Number')).toHaveValue(VALID.phone)
})

test('S20 — Confirm : remerciement, plus de boutons, étape 4 marquée', async ({ page }) => {
  await reach(page, 5)

  await expect(button(page, 'Go Back')).toBeHidden()
  await expect(button(page, 'Confirm')).toBeHidden()
  await expect(steps(page).nth(3)).toHaveAttribute('aria-current', 'step')
})

test('S21 — tout au clavier jusqu\'au remerciement', async ({ page }) => {
  await field(page, 'Name').focus()
  await page.keyboard.type(VALID.name)
  await page.keyboard.press('Tab')
  await page.keyboard.type(VALID.email)
  await page.keyboard.press('Tab')
  await page.keyboard.type(VALID.phone)
  await page.keyboard.press('Enter')
  await expect(heading(page, 'Select your plan')).toBeFocused()

  await page.keyboard.press('Tab') // premier forfait
  await page.keyboard.press('Space')
  await expect(plan(page, 'Arcade')).toBeChecked()
  await button(page, 'Next Step').focus()
  await page.keyboard.press('Enter')
  await expect(heading(page, 'Pick add-ons')).toBeFocused()

  await page.keyboard.press('Tab')
  await page.keyboard.press('Space')
  await expect(addon(page, 'Online service')).toBeChecked()
  await button(page, 'Next Step').focus()
  await page.keyboard.press('Enter')
  await expect(heading(page, 'Finishing up')).toBeFocused()

  await button(page, 'Confirm').focus()
  await page.keyboard.press('Enter')
  await expect(heading(page, 'Thank you!')).toBeVisible()
})

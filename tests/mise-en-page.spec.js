import { test, expect } from '@playwright/test'
import { open, heading, button, steps } from './helpers.js'

// Spec §4 — S1 à S4

const box = async (locator) => {
  const b = await locator.boundingBox()
  return { x: Math.round(b.x), y: Math.round(b.y), width: Math.round(b.width), height: Math.round(b.height) }
}

test('S1 — 375 × 667 : numéros visibles, noms cachés, titre à x = 40, Next Step collé en bas à droite', async ({ page }) => {
  await open(page, 375, 667)

  await expect(steps(page)).toHaveCount(4)
  await expect(steps(page).first()).toBeVisible()
  await expect(page.getByText(/^your info$/i)).toBeHidden()
  expect((await box(heading(page, 'Personal info'))).x).toBe(40)
  const next = await box(button(page, 'Next Step'))
  expect(next.x + next.width).toBe(359)
  expect(next.y + next.height).toBe(667 - 16)
})

test('S2 — 768 px : structure desktop, noms d\'étape visibles, colonne à droite de la barre', async ({ page }) => {
  await open(page, 768, 1024)

  await expect(page.getByText(/^your info$/i)).toBeVisible()
  expect((await box(heading(page, 'Personal info'))).x).toBe(308)
})

test('S3 — 1440 × 810 : étapes en (298, 161), titre à x = 640, Next Step 123 × 48 en (967, 625)', async ({ page }) => {
  await open(page, 1440)

  const first = await box(steps(page).first())
  expect([first.x, first.y]).toEqual([298, 161])
  expect((await box(heading(page, 'Personal info'))).x).toBe(640)
  expect(await box(button(page, 'Next Step'))).toEqual({ x: 967, y: 625, width: 123, height: 48 })
})

for (const width of [320, 767, 768, 1023, 1024]) {
  test(`S4 — ${width} px : pas de défilement horizontal`, async ({ page }) => {
    await open(page, width)
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
    expect(overflow).toBe(0)
  })
}

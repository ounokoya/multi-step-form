import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { open, button, reach } from './helpers.js'

// Spec §6 — S22 (contour de focus) et S23 (axe-core)

async function outlines(page, count) {
  const seen = new Map()
  for (let i = 0; i < count; i++) {
    await page.keyboard.press('Tab')
    const info = await page.evaluate(() => {
      const el = document.activeElement
      if (!el || el === document.body) return null
      const s = getComputedStyle(el)
      const label = (el.getAttribute('aria-label') || el.labels?.[0]?.textContent || el.textContent || el.tagName).trim().slice(0, 40)
      return { label, ok: (s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) >= 2) || s.boxShadow !== 'none' }
    })
    if (info && !seen.has(info.label)) seen.set(info.label, info.ok)
  }
  return seen
}

test('S22 — étapes 1 et 2 : chaque élément focalisé au clavier a un contour de 2 px au moins', async ({ page }) => {
  await open(page, 1440)
  const step1 = await outlines(page, 8)
  await reach(page, 2)
  const step2 = await outlines(page, 10)

  const all = new Map([...step1, ...step2])
  for (const [label, ok] of all) expect.soft(ok, `focus visible sur « ${label} »`).toBe(true)
  expect(all.size).toBeGreaterThan(6)
})

const states = {
  'étape 1': async () => {},
  'étape 1 en erreur': async (page) => { await button(page, 'Next Step').click() },
  'étape 2': async (page) => { await reach(page, 2) },
  'étape 3': async (page) => { await reach(page, 3, { addons: ['Online service'] }) },
  'étape 4': async (page) => { await reach(page, 4, { addons: ['Online service'] }) },
  'remerciement': async (page) => { await reach(page, 5) },
}

for (const width of [1440, 375]) {
  for (const [name, go] of Object.entries(states)) {
    test(`S23 — axe-core : ${name} (${width} px)`, async ({ page }) => {
      await open(page, width)
      await go(page)
      const { violations } = await new AxeBuilder({ page }).analyze()
      const serious = violations.filter((v) => ['serious', 'critical'].includes(v.impact))
      expect(serious.map((v) => `${v.id} : ${v.nodes.map((n) => n.target).join(', ')}`)).toEqual([])
    })
  }
}

import { test, expect } from '@playwright/test'
import { open, field, button, reach, diffRatio } from './helpers.js'

// Spec §7 — S25 à S27 : seuils calibrés en Phase 3 (specs/visuel/penpot/maquette.md)

const two = ['Online service', 'Larger storage']
const screens = [
  { id: 'S25', ref: 'desktop-etape-1.jpg', w: 1440, h: 810, max: 0.05, reach: async () => {} },
  { id: 'S25', ref: 'desktop-etape-2-mensuel.jpg', w: 1440, h: 810, max: 0.05, reach: (p) => reach(p, 2) },
  { id: 'S25', ref: 'desktop-etape-2-annuel.jpg', w: 1440, h: 810, max: 0.05, reach: (p) => reach(p, 2, { yearly: true }) },
  { id: 'S25', ref: 'desktop-etape-3-mensuel.jpg', w: 1440, h: 810, max: 0.05, reach: (p) => reach(p, 3, { addons: two }) },
  { id: 'S25', ref: 'desktop-etape-3-annuel.jpg', w: 1440, h: 810, max: 0.05, reach: (p) => reach(p, 3, { yearly: true, addons: two }) },
  { id: 'S25', ref: 'desktop-etape-4-mensuel.jpg', w: 1440, h: 810, max: 0.05, reach: (p) => reach(p, 4, { addons: two }) },
  { id: 'S25', ref: 'desktop-etape-4-annuel.jpg', w: 1440, h: 810, max: 0.05, reach: (p) => reach(p, 4, { yearly: true, addons: two }) },
  { id: 'S25', ref: 'desktop-remerciement.jpg', w: 1440, h: 810, max: 0.05, reach: (p) => reach(p, 5) },
  {
    id: 'S26', ref: 'etats-etape-1.jpg', w: 1440, h: 810, max: 0.05,
    reach: async (p) => {
      await field(p, 'Name').fill('Vanessa Mint')
      await button(p, 'Next Step').click()
      await field(p, 'Email Address').fill('vanessamint@')
    },
  },
  { id: 'S27', ref: 'mobile-etape-1.jpg', w: 375, h: 667, max: 0.056, reach: async () => {} },
  { id: 'S27', ref: 'mobile-etape-2-mensuel.jpg', w: 375, h: 695, max: 0.051, reach: (p) => reach(p, 2) },
  { id: 'S27', ref: 'mobile-etape-2-annuel.jpg', w: 375, h: 761, max: 0.053, reach: (p) => reach(p, 2, { yearly: true }) },
  { id: 'S27', ref: 'mobile-etape-3-mensuel.jpg', w: 375, h: 695, max: 0.061, reach: (p) => reach(p, 3, { addons: two }) },
  { id: 'S27', ref: 'mobile-etape-3-annuel.jpg', w: 375, h: 695, max: 0.061, reach: (p) => reach(p, 3, { yearly: true, addons: two }) },
  { id: 'S27', ref: 'mobile-etape-4-mensuel.jpg', w: 375, h: 695, max: 0.05, reach: (p) => reach(p, 4, { addons: two }) },
  { id: 'S27', ref: 'mobile-etape-4-annuel.jpg', w: 375, h: 695, max: 0.05, reach: (p) => reach(p, 4, { yearly: true, addons: two }) },
  { id: 'S27', ref: 'mobile-remerciement.jpg', w: 375, h: 695, max: 0.051, reach: (p) => reach(p, 5) },
]

for (const { id, ref, w, h, max, reach: go } of screens) {
  test(`${id} — ${ref} (≤ ${(max * 100).toFixed(1)} %)`, async ({ page }, testInfo) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await open(page, w, h)
    await go(page)
    await page.mouse.move(0, 0) // aucun survol pendant la capture

    const shot = await page.screenshot({ caret: 'hide', animations: 'disabled' })
    await testInfo.attach(ref.replace('.jpg', '.png'), { body: shot, contentType: 'image/png' })
    const ratio = diffRatio(shot, ref)
    testInfo.annotations.push({ type: 'pixels différents', description: `${(ratio * 100).toFixed(2)} %` })
    expect(ratio).toBeLessThanOrEqual(max)
  })
}

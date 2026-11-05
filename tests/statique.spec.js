import { test, expect } from '@playwright/test'
import { execFileSync } from 'node:child_process'
import { readFileSync, readdirSync } from 'node:fs'

// S24 (validateur W3C Nu) et fitness functions des ADR-0003 et ADR-0004

const root = (path) => new URL(`../${path}`, import.meta.url)
const vnu = root('node_modules/vnu-jar/build/dist/vnu.jar').pathname
const COLOR = /#[0-9a-f]{3,8}\b|\brgba?\(|\bhsla?\(/i

test('S24 — le HTML servi passe le validateur W3C Nu sans erreur', async ({ request }) => {
  const html = await (await request.get('./')).text()
  let output = ''
  try {
    execFileSync('java', ['-jar', vnu, '--errors-only', '--format', 'text', '-'], { input: html, encoding: 'utf8', stdio: 'pipe' })
  } catch (error) {
    output = `${error.stdout}${error.stderr}`
  }
  expect(output).toBe('')
})

test('ADR-0003 — aucune couleur écrite en dur hors du bloc @theme', () => {
  const sources = {
    'index.html': readFileSync(root('index.html'), 'utf8'),
    'src/style.css (hors @theme)': readFileSync(root('src/style.css'), 'utf8').replace(/@theme\s*{[^}]*}/, ''),
  }
  for (const file of readdirSync(root('src')).filter((f) => f.endsWith('.js'))) sources[`src/${file}`] = readFileSync(root(`src/${file}`), 'utf8')

  expect(Object.entries(sources).filter(([, text]) => COLOR.test(text)).map(([file]) => file)).toEqual([])
})

test('ADR-0004 — rien n\'est chargé hors du domaine ; Ubuntu 400, 500 et 700 se chargent', async ({ page, baseURL }) => {
  const outside = []
  page.on('request', (r) => { if (new URL(r.url()).origin !== new URL(baseURL).origin) outside.push(r.url()) })
  await page.goto('./')
  // load() télécharge la graisse même si aucun texte ne l'utilise encore ; [] si elle n'est pas déclarée
  const weights = await page.evaluate(async () => {
    const found = []
    for (const w of ['400', '500', '700']) if ((await document.fonts.load(`${w} 16px Ubuntu`)).length) found.push(w)
    return found
  })
  expect(weights).toEqual(['400', '500', '700'])
  expect(outside).toEqual([])
})

import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// base : le site est servi par GitHub Pages sous /multi-step-form/
export default defineConfig({ base: '/multi-step-form/', plugins: [tailwindcss()] })

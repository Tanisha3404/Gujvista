
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const REPO_NAME = 'gujvista'

export default defineConfig(({ mode }) => ({
  // Dev uses '/', while build and preview use the GitHub Pages sub-path.
  base: mode === 'production' ? `/${REPO_NAME}/` : '/',
  plugins: [react(), tailwindcss()],
}))

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// base './' makes the built files use relative paths, so they also work from file:// inside Electron
export default defineConfig({
  plugins: [react()],
  base: './',
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // IMPORTANTE: Isso garante que o site carregue no caminho /sv-github/
  base: '/sv-github/',
})
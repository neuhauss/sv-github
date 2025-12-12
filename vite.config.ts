import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // IMPORTANTE: O nome abaixo deve ser EXATAMENTE igual ao nome do seu repositório no GitHub.
  // Exemplo: se a url for https://github.com/usuario/meu-lab-suse, coloque base: '/meu-lab-suse/'
  base: '/suse-virtualization-poc/',
})
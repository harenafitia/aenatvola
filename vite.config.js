import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    headers: {
      'Content-Security-Policy': [
        "default-src 'self'",
        // Nécessaire pour Vite HMR (Hot Module Replacement) en développement
        "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
        // Pour Google Fonts
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "font-src 'self' https://fonts.gstatic.com",
        // Pour votre API
        "connect-src 'self' https://api-aenat.alljacquinot.tech ws://localhost:* http://localhost:*",
        // Pour les images si nécessaire
        "img-src 'self' data: blob: https:",
      ].join('; ')
    }
  },
  define:{
    'process.env': {},
  },
  base: '/',
})

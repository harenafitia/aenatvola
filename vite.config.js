import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      'Content-Security-Policy': [
        "default-src 'self'",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "style-src-elem 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "font-src 'self' https://fonts.gstatic.com",
        "connect-src 'self' https://api-aenat.alljacquinot.tech",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
        "img-src 'self' data: blob: https:",
      ].join('; ')
    },

    proxy: {
      '/api': {
        target: 'http://votre-api-url',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    },
    // Ajout de la configuration du proxy ici
    // proxy: {
    //   '/api': {
    //     target: 'https://api-aenat.alljacquinot.tech',
    //     changeOrigin: true,
    //     secure: false,
    //     rewrite: (path) => path.replace(/^\/api/, '')
    //   }
    // }
  },

  // Configuration de preview inchangée
  preview: {
    headers: {
      'Content-Security-Policy': [
        "default-src 'self'",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "style-src-elem 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "font-src 'self' https://fonts.gstatic.com",
        "connect-src 'self' https://api-aenat.alljacquinot.tech",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
        "img-src 'self' data: blob: https:"
      ].join('; ')
    }
  },

  define: {
    'process.env': {},
  },
  base: '/',
})
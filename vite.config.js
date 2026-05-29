import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Mathe Übungen',
        short_name: 'Mathe',
        description: 'Mathematik-Übungen für die Grundschule',
        theme_color: '#4c6ef5',
        background_color: '#f8f9fa',
        display: 'standalone',
        orientation: 'portrait',
        lang: 'de',
        icons: [
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,woff2}']
      }
    })
  ],
  test: {
    environment: 'node'
  }
})

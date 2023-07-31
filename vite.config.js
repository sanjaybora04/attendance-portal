import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions:{
        enabled:true
      },
      workbox: {
        globPatterns: ["**/*"],
      },
      manifest: {
        icons: [
          {
            src: "/vite.svg",
            sizes: "512x512",
            type: "image/svg+xml",
            purpose: "any maskable"
          },
          {
            src: "/img.png",
            sizes: "512x512",
            type: "image/png"
          }
        ],
        theme_color: "#FFFFFF",
        start_url: '/',
        scope: '/',
        orientation: 'portrait',
        display:'standalone'
      }
    })
  ],
})

import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), vueDevTools(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('/components/icons/')) {
            return 'svg-icons'
          }

          if (id.includes('node_modules')) {
            if (id.includes('vue')) return 'vue'
            if (id.includes('echarts')) return 'echarts'
            if (id.includes('pinia')) return 'pinia'
            return 'vendor'
          }
        },
      },
    },
  },
})

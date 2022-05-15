import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import vitePluginMockService from 'vite-plugin-mock-service'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vitePluginMockService({ port: 8000 })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// @ts-nocheck
import { svgstore } from './src/vite_plugins/svgstore';
import Unocss from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    svgstore(),
    Unocss(),
  ],
  server: {
    proxy: {
      '/api/v1': {
        target: 'http://121.196.236.94:3000/',
      }
    }
  }
})

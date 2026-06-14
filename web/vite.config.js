import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: 'dist',
    assetsInlineLimit: 65536,
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
        entryFileNames: 'assets/app.js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]'
      }
    }
  },
  server: {
    proxy: {
      '/save': 'http://192.168.1.100',
      '/sendsms': 'http://192.168.1.100',
      '/ping': 'http://192.168.1.100',
      '/query': 'http://192.168.1.100',
      '/flight': 'http://192.168.1.100',
      '/at': 'http://192.168.1.100',
      '/log': 'http://192.168.1.100',
      '/modem': 'http://192.168.1.100',
      '/wifi': 'http://192.168.1.100'
    }
  }
})

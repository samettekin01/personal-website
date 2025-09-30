import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  base: '/',
  server: {
    port: 5173, // CRA'daki gibi 3000 portu
    open: true
  },
  build: {
    outDir: 'build' // CRA'daki gibi build klasörü
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components')
    }
  }
})
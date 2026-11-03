import { defineConfig } from 'vite'

export default defineConfig({
  base: '/weblarek/',
  server: {
    host: '127.0.0.1',
    port: 5173,
    strictPort: false,
  },
  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: [
          './src/scss'
        ],
      },
    },
  },
})

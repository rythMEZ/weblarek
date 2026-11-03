import { defineConfig } from 'vite'

export default defineConfig({
  base: '/weblarek/',
<<<<<<< HEAD
  server: {
    host: '127.0.0.1',
    port: 5173,
    strictPort: false,
  },
=======
>>>>>>> origin/main
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

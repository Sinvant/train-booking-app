import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
    cors: true,

    // ✅ Optional but recommended (clean API calls)
    proxy: {
      "/api": {
        target: "https://train-booking-app-5.onrender.com",
        changeOrigin: true,
        secure: true,
      }
    }
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: false,
  },
})

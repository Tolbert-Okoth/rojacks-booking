import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Run frontend on port 3000
    proxy: {
      // Proxy requests from /api to your backend server
      '/api': {
        target: 'http://localhost:5000', // Your backend URL
        changeOrigin: true,
        secure: false,
      },
      // --- ADD THIS NEW BLOCK ---
      // Proxy image requests from /uploads to your backend
      '/uploads': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      }
      // --- END OF NEW BLOCK ---
    },
  },
})
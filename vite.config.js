import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Minimal configuration for maximum compatibility
export default defineConfig({
  plugins: [react()],
  define: {
    'import.meta.env.VITE_API_BASE': JSON.stringify(
      process.env.NODE_ENV === 'production' 
        ? 'https://sairaj-travels-v4-backend.onrender.com/api'
        : 'http://localhost:8080/api'
    )
  },
  build: {
    // Minimal build configuration
    minify: 'esbuild',
    // Disable chunking completely to avoid issues
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    },
    // Target ES2020 for better compatibility
    target: 'es2020'
  }
})

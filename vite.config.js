import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'import.meta.env.VITE_API_BASE': JSON.stringify(
      process.env.NODE_ENV === 'production' 
        ? 'https://sairaj-travels-v5-backend.onrender.com/api'
        : 'http://localhost:8080/api'
    )
  },
  build: {
    // Use esbuild for faster, more reliable builds
    minify: 'esbuild',
    rollupOptions: {
      output: {
        // Simplified chunking to avoid dependency issues
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['framer-motion']
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    // Enable gzip compression
    reportCompressedSize: true,
    // Optimize chunks
    chunkSizeWarningLimit: 1000,
    // Source maps for production debugging
    sourcemap: false,
    // Target modern browsers
    target: 'esnext'
  },
  // Enable pre-bundling for faster dev
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion']
  }
})

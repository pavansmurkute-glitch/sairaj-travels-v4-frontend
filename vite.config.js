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
    // Performance optimizations
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn']
      },
      mangle: {
        safari10: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Simplified chunk splitting to avoid dependency issues
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react';
            }
            return 'vendor';
          }
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

import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// Express serves the built dist/ in production (npm start).
// For development with the Edge DevTools CSS editor, use `npm run dev` —
// Vite dev server serves the original src/style.css (not the bundled
// dist/assets/index-*.css), so the browser dev-tools can map CSS edits
// back to the source file. The proxy below forwards /api/ requests to
// the Express server running on port 3000.
export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    outDir: 'dist',
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // base : "/OfficeProject/",

  server: {
    proxy: {
      '/test': {
        // target: 'http://officedatabase101.com.preview.services',
          target: 'https://office-project.infinityfreeapp.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/test/, ''),
      },
    },
  },
});

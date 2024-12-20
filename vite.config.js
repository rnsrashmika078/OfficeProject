import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base : "/NWSDB/react/",
  build: {
    outDir: 'C:/xampp/htdocs/NWSDB/react', // Use forward slashes for the path
},
  server: {
    // base: '/test/react/',
    // port : 5173,
    // host : true,
    // proxy: {
    //   '/test': {
    //     target: 'http://officedatabase101.com.preview.services',
    //     changeOrigin: true,
    //     secure: false,
    //     rewrite: (path) => path.replace(/^\/test/, ''),
    //   },
    // },
  },
});

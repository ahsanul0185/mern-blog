import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  server : {
    proxy : {
      "/api" : {
        target : "https://mern-blog-sdjv.onrender.com/",
        secure : false
      }
    }
  },
  plugins: [react(), tailwindcss(), svgr()],
})

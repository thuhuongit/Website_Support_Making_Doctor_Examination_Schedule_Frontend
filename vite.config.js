import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  server: {
    host: 'localhost',
    port: 5173,  // Kiểm tra cổng có đúng không
    strictPort: true, // Chặn đổi sang cổng khác nếu 5173 bị chiếm
  },


  plugins: [
    tailwindcss(),
    react()

  ],
})

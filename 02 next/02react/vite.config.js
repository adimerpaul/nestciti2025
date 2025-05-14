import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // permite acceder desde red externa
    origin: 'https://9e24-2800-cd0-afc6-e100-6060-8c68-bb66-8159.ngrok-free.app',
    cors: true, // permite peticiones CORS
    hmr: {
      protocol: 'wss',
      host: '9e24-2800-cd0-afc6-e100-6060-8c68-bb66-8159.ngrok-free.app',
    }
  }
})

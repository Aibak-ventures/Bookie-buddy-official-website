import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'

export default defineConfig({
  plugins: [react(), basicSsl()],
  server: {
    host: true,   // exposes on LAN — phone can reach via your machine's IP
    // https: true,  // self-signed cert via basicSsl — required for navigator.share
  },
})

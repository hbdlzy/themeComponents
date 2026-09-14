import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    // Bind 0.0.0.0 so LAN IP:port access works (default is 127.0.0.1 only).
    host: true,
  },
})

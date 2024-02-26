import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url';

// https://vitejs.dev/config/
export default defineConfig(() =>{
  return {
  plugins: [react(), sentryVitePlugin({
    org: "alexchoicy",
    project: "admin-ui"
  })],
  resolve: {
    alias: [
      { find: '~' , replacement: fileURLToPath(new URL('./src/', import.meta.url))}
    ]
  },
  build: {
    sourcemap: true
  },
  server: {
    proxy: {
      "/api": { 
        target: "http://localhost:5003/api/v1",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    }
  },
}})

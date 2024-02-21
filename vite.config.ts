import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url';

// https://vitejs.dev/config/
export default defineConfig({
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
  }
})
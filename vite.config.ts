import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url';

// https://vitejs.dev/config/
export default defineConfig((mode : any) =>{
  const env = loadEnv(mode, process.cwd());
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
        target: env.VITE_API_DOMAIN,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    }
  },
}})

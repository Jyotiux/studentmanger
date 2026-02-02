import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/students': 'http://localhost:8080'
    }
  },
  build: {
    // build output goes to Spring Boot static resources so the backend can serve it
    outDir: '../src/main/resources/static',
    emptyOutDir: true
  }
})
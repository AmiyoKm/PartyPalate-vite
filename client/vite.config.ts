import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000, // Set the size limit to 1000 KB (1 MB)
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy:{
      "/api/v1/" :  {
        target : "http://localhost:3000",
        changeOrigin : true
      }
    }
  }
})

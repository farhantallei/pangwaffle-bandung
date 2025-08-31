import path from "path"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { viteSingleFile } from "vite-plugin-singlefile"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), viteSingleFile()],
  build: {
    target: "esnext",
    assetsInlineLimit: Infinity,
    // minify: false,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: "./",
})

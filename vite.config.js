import { resolve } from 'path'
import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact()],
  build: {
    outDir: "docs",
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        nested: resolve(__dirname, 'src/iframe_test/index.html'),
      },
    },
  },
  base: "/transition-enumeration/"
})

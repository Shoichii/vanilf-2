import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
  viteStaticCopy({
    targets: [
      {
        src: './gsap.min.js',
        dest: './'
      },
      {
        src: './bg-script.js',
        dest: './'
      }
    ]
  }),
  ],
  // build: {
  //   outDir: 'dist',
  // },
  server: {
    open: true,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "src/setupTests",
    mockReset: true,
  },
})

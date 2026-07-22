import { defineConfig } from "vite";

export default defineConfig({
  root: ".",
  // Relative asset paths so the built output works from any subpath
  // (e.g. a GitHub Pages project site served at /<repo>/).
  base: "./",
  server: {
    host: "127.0.0.1",
    port: 5174,
    strictPort: true,
  },
  preview: {
    host: "127.0.0.1",
    port: 5174,
    strictPort: true,
  },
  build: {
    outDir: "docs",
  },
});

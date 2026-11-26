import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
export default defineConfig({
  plugins: [react()],
  resolve: { alias: { "@": path.resolve(process.cwd(), "src") } },
  define: { "process.env.NODE_ENV": JSON.stringify("production"), __MODEL__: JSON.stringify(process.env.MODEL || "") },
  build: { outDir: "standalone/out", emptyOutDir: true, minify: "esbuild", lib: { entry: "standalone/entry.tsx", formats: ["iife"], name: "SemSiteModel", fileName: () => "model.js" }, rollupOptions: { output: { inlineDynamicImports: true } }, cssCodeSplit: false },
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        onlyExplicitManualChunks: true,
        manualChunks(id) {
          if (id.includes("/node_modules/three/build/three.core.js")) return "three-core";
          if (id.includes("/node_modules/three/build/three.module.js")) return "three-webgl";
          if (id.includes("/node_modules/@react-three/fiber/")) return "react-three";
          if (id.includes("/node_modules/@codemirror/") || id.includes("/node_modules/@lezer/")) return "editor";
          if (id.includes("/node_modules/gsap/")) return "gsap";
        },
      },
    },
  },
});

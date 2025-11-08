import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(async ({ mode }) => {
  const plugins = [react()];

  if (mode === "development") {
    try {
      const mod = await import("lovable-tagger");
      if (mod?.componentTagger) {
        plugins.push(mod.componentTagger());
      }
    } catch {
      console.warn("⚠️ lovable-tagger not found — skipping dev plugin");
    }
  }

  return {
    base: "./", // Измените это с "/" на "./"
    publicDir: "public",
    resolve: { 
      alias: { 
        "@": path.resolve(__dirname, "./src") 
      } 
    },
    server: {
      host: "::",
      port: 5173,
      proxy: { 
        "/api": { 
          target: "http://localhost:3001", 
          changeOrigin: true, 
          secure: false 
        } 
      }
    },
    plugins,
    build: {
      outDir: "dist",
      rollupOptions: {
        input: path.resolve(__dirname, "index.html"),
      }
    }
  };
});
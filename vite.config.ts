import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  const plugins = [react()];

  // Подключаем lovable-tagger только в development
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
    // Указываем публичную папку и корень
    publicDir: "public",
    resolve: {
      alias: { "@": path.resolve(__dirname, "./src") }
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
    build: {
      outDir: "dist",
      // Это важно для SPA на Vercel
      rollupOptions: {
        input: path.resolve(__dirname, "index.html")
      }
    },
    // Чтобы Vite правильно генерировал пути к JS/CSS
    base: "/"
  };
});

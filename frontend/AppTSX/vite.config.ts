import tailwindcss from "@tailwindcss/vite"
import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Cargar variables del archivo .env.dev o .env.prod según el modo
  const env = loadEnv(mode, process.cwd());

  // Determinar si estamos en desarrollo
  const isDev = mode === 'dev' || mode === 'development';

  return {
    plugins: [react(),tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      proxy: {
        '/api': {
          target: isDev
            ? 'http://localhost:3000' // tu backend local
            : 'https://apiproductos-8prf.onrender.com', // tu backend en producción
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  };
});


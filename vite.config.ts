import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import fs from "fs";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const isDev = env.VITE_ENV !== "production";
  const targetUrl = isDev
    ? env.VITE_API_URL || "http://localhost:5000"
    : env.VITE_API_URL_HOST;
  const keyPath = "certs/stillness.local-key.pem";
  const certPath = "certs/stillness.local.pem";
  const hasLocalCerts = fs.existsSync(keyPath) && fs.existsSync(certPath);

  const resolvePath = (dir: string) =>
    fileURLToPath(new URL(`./src/${dir}`, import.meta.url));

  return {
    plugins: [vue()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        "@components": resolvePath("components"),
        "@views": resolvePath("views"),
        "@assets": resolvePath("assets"),
        "@images": resolvePath("assets/images"),
        "@config": resolvePath("config"),
        "@stores": resolvePath("stores"),
        "@router": resolvePath("router"),
        "@utils": resolvePath("utils"),
        "@layouts": resolvePath("layouts"),
        "@composables": resolvePath("composables"),
        "@services": resolvePath("services"),
        "@lib": resolvePath("lib"),
        "@types": resolvePath("types"),
        "@hooks": resolvePath("hooks"),
      },
    },
    server: {
      host: true,
      port: 5173,
      ...(isDev && {
        ...(hasLocalCerts && {
          https: {
            key: fs.readFileSync(keyPath),
            cert: fs.readFileSync(certPath),
          },
        }),
        proxy: {
          "/api": {
            target: targetUrl,
            changeOrigin: true,
            secure: false,
          },
        },
      }),
    },
    preview: {
      port: process.env.PORT ? parseInt(process.env.PORT) : 4173,
      host: "0.0.0.0",
    },
    build: {
      outDir: "dist",
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ["vue", "vue-router"],
          },
        },
      },
    },
    define: {
      __VUE_PROD_DEVTOOLS__: false,
      __API_URL__: JSON.stringify(
        isDev ? targetUrl : env.VITE_API_URL_HOST
      ),
      "process.env.NODE_ENV": JSON.stringify(mode),
    },
  };
});

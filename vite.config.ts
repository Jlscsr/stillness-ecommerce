import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import fs from "fs";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const isDev = env.VITE_ENV === "development";
  const apiUrl = isDev ? env.VITE_API_URL : env.VITE_API_URL_HOST;

  const resolvePath = (dir: string) =>
    fileURLToPath(new URL(`./src/${dir}`, import.meta.url));

  return {
    plugins: [vue()],
    server: {
      host: isDev,
      port: 5173,
      ...(isDev && {
        https: {
          key: fs.readFileSync(
            path.resolve(__dirname, "certs/stillness.local-key.pem")
          ),
          cert: fs.readFileSync(
            path.resolve(__dirname, "certs/stillness.local.pem")
          ),
        },
      }),
    },
    resolve: {
      alias: {
        "@": resolvePath(""),
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
    define: {
      __API_URL__: JSON.stringify(apiUrl),
    },
  };
});

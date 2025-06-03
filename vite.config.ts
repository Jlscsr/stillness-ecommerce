import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import fs from "fs";
import path from "path";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env variables based on mode
  const env = loadEnv(mode, process.cwd());

  // Determine which API URL to use based on environment
  const apiUrl =
    env.VITE_ENV === "production" ? env.VITE_API_URL_HOST : env.VITE_API_URL;

  return {
    plugins: [vue()],
    server: {
      host: true,
      port: 5173,
      https:
        env.VITE_ENV === "development"
          ? {
              key: fs.readFileSync(
                path.resolve(__dirname, "certs/stillness.local-key.pem")
              ),
              cert: fs.readFileSync(
                path.resolve(__dirname, "certs/stillness.local.pem")
              ),
            }
          : {},
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        "@components": fileURLToPath(
          new URL("./src/components", import.meta.url)
        ),
        "@views": fileURLToPath(new URL("./src/views", import.meta.url)),
        "@assets": fileURLToPath(new URL("./src/assets", import.meta.url)),
        "@images": fileURLToPath(
          new URL("./src/assets/images", import.meta.url)
        ),
        "@config": fileURLToPath(new URL("./src/config", import.meta.url)),
        "@stores": fileURLToPath(new URL("./src/stores", import.meta.url)),
        "@router": fileURLToPath(new URL("./src/router", import.meta.url)),
        "@utils": fileURLToPath(new URL("./src/utils", import.meta.url)),
        "@layouts": fileURLToPath(new URL("./src/layouts", import.meta.url)),
        "@composables": fileURLToPath(
          new URL("./src/composables", import.meta.url)
        ),
        "@services": fileURLToPath(new URL("./src/services", import.meta.url)),
        "@lib": fileURLToPath(new URL("./src/lib", import.meta.url)),
        "@types": fileURLToPath(new URL("./src/types", import.meta.url)),
        "@hooks": fileURLToPath(new URL("./src/hooks", import.meta.url)),
      },
    },
    define: {
      // Make API URL available globally in the app
      __API_URL__: JSON.stringify(apiUrl),
    },
  };
});

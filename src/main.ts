import { createApp } from "vue";
import { createPinia } from "pinia";
import { MotionPlugin } from "@vueuse/motion";
import { plugin, defaultConfig } from "@formkit/vue";

import { router } from "@/router/router";
import App from "./App.vue";
import "./style.css";

// Initialize the app
const initApp = async () => {
  try {
    const app = createApp(App);
    const pinia = createPinia();

    // Register plugins
    app.use(pinia);
    app.use(MotionPlugin);
    app.use(plugin, defaultConfig);
    app.use(router);

    // Global error handler
    app.config.errorHandler = (err, _instance, _info) => {
      console.error("Vue error:", err);
      // Here you can add error reporting (e.g., Sentry, LogRocket)
    };

    // Global properties can be added here
    // app.config.globalProperties.$myGlobal = 'global value';

    // Mount the app
    app.mount("#app");

    // Log successful initialization
    if (import.meta.env.DEV) {
      console.log("App initialized in development mode");
    }
  } catch (error) {
    console.error("Failed to initialize app:", error);
    // Render error state
    const appElement = document.getElementById("app");
    if (appElement) {
      appElement.innerHTML = `
        <div style="padding: 2rem; text-align: center; font-family: sans-serif;">
          <h1>Something went wrong</h1>
          <p>We're having trouble loading the application. Please try refreshing the page.</p>
          <p>If the problem persists, please contact support.</p>
          <button onclick="window.location.reload()" style="margin-top: 1rem; padding: 0.5rem 1rem; cursor: pointer;">
            Refresh Page
          </button>
        </div>
      `;
    }
  }
};

// Start the application
initApp();

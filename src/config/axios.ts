import axios from "axios";
import type { AxiosError } from "axios";

const baseURL =
  import.meta.env.PROD
    ? import.meta.env.VITE_API_URL_HOST || import.meta.env.VITE_API_URL
    : import.meta.env.VITE_API_URL || "http://localhost:5000";

if (!baseURL) {
  throw new Error("Missing frontend API URL configuration.");
}

const api = axios.create({
  baseURL: `${baseURL}/api`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

type UnauthorizedHandler = (error: AxiosError) => void | Promise<void>;

let unauthorizedHandler: UnauthorizedHandler | null = null;

export const setUnauthorizedHandler = (handler: UnauthorizedHandler) => {
  unauthorizedHandler = handler;
};

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      await unauthorizedHandler?.(error);
    }

    return Promise.reject(error);
  }
);

export default api;

import axios from "axios";

const baseURL =
  import.meta.env.VITE_ENV === "production"
    ? import.meta.env.VITE_API_URL_HOST
    : import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: `${baseURL}`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default api;

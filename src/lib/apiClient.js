import axios from "axios";
import { storage } from "./storage";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// attach token safely
apiClient.interceptors.request.use((config) => {
  const token = storage.getToken();

  if (token && token !== "null" && token !== "undefined") {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// global response handling
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      storage.clear();
      window.location.href = "/login";
    }

    return Promise.reject(
      error.response?.data?.message || "Something went wrong",
    );
  },
);

export default apiClient;

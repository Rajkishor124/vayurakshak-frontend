import axios from "axios";
import { storage } from "./storage";
import { loadingBridge } from "../ui/loading/loading-bridge";
import { toastBridge } from "../ui/toast/toast-bridge";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// REQUEST INTERCEPTOR
apiClient.interceptors.request.use(
  (config) => {
    loadingBridge.start(); // 🔥 START LOADER

    const token = storage.getToken();

    if (token && token !== "null" && token !== "undefined") {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    loadingBridge.stop(); // 🔥 STOP IF REQUEST FAILS
    return Promise.reject(error);
  },
);

// RESPONSE INTERCEPTOR
apiClient.interceptors.response.use(
  (response) => {
    loadingBridge.stop(); // 🔥 STOP LOADER
    return response.data;
  },
  (error) => {
    loadingBridge.stop(); // 🔥 STOP LOADER ON ERROR

    const status = error.response?.status;
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Something went wrong";

    if (status === 401) {
      storage.clear();
      window.location.replace("/login");
    } else {
      toastBridge.show(message, "error"); // 🔥 GLOBAL ERROR TOAST
    }

    return Promise.reject({
      status,
      message,
    });
  },
);

export default apiClient;

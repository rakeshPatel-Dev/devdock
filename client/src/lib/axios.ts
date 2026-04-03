// lib/axios.ts
import axios from "axios";

const BASE_URL =  "http://localhost:3000/api";

const axiosInstance = axios.create({
baseURL: BASE_URL,
  withCredentials: true, // Important: This enables cookies to be sent and received
  headers: {
    "Content-Type": "application/json",
  },
});



// Request interceptor to add any additional headers if needed
axiosInstance.interceptors.request.use(
  (config) => {
    // You can add CSRF token or any other headers here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      if (typeof window !== "undefined") {
        // Redirect to login if not already there
        if (!window.location.pathname.includes("/login")) {
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
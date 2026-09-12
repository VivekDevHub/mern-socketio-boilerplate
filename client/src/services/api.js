import axios from "axios";

// Create an Axios instance with the base API URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Add an interceptor to attach the JWT to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;

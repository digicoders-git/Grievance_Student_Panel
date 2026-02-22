import axios from "axios";

const API = axios.create({
  // baseURL: "http://localhost:4000",
  baseURL: import.meta.env.VITE_API_URL,
});

// Add token to requests if it exists
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("studentToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;

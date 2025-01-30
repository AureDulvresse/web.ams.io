import { AUTH_CONFIG } from "@/auth.config";
import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

// Instance axios personnalisée

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Important pour les cookies cross-origin
});


// Intercepteur pour ajouter le token aux requêtes
api.interceptors.request.use((config) => {
  const token = cookies().get(AUTH_CONFIG.storage.ACCESS_TOKEN);

  if (token) {
    config.headers.Authorization = `Bearer ${token.value}`;
  }
  return config;
});

// Intercepteur pour gérer le refresh token
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest: any = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = cookies().get(AUTH_CONFIG.storage.REFRESH_TOKEN);
        const response = await axios.post(
          `${API_URL}/${AUTH_CONFIG.endpoints.REFRESH_TOKEN}`,
          {
            refresh: refreshToken,
          }
        );

        const { access } = response.data;
        cookies().set(AUTH_CONFIG.storage.ACCESS_TOKEN, access);

        originalRequest.headers.Authorization = `Bearer ${access}`;
        return api(originalRequest);
      } catch (refreshError) {
        cookies().delete(AUTH_CONFIG.storage.ACCESS_TOKEN);
        cookies().delete(AUTH_CONFIG.storage.REFRESH_TOKEN);
        cookies().delete(AUTH_CONFIG.storage.USER);
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;

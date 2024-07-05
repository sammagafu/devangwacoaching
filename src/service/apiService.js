// src/apiService.js
import axios from 'axios';
import { useAuthStore } from '@/stores/authStore.js';

const baseURL = 'http://localhost:8000/api/v1/';

const axiosInstance = axios.create({
  baseURL: baseURL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();
    const token = authStore.accessToken; // Access token from your store
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const authStore = useAuthStore();
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (authStore.refreshToken) {
        try {
          const response = await axios.post(`${baseURL}auth/jwt/refresh/`, {
            refresh: authStore.refreshToken,
          });
          const newToken = response.data.access;
          authStore.setTokens(newToken, authStore.refreshToken); // Update tokens in your store
          originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
          return axiosInstance(originalRequest);
        } catch (e) {
          authStore.logout(); // Logout user on refresh token failure
          return Promise.reject(e);
        }
      } else {
        authStore.logout(); // Logout if no refresh token is available
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

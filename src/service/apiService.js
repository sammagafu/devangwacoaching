// src/service/apiService.js
import axios from 'axios';
import { useAuthStore } from '@/stores/authStore.js';

const baseURL = 'https://devangwacoaching.com/api/v1/';

const axiosInstance = axios.create({
  baseURL: baseURL,
});

// Request interceptor to attach the access token to each request
axiosInstance.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();
    const token = authStore.getAccessToken; // Access token from the store getter
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token refresh on 401 error
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const authStore = useAuthStore();
    const originalRequest = error.config;

    // Check if the error is due to an unauthorized access and it's not a retry
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry &&
      authStore.getRefreshToken
    ) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh the access token using the refresh token
        const response = await axios.post(`${baseURL}auth/jwt/refresh/`, {
          refresh: authStore.getRefreshToken,
        });

        const newAccessToken = response.data.access;
        authStore.setTokens(newAccessToken, authStore.getRefreshToken, authStore.rememberMe); // Update tokens in the store

        // Set the new access token in the request headers
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        // Retry the original request with the new access token
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // If refreshing the token fails, log the user out
        authStore.logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

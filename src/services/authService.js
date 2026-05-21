import axios from 'axios';
import { useAuthStore } from '@/stores/auth';

const API_URL = import.meta.env.VITE_API_URL || '/api/v1/';
const TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const USER_KEY = 'user_data';
const IS_DEV = import.meta.env.DEV;

const debugLog = (...args) => {
  if (IS_DEV) {
    console.log(...args);
  }
};

const debugError = (...args) => {
  if (IS_DEV) {
    console.error(...args);
  }
};

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

let isRefreshing = false;
let refreshPromise = null;
let isRedirecting = false;

api.interceptors.request.use(
  (config) => {
    const isPublicAuthRoute =
      config.url?.includes('auth/users/') ||
      config.url?.includes('auth/jwt/create/') ||
      config.url?.includes('auth/jwt/refresh/') ||
      config.url?.includes('auth/users/reset_password');

    if (!isPublicAuthRoute) {
      const token = localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
      if (token && !config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    debugLog('Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (!originalRequest || error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    const isPublicAuthRoute =
      originalRequest.url?.includes('auth/jwt/create/') ||
      originalRequest.url?.includes('auth/users/');

    if (isPublicAuthRoute) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (!isRefreshing) {
      isRefreshing = true;
      const refreshToken =
        localStorage.getItem(REFRESH_TOKEN_KEY) || sessionStorage.getItem(REFRESH_TOKEN_KEY);

      if (!refreshToken) {
        await logoutAndRedirect();
        return Promise.reject(error);
      }

      refreshPromise = api
        .post('auth/jwt/refresh/', { refresh: refreshToken })
        .then((response) => {
          const { access } = response.data;
          const storage = localStorage.getItem(TOKEN_KEY) ? localStorage : sessionStorage;
          storage.setItem(TOKEN_KEY, access);
          api.defaults.headers.common.Authorization = `Bearer ${access}`;

          const authStore = useAuthStore();
          authStore.isAuthenticated = true;
          authStore.updateRoles();
          return access;
        })
        .catch(async (refreshError) => {
          debugError('Token refresh failed:', refreshError.response?.data || refreshError.message);
          await logoutAndRedirect();
          throw refreshError;
        })
        .finally(() => {
          isRefreshing = false;
          refreshPromise = null;
        });
    }

    return refreshPromise
      .then((access) => {
        originalRequest.headers.Authorization = `Bearer ${access}`;
        return api(originalRequest);
      })
      .catch((refreshError) => Promise.reject(refreshError));
  }
);

const authService = {
  async login(credentials, rememberMe) {
    try {
      const tokenResponse = await api.post('auth/jwt/create/', credentials);
      const { access, refresh } = tokenResponse.data;

      api.defaults.headers.common.Authorization = `Bearer ${access}`;

      const userResponse = await api.get('auth/users/me/');
      const user = userResponse.data;

      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem(TOKEN_KEY, access);
      storage.setItem(REFRESH_TOKEN_KEY, refresh);
      storage.setItem(USER_KEY, JSON.stringify(user));

      const authStore = useAuthStore();
      authStore.updateUser(user);
      authStore.isAuthenticated = true;
      authStore.updateRoles();

      return { access, refresh, user };
    } catch (error) {
      if (error.response?.status === 401 && error.response?.data?.detail) {
        throw error.response.data;
      }
      throw error.response?.data || { message: 'Login failed' };
    }
  },

  async register(credentials) {
    try {
      const response = await api.post('auth/users/', credentials);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Registration failed' };
    }
  },

  async requestPasswordReset(email) {
    try {
      await api.post('auth/users/reset_password/', { email });
    } catch (error) {
      throw error.response?.data || { message: 'Could not send reset email' };
    }
  },

  async refreshToken() {
    const refreshToken =
      localStorage.getItem(REFRESH_TOKEN_KEY) || sessionStorage.getItem(REFRESH_TOKEN_KEY);
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    try {
      const response = await api.post('auth/jwt/refresh/', { refresh: refreshToken });
      const { access } = response.data;
      const storage = localStorage.getItem(TOKEN_KEY) ? localStorage : sessionStorage;
      storage.setItem(TOKEN_KEY, access);
      api.defaults.headers.common.Authorization = `Bearer ${access}`;

      const authStore = useAuthStore();
      authStore.isAuthenticated = true;
      authStore.updateRoles();
      return access;
    } catch (error) {
      await this.logout();
      const authStore = useAuthStore();
      authStore.logout();
      await logoutAndRedirect();
      throw error.response?.data || { message: 'Token refresh failed' };
    }
  },

  async logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(REFRESH_TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);
    sessionStorage.removeItem('dismissedCompanyModal');
    delete api.defaults.headers.common.Authorization;
  },

  getToken() {
    return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
  },

  getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN_KEY) || sessionStorage.getItem(REFRESH_TOKEN_KEY);
  },

  getUser() {
    const userData = localStorage.getItem(USER_KEY) || sessionStorage.getItem(USER_KEY);
    return userData ? JSON.parse(userData) : null;
  },

  async isAuthenticated() {
    const token = this.getToken();
    if (!token) return false;

    try {
      await api.get('auth/users/me/');
      return true;
    } catch {
      return false;
    }
  },

  initializeAuth() {
    const token = this.getToken();
    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
      const authStore = useAuthStore();
      authStore.user = this.getUser();
      authStore.isAuthenticated = !!token && !!authStore.user;
      authStore.updateRoles();
    }
  },
};

async function logoutAndRedirect() {
  if (isRedirecting) return;
  isRedirecting = true;

  const authStore = useAuthStore();
  await authService.logout();
  authStore.logout();

  window.location.href = '/auth/sign-in';
  isRedirecting = false;
}

export default authService;

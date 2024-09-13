// src/store/auth.js
import { defineStore } from 'pinia';
import apiService from '@/service/apiService';

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    accessToken: localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken') || '',
    refreshToken: localStorage.getItem('refreshToken') || sessionStorage.getItem('refreshToken') || '',
    rememberMe: localStorage.getItem('rememberMe') === 'true' || false,
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.accessToken,
    getAccessToken: (state) => state.accessToken,
    getRefreshToken: (state) => state.refreshToken,
    getUser: (state) => state.user,
  },

  actions: {
    async login(email, password, rememberMe, router) {
      try {
        const response = await apiService.post('auth/jwt/create/', { email, password });
        this.setTokens(response.data.access, response.data.refresh, rememberMe);
        apiService.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;

        const userResponse = await apiService.get('auth/users/me/');
        this.setUser(userResponse.data);

        router.push({ name: 'admin-dashboard' }); // Adjust the route name to match your admin dashboard
      } catch (error) {
        console.error('Login error:', error);
        throw error; // Let the component handle the error display
      }
    },

    logout(router) {
      this.clearTokens();
      this.clearUser();
      delete apiService.defaults.headers.common['Authorization'];
      router.push({ name: 'login' });
    },

    setTokens(accessToken, refreshToken, rememberMe) {
      this.accessToken = accessToken;
      this.refreshToken = refreshToken;
      this.rememberMe = rememberMe;

      if (rememberMe) {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('rememberMe', 'true');
      } else {
        sessionStorage.setItem('accessToken', accessToken);
        sessionStorage.setItem('refreshToken', refreshToken);
        localStorage.removeItem('rememberMe');
      }
    },

    setUser(userData) {
      this.user = userData;
      if (this.rememberMe) {
        localStorage.setItem('user', JSON.stringify(userData));
      } else {
        sessionStorage.setItem('user', JSON.stringify(userData));
      }
    },

    clearTokens() {
      this.accessToken = '';
      this.refreshToken = '';
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('refreshToken');
    },

    clearUser() {
      this.user = null;
      localStorage.removeItem('user');
      sessionStorage.removeItem('user');
    },
  },
});

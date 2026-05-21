import { defineStore } from 'pinia';
import authService from '@/services/authService';

export const useAuthStore = defineStore('auth', {
  state: () => {
    const user = authService.getUser();
    const token = authService.getToken();
    return {
      user,
      isAuthenticated: !!token && !!user,
      isAdmin: false,
      isStaff: false,
      isNormalUser: false,
    };
  },

  actions: {
    async login(credentials, rememberMe) {
      const data = await authService.login(credentials, rememberMe);
      this.user = data.user;
      this.isAuthenticated = true;
      this.updateRoles();
      return data;
    },

    async register(credentials) {
      await authService.register({
        email: credentials.email,
        password: credentials.password,
        full_name: credentials.full_name || `${credentials.first_name || ''} ${credentials.last_name || ''}`.trim(),
        phonenumber: credentials.phonenumber || credentials.phone_number || '',
        is_individual: credentials.is_individual ?? true,
        is_company: credentials.is_company ?? false,
      });

      const loginResponse = await authService.login(
        { email: credentials.email, password: credentials.password },
        true
      );

      this.user = loginResponse.user;
      this.isAuthenticated = true;
      this.updateRoles();
      return loginResponse;
    },

    async logout() {
      await authService.logout();
      this.user = null;
      this.isAuthenticated = false;
      this.isAdmin = false;
      this.isStaff = false;
      this.isNormalUser = false;
    },

    async initialize() {
      authService.initializeAuth();
      this.user = authService.getUser();
      if (this.user && authService.getToken()) {
        this.isAuthenticated = await authService.isAuthenticated();
      } else {
        this.isAuthenticated = false;
      }
      this.updateRoles();
    },

    updateUser(user) {
      this.user = user;
      const storage = localStorage.getItem('auth_token') ? localStorage : sessionStorage;
      storage.setItem('user_data', JSON.stringify(user));
      this.updateRoles();
    },

    updateRoles() {
      this.isAdmin = this.isAuthenticated && this.user?.is_superuser === true;
      this.isStaff = this.isAuthenticated && this.user?.is_staff === true;
      this.isNormalUser = this.isAuthenticated && !this.user?.is_superuser && !this.user?.is_staff;
    },

    hasCompanies() {
      return this.user?.companies?.length > 0;
    },

    shouldShowCompanyModal() {
      return this.isAuthenticated && this.isNormalUser && !this.hasCompanies();
    },
  },
});

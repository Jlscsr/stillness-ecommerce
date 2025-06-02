import { defineStore } from "pinia";
import { ref } from "vue";

import {
  login,
  register,
  checkAuthStatus,
  logout,
} from "@/services/auth.service";
import type { LoginCredentials, RegisterCredentials } from "@/types/Auth";
import { resetAuthCheck } from "@router/router";

export const useAuthStore = defineStore("auth", () => {
  const isAuthenticated = ref(false);
  const userRole = ref<string | null>(null);
  const error = ref<string | null>(null);

  // Simulate login
  const userLogin = async (credentials: LoginCredentials): Promise<any> => {
    try {
      const response = await login(credentials);

      if (!response.success) {
        isAuthenticated.value = false;
        return { success: false, error: response.message };
      }
      isAuthenticated.value = true;

      return { success: true };
    } catch (err) {
      error.value = "Invalid email or password";
      return { success: false, error: error.value };
    }
  };

  const userRegister = async (credentials: RegisterCredentials) => {
    try {
      const response = await register(credentials);

      if (!response.success) {
        isAuthenticated.value = false;
        return { success: false, error: response.message };
      }

      isAuthenticated.value = true;
      return { success: true };
    } catch (err) {
      error.value = "Registration failed";
      return { success: false, error: error.value };
    }
  };

  const checkUserAuthStatus = async () => {
    try {
      const response = await checkAuthStatus();

      if (!response.success) {
        isAuthenticated.value = false;
        return { success: false, error: response.message };
      }

      isAuthenticated.value = true;
      userRole.value = response.data?.role || null;
    } catch (err) {
      error.value = "Failed to check authentication status";
      isAuthenticated.value = false;
      return { success: false, error: error.value };
    }
  };

  const logoutUser = async () => {
    try {
      await logout();
      isAuthenticated.value = false;
      error.value = null;

      resetAuthCheck();
    } catch (err) {
      error.value = "Logout failed";
      return { success: false, error: error.value };
    }
  };

  return {
    isAuthenticated,
    error,
    userRole,
    userLogin,
    userRegister,
    checkUserAuthStatus,
    logoutUser,
  };
});

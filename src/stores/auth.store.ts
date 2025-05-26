import { defineStore } from "pinia";
import { ref } from "vue";

import {
  login,
  register,
  checkAuthStatus,
  logout,
} from "@/services/auth.service";
import type { LoginCredentials, RegisterCredentials } from "@/types/Auth";
import type { UserCredentials } from "@/types/User";
import { resetAuthCheck } from "@router/router";

export const useAuthStore = defineStore("auth", () => {
  const user = ref<UserCredentials | null>(null);
  const isAuthenticated = ref(false);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // Simulate login
  const userLogin = async (credentials: LoginCredentials): Promise<any> => {
    isLoading.value = true;
    try {
      const response = await login(credentials);

      console.log(response);
      if (!response.success) {
        isAuthenticated.value = false;
        return { success: false, error: response.message };
      }
      user.value = response.data;
      isAuthenticated.value = true;
      return { success: true };
    } catch (err) {
      error.value = "Invalid email or password";
      return { success: false, error: error.value };
    } finally {
      isLoading.value = false;
    }
  };

  const userRegister = async (credentials: RegisterCredentials) => {
    isLoading.value = true;

    try {
      const response = await register(credentials);

      if (!response.success) {
        isAuthenticated.value = false;
        return { success: false, error: response.message };
      }

      user.value = response.data;
      isAuthenticated.value = true;
      return { success: true };
    } catch (err) {
      error.value = "Registration failed";
      return { success: false, error: error.value };
    } finally {
      isLoading.value = false;
    }
  };

  const checkUserAuthStatus = async () => {
    isLoading.value = true;
    try {
      const response = await checkAuthStatus();

      if (!response.success) {
        isAuthenticated.value = false;
        return { success: false, error: response.message };
      }

      user.value = response.data;
      isAuthenticated.value = true;
    } catch (err) {
      error.value = "Failed to check authentication status";
      isAuthenticated.value = false;
      return { success: false, error: error.value };
    } finally {
      isLoading.value = false;
    }
  };

  const logoutUser = async () => {
    try {
      await logout();
      user.value = null;
      isAuthenticated.value = false;
      error.value = null;

      resetAuthCheck();
    } catch (err) {
      error.value = "Logout failed";
      return { success: false, error: error.value };
    } finally {
      isLoading.value = false;
    }
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    userLogin,
    userRegister,
    checkUserAuthStatus,
    logoutUser,
  };
});

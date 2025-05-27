import { post } from "@/composables/requests";
import type { LoginCredentials, RegisterCredentials } from "@/types/Auth";
import type { ApiResponse } from "@/types/Response";
import type { UserCredentials } from "@/types/User";

export const checkAuthStatus = async (): Promise<ApiResponse> => {
  try {
    const response = await post<ApiResponse<UserCredentials>>("/auth/check");

    if (!response.success) {
      throw new Error(response.message);
    }

    return response;
  } catch (error) {
    throw new Error("Failed to check authentication status.");
  }
};

export const login = async (
  payload: LoginCredentials
): Promise<ApiResponse> => {
  try {
    const response = await post<ApiResponse<UserCredentials>>(
      "/auth/login",
      payload
    );

    return response;
  } catch (error) {
    console.error("Login error:", error);
    throw new Error("Login failed. Please try again.");
  }
};

export const register = async (
  payload: RegisterCredentials
): Promise<ApiResponse> => {
  try {
    const response = await post<ApiResponse<UserCredentials>>(
      "/auth/register",
      payload
    );

    return response;
  } catch (error) {
    console.error("Registration error:", error);
    throw new Error("Registration failed. Please try again.");
  }
};

export const logout = async (): Promise<void> => {
  try {
    await post("/auth/logout");
  } catch (error) {
    console.error("Logout error:", error);
    throw new Error("Logout failed. Please try again.");
  }
};

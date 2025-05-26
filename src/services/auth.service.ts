import { post } from "@/composables/requests";
import type {
  LoginCredentials,
  RegisterCredentials,
  AuthResponse,
} from "@/types/Auth";

export const checkAuthStatus = async (): Promise<AuthResponse> => {
  try {
    const response = await post<AuthResponse>("/auth/check");

    if (!response.success) {
      throw new Error(response.message);
    }

    return response;
  } catch (error) {
    console.error("Auth status check error:", error);
    throw new Error("Failed to check authentication status.");
  }
};

export const login = async (
  payload: LoginCredentials
): Promise<AuthResponse> => {
  try {
    const response = await post<AuthResponse>("/auth/login", payload);

    return response;
  } catch (error) {
    console.error("Login error:", error);
    throw new Error("Login failed. Please try again.");
  }
};

export const register = async (
  payload: RegisterCredentials
): Promise<AuthResponse> => {
  try {
    const response = await post<AuthResponse>("/auth/register", payload);

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

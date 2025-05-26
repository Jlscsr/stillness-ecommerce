import type { UserCredentials } from "@/types/User";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  acceptTerms: boolean;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: UserCredentials;
}

import { get, put } from "@/composables/requests";
import type { ApiResponse } from "@/types/Response";
import type {
  UserCredentials,
  UserUpdateRequestBody,
  AddressUpdateRequestBody,
} from "@/types/User";

export const getUserInfo = async (): Promise<ApiResponse<UserCredentials>> => {
  try {
    const response = await get<ApiResponse<UserCredentials>>(`/users/me`);

    if (!response.success) {
      throw new Error(response.message);
    }

    return response;
  } catch (error) {
    throw new Error("Failed to fetch user information.");
  }
};

export const updateUserInfo = async (
  payload: UserUpdateRequestBody
): Promise<ApiResponse> => {
  try {
    const response = await put<ApiResponse<UserCredentials>>(`/users`, payload);

    if (!response.success) {
      throw new Error(response.message);
    }

    return response;
  } catch (error) {
    throw new Error("Failed to check authentication status.");
  }
};

export const updateAddress = async (
  payload: AddressUpdateRequestBody
): Promise<ApiResponse> => {
  try {
    const response = await put<ApiResponse<UserCredentials>>(
      `/users/address`,
      payload
    );

    if (!response.success) {
      throw new Error(response.message);
    }

    return response;
  } catch (error) {
    throw new Error("Failed to update user address.");
  }
};

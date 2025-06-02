import { defineStore } from "pinia";
import { ref } from "vue";

import type { ApiResponse } from "@/types/Response";
import type {
  UserResponse,
  UserUpdateRequestBody,
  AddressUpdateRequestBody,
} from "@/types/User";
import {
  getUserInfo,
  updateUserInfo,
  updateAddress,
} from "@/services/user.service";

export const useUserStore = defineStore("user", () => {
  const userInfo = ref<UserResponse | null>(null);
  const error = ref<string | null>(null);

  const getUserInfoById =
    async (): Promise<ApiResponse<UserResponse> | null> => {
      try {
        const response = await getUserInfo();

        if (!response.success) {
          error.value = response.message;
          return { success: false, message: response.message };
        }

        if (response.data) {
          userInfo.value = response.data;
          console.log("User info fetched successfully:", userInfo.value);
        }
        return { success: true, message: response.message };
      } catch (err) {
        error.value = "Failed to fetch user information.";
        return null;
      }
    };

  const updateUser = async (payload: UserUpdateRequestBody): Promise<any> => {
    try {
      const response = await updateUserInfo(payload);

      if (!response.success) {
        error.value = response.message;
        return { success: false, error: error.value };
      }

      await getUserInfoById();
      return { success: true, message: response.message };
    } catch (err) {
      error.value = "Failed to update user information.";
      return { success: false, error: error.value };
    }
  };

  const updateUserAddress = async (
    payload: AddressUpdateRequestBody
  ): Promise<any> => {
    try {
      const response = await updateAddress(payload);

      if (!response.success) {
        error.value = response.message;
        return { success: false, error: error.value };
      }

      await getUserInfoById();

      return { success: true };
    } catch (err) {
      error.value = "Failed to update user address.";
      return { success: false, error: error.value };
    }
  };

  return {
    userInfo,
    error,
    getUserInfoById,
    updateUser,
    updateUserAddress,
  };
});

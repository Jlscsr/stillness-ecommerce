import { post } from "@/composables/requests";
import type { ApiResponse } from "@/types/Response";

export const createPaypalOrder = async (
  payload: object
): Promise<ApiResponse<any>> => {
  try {
    const response = await post<ApiResponse<any>>(
      "/paypal/create-order",
      payload
    );
    if (!response.success) {
      throw new Error(response.message);
    }
    return response;
  } catch (error) {
    console.error("Error fetching cart items:", error);
    throw new Error("Failed to fetch cart items.");
  }
};

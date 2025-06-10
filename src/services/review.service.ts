import { get, post } from "@/composables/requests";
import type { ApiResponse } from "@/types/Response";
import type { ReviewRequestBody } from "@/types/Review";

export const getAllProductReviews = async (
  productId: string
): Promise<ApiResponse<any>> => {
  try {
    const response = await get<ApiResponse<any>>(`/reviews/${productId}`);

    if (!response.success) {
      throw new Error(response.message);
    }

    return response;
  } catch (error) {
    throw new Error("Failed to fetch product reviews.");
  }
};

export const createNewProductReview = async (
  payload: ReviewRequestBody
): Promise<ApiResponse<any>> => {
  try {
    const response = await post<ApiResponse<any>>(`/reviews`, payload);

    if (!response.success) {
      throw new Error(response.message);
    }

    return response;
  } catch (error) {
    throw new Error("Failed to fetch users.");
  }
};

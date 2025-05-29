import { get, post, put, del } from "@/composables/requests";
import type { Cart } from "@/types/Cart";
import type { ApiResponse } from "@/types/Response";

export const fetchCartItems = async (
  params?: object
): Promise<ApiResponse<Cart>> => {
  try {
    const response = await get<ApiResponse<Cart>>("/cart", params);
    if (!response.success) {
      throw new Error(response.message);
    }
    return response;
  } catch (error) {
    console.error("Error fetching cart items:", error);
    throw new Error("Failed to fetch cart items.");
  }
};

export const addToCart = async (body: object): Promise<ApiResponse<Cart>> => {
  try {
    const response = await post<ApiResponse<Cart>>("/cart", body);
    if (!response.success) {
      throw new Error(response.message);
    }
    return response;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw new Error("Failed to add item to cart.");
  }
};

export const updateCart = async (
  id: string,
  body: object
): Promise<ApiResponse<any>> => {
  try {
    const response = await put<ApiResponse<any>>(`/cart/${id}`, body);
    if (!response.success) {
      throw new Error(response.message);
    }
    return response;
  } catch (error) {
    console.error("Error updating cart item:", error);
    throw new Error("Failed to update cart item.");
  }
};

export const removeCartItem = async (id: string): Promise<ApiResponse<any>> => {
  try {
    const response = await del<ApiResponse<any>>(`/cart/${id}`);
    if (!response.success) {
      throw new Error(response.message);
    }
    return response;
  } catch (error) {
    console.error("Error removing cart item:", error);
    throw new Error("Failed to remove cart item.");
  }
};

import { get, post, put, del } from "@/composables/requests";
import type { Order } from "@/types/Order";
import type { ApiResponse } from "@/types/Response";

export const getOrders = async (): Promise<ApiResponse<Order[]>> => {
  try {
    const response = await get<ApiResponse<Order[]>>("/orders");
    if (!response.success) {
      throw new Error(response.message);
    }
    return response;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw new Error("Failed to fetch orders.");
  }
};

export const addNewOrder = async (
  payload: object
): Promise<ApiResponse<Order[]>> => {
  try {
    const response = await post<ApiResponse<Order[]>>("/orders", payload);
    if (!response.success) {
      throw new Error(response.message);
    }
    return response;
  } catch (error) {
    console.error("Error fetching cart items:", error);
    throw new Error("Failed to fetch cart items.");
  }
};

export const fetchUserOrders = async (): Promise<ApiResponse<Order[]>> => {
  try {
    const response = await get<ApiResponse<Order[]>>(`/orders/user`);
    if (!response.success) {
      throw new Error(response.message);
    }
    return response;
  } catch (error) {
    console.error("Error fetching user orders:", error);
    throw new Error("Failed to fetch user orders.");
  }
};

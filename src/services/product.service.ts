import { del, get } from "@/composables/requests";
import type { Product } from "@/types/Product";
import type { ApiResponse } from "@/types/Response";

export const fetchProducts = async (
  params?: object
): Promise<ApiResponse<Product[]>> => {
  try {
    const response = await get<ApiResponse<Product[]>>("/products", params);
    if (!response.success) {
      throw new Error(response.message);
    }

    return response;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products.");
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const response = await del<ApiResponse<any>>(`/products/${id}`);
    if (!response.success) {
      throw new Error(response.message);
    }
    return response;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw new Error("Failed to delete product.");
  }
};

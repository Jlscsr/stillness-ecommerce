import { get, post, put, del } from "@/composables/requests";
import type { Product, ProductRequestBody } from "@/types/Product";
import type { ApiResponse } from "@/types/Response";

export const addProduct = async (
  productData: ProductRequestBody
): Promise<ApiResponse<Product>> => {
  try {
    const response = await post<ApiResponse<Product>>("/products", productData);
    if (!response.success) {
      throw new Error(response.message);
    }
    return response;
  } catch (error) {
    console.error("Error adding product:", error);
    throw new Error("Failed to add product.");
  }
};

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

export const updateProduct = async (
  id: string,
  productData: ProductRequestBody
): Promise<ApiResponse<Product>> => {
  try {
    const response = await put<ApiResponse<Product>>(
      `/products/${id}`,
      productData
    );
    if (!response.success) {
      throw new Error(response.message);
    }
    return response;
  } catch (error) {
    console.error("Error updating product:", error);
    throw new Error("Failed to update product.");
  }
};

export const fetchProductById = async (
  id: string
): Promise<ApiResponse<Product>> => {
  try {
    const response = await get<ApiResponse<Product>>(`/products/${id}`);
    if (!response.success) {
      throw new Error(response.message);
    }
    return response;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw new Error("Failed to fetch product.");
  }
};

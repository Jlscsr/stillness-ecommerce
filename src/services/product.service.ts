import { get } from "@/composables/requests";
import type { Product } from "@/types/Product";

export const fetchProducts = async (params?: object) => {
  // TODO: Change the generic type to match the expected response structure from the backend
  // For example, if the response is { status: boolean, message: string, data: Product[] }, you can use get<{ products: Product[] }>(...)
  // For now, we assume the response is Product[]
  return await get<Product[]>("", params);
};

import { defineStore } from "pinia";
import { computed, ref } from "vue";
import type { Product } from "@/types/Product";
import { fetchProducts } from "@services/product.service";

export const useProductStore = defineStore("product", () => {
  const products = ref<Product[]>([]);
  const isLoading = ref(false);

  // Getters for computed properties
  const productsCount = computed(() => products.value.length);

  const productsByCategory = computed(() => {
    const categories: Record<string, Product[]> = {};
    products.value.forEach((product) => {
      if (!categories[product.category]) {
        categories[product.category] = [];
      }
      categories[product.category].push(product);
    });
    return categories;
  });

  const productsByPrice = computed(() => {
    return [...products.value].sort((a, b) => a.price - b.price);
  });

  const sliceProducts = (start: number, end: number) => {
    return products.value.slice(start, end);
  };

  const getProducts = async (params?: object) => {
    isLoading.value = true;

    try {
      const response = await fetchProducts(params);
      products.value = response;
    } catch (error) {
      console.error("Failed to fetch products:", error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  };

  const getProductById = (id: number) => {
    console.log(products.value);
    const product = products.value.find((p) => Number(p.id) === id);
    if (product) {
      return product;
    } else {
      console.warn(`Product with ID ${id} not found.`);
      return null;
    }
  };

  return {
    products,
    getProducts,
    getProductById,
    isLoading,
    productsCount,
    productsByCategory,
    productsByPrice,
    sliceProducts,
  };
});

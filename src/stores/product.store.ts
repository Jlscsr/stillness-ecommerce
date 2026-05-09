import { defineStore } from "pinia";
import { computed, ref } from "vue";
import type { Product } from "@/types/Product";
import { fetchProducts, fetchProductById } from "@services/product.service";

export const useProductStore = defineStore("product", () => {
  const products = ref<Product[]>([]);
  const isLoading = ref(false);
  const fetchError = ref<string | null>(null);
  let productsRequest: Promise<Product[]> | null = null;

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

  const sliceProducts = computed(() => {
    return (start: number, end: number) => {
      return products.value.slice(start, end);
    };
  });

  const getProducts = async (params?: object): Promise<Product[]> => {
    if (!params && productsRequest) {
      return productsRequest;
    }

    isLoading.value = true;
    fetchError.value = null;

    const request = fetchProducts(params)
      .then((response) => {
        products.value = response.data || [];
        return products.value;
      })
      .catch((error) => {
        fetchError.value = "Failed to fetch products.";
        console.error("Failed to fetch products:", error);
        throw error;
      })
      .finally(() => {
        if (productsRequest === request) {
          productsRequest = null;
        }

        isLoading.value = false;
      });

    if (!params) {
      productsRequest = request;
    }

    return request;
  };

  const getProductById = async (id: string): Promise<Product | null> => {
    // First check if the product is in the local state
    const product = products.value.find((p) => p._id === id);
    if (product) {
      return product;
    } else {
      // If not found locally, try to fetch it from the API
      try {
        const response = await fetchProductById(id);
        if (response.success && response.data) {
          // Add the product to the local state
          const productData = response.data;
          if (
            productData &&
            productData._id &&
            !products.value.some((p) => p._id === productData._id)
          ) {
            products.value.push(productData);
          }
          return response.data || null;
        }
      } catch (error) {
        console.error(`Error fetching product with ID ${id}:`, error);
      }
      console.warn(`Product with ID ${id} not found.`);
      return null;
    }
  };

  return {
    products,
    isLoading,
    fetchError,
    getProducts,
    getProductById,
    productsCount,
    productsByCategory,
    productsByPrice,
    sliceProducts,
  };
});

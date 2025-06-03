import { defineStore } from "pinia";
import { computed, ref } from "vue";
import type { Cart, CartRequestBody } from "@/types/Cart";

import {
  fetchCartItems,
  addToCart,
  updateCart,
  removeCartItem,
} from "@/services/cart.service";

export const useCartStore = defineStore("cart", () => {
  const cart = ref<Cart | null>(null);

  const cartItemsCount = computed(() => cart.value?.items?.length || 0);

  const getCart = async () => {
    try {
      const response = await fetchCartItems();
      cart.value = response.data ?? null;
      console.log("Cart items:", cart.value);
      console.log("Cart items count:", cartItemsCount.value);
    } catch (error) {
      cart.value = null;
      console.error("Failed to fetch cart items:", error);
      throw error;
    }
  };

  const addCartItem = async (item: CartRequestBody) => {
    try {
      const response = await addToCart(item);

      if (response.success) {
        await getCart();
      }
    } catch (error) {
      console.error("Failed to add item to cart:", error);
      throw error;
    }
  };

  const updateItemQuantity = async (
    productId: string,
    payload: CartRequestBody
  ) => {
    try {
      const response = await updateCart(productId, payload);

      if (response.success) {
        await getCart();
      }
    } catch (error) {
      console.error("Failed to update cart item:", error);
      throw error;
    }
  };

  const removeItem = async (productId: string) => {
    try {
      const response = await removeCartItem(productId);
      if (response.success) {
        await getCart();
      }
    } catch (error) {
      console.error("Failed to remove cart item:", error);
      throw error;
    }
  };

  const clearCart = () => {
    cart.value = null;
  };

  return {
    cart,
    cartItemsCount,
    getCart,
    addCartItem,
    updateItemQuantity,
    removeItem,
    clearCart,
  };
});

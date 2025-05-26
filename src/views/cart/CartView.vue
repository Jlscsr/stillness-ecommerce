<template>
  <h1>CartView</h1>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const router = useRouter();

// Mock cart data - in a real app, this would come from a store
const cartItems = ref<CartItem[]>([
  { id: "1", name: "Product 1", price: 99.99, quantity: 1 },
  { id: "2", name: "Product 2", price: 49.99, quantity: 2 },
]);

const subtotal = computed(() => {
  return cartItems.value.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
});

const shipping = computed(() => {
  return subtotal.value > 0 ? 9.99 : 0;
});

const updateQuantity = (productId: string, newQuantity: number) => {
  if (newQuantity < 1) return;

  const item = cartItems.value.find((item) => item.id === productId);
  if (item) {
    item.quantity = newQuantity;
  }
};

const removeItem = (productId: string) => {
  cartItems.value = cartItems.value.filter((item) => item.id !== productId);
};

const proceedToCheckout = () => {
  router.push("/checkout");
};
</script>

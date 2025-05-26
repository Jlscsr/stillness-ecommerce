<template>
  <h1>CheckoutView</h1>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const router = useRouter();
const isSubmitting = ref(false);

// Mock cart data - in a real app, this would come from a store
const cartItems = ref<CartItem[]>([]);

// Form data
const formData = ref({
  firstName: "",
  lastName: "",
  email: "",
  address: "",
  city: "",
  country: "",
  postalCode: "",
  cardNumber: "",
  expiryDate: "",
  cvc: "",
});

// Computed properties
const subtotal = computed(() => {
  return cartItems.value.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
});

const shipping = computed(() => {
  return subtotal.value > 0 ? 9.99 : 0;
});

// Load cart items
onMounted(() => {
  // In a real app, load from store
  cartItems.value = [
    { id: "1", name: "Product 1", price: 99.99, quantity: 1 },
    { id: "2", name: "Product 2", price: 49.99, quantity: 2 },
  ];
});

// Submit order
const submitOrder = async () => {
  if (isSubmitting.value) return;

  try {
    isSubmitting.value = true;

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // In a real app, you would:
    // 1. Process the payment
    // 2. Create an order
    // 3. Clear the cart
    // 4. Redirect to order confirmation page

    // For now, just redirect to a thank you page
    router.push("/order-confirmation");
  } catch (error) {
    console.error("Error submitting order:", error);
    alert("There was an error processing your order. Please try again.");
  } finally {
    isSubmitting.value = false;
  }
};
</script>

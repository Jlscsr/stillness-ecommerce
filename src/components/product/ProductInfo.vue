<template>
  <div class="flex flex-col">
    <!-- Product name and price -->
    <div class="mb-6">
      <span
        v-if="product.japaneseText"
        class="text-sm text-charcoal/60 block mb-1"
      >
        {{ product.japaneseText }}
      </span>
      <h1 class="text-3xl font-light text-charcoal mb-2">{{ product.name }}</h1>
      <p class="text-xl text-sage font-medium">
        ${{ product.price.toFixed(2) }}
      </p>
    </div>

    <!-- Product description -->
    <div class="mb-8">
      <p class="text-charcoal/80">{{ product.description }}</p>
    </div>

    <!-- Quantity selector -->
    <div class="mb-8">
      <h3 class="text-sm uppercase tracking-wider text-charcoal/70 mb-3">
        Quantity
      </h3>
      <div class="flex items-center">
        <button
          class="w-10 h-10 flex items-center justify-center border border-charcoal/20 text-charcoal hover:bg-beige/10 transition-colors"
          @click="decrementQuantity"
          :disabled="isOutOfStock"
        >
          -
        </button>
        <input
          type="number"
          min="1"
          max="10"
          v-model.number="quantity"
          @input="handleQuantityChange"
          class="w-12 h-10 border-t border-b border-charcoal/20 text-center text-charcoal bg-transparent quantity-input"
          :disabled="isOutOfStock"
        />
        <button
          class="w-10 h-10 flex items-center justify-center border border-charcoal/20 text-charcoal hover:bg-beige/10 transition-colors"
          @click="incrementQuantity"
          :disabled="isOutOfStock"
        >
          +
        </button>
      </div>
    </div>

    <!-- Add to cart button -->
    <div class="flex flex-col mb-6">
      <button
        class="w-full py-3 px-6 rounded-sm flex items-center justify-center gap-2 transition-colors"
        :class="getAddToCartButtonClass()"
        @click="handleAddToCart(product._id, quantity, product.price)"
        :disabled="isOutOfStock"
      >
        <ShoppingBag class="h-5 w-5" />
        <span>{{ getAddToCartButtonText() }}</span>
      </button>
    </div>

    <!-- Checkout button -->
    <div class="mb-8">
      <button
        class="w-full py-4 px-6 bg-charcoal text-cream rounded-sm flex items-center justify-center gap-2 hover:bg-charcoal/90 transition-colors disabled:bg-charcoal/50 disabled:cursor-not-allowed"
        @click="handleCheckout"
        :disabled="isOutOfStock"
      >
        <CreditCard class="h-5 w-5" />
        <span>Buy Now</span>
      </button>
    </div>

    <!-- Product details summary -->
    <div class="border-t border-charcoal/10 pt-6 space-y-4">
      <div v-if="product.materials" class="flex">
        <span class="text-sm font-medium text-charcoal w-24">Materials:</span>
        <span class="text-sm text-charcoal/80">{{
          product.materials.join(", ")
        }}</span>
      </div>
      <div v-if="product.dimensions" class="flex">
        <span class="text-sm font-medium text-charcoal w-24">Dimensions:</span>
        <span class="text-sm text-charcoal/80">{{ product.dimensions }}</span>
      </div>
      <div v-if="product.stock !== undefined" class="flex">
        <span class="text-sm font-medium text-charcoal w-24">Stock:</span>
        <span class="text-sm text-charcoal/80"
          >{{ product.stock }} available</span
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { ShoppingBag, CreditCard } from "lucide-vue-next";
import { useRouter } from "vue-router";
import type { Product } from "@/types/Product";
import { useCartStore } from "@stores/cart.store";
import { useToastStore } from "@/stores/toast.store";
import { useAuthStore } from "@/stores/auth.store";

interface Props {
  product: Product;
}

const cartStore = useCartStore();
const toastStore = useToastStore();
const authStore = useAuthStore();
const router = useRouter();
const props = defineProps<Props>();

const product = computed(() => props.product);
const quantity = ref(1);

const isOutOfStock = computed(() => {
  return !props.product.stock || props.product.stock === 0;
});

const handleQuantityChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const value = parseInt(target.value);
  if (value > 0 && value <= 10) {
    quantity.value = value;
  }
};

const decrementQuantity = () => {
  if (quantity.value > 1) {
    quantity.value = quantity.value - 1;
  }
};

const incrementQuantity = () => {
  if (quantity.value < 10) {
    quantity.value = quantity.value + 1;
  }
};

const handleAddToCart = async (
  productId: string,
  quantity: number,
  price: number
) => {
  // Check if user is authenticated
  if (!authStore.isAuthenticated) {
    // Create a redirect URL to return to this product after login
    const returnUrl = router.currentRoute.value.fullPath;
    
    // Show toast notification
    toastStore.info("Please log in to add items to your cart");
    
    // Redirect to login with returnUrl parameter
    router.push({
      name: "login",
      query: { returnUrl }
    });
    return;
  }
  
  try {
    await cartStore.addCartItem({
      productId,
      quantity,
      priceAtTimeOfAddition: price,
    });

    toastStore.success(`<strong>${product.value.name}</strong> added to cart`);
  } catch (error) {
    console.error("Error adding to cart:", error);
    toastStore.error("Failed to add product to cart. Please try again.");
  }
};



const handleCheckout = () => {
  // Check if user is authenticated
  if (!authStore.isAuthenticated) {
    // Create a redirect URL to return to this product after login
    const returnUrl = router.currentRoute.value.fullPath;
    
    // Show toast notification
    toastStore.info("Please log in to checkout");
    
    // Redirect to login with returnUrl parameter
    router.push({
      name: "login",
      query: { returnUrl }
    });
    return;
  }
  
  // Emit event for parent component to handle checkout
  emit("checkout", {
    product: props.product,
    quantity: quantity.value,
  });
};

const getAddToCartButtonClass = () => {
  if (isOutOfStock.value) {
    return "bg-charcoal/20 text-charcoal/50 cursor-not-allowed";
  } else {
    return "bg-beige text-charcoal hover:bg-beige/90";
  }
};

const getAddToCartButtonText = () => {
  if (isOutOfStock.value) {
    return "Out of Stock";
  } else {
    return "Add to Cart";
  }
};



// Define emits
const emit = defineEmits<{
  "add-to-cart": [payload: { product: Product; quantity: number }];
  checkout: [payload: { product: Product; quantity: number }];
}>();
</script>

<style scoped>
/* Hide number input spinners/arrows */
.quantity-input::-webkit-outer-spin-button,
.quantity-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
.quantity-input[type="number"] {
  -moz-appearance: textfield;
}
</style>

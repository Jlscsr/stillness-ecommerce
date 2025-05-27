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

    <!-- Add to cart and wishlist buttons -->
    <div class="flex flex-col sm:flex-row gap-4 mb-6">
      <button
        class="flex-1 py-3 px-6 rounded-sm flex items-center justify-center gap-2 transition-colors"
        :class="getAddToCartButtonClass()"
        @click="handleAddToCart"
        :disabled="isOutOfStock"
      >
        <ShoppingBag class="h-5 w-5" />
        <span>{{ getAddToCartButtonText() }}</span>
      </button>
      <button
        class="py-3 px-6 rounded-sm flex items-center justify-center gap-2 transition-colors"
        :class="getWishlistButtonClass()"
        @click="handleAddToWishlist"
      >
        <Heart
          class="h-5 w-5"
          :class="{ 'fill-terracotta': isAddedToWishlist }"
        />
        <span>{{ isAddedToWishlist ? "Saved" : "Save" }}</span>
      </button>
    </div>

    <!-- Checkout button -->
    <div class="mb-8">
      <button
        class="w-full py-4 px-6 bg-sage text-cream rounded-sm flex items-center justify-center gap-2 hover:bg-sage/90 transition-colors disabled:bg-charcoal/50 disabled:cursor-not-allowed"
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
import { Heart, ShoppingBag, CreditCard } from "lucide-vue-next";
import type { Product } from "@/types/Product";

interface Props {
  product: Product;
}

const props = defineProps<Props>();

const product = computed(() => props.product);
const quantity = ref(1);
const isAddedToCart = ref(false);
const isAddedToWishlist = ref(false);

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

const handleAddToCart = () => {
  // Show success message (cart store logic will be added later)
  isAddedToCart.value = true;
  setTimeout(() => {
    isAddedToCart.value = false;
    // cartStore.openCart() will be added when cart store is implemented
  }, 1000);

  // Emit event for parent component to handle
  emit("add-to-cart", {
    product: props.product,
    quantity: quantity.value,
  });
};

const handleAddToWishlist = () => {
  isAddedToWishlist.value = !isAddedToWishlist.value;

  // Emit event for parent component to handle
  emit("add-to-wishlist", {
    product: props.product,
    added: isAddedToWishlist.value,
  });
};

const handleCheckout = () => {
  // Emit event for parent component to handle checkout
  emit("checkout", {
    product: props.product,
    quantity: quantity.value,
  });
};

const getAddToCartButtonClass = () => {
  if (isOutOfStock.value) {
    return "bg-charcoal/20 text-charcoal/50 cursor-not-allowed";
  } else if (isAddedToCart.value) {
    return "bg-sage text-cream";
  } else {
    return "bg-beige text-charcoal hover:bg-beige/90";
  }
};

const getAddToCartButtonText = () => {
  if (isOutOfStock.value) {
    return "Out of Stock";
  } else if (isAddedToCart.value) {
    return "Added to Cart";
  } else {
    return "Add to Cart";
  }
};

const getWishlistButtonClass = () => {
  if (isAddedToWishlist.value) {
    return "bg-terracotta/10 text-terracotta border border-terracotta/20";
  } else {
    return "border border-charcoal/20 text-charcoal hover:bg-charcoal/5";
  }
};

// Define emits
const emit = defineEmits<{
  "add-to-cart": [payload: { product: Product; quantity: number }];
  "add-to-wishlist": [payload: { product: Product; added: boolean }];
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

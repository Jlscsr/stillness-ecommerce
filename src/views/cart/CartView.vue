<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
    <div class="mb-6">
      <router-link
        to="/products"
        class="inline-flex items-center text-charcoal/70 hover:text-charcoal transition-colors"
      >
        <ArrowLeft class="h-4 w-4 mr-1" />
        <span>Continue Shopping</span>
      </router-link>
    </div>

    <h1 class="text-3xl font-light text-charcoal mb-8">Shopping Cart</h1>

    <div
      v-if="items.length === 0"
      class="text-center py-16 bg-cream border border-charcoal/10 rounded-sm"
    >
      <ShoppingBag class="h-12 w-12 text-charcoal/30 mx-auto mb-4" />
      <h2 class="text-xl font-light text-charcoal mb-4">Your cart is empty</h2>
      <p class="text-charcoal/70 mb-6">
        Looks like you haven't added any items to your cart yet.
      </p>
      <router-link
        to="/products"
        class="inline-block px-6 py-3 bg-beige text-charcoal font-medium rounded-sm hover:bg-beige/90 transition-colors"
      >
        Browse Products
      </router-link>
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Cart Items -->
      <div class="lg:col-span-2">
        <div
          class="bg-cream border border-charcoal/10 rounded-sm overflow-hidden"
        >
          <div
            class="hidden sm:grid grid-cols-12 gap-4 p-4 border-b border-charcoal/10 bg-beige/10"
          >
            <div class="col-span-6">
              <span class="text-sm font-medium text-charcoal">Product</span>
            </div>
            <div class="col-span-2 text-center">
              <span class="text-sm font-medium text-charcoal">Price</span>
            </div>
            <div class="col-span-2 text-center">
              <span class="text-sm font-medium text-charcoal">Quantity</span>
            </div>
            <div class="col-span-2 text-right">
              <span class="text-sm font-medium text-charcoal">Total</span>
            </div>
          </div>

          <ul class="divide-y divide-charcoal/10">
            <li
              v-for="(item, index) in items"
              :key="`${item.productId}-${index}`"
              class="p-4"
            >
              <div class="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                <!-- Product -->
                <div class="col-span-6 flex items-center">
                  <ImageWithLoading
                    :src="item.image?.src || '/placeholder.svg'"
                    :alt="item.image?.alt || 'Product Image'"
                    container-class="h-20 w-20 flex-shrink-0 overflow-hidden rounded-sm bg-cream mr-4"
                    image-class="h-full w-full object-cover object-center"
                  />

                  <div>
                    <h3 class="text-sm font-medium text-charcoal">
                      <router-link :to="`/products/${item.productId}`">{{
                        item.name
                      }}</router-link>
                    </h3>
                  </div>
                </div>

                <!-- Price -->
                <div class="col-span-2 text-center">
                  <span class="text-sm text-charcoal"
                    >${{ item.priceAtTimeOfAddition.toFixed(2) }}</span
                  >
                </div>

                <!-- Quantity -->
                <div class="col-span-2">
                  <div
                    class="flex items-center justify-center border border-charcoal/20 rounded-sm max-w-[120px] mx-auto"
                  >
                    <button
                      @click="
                        updateQuantity(
                          item.productId,
                          item.quantity - 1,
                          item.priceAtTimeOfAddition
                        )
                      "
                      class="p-1 text-charcoal/70 hover:text-charcoal"
                      aria-label="Decrease quantity"
                    >
                      <Minus class="h-3 w-3" />
                    </button>
                    <span class="px-2 text-sm text-charcoal">{{
                      item.quantity
                    }}</span>
                    <button
                      @click="
                        updateQuantity(
                          item.productId,
                          item.quantity + 1,
                          item.priceAtTimeOfAddition
                        )
                      "
                      class="p-1 text-charcoal/70 hover:text-charcoal"
                      aria-label="Increase quantity"
                    >
                      <Plus class="h-3 w-3" />
                    </button>
                  </div>
                </div>

                <!-- Total -->
                <div class="col-span-2 flex items-center justify-between">
                  <span class="text-sm font-medium text-charcoal sm:hidden"
                    >Total:</span
                  >
                  <div class="flex items-center">
                    <span class="text-sm font-medium text-charcoal">
                      ${{
                        (item.priceAtTimeOfAddition * item.quantity).toFixed(2)
                      }}
                    </span>
                    <button
                      @click="confirmRemoveItem(item.productId, item.name)"
                      class="ml-2 p-1 text-charcoal/50 hover:text-red-500 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 class="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- Order Summary -->
      <div class="lg:col-span-1">
        <div
          ref="summaryRef"
          class="bg-cream border border-charcoal/10 rounded-sm sticky top-24 flex flex-col"
          :style="{ maxHeight: summaryHeight ? `${summaryHeight}px` : 'auto' }"
        >
          <div class="p-6 border-b border-charcoal/10">
            <h2 class="text-lg font-medium text-charcoal mb-4">
              Order Summary
            </h2>
          </div>

          <div class="flex-1 overflow-y-auto p-6">
            <div class="space-y-3 mb-6">
              <div class="flex justify-between text-sm">
                <span class="text-charcoal/70">Subtotal</span>
                <span class="text-charcoal">${{ subtotal.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-charcoal/70">Shipping</span>
                <span class="text-charcoal">${{ shipping.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-charcoal/70">Tax</span>
                <span class="text-charcoal">${{ tax.toFixed(2) }}</span>
              </div>
              <div v-if="promoApplied" class="flex justify-between text-sm">
                <span class="text-sage">Discount (10%)</span>
                <span class="text-sage">-${{ discount.toFixed(2) }}</span>
              </div>
              <div
                class="border-t border-charcoal/10 pt-3 flex justify-between"
              >
                <span class="font-medium text-charcoal">Total</span>
                <span class="font-medium text-charcoal"
                  >${{ total.toFixed(2) }}</span
                >
              </div>
            </div>

            <!-- Promo code -->
            <form @submit.prevent="handleApplyPromo" class="mb-6">
              <label
                for="promo-code"
                class="block text-sm font-medium text-charcoal mb-2"
              >
                Promo Code
              </label>
              <div class="flex">
                <input
                  type="text"
                  id="promo-code"
                  v-model="promoCode"
                  placeholder="Enter code"
                  class="flex-1 p-2 border border-charcoal/20 bg-cream rounded-sm focus:outline-none focus:border-sage"
                  :disabled="promoApplied"
                />
                <button
                  type="submit"
                  class="ml-2 px-4 py-2 rounded-sm transition-colors"
                  :class="
                    promoApplied
                      ? 'bg-sage/50 text-cream cursor-not-allowed'
                      : 'bg-sage text-cream hover:bg-sage/90'
                  "
                  :disabled="promoApplied"
                >
                  Apply
                </button>
              </div>
              <p v-if="promoApplied" class="text-xs text-sage mt-1">
                Promo code "MINDFUL" applied successfully!
              </p>
            </form>
          </div>

          <div class="p-6 border-t border-charcoal/10 bg-cream">
            <router-link
              to="/checkout"
              class="w-full flex items-center justify-center px-6 py-3 bg-sage text-cream rounded-sm hover:bg-sage/90 transition-colors"
            >
              Proceed to Checkout
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from "lucide-vue-next";
import { storeToRefs } from "pinia";

import { useCartStore } from "@stores/cart.store";
import { useToastStore } from "@/stores/toast.store";
import { useModalStore } from "@/stores/modal.store";
import ImageWithLoading from "@components/ui/ImageWithLoading.vue";

const cartStore = useCartStore();
const toastStore = useToastStore();
const modalStore = useModalStore();
const { cart } = storeToRefs(cartStore);

// In a real app, this would come from a Pinia/Vuex store
// Mock cart data
const items = computed(() => cart.value?.items || []);

// Promo code state
const promoCode = ref("");
const promoApplied = ref(false);
const promoDiscount = ref(0);

const summaryRef = ref<HTMLElement | null>(null);
const summaryHeight = ref<number | null>(null);

// Calculate values
const subtotal = computed(() => {
  return items.value.reduce(
    (sum, item) => sum + item.priceAtTimeOfAddition * item.quantity,
    0
  );
});

const shipping = 10.0;
const tax = computed(() => subtotal.value * 0.08);
const discount = computed(() => (promoApplied.value ? promoDiscount.value : 0));
const total = computed(
  () => subtotal.value + shipping + tax.value - discount.value
);

// Methods
const updateQuantity = async (
  productId: string,
  newQuantity: number,
  priceAtTimeOfAddition: number
) => {
  if (newQuantity < 1) return;

  // Get the item name for the toast message
  const itemName = items.value.find(item => item.productId === productId)?.name || 'Item';

  try {
    await cartStore.updateItemQuantity(productId, {
      quantity: newQuantity,
      priceAtTimeOfAddition,
    });
    toastStore.success(`<strong>${itemName}</strong> quantity updated to ${newQuantity}`);
  } catch (error) {
    console.error("Error updating quantity:", error);
    toastStore.error("Failed to update quantity. Please try again.");
    throw error;
  }
};

const confirmRemoveItem = async (productId: string | undefined, itemName: string) => {
  if (!productId) return;
  
  const confirmed = await modalStore.open({
    title: 'Remove Item',
    message: `Are you sure you want to remove <strong>${itemName}</strong> from your cart?`,
    confirmText: 'Remove',
    cancelText: 'Cancel',
    confirmVariant: 'danger',
    size: 'sm'
  });
  
  if (confirmed) {
    removeItem(productId, itemName);
  }
};

const removeItem = (productId: string, itemName: string = '') => {
  // If itemName wasn't passed, try to find it
  if (!itemName) {
    const item = items.value.find(item => item.productId === productId);
    itemName = item?.name || 'Item';
  }
  
  try {
    cartStore.removeItem(productId);
    toastStore.info(`<strong>${itemName}</strong> removed from cart`);
  } catch (error) {
    console.error("Failed to remove item:", error);
    toastStore.error("Failed to remove item. Please try again.");
  }
};

const handleApplyPromo = () => {
  if (promoCode.value.toLowerCase() === "mindful") {
    promoApplied.value = true;
    promoDiscount.value = subtotal.value * 0.1; // 10% discount
    toastStore.success(`Promo code "<strong>${promoCode.value}</strong>" applied. You saved <strong>$${promoDiscount.value.toFixed(2)}</strong>!`);
  } else if (promoCode.value) {
    toastStore.error(`Invalid promo code "<strong>${promoCode.value}</strong>".`);
  }
};

// Calculate and set the height for the summary container
const updateHeight = () => {
  if (summaryRef.value) {
    const viewportHeight = window.innerHeight;
    const summaryTop = summaryRef.value.getBoundingClientRect().top;
    const availableHeight = viewportHeight - summaryTop - 20; // 20px buffer
    summaryHeight.value = Math.max(300, availableHeight); // Minimum height of 300px
  }
};

onMounted(() => {
  updateHeight();
  window.addEventListener("resize", updateHeight);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateHeight);
});
</script>

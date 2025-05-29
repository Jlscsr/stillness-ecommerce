<template>
  <Teleport to="body">
    <div v-if="isOpen" class="fixed inset-0 z-50 overflow-hidden">
      <!-- Backdrop overlay -->
      <div
        class="absolute inset-0 bg-charcoal/30 backdrop-blur-sm"
        @click="closeCart"
      ></div>

      <!-- Cart panel -->
      <div
        ref="cartRef"
        class="fixed top-0 right-0 h-full w-full sm:w-96 bg-cream shadow-lg transform transition-transform duration-300 ease-in-out flex flex-col"
        :class="isOpen ? 'translate-x-0' : 'translate-x-full'"
      >
        <!-- Cart header - fixed at top -->
        <div
          class="flex items-center justify-between p-4 border-b border-charcoal/10"
        >
          <h2 class="text-lg font-medium text-charcoal flex items-center">
            <ShoppingBag class="h-5 w-5 mr-2" />
            Your Cart
            <span class="ml-2 text-sm text-charcoal/60"
              >({{ cartItemsCount }} items)</span
            >
          </h2>
          <button
            @click="closeCart"
            class="text-charcoal/70 hover:text-charcoal transition-colors"
            aria-label="Close cart"
          >
            <X class="h-5 w-5" />
          </button>
        </div>

        <!-- Cart content - scrollable -->
        <div class="flex-1 overflow-y-auto p-4">
          <div
            v-if="items.length === 0"
            class="flex flex-col items-center justify-center h-full text-center"
          >
            <ShoppingBag class="h-12 w-12 text-charcoal/30 mb-4" />
            <p class="text-charcoal/70 mb-6">Your cart is empty</p>
            <button
              @click="closeCart"
              class="px-4 py-2 bg-beige text-charcoal rounded-sm hover:bg-beige/90 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
          <ul v-else class="space-y-4">
            <li
              v-for="(item, index) in items"
              :key="`${item.productId} || ${''}-${index}`"
              class="flex py-4 border-b border-charcoal/10"
            >
              <!-- Product image -->

              <ImageWithLoading
                :src="item.image?.src || '/placeholder.svg'"
                :alt="item.image?.alt || 'Product Image'"
                container-class="h-20 w-20  overflow-hidden rounded-sm bg-cream"
                image-class="h-full w-full object-cover object-center"
              />

              <!-- Product details -->
              <div class="ml-4 flex flex-1 flex-col">
                <div>
                  <div class="flex justify-between">
                    <h3 class="text-sm font-medium text-charcoal">
                      <router-link
                        :to="`/products/${item.productId}`"
                        @click="closeCart"
                      >
                        {{ item.name }}
                      </router-link>
                    </h3>
                    <p class="text-sm font-medium text-sage">
                      ${{ item.priceAtTimeOfAddition.toFixed(2) }}
                    </p>
                  </div>
                </div>

                <div class="flex flex-1 items-end justify-between">
                  <!-- Quantity controls -->
                  <div class="flex items-center border border-charcoal/20">
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

                  <!-- Remove button -->
                  <button
                    @click="confirmRemoveItem(item.productId, item.name)"
                    class="text-xs text-charcoal/60 hover:text-charcoal transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <!-- Cart footer - fixed at bottom -->
        <div
          v-if="items.length > 0"
          class="border-t border-charcoal/10 p-4 bg-cream shadow-md"
        >
          <div
            class="flex justify-between text-base font-medium text-charcoal mb-4"
          >
            <p>Subtotal</p>
            <p>${{ subtotal.toFixed(2) }}</p>
          </div>
          <router-link
            to="/checkout"
            @click="closeCart"
            class="w-full flex items-center justify-center px-6 py-3 bg-sage text-cream rounded-sm hover:bg-sage/90 transition-colors"
          >
            Checkout
          </router-link>
          <button
            @click="closeCart"
            class="w-full mt-2 text-center text-sm text-charcoal/70 hover:text-charcoal transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from "vue";
import { storeToRefs } from "pinia";
import { X, Minus, Plus, ShoppingBag } from "lucide-vue-next";

import { useCartStore } from "@/stores/cart.store";
import { useToastStore } from "@/stores/toast.store";
import { useModalStore } from "@/stores/modal.store";

import ImageWithLoading from "@components/ui/ImageWithLoading.vue";

// Props
interface Props {
  isOpen: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isOpen: false,
});

const cartStore = useCartStore();
const toastStore = useToastStore();
const modalStore = useModalStore();
const { cartItemsCount, cart } = storeToRefs(cartStore);

// Emits
const emit = defineEmits(["close"]);

// Store scroll position
const scrollPosition = ref(0);

// Cart state
const cartRef = ref<HTMLElement | null>(null);

const items = computed(() => cart.value?.items || []);

const subtotal = computed(() => {
  return items.value.reduce((total, item) => {
    return total + item.priceAtTimeOfAddition * item.quantity;
  }, 0);
});

// Methods
const closeCart = () => {
  emit("close");
};

const updateQuantity = async (
  productId: string,
  newQuantity: number,
  priceAtTimeOfAddition: number
) => {
  if (newQuantity < 1) return;

  // Get the item name for the toast message
  const itemName =
    items.value.find((item) => item.productId === productId)?.name || "Item";

  // Api Call
  try {
    await cartStore.updateItemQuantity(productId, {
      quantity: newQuantity,
      priceAtTimeOfAddition,
    });

    toastStore.success(`<strong>${itemName}</strong> quantity updated to ${newQuantity}`);
  } catch (error) {
    console.error("Failed to update quantity:", error);
    toastStore.error("Failed to update quantity. Please try again.");
    throw error;
  }
};

const confirmRemoveItem = async (productId: string, itemName: string) => {
  const confirmed = await modalStore.open({
    title: "Remove Item",
    message: `Are you sure you want to remove <strong>${itemName}</strong> from your cart?`,
    confirmText: "Remove",
    cancelText: "Cancel",
    confirmVariant: "danger",
    size: "sm",
  });

  if (confirmed) {
    removeItem(productId, itemName);
  }
};

const removeItem = (productId: string, itemName: string = "") => {
  // If itemName wasn't passed, try to find it
  if (!itemName) {
    const item = items.value.find((item) => item.productId === productId);
    itemName = item?.name || "Item";
  }

  try {
    cartStore.removeItem(productId);
    toastStore.info(`<strong>${itemName}</strong> removed from cart`);
  } catch (error) {
    console.error("Failed to remove item:", error);
    toastStore.error("Failed to remove item. Please try again.");
  }
};

// Handle escape key press
const handleEscapeKey = (e: KeyboardEvent) => {
  if (e.key === "Escape" && props.isOpen) {
    closeCart();
  }
};

// Handle body scrolling and reset scroll position
watch(
  () => props.isOpen,
  (isOpen) => {
    if (isOpen) {
      scrollPosition.value = window.scrollY;

      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "15px";

      nextTick(() => {
        if (cartRef.value) {
          const contentEl = cartRef.value.querySelector(".overflow-y-auto");
          if (contentEl) {
            contentEl.scrollTop = 0;
          }
        }
      });
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }
  }
);

onMounted(() => {
  console.log(items.value);
  document.addEventListener("keydown", handleEscapeKey);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleEscapeKey);
  document.body.style.overflow = "";
});
</script>

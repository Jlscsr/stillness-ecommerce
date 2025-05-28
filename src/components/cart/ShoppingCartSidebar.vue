<template>
  <Teleport to="body">
    <div v-if="isOpen" class="fixed inset-0 z-50 overflow-hidden">
      <!-- Backdrop overlay -->
      <div class="absolute inset-0 bg-charcoal/30 backdrop-blur-sm" @click="closeCart"></div>
      
      <!-- Cart panel -->
      <div
        ref="cartRef"
        class="fixed top-0 right-0 h-full w-full sm:w-96 bg-cream shadow-lg transform transition-transform duration-300 ease-in-out flex flex-col"
        :class="isOpen ? 'translate-x-0' : 'translate-x-full'"
      >
      <!-- Cart header - fixed at top -->
      <div class="flex items-center justify-between p-4 border-b border-charcoal/10">
        <h2 class="text-lg font-medium text-charcoal flex items-center">
          <ShoppingBag class="h-5 w-5 mr-2" />
          Your Cart
          <span class="ml-2 text-sm text-charcoal/60">({{ itemCount }} items)</span>
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
        <div v-if="items.length === 0" class="flex flex-col items-center justify-center h-full text-center">
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
            :key="`${item.product.id}-${item.variant || ''}-${index}`"
            class="flex py-4 border-b border-charcoal/10"
          >
            <!-- Product image -->
            <div class="h-20 w-20 flex-shrink-0 overflow-hidden rounded-sm bg-cream">
              <img
                :src="item.product.images[0]?.src || '/placeholder.svg'"
                :alt="item.product.name"
                class="h-full w-full object-cover object-center"
              />
            </div>

            <!-- Product details -->
            <div class="ml-4 flex flex-1 flex-col">
              <div>
                <div class="flex justify-between">
                  <h3 class="text-sm font-medium text-charcoal">
                    <router-link :to="`/products/${item.product.id}`" @click="closeCart">
                      {{ item.product.name }}
                    </router-link>
                  </h3>
                  <p class="text-sm font-medium text-sage">${{ item.product.price.toFixed(2) }}</p>
                </div>
                <p v-if="item.variant" class="mt-1 text-xs text-charcoal/60">Variant: {{ item.variant }}</p>
              </div>

              <div class="flex flex-1 items-end justify-between">
                <!-- Quantity controls -->
                <div class="flex items-center border border-charcoal/20">
                  <button
                    @click="updateQuantity(item.product.id, item.quantity - 1, item.variant)"
                    class="p-1 text-charcoal/70 hover:text-charcoal"
                    aria-label="Decrease quantity"
                  >
                    <Minus class="h-3 w-3" />
                  </button>
                  <span class="px-2 text-sm text-charcoal">{{ item.quantity }}</span>
                  <button
                    @click="updateQuantity(item.product.id, item.quantity + 1, item.variant)"
                    class="p-1 text-charcoal/70 hover:text-charcoal"
                    aria-label="Increase quantity"
                  >
                    <Plus class="h-3 w-3" />
                  </button>
                </div>

                <!-- Remove button -->
                <button
                  @click="removeItem(item.product.id, item.variant)"
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
      <div v-if="items.length > 0" class="border-t border-charcoal/10 p-4 bg-cream shadow-md">
        <div class="flex justify-between text-base font-medium text-charcoal mb-4">
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
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { X, Minus, Plus, ShoppingBag } from 'lucide-vue-next';

// Props
interface Props {
  isOpen: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isOpen: false
});

// Emits
const emit = defineEmits(['close']);

// Store scroll position
const scrollPosition = ref(0);

// Types
interface ProductImage {
  src: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  images: ProductImage[];
}

interface CartItem {
  product: Product;
  quantity: number;
  variant?: string;
}

// Cart state
const cartRef = ref<HTMLElement | null>(null);

// Dummy data for cart items
const items = ref<CartItem[]>([
  {
    product: {
      id: '1',
      name: 'Ceramic Tea Set',
      price: 89.00,
      images: [{ src: '/placeholder.svg' }]
    },
    quantity: 10
  },
  {
    product: {
      id: '2',
      name: 'Linen Throw Blanket',
      price: 65.00,
      images: [{ src: '/placeholder.svg' }]
    },
    quantity: 2,
    variant: 'Natural'
  },
  {
    product: {
      id: '3',
      name: 'Bamboo Serving Tray',
      price: 42.00,
      images: [{ src: '/placeholder.svg' }]
    },
    quantity: 1
  },
  {
    product: {
      id: '4',
      name: 'Meditation Cushion',
      price: 55.00,
      images: [{ src: '/placeholder.svg' }]
    },
    quantity: 1
  }
]);

// Computed values
const itemCount = computed(() => {
  return items.value.reduce((count, item) => count + item.quantity, 0);
});

const subtotal = computed(() => {
  return items.value.reduce((total, item) => {
    return total + (item.product.price * item.quantity);
  }, 0);
});

// Methods
const closeCart = () => {
  emit('close');
};

const updateQuantity = (productId: string, newQuantity: number, variant?: string) => {
  if (newQuantity < 1) return;
  
  const item = items.value.find(item => 
    item.product.id === productId && item.variant === variant
  );
  
  if (item) {
    item.quantity = newQuantity;
  }
};

const removeItem = (productId: string, variant?: string) => {
  items.value = items.value.filter(item => {
    return !(item.product.id === productId && item.variant === variant);
  });
};

// Handle escape key press
const handleEscapeKey = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.isOpen) {
    closeCart();
  }
};

// Handle body scrolling and reset scroll position
watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    // Store current scroll position before disabling scroll
    scrollPosition.value = window.scrollY;
    
    // Disable scrolling when cart is open
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = '15px'; // Prevent layout shift when scrollbar disappears
    
    // Reset scroll position of cart content when opening
    nextTick(() => {
      if (cartRef.value) {
        const contentEl = cartRef.value.querySelector('.overflow-y-auto');
        if (contentEl) {
          contentEl.scrollTop = 0;
        }
      }
    });
  } else {
    // Re-enable scrolling when cart is closed
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }
});

onMounted(() => {
  document.addEventListener('keydown', handleEscapeKey);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscapeKey);
  document.body.style.overflow = '';
});
</script>

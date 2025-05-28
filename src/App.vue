<template>
  <Suspense>
    <template #default>
      <router-view v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </router-view>
    </template>

    <template #fallback>
      <div
        class="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75"
      >
        <div
          class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"
        ></div>
      </div>
    </template>
  </Suspense>

  <!-- Global notification -->
  <!-- <div
    v-if="showNotification"
    class="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg"
  >
    {{ notificationMessage }}
  </div> -->
</template>

<script setup lang="ts">
import { watch } from "vue";
import { RouterView } from "vue-router";
import { useProductStore } from "@/stores/product.store";
import { useAuthStore } from "@/stores/auth.store";
import { useCartStore } from "./stores/cart.store";
import { onMounted } from "vue";

const authStore = useAuthStore();
const { getProducts } = useProductStore();
const { getCart, clearCart } = useCartStore();

onMounted(async () => {
  await getProducts();
});

watch(
  () => authStore.isAuthenticated,
  async (isLoggedIn) => {
    if (isLoggedIn) {
      await getCart();
    } else {
      clearCart();
    }
  }
);
</script>

<style>
/* Global styles */
body {
  @apply bg-gray-50;
}

/* Page transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>

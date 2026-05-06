<template>
  <div>
    <router-view v-slot="{ Component }">
      <Transition name="fade" mode="out-in">
        <component :is="Component" />
      </Transition>
    </router-view>

    <!-- Global toast notifications -->
    <ToastContainer position="top-right" />

    <!-- Global confirmation modal -->
    <ConfirmationModal />
  </div>
</template>

<script setup lang="ts">
import { watch, onMounted } from "vue";
import { useProductStore } from "@/stores/product.store";
import { useAuthStore } from "@/stores/auth.store";
import { useCartStore } from "./stores/cart.store";
import { useUserStore } from "@/stores/user.store";
import { useUserOrdersStore } from "./stores/userOrders.store";

// Import global UI components
import ToastContainer from "@/components/ui/toast/ToastContainer.vue";
import ConfirmationModal from "@/components/ui/modal/ConfirmationModal.vue";

const authStore = useAuthStore();
const { getProducts } = useProductStore();
const { getCart, clearCart } = useCartStore();
const { getUserInfoById } = useUserStore();
const { getUserOrders } = useUserOrdersStore();

onMounted(async () => {
  await getProducts();
});

watch(
  () => authStore.isAuthenticated,
  async (isLoggedIn) => {
    if (isLoggedIn) {
      await getUserInfoById();
      await getCart();

      if (authStore?.userRole === "customer") {
        await getUserOrders();
      }
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

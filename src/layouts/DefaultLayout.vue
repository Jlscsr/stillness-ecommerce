<template>
  <div class="min-h-screen bg-cream">
    <Navbar
      v-if="
        $route.fullPath !== '/login' &&
        $route.fullPath !== '/register' &&
        $route.name !== 'products'
      "
      :isAuthenticated="false"
      :itemCount="0"
    />

    <main class="bg-cream">
      <router-view :key="$route.fullPath" v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </router-view>
    </main>
  </div>

  <Footer
    v-if="$route.fullPath !== '/login' && $route.fullPath !== '/register'"
  />
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth.store";

import Navbar from "@components/molecules/Navbar.vue";
import Footer from "@components/molecules/Footer.vue";

const router = useRouter();
const authStore = useAuthStore();

// Remove unused function that had incorrect method reference
// If logout functionality is needed, use authStore.logoutUser() instead
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

a.router-link-active {
  @apply font-medium text-blue-600;
}
</style>

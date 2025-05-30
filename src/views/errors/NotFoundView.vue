<template>
  <main class="min-h-screen bg-cream flex flex-col items-center justify-center px-4 py-20">
    <div class="w-full max-w-lg text-center">
      <div class="relative mb-8">
        <h1 class="text-9xl font-light text-sage/10">404</h1>
        <div class="absolute inset-0 flex items-center justify-center">
          <h2 class="text-5xl font-light text-charcoal">Page Not Found</h2>
        </div>
      </div>

      <div class="w-16 h-0.5 bg-sage/50 mx-auto mb-8"></div>

      <p class="text-lg text-charcoal/70 mb-10 max-w-md mx-auto">
        The page you're looking for doesn't exist or has been moved. Let's guide you back to a place of stillness.
      </p>

      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <router-link
          to="/"
          class="px-6 py-3 bg-sage text-cream font-medium rounded-sm hover:bg-sage/90 transition-colors"
        >
          Return Home
        </router-link>
        <router-link
          to="/products"
          class="px-6 py-3 border border-charcoal/20 text-charcoal font-medium rounded-sm hover:bg-charcoal/5 transition-colors"
        >
          Browse Products
        </router-link>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {
  document.title = "Page Not Found | Stillness";
});
</script>

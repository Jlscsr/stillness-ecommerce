<template>
  <div class="relative" ref="searchRef">
    <button
      @click="isOpen = !isOpen"
      class="text-charcoal/70 hover:text-charcoal transition-colors"
      aria-label="Search products"
    >
      <Search class="h-5 w-5" />
    </button>

    <div
      :class="[
        'absolute right-0 top-full mt-2 w-72 bg-cream border border-charcoal/10 shadow-md rounded-sm transition-all duration-200 overflow-hidden z-50',
        isOpen
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-2 pointer-events-none',
      ]"
    >
      <form @submit="handleSearch" class="relative">
        <input
          ref="inputRef"
          type="text"
          placeholder="Search products..."
          v-model="query"
          class="w-full p-3 pr-10 bg-transparent text-charcoal focus:outline-none"
        />
        <button
          v-if="query"
          type="button"
          @click="query = ''"
          class="absolute right-10 top-1/2 -translate-y-1/2 text-charcoal/50 hover:text-charcoal"
          aria-label="Clear search"
        >
          <X class="h-4 w-4" />
        </button>
        <button
          type="submit"
          class="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal/70 hover:text-charcoal"
          aria-label="Submit search"
        >
          <Search class="h-4 w-4" />
        </button>
      </form>

      <div
        v-if="results.length > 0"
        class="border-t border-charcoal/10 divide-y divide-charcoal/10 max-h-80 overflow-y-auto"
      >
        <button
          v-for="product in results"
          :key="product._id"
          @click="handleResultClick(product._id)"
          class="w-full grid grid-cols-[1fr_auto] gap-2 p-3 hover:bg-beige/10 transition-colors"
        >
          <!-- text column: name + description -->
          <div class="overflow-hidden">
            <p class="text-charcoal font-medium truncate text-start">
              {{ product.name }}
            </p>
            <p class="text-xs text-charcoal/60 truncate text-start">
              {{ product.description }}
            </p>
          </div>

          <!-- price column: fixed width, right-aligned -->
          <div class="flex-none text-right text-sage">
            ${{ product.price.toFixed(2) }}
          </div>
        </button>
      </div>

      <div
        v-if="query.length >= 2 && results.length === 0"
        class="p-3 text-center text-charcoal/60"
      >
        No products found
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, nextTick } from "vue";
import { useRouter, useRoute } from "vue-router";
import { Search, X } from "lucide-vue-next";
import { useProductStore } from "@/stores/product.store";
import type { Product } from "@/types/Product";

const router = useRouter();
const route = useRoute();
const productStore = useProductStore();

const isOpen = ref(false);
const query = ref(route.query.search ? (route.query.search as string) : "");
const results = ref<Product[]>([]);
const searchRef = ref<HTMLElement>();
const inputRef = ref<HTMLInputElement>();

// Close search when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  if (searchRef.value && !searchRef.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("mousedown", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("mousedown", handleClickOutside);
});

// Focus input when opened
watch(isOpen, async (newValue) => {
  if (newValue) {
    await nextTick();
    inputRef.value?.focus();
  }
});

// Search products
watch(query, (newQuery) => {
  if (newQuery.length < 2) {
    results.value = [];
    return;
  }

  const allProducts = productStore.products;
  results.value = allProducts
    .filter((product) => {
      const searchTerm = newQuery.toLowerCase();
      return (
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        (product.japaneseText && product.japaneseText.includes(searchTerm))
      );
    })
    .slice(0, 5); // Limit to 5 results
});

const handleSearch = (e: Event) => {
  e.preventDefault();
  if (query.value.length > 1) {
    router.push(`/products?search=${encodeURIComponent(query.value)}`);
    isOpen.value = false;
    query.value = "";
  }
};

const handleResultClick = (productId: string) => {
  router.push(`/products/${productId}`);
  isOpen.value = false;
  query.value = "";
};
</script>

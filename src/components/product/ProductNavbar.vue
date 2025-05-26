<template>
  <div
    class="w-full bg-cream z-40 border-b border-charcoal/10 sticky top-0 shadow-sm"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Logo and search -->
      <div
        class="flex items-center justify-between py-2.5 border-b border-charcoal/10"
      >
        <Logo variant="small" />
        <ProductSearch />
      </div>

      <!-- Desktop Category Navigation -->
      <div class="hidden md:flex items-center justify-between h-12">
        <nav
          class="flex items-center space-x-8 overflow-x-auto py-2 scrollbar-hide"
        >
          <router-link
            v-for="category in categories"
            :key="category.id"
            :to="
              category.id === 'all'
                ? '/products'
                : `/products/category/${category.id}`
            "
            class="flex flex-col items-center group whitespace-nowrap"
          >
            <span
              class="text-charcoal/80 hover:text-charcoal text-sm transition-colors relative group-hover:text-charcoal"
            >
              {{ category.name }}
              <span
                class="absolute -bottom-0.5 left-0 w-0 h-px bg-beige transition-all duration-300 group-hover:w-full"
              ></span>
            </span>
            <span class="text-[10px] text-charcoal/50">{{
              category.japaneseText
            }}</span>
          </router-link>
        </nav>
        <div class="text-sm text-charcoal/60">{{ productsCount }} products</div>
      </div>

      <!-- Mobile Category Navigation -->
      <div class="md:hidden py-2">
        <button
          class="flex items-center justify-between w-full py-2 text-charcoal"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
        >
          <span class="font-medium">Browse Categories</span>
          <ChevronDown
            :class="[
              'h-5 w-5 transition-transform',
              isMobileMenuOpen ? 'rotate-180' : '',
            ]"
          />
        </button>

        <div
          v-if="isMobileMenuOpen"
          class="mt-2 pb-2 border-t border-charcoal/10 pt-2"
        >
          <nav class="grid grid-cols-2 gap-y-2 gap-x-4">
            <router-link
              v-for="category in categories"
              :key="category.id"
              :to="
                category.id === 'all'
                  ? '/products'
                  : `/products/category/${category.id}`
              "
              class="flex justify-between items-center py-2"
              @click="isMobileMenuOpen = false"
            >
              <div>
                <span class="text-charcoal text-sm block">{{
                  category.name
                }}</span>
                <span class="text-[10px] text-charcoal/50">{{
                  category.japaneseText
                }}</span>
              </div>
              <span class="text-xs text-charcoal/50">{{ category.count }}</span>
            </router-link>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { ChevronDown } from "lucide-vue-next";
import { useProductStore } from "@stores/product.store";
import Logo from "@components/atoms/Logo.vue";
import ProductSearch from "./ProductSearch.vue";

// Define the category type
interface Category {
  id: string;
  name: string;
  japaneseText: string;
  count: number;
}

const productStore = useProductStore();
const isMobileMenuOpen = ref(false);

// Categories data
const categories: Category[] = [
  { id: "all", name: "All Products", japaneseText: "全製品", count: 24 },
  { id: "home", name: "Home", japaneseText: "家", count: 8 },
  { id: "apparel", name: "Apparel", japaneseText: "衣類", count: 6 },
  { id: "decor", name: "Decor", japaneseText: "装飾", count: 5 },
  { id: "wellness", name: "Wellness", japaneseText: "健康", count: 7 },
  { id: "gifts", name: "Gifts", japaneseText: "贈り物", count: 4 },
  { id: "seasonal", name: "Seasonal", japaneseText: "季節", count: 3 },
  { id: "tea", name: "Tea", japaneseText: "お茶", count: 5 },
];

const productsCount = computed(() => productStore.productsCount);
</script>

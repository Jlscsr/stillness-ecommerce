<template>
  <main class="bg-cream pt-20 sm:pt-22 md:pt-24 pb-16">
    <ProductNavbar />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-light text-charcoal mb-2">All Products</h1>
        <p class="text-charcoal/70 max-w-2xl mx-auto">
          Browse our collection of mindfully crafted items for your home and
          lifestyle.
        </p>
      </div>

      <div class="flex flex-col md:flex-row gap-8">
        <!-- Sidebar filters (desktop) -->
        <div class="hidden md:block w-64 flex-shrink-0">
          <ProductFilters
            :initialFilters="filters"
            @filterChange="handleFilterChange"
            :productCount="filteredProducts.length"
          />
        </div>

        <!-- Product grid -->
        <div class="flex-1">
          <!-- Mobile filters -->
          <div class="md:hidden mb-4 flex justify-between items-center">
            <ProductFilters
              :initialFilters="filters"
              @filterChange="handleFilterChange"
              :productCount="filteredProducts.length"
              :is-mobile="true"
            />
            <div class="text-sm text-charcoal/60">
              {{ filteredProducts.length }} products
            </div>
          </div>

          <!-- Active filters -->
          <ActiveFilters
            :filters="filters"
            @removeFilter="handleRemoveFilter"
            :categoryOptions="categoryOptions"
            :materialOptions="materialOptions"
          />

          <!-- Products grid -->
          <div
            v-if="filteredProducts.length"
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6"
          >
            <ScrollAnimation
              v-for="(product, index) in filteredProducts"
              :key="product._id"
              type="scale"
              :delay="0.1 * (index % 4)"
            >
              <ProductCard :product="product" :showFooter="false" />
            </ScrollAnimation>
          </div>

          <!-- No-results fallback -->
          <div v-else class="text-center py-16">
            <p class="text-charcoal/70 mb-4">
              No products match your selected filters.
            </p>
            <button
              class="text-sage hover:text-charcoal transition-colors"
              @click="clearFilters"
            >
              Clear all filters
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { reactive, computed, onMounted } from "vue";
import { useRoute } from "vue-router";

import { useProductStore } from "@/stores/product.store";

import ProductNavbar from "@components/product/ProductNavbar.vue";
import ProductFilters from "@components/product/ProductFilters.vue";
import ActiveFilters from "@components/product/ActiveFilters.vue";
import ScrollAnimation from "@components/ui/ScrollAnimation.vue";
import ProductCard from "@components/molecules/ProductCard.vue";

const route = useRoute();
const productStore = useProductStore();

const searchQuery = computed(() => (route.query.search as string) || "");

onMounted(() => {
  if (!productStore.products.length) {
    productStore.getProducts();
  }
});

interface FilterState {
  priceRange: [number, number];
  categories: string[];
  materials: string[];
}
const filters = reactive<FilterState>({
  priceRange: [0, 200],
  categories: [],
  materials: [],
});

// Computed filtered list
const filteredProducts = computed(
  () =>
    productStore.products
      .filter(
        (p) =>
          !searchQuery.value ||
          p.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      )
      .filter(
        (p) =>
          p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
      )
      .filter(
        (p) =>
          !filters.categories.length ||
          filters.categories.includes(p.category.toLowerCase())
      )
  /* .filter((p) => {
      if (!filters.materials.length) return true;
      const materialMap: Record<string, number[]> = {
        ceramic: [1, 5],
        linen: [2, 6],
        bamboo: [3],
        cotton: [4],
        wood: [7, 8],
      };
      const ids = filters.materials.flatMap((m) => materialMap[m] || []);
      return ids.includes(p._id);
    }) */
);

// Filter options
const categoryOptions = [
  { id: "home", label: "Home" },
  { id: "apparel", label: "Apparel" },
  { id: "decor", label: "Decor" },
  { id: "wellness", label: "Wellness" },
  { id: "tea", label: "Tea" },
];
const materialOptions = [
  { id: "ceramic", label: "Ceramic" },
  { id: "linen", label: "Linen" },
  { id: "bamboo", label: "Bamboo" },
  { id: "cotton", label: "Cotton" },
  { id: "wood", label: "Wood" },
];

// Handlers
function handleFilterChange(newFilters: FilterState) {
  console.log("Updating filters:", newFilters);
  Object.assign(filters, newFilters);
}

function handleRemoveFilter(type: keyof FilterState, value?: string) {
  if (type === "priceRange") {
    filters.priceRange = [0, 200];
  } else if (value) {
    filters[type] = (filters[type] as string[]).filter((v) => v !== value);
  }
}

function clearFilters() {
  filters.priceRange = [0, 200];
  filters.categories = [];
  filters.materials = [];
}
</script>

<style scoped>
/* page-specific tweaks */
</style>

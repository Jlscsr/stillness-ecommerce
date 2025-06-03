<template>
  <main class="bg-cream pt-20 sm:pt-22 md:pt-24 pb-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Product not found -->
      <div v-if="!selectedProduct" class="text-center py-16">
        <p class="text-charcoal/70">Product not found</p>
        <router-link
          :to="{ name: 'products' }"
          class="inline-flex items-center text-sage hover:text-sage/80 transition-colors mt-4"
        >
          <ArrowLeft class="h-4 w-4 mr-1" />
          <span>Back to products</span>
        </router-link>
      </div>

      <!-- Product content -->
      <div v-else>
        <div v-if="selectedProduct">
          <!-- Back button -->
          <div class="mb-6">
            <router-link
              :to="{ name: 'products' }"
              class="inline-flex items-center text-charcoal/70 hover:text-charcoal transition-colors"
            >
              <ArrowLeft class="h-4 w-4 mr-1" />
              <span>Back to products</span>
            </router-link>
          </div>

          <!-- Product section -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <!-- Product gallery -->
            <ProductGallery
              :images="selectedProduct.images"
              :name="selectedProduct.name"
            />

            <!-- Product info -->
            <ProductInfo :product="selectedProduct" />
          </div>

          <!-- Product tabs -->
          <ProductTabs :product="selectedProduct" />

          <!-- Product reviews -->
          <ProductReviews :product-id="selectedProduct._id" />
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { ArrowLeft } from "lucide-vue-next";
import ProductGallery from "@components/product/ProductGallery.vue";
import ProductInfo from "@components/product/ProductInfo.vue";
import ProductTabs from "@components/product/ProductTabs.vue";
import ProductReviews from "@components/product/ProductReviews.vue";
import { useProductStore } from "@stores/product.store";
import type { Product } from "@/types/Product";

const route = useRoute();
const productStore = useProductStore();

const selectedProduct = ref<Product | null>(null);

// Load product on mount and when route changes
onMounted(async () => {
  if (route.params.id) {
    const id = Array.isArray(route.params.id)
      ? route.params.id[0]
      : route.params.id;
    selectedProduct.value = await productStore.getProductById(id);
  }
});

// Watch for route changes
watch(
  () => route.params.id,
  async (newId) => {
    if (newId) {
      const id = Array.isArray(newId) ? newId[0] : newId;
      selectedProduct.value = await productStore.getProductById(id);
    }
  }
);

// Handlers are implemented in ProductInfo.vue component
</script>

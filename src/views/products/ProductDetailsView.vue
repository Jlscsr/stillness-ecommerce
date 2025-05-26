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
          <ProductReviews :product-id="selectedProduct.id" />
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ArrowLeft } from "lucide-vue-next";
import ProductGallery from "@components/product/ProductGallery.vue";
import ProductInfo from "@components/product/ProductInfo.vue";
import ProductTabs from "@components/product/ProductTabs.vue";
import ProductReviews from "@components/product/ProductReviews.vue";
import { useProductStore } from "@stores/product.store";
import type { Product } from "@/types/Product";

const route = useRoute();
const router = useRouter();
const productStore = useProductStore();

const selectedProduct = ref<Product | null>(null);

const productId = ref(Number(route.params.id[0]));

// Load product on mount and when route changes
onMounted(async () => {
  if (productId.value) {
    selectedProduct.value = productStore.getProductById(productId.value);
  }
});

// Watch for route changes
watch(productId, (newId) => {
  if (newId) {
    selectedProduct.value = productStore.getProductById(newId);
  }
});

// Handle add to cart (placeholder for now)
const handleAddToCart = (payload: { product: Product; quantity: number }) => {
  console.log("Add to cart:", payload);
  // TODO: Implement cart store logic
  // cartStore.addToCart(payload.product, payload.quantity)
};

// Handle add to wishlist (placeholder for now)
const handleAddToWishlist = (payload: { product: Product; added: boolean }) => {
  console.log("Add to wishlist:", payload);
  // TODO: Implement wishlist store logic
  // wishlistStore.toggleWishlist(payload.product)
};
</script>

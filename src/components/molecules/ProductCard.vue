<template>
  <router-link
    :to="{ name: 'product-details', params: { id: product.id } }"
    class="group block"
  >
    <div class="mb-4 overflow-hidden rounded-sm shadow-lg">
      <ImageWithLoading
        :src="product.images[0].src || '/placeholder.svg'"
        :alt="product.images[0].alt || 'Product Image'"
        container-class="w-full h-[250px]"
        image-class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        root-margin="100px"
      />
    </div>
    <div class="flex justify-between items-start mb-2">
      <div>
        <h3 class="text-charcoal font-light text-lg">{{ product.name }}</h3>
        <span v-if="product.japaneseText" class="text-xs text-charcoal/60">{{
          product.japaneseText
        }}</span>
      </div>
      <span class="text-sage font-medium">${{ product.price.toFixed(2) }}</span>
    </div>
    <p class="text-charcoal/70 text-sm mb-3 line-clamp-2">
      {{ product.description }}
    </p>
    <div v-if="showFooter" class="flex justify-between items-center">
      <span class="text-xs uppercase tracking-wider text-charcoal/50">{{
        product.category
      }}</span>
      <button
        class="text-sm bg-beige px-4 py-1.5 text-charcoal rounded-sm hover:bg-beige/90 transition-colors"
        @click.prevent="handleShopNow"
      >
        Shop Now
      </button>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import type { Product } from "@/types/Product";

import ImageWithLoading from "@components/ui/ImageWithLoading.vue";

interface Props {
  product: Product;
  showFooter?: boolean;
}

const props = defineProps<Props>();
const showFooter = props.showFooter ?? true;
const router = useRouter();

const handleShopNow = () => {
  router.push({ name: "product-details", params: { id: props.product.id } });
};
</script>

<template>
  <section id="featured" class="py-20 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
    <ScrollAnimation type="fade">
      <div class="text-center mb-12">
        <span
          class="text-sm uppercase tracking-widest text-charcoal/70 mb-2 block"
          >厳選されたコレクション</span
        >
        <h2 class="text-2xl md:text-3xl font-light text-charcoal">
          Featured Collection
        </h2>
        <p class="mt-4 max-w-2xl mx-auto text-charcoal/70">
          Each piece in our collection is thoughtfully selected to bring harmony
          and tranquility to your space, embracing the Japanese concept of
          <span class="italic">ma</span> (間) — the beauty of simplicity and
          space.
        </p>
      </div>
    </ScrollAnimation>

    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
    >
      <ScrollAnimation
        v-for="(product, index) in productLists"
        :key="product.id"
        type="scale"
        :delay="0.1 * (index % 4)"
      >
        <ProductCard :product="product" :showFooter="true" />
      </ScrollAnimation>
    </div>

    <ScrollAnimation type="fade" :delay="0.4">
      <div class="mt-12 text-center">
        <router-link
          to="/products"
          class="inline-flex items-center text-charcoal hover:text-sage transition-colors flex align-center justify-center"
        >
          <span class="block">View All Products</span>
          <ChevronRight class="ml-2 w-5 h-5 block" />
        </router-link>
      </div>
    </ScrollAnimation>
  </section>
</template>

<script setup lang="ts">
import { ref, type Ref } from "vue";

import { useProductStore } from "@/stores/product.store";
import type { Product } from "@/types/Product";

import { ChevronRight } from "lucide-vue-next";

import ScrollAnimation from "@components/ui/ScrollAnimation.vue";
import ProductCard from "@components/molecules/ProductCard.vue";

const { sliceProducts } = useProductStore();

const productLists: Ref<Product[]> = ref<Product[]>(sliceProducts(0, 8));
</script>

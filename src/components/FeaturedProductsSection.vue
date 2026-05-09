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

    <ScrollAnimation type="fade" :delay="0.15">
      <div
        v-if="isLoading && !featuredProducts.length"
        class="min-h-[360px] flex flex-col items-center justify-center rounded-sm border border-charcoal/10 bg-cream/60 text-center"
      >
        <div class="relative mb-4 h-14 w-14">
          <div class="absolute inset-0 rounded-full border border-charcoal/10"></div>
          <div
            class="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-sage"
          ></div>
          <div class="absolute inset-3 rounded-full bg-beige/40 animate-pulse"></div>
        </div>
        <p class="text-sm text-charcoal/70">Loading featured products...</p>
      </div>

      <div
        v-else-if="fetchError && !featuredProducts.length"
        class="min-h-[300px] flex flex-col items-center justify-center rounded-sm border border-charcoal/10 bg-cream/60 text-center"
      >
        <p class="mb-4 text-charcoal/70">Unable to load featured products.</p>
        <button
          type="button"
          class="bg-beige text-charcoal px-5 py-2 rounded-sm hover:bg-beige/90 transition-colors"
          @click="loadProducts"
        >
          Try Again
        </button>
      </div>

      <div v-else-if="featuredProducts.length" class="relative">
        <div class="mb-6 flex justify-end gap-2">
          <button
            type="button"
            class="flex h-10 w-10 items-center justify-center rounded-full border border-charcoal/15 text-charcoal transition-colors hover:border-sage/40 hover:bg-beige/30 disabled:cursor-default disabled:opacity-40"
            :disabled="!canScrollPrev"
            aria-label="Previous featured product"
            @click="scrollCarousel(-1)"
          >
            <ChevronLeft class="h-5 w-5" />
          </button>
          <button
            type="button"
            class="flex h-10 w-10 items-center justify-center rounded-full border border-charcoal/15 text-charcoal transition-colors hover:border-sage/40 hover:bg-beige/30 disabled:cursor-default disabled:opacity-40"
            :disabled="!canScrollNext"
            aria-label="Next featured product"
            @click="scrollCarousel(1)"
          >
            <ChevronRight class="h-5 w-5" />
          </button>
        </div>

        <div
          ref="carouselRef"
          class="scrollbar-hide flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-3"
          @scroll="updateCarouselState"
        >
          <div
            v-for="product in featuredProducts"
            :key="product._id"
            data-carousel-item
            class="min-w-0 shrink-0 basis-[86%] snap-start sm:basis-[48%] lg:basis-[31%] xl:basis-[23%]"
          >
            <ProductCard :product="product" :showFooter="true" />
          </div>
        </div>

        <div class="mt-6 flex justify-center gap-2">
          <button
            v-for="(_, index) in pageOffsets"
            :key="index"
            type="button"
            class="h-2.5 rounded-full transition-all"
            :class="
              activePageIndex === index
                ? 'w-8 bg-sage'
                : 'w-2.5 bg-charcoal/20 hover:bg-charcoal/35'
            "
            :aria-label="`Show featured page ${index + 1}`"
            :aria-current="activePageIndex === index ? 'true' : undefined"
            @click="goToPage(index)"
          ></button>
        </div>
      </div>

      <div
        v-else
        class="min-h-[300px] flex items-center justify-center rounded-sm border border-charcoal/10 bg-cream/60 text-center"
      >
        <p class="text-charcoal/70">No featured products available.</p>
      </div>
    </ScrollAnimation>

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
import { nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import { storeToRefs } from "pinia";

import { useProductStore } from "@/stores/product.store";
import type { Product } from "@/types/Product";

import { ChevronLeft, ChevronRight } from "lucide-vue-next";

import ScrollAnimation from "@components/ui/ScrollAnimation.vue";
import ProductCard from "@components/molecules/ProductCard.vue";

const productStore = useProductStore();
const { products, isLoading, fetchError } = storeToRefs(productStore);

const carouselRef = ref<HTMLElement | null>(null);
const featuredProducts = ref<Product[]>([]);
const activePageIndex = ref(0);
const canScrollPrev = ref(false);
const canScrollNext = ref(false);
const pageOffsets = ref<number[]>([0]);

const sampleProducts = (sourceProducts: Product[], count: number) => {
  const productsCopy = [...sourceProducts];

  for (let index = productsCopy.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [productsCopy[index], productsCopy[randomIndex]] = [
      productsCopy[randomIndex],
      productsCopy[index],
    ];
  }

  return productsCopy.slice(0, count);
};

const loadProducts = async () => {
  try {
    await productStore.getProducts();
  } catch {
    // The store keeps the fetch error for the UI state.
  }
};

const getCarouselItems = () => {
  if (!carouselRef.value) {
    return [];
  }

  return Array.from(
    carouselRef.value.querySelectorAll<HTMLElement>("[data-carousel-item]")
  );
};

const getCarouselPageOffsets = () => {
  const carousel = carouselRef.value;
  const items = getCarouselItems();

  if (!carousel || !items.length) {
    return [0];
  }

  const maxScrollLeft = Math.max(0, carousel.scrollWidth - carousel.clientWidth);
  const offsets = items.map((item) => Math.min(item.offsetLeft, maxScrollLeft));

  if (!offsets.includes(0)) {
    offsets.unshift(0);
  }

  if (maxScrollLeft > 0) {
    offsets.push(maxScrollLeft);
  }

  return offsets
    .sort((a, b) => a - b)
    .reduce<number[]>((uniqueOffsets, offset) => {
      const previousOffset = uniqueOffsets[uniqueOffsets.length - 1];

      if (previousOffset === undefined || Math.abs(offset - previousOffset) > 4) {
        uniqueOffsets.push(offset);
      }

      return uniqueOffsets;
    }, []);
};

const getClosestPageIndex = (scrollLeft: number) => {
  return pageOffsets.value.reduce((closestIndex, offset, index) => {
    const closestDistance = Math.abs(
      pageOffsets.value[closestIndex] - scrollLeft
    );
    const currentDistance = Math.abs(offset - scrollLeft);

    return currentDistance < closestDistance ? index : closestIndex;
  }, 0);
};

const updateCarouselState = () => {
  const carousel = carouselRef.value;

  if (!carousel) {
    canScrollPrev.value = false;
    canScrollNext.value = false;
    activePageIndex.value = 0;
    pageOffsets.value = [0];
    return;
  }

  pageOffsets.value = getCarouselPageOffsets();
  activePageIndex.value = getClosestPageIndex(carousel.scrollLeft);

  canScrollPrev.value = activePageIndex.value > 0;
  canScrollNext.value = activePageIndex.value < pageOffsets.value.length - 1;
};

const scrollCarousel = (direction: -1 | 1) => {
  const nextIndex = activePageIndex.value + direction;

  if (nextIndex < 0 || nextIndex >= pageOffsets.value.length) {
    return;
  }

  goToPage(nextIndex);
};

const goToPage = (index: number) => {
  const carousel = carouselRef.value;
  const targetOffset = pageOffsets.value[index];

  if (!carousel || targetOffset === undefined) {
    return;
  }

  carousel.scrollTo({
    left: targetOffset,
    behavior: "smooth",
  });
};

watch(
  products,
  async (currentProducts) => {
    if (!featuredProducts.value.length && currentProducts.length) {
      featuredProducts.value = sampleProducts(currentProducts, 5);
    }

    await nextTick();
    updateCarouselState();
  },
  { immediate: true }
);

onMounted(async () => {
  window.addEventListener("resize", updateCarouselState);

  if (!products.value.length) {
    await loadProducts();
  }

  await nextTick();
  updateCarouselState();
});

onUnmounted(() => {
  window.removeEventListener("resize", updateCarouselState);
});
</script>

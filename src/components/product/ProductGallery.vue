<template>
  <div class="space-y-4">
    <!-- Main image -->
    <div
      class="relative aspect-square overflow-hidden rounded-sm bg-cream cursor-zoom-in"
      :class="{ 'cursor-zoom-out': isZoomed }"
      @mousemove="handleMouseMove"
      @mouseleave="handleMouseLeave"
      @click="handleImageClick"
    >
      <img
        :src="images[currentImage]?.src || '/placeholder.svg'"
        :alt="images[currentImage]?.alt || name"
        class="w-full h-full object-cover transition-transform duration-500"
        :class="{ 'scale-150': isZoomed }"
        :style="
          isZoomed
            ? { transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%` }
            : {}
        "
      />
    </div>

    <!-- Thumbnails -->
    <div v-if="images.length > 1" class="flex space-x-2 overflow-x-auto pb-2">
      <button
        v-for="(image, index) in images"
        :key="image.id"
        class="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-sm border-2 transition-colors"
        :class="
          currentImage === index
            ? 'border-sage'
            : 'border-transparent hover:border-beige/50'
        "
        @click="setCurrentImage(index)"
      >
        <ImageWithLoading
          :src="image.src || '/placeholder.svg'"
          :alt="image.alt || `${name} - Image ${index + 1}`"
          image-class="w-full h-full object-cover"
          root-margin="100px"
        />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ImageWithLoading from "@/components/ui/ImageWithLoading.vue";

interface ProductImage {
  id: number;
  src: string;
  alt: string;
}

interface Props {
  images: ProductImage[];
  name: string;
}

defineProps<Props>();

const currentImage = ref(0);
const isZoomed = ref(false);
const zoomPosition = ref({ x: 0, y: 0 });

const handleImageClick = () => {
  isZoomed.value = !isZoomed.value;
};

const handleMouseMove = (e: MouseEvent) => {
  if (!isZoomed.value) return;

  const target = e.currentTarget as HTMLElement;
  const { left, top, width, height } = target.getBoundingClientRect();
  const x = ((e.clientX - left) / width) * 100;
  const y = ((e.clientY - top) / height) * 100;

  zoomPosition.value = { x, y };
};

const handleMouseLeave = () => {
  isZoomed.value = false;
};

const setCurrentImage = (index: number) => {
  currentImage.value = index;
};
</script>

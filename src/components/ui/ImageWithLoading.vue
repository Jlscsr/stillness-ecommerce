<template>
  <div
    ref="containerRef"
    :class="containerClass"
    class="relative overflow-hidden"
  >
    <!-- Loading Animation -->
    <Transition
      enter-active-class="transition-opacity duration-300"
      leave-active-class="transition-opacity duration-300"
      enter-from-class="opacity-100"
      enter-to-class="opacity-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isLoading"
        class="absolute inset-0 flex items-center justify-center bg-cream/30 backdrop-blur-[1px]"
      >
        <!-- Zen Circle Loading Animation -->
        <div class="relative">
          <!-- Outer circle - slow rotation -->
          <div
            class="w-12 h-12 rounded-full border-2 border-charcoal/10 animate-spin-slow"
          >
            <div
              class="absolute top-0 left-1/2 w-1 h-1 bg-sage rounded-full transform -translate-x-1/2 -translate-y-1"
            ></div>
          </div>

          <!-- Inner breathing circle -->
          <div
            class="absolute inset-2 w-8 h-8 rounded-full bg-gradient-to-r from-sage/20 to-beige/20 animate-pulse-gentle"
          ></div>

          <!-- Center dot -->
          <div
            class="absolute inset-1/2 w-2 h-2 bg-charcoal/30 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-fade"
          ></div>
        </div>
      </div>
    </Transition>

    <!-- Actual Image -->
    <Transition
      enter-active-class="transition-all duration-500 ease-out"
      leave-active-class="transition-all duration-300 ease-in"
      enter-from-class="opacity-0 scale-105"
      enter-to-class="opacity-100 scale-100"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <img
        v-if="shouldLoad"
        v-show="!isLoading && !hasError"
        :src="src"
        :alt="alt"
        :class="imageClass"
        @load="handleImageLoad"
        @error="handleImageError"
        loading="eager"
      />
    </Transition>

    <!-- Error State -->
    <Transition
      enter-active-class="transition-opacity duration-300"
      leave-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="hasError"
        class="absolute inset-0 flex items-center justify-center bg-cream/50 text-charcoal/50"
      >
        <div class="text-center">
          <div
            class="w-8 h-8 mx-auto mb-2 rounded-full bg-charcoal/10 flex items-center justify-center"
          >
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              ></path>
            </svg>
          </div>
          <span class="text-xs">Image unavailable</span>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";

interface Props {
  src: string;
  alt: string;
  containerClass?: string;
  imageClass?: string;
  eager?: boolean;
  rootMargin?: string;
}

const props = withDefaults(defineProps<Props>(), {
  containerClass: "",
  imageClass: "w-full h-full object-cover",
  eager: false,
  rootMargin: "50px",
});

const containerRef = ref<HTMLElement>();
const isLoading = ref(true);
const hasError = ref(false);
const shouldLoad = ref(props.eager);
let observer: IntersectionObserver | null = null;

const handleImageLoad = () => {
  isLoading.value = false;
  hasError.value = false;
};

const handleImageError = () => {
  isLoading.value = false;
  hasError.value = true;
};

// Reset loading state when src changes
watch(
  () => props.src,
  () => {
    isLoading.value = true;
    hasError.value = false;
    if (!props.eager) {
      shouldLoad.value = false;
      setupIntersectionObserver();
    }
  }
);

const setupIntersectionObserver = () => {
  if (!containerRef.value || props.eager) return;

  // Clean up existing observer
  if (observer) {
    observer.disconnect();
  }

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !shouldLoad.value) {
          shouldLoad.value = true;
          observer?.disconnect();
        }
      });
    },
    {
      rootMargin: props.rootMargin,
      threshold: 0.1,
    }
  );

  observer.observe(containerRef.value);
};

onMounted(() => {
  if (props.eager) {
    shouldLoad.value = true;
  } else {
    setupIntersectionObserver();
  }
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});
</script>

<style scoped>
/* Custom animations for the zen-like loading */
@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes pulse-gentle {
  0%,
  100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.05);
  }
}

@keyframes fade {
  0%,
  100% {
    opacity: 0.2;
  }
  50% {
    opacity: 0.8;
  }
}

.animate-spin-slow {
  animation: spin-slow 3s linear infinite;
}

.animate-pulse-gentle {
  animation: pulse-gentle 2s ease-in-out infinite;
}

.animate-fade {
  animation: fade 1.5s ease-in-out infinite;
}
</style>

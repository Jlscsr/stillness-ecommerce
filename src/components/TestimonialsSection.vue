<template>
  <section class="py-20 px-4 md:px-8">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-12">
        <span
          class="text-sm uppercase tracking-widest text-charcoal/70 mb-2 block"
          >お客様の声</span
        >
        <h2 class="text-2xl md:text-3xl font-light text-charcoal">
          What Our Customers Say
        </h2>
      </div>

      <div class="relative">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div
            v-for="testimonial in visibleTestimonials"
            :key="testimonial.id"
            class="bg-cream p-8 rounded-sm relative"
          >
            <Quote class="absolute top-6 right-6 h-12 w-12 text-beige/30" />
            <p class="text-charcoal/80 mb-6 relative z-10">
              {{ testimonial.text }}
            </p>
            <div>
              <p class="font-medium text-charcoal">{{ testimonial.name }}</p>
              <p class="text-sm text-charcoal/60">{{ testimonial.location }}</p>
            </div>
          </div>
        </div>

        <div class="flex justify-center mt-8 gap-4">
          <button
            @click="prevSlide"
            class="p-2 rounded-full border border-charcoal/20 text-charcoal hover:bg-beige/20 transition-colors"
            aria-label="Previous testimonial"
          >
            <ArrowLeft class="h-5 w-5" />
          </button>
          <button
            @click="nextSlide"
            class="p-2 rounded-full border border-charcoal/20 text-charcoal hover:bg-beige/20 transition-colors"
            aria-label="Next testimonial"
          >
            <ArrowRight class="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { ArrowLeft, ArrowRight, Quote } from "lucide-vue-next";

interface Testimonial {
  id: number;
  name: string;
  location: string;
  text: string;
}

// Testimonials data
const testimonialData: Testimonial[] = [
  {
    id: 1,
    name: "Akiko T.",
    location: "Kyoto, Japan",
    text: "The ceramic tea set has transformed my daily tea ritual. The craftsmanship is exceptional, and it brings a moment of tranquility to my busy days.",
  },
  {
    id: 2,
    name: "Michael L.",
    location: "Portland, USA",
    text: "I've been searching for home goods that embody minimalist principles without feeling cold. Stillness has perfectly balanced warmth and simplicity in their collection.",
  },
  {
    id: 3,
    name: "Emma S.",
    location: "Melbourne, Australia",
    text: "The linen kimono robe is now my favorite piece. The quality is outstanding, and it feels like a small luxury in my everyday routine.",
  },
  {
    id: 4,
    name: "Hiroshi K.",
    location: "Tokyo, Japan",
    text: "As someone who appreciates traditional Japanese aesthetics, I'm impressed by how Stillness has modernized these principles while maintaining their essence.",
  },
];

const currentIndex = ref(0);
const itemsToShow = ref(1);

// Computed property for visible testimonials (equivalent to useMemo)
const visibleTestimonials = computed(() => {
  const endIndex = Math.min(
    currentIndex.value + itemsToShow.value,
    testimonialData.length
  );
  return testimonialData.slice(currentIndex.value, endIndex);
});

// Handle responsive display
const handleResize = () => {
  if (window.innerWidth >= 1024) {
    itemsToShow.value = 2;
  } else {
    itemsToShow.value = 1;
  }
};

const nextSlide = () => {
  const newIndex = currentIndex.value + itemsToShow.value;
  currentIndex.value = newIndex >= testimonialData.length ? 0 : newIndex;
};

const prevSlide = () => {
  const newIndex = currentIndex.value - itemsToShow.value;
  currentIndex.value =
    newIndex < 0
      ? Math.max(0, testimonialData.length - itemsToShow.value)
      : newIndex;
};

onMounted(() => {
  handleResize(); // Initial call
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<template>
  <ScrollAnimation type="scale">
    <section class="py-20 px-4 md:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <span
            class="text-sm uppercase tracking-widest text-charcoal/70 mb-2 block"
            >コレクション</span
          >
          <h2 class="text-2xl md:text-3xl font-light text-charcoal">
            Explore Our Collections
          </h2>
          <p class="mt-4 max-w-2xl mx-auto text-charcoal/70">
            Discover our thoughtfully curated collections, each telling a unique
            story and embodying different aspects of Japanese aesthetics and
            philosophy.
          </p>
        </div>

        <!-- Collection Navigation -->
        <div class="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
          <button
            v-for="collection in collections"
            :key="collection.id"
            @click="handleCollectionSelect(collection)"
            :class="
              cn(
                'px-4 py-2 rounded-sm transition-all duration-300 text-sm md:text-base relative',
                selectedCollection.id === collection.id
                  ? `${collection.accentColor} text-white font-medium`
                  : 'bg-cream text-charcoal/70 hover:text-charcoal'
              )
            "
          >
            <span class="relative z-10">{{ collection.name }}</span>
            <span
              v-if="selectedCollection.id === collection.id"
              class="block text-xs font-normal mt-0.5"
            >
              {{ collection.japaneseText }}
            </span>
          </button>
        </div>

        <!-- Collection Content -->
        <Transition
          mode="out-in"
          enter-active-class="transition-all duration-500 ease-out"
          enter-from-class="opacity-0 translate-y-5"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition-all duration-300 ease-in"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 -translate-y-5"
        >
          <div
            :key="selectedCollection.id"
            :class="
              cn('rounded-sm p-8 mb-12', selectedCollection.backgroundColor)
            "
          >
            <div class="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <span class="text-sm font-light block mb-2">{{
                  selectedCollection.japaneseText
                }}</span>
                <h3 class="text-2xl font-light mb-4">
                  {{ selectedCollection.name }}
                </h3>
                <p class="text-charcoal/80 mb-6">
                  {{ selectedCollection.longDescription }}
                </p>
                <router-link
                  to="/products"
                  :class="
                    cn(
                      'inline-flex items-center px-6 py-2 rounded-sm transition-colors',
                      selectedCollection.accentColor,
                      'text-white hover:opacity-90'
                    )
                  "
                >
                  <span>View Products</span>
                  <ChevronRight class="ml-2 h-4 w-4" />
                </router-link>
              </div>
              <div class="relative h-64 md:h-80 overflow-hidden rounded-sm">
                <ImageWithLoading
                  :src="selectedCollection.image || '/placeholder.svg'"
                  :alt="selectedCollection.name"
                  container-class="w-full h-full"
                  image-class="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </Transition>

        <!-- View All Link -->
        <div class="text-center">
          <router-link
            to="/products"
            class="inline-flex items-center text-charcoal hover:text-sage transition-colors"
          >
            <span>View All Products</span>
            <ChevronRight class="ml-1 h-4 w-4" />
          </router-link>
        </div>
      </div>
    </section>
  </ScrollAnimation>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { ChevronRight } from "lucide-vue-next";
import { cn } from "@/composables/utils";

import ScrollAnimation from "@/components/ui/ScrollAnimation.vue";
import ImageWithLoading from "@/components/ui/ImageWithLoading.vue";

// Define the collection interface
interface Collection {
  id: string;
  name: string;
  japaneseText: string;
  description: string;
  longDescription: string;
  image: string;
  backgroundColor: string;
  textColor: string;
  accentColor: string;
}

// Collection data
const collections: Collection[] = reactive([
  {
    id: "tea-ceremony",
    name: "Tea Ceremony",
    japaneseText: "茶道",
    description:
      "Traditional and modern implements for the Japanese tea ceremony and everyday tea enjoyment.",
    longDescription:
      "The Japanese tea ceremony, or chado, embodies harmony, respect, purity, and tranquility. Our tea ceremony collection features carefully selected items that honor this tradition while bringing its mindful approach to everyday moments. Each piece is crafted with attention to detail and material, creating a bridge between ancient ritual and contemporary life.",
    image:
      "https://res.cloudinary.com/duz4cbg9w/image/upload/v1748143201/tea_ceremony_img_miuaag.png",
    backgroundColor: "bg-beige/20",
    textColor: "text-charcoal",
    accentColor: "bg-beige",
  },
  {
    id: "zen-living",
    name: "Zen Living",
    japaneseText: "禅の生活",
    description:
      "Minimalist home essentials inspired by Zen principles of simplicity and mindfulness.",
    longDescription:
      "Zen philosophy emphasizes simplicity, mindfulness, and finding beauty in imperfection. Our Zen Living collection brings these principles into your home with minimalist designs that create space for thought and presence. These pieces help cultivate a sense of calm and intention in your daily environment, allowing you to focus on what truly matters.",
    image:
      "https://res.cloudinary.com/duz4cbg9w/image/upload/v1748143202/zen_living_img_m25a43.png",
    backgroundColor: "bg-sage/10",
    textColor: "text-charcoal",
    accentColor: "bg-sage",
  },
  {
    id: "wabi-sabi",
    name: "Wabi-Sabi",
    japaneseText: "侘寂",
    description:
      "Pieces that celebrate the beauty of imperfection and the patina of natural aging.",
    longDescription:
      "Wabi-sabi embraces the flawed, impermanent, and incomplete. This collection honors the Japanese aesthetic that finds beauty in imperfection and accepts the natural cycle of growth and decay. Each piece tells a story through its unique textures, asymmetries, and subtle details, reminding us to appreciate the authenticity that comes with time and use.",
    image:
      "https://res.cloudinary.com/duz4cbg9w/image/upload/v1748143201/wabi_sabi_img_vicvkf.png",
    backgroundColor: "bg-terracotta/10",
    textColor: "text-charcoal",
    accentColor: "bg-terracotta",
  },
  {
    id: "ikigai",
    name: "Ikigai",
    japaneseText: "生き甲斐",
    description:
      "Products designed to help you find joy, purpose, and fulfillment in everyday activities.",
    longDescription:
      "Ikigai represents the intersection of what you love, what you're good at, what the world needs, and what you can be rewarded for. This collection features items that enhance your daily rituals and help you connect with your sense of purpose. From morning routines to evening reflections, these pieces support a life of meaning and satisfaction.",
    image:
      "https://res.cloudinary.com/duz4cbg9w/image/upload/v1748143201/ikigai_img_lfjrqb.png",
    backgroundColor: "bg-dusty-blue/10",
    textColor: "text-charcoal",
    accentColor: "bg-dusty-blue",
  },
]);

// State for the selected collection
const selectedCollection = ref<Collection>(collections[0]);

// Handle collection selection
const handleCollectionSelect = (collection: Collection) => {
  selectedCollection.value = collection;
};
</script>

<style scoped>
/* Additional styles if needed */
</style>

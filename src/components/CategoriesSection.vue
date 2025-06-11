<template>
  <section class="py-16 px-4 md:px-8 lg:px-16 bg-terracotta/5">
    <div class="max-w-6xl mx-auto">
      <ScrollAnimation type="fade">
        <div class="text-center mb-12">
          <span
            class="text-sm uppercase tracking-widest text-charcoal/70 mb-2 block"
          >
            カテゴリー
          </span>
          <h2 class="text-2xl md:text-3xl font-light text-charcoal">
            Browse Categories
          </h2>
          <p class="mt-4 max-w-2xl mx-auto text-charcoal/70">
            Explore our thoughtfully curated categories, each designed to bring
            elements of calm and intention to different aspects of your daily
            life.
          </p>
        </div>
      </ScrollAnimation>

      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        <ScrollAnimation
          v-for="(category, index) in categories"
          :key="category.name"
          type="scale"
          :delay="0.05 * index"
        >
          <router-link
            to="/products"
            class="flex flex-col items-center group bg-cream p-6 rounded-sm hover:bg-beige/10 transition-colors"
          >
            <div
              class="w-12 h-12 flex items-center justify-center mb-3 text-charcoal group-hover:text-sage transition-colors"
            >
              <component :is="category.icon" class="h-6 w-6" />
            </div>
            <span class="text-xs text-charcoal/60 mb-1">
              {{ category.japaneseText }}
            </span>
            <span
              class="text-charcoal font-light group-hover:text-sage transition-colors text-center"
            >
              {{ category.name }}
            </span>
            <p class="text-xs text-charcoal/60 mt-2 text-center">
              {{ category.description }}
            </p>
          </router-link>
        </ScrollAnimation>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {
  Home,
  ShoppingBag,
  Lamp,
  Heart,
  Gift,
  Leaf,
  Coffee,
  Sparkles,
} from "lucide-vue-next";
import ScrollAnimation from "@/components/ui/ScrollAnimation.vue";

interface Category {
  name: string;
  japaneseText: string;
  icon: any; // Component type from lucide-vue-next
  href: string;
  description: string;
}

const categories: Category[] = [
  {
    name: "Home",
    japaneseText: "家",
    icon: Home,
    href: "/categories/home",
    description: "Essentials for a tranquil living space",
  },
  {
    name: "Apparel",
    japaneseText: "衣類",
    icon: ShoppingBag,
    href: "/categories/apparel",
    description: "Comfortable, minimalist clothing",
  },
  {
    name: "Decor",
    japaneseText: "装飾",
    icon: Lamp,
    href: "/categories/decor",
    description: "Mindful objects for your space",
  },
  {
    name: "Wellness",
    japaneseText: "健康",
    icon: Heart,
    href: "/categories/wellness",
    description: "Products for mind and body balance",
  },
  {
    name: "Gifts",
    japaneseText: "贈り物",
    icon: Gift,
    href: "/categories/gifts",
    description: "Thoughtful presents for loved ones",
  },
  {
    name: "Seasonal",
    japaneseText: "季節",
    icon: Leaf,
    href: "/categories/seasonal",
    description: "Items that celebrate nature's cycles",
  },
  {
    name: "Tea",
    japaneseText: "お茶",
    icon: Coffee,
    href: "/categories/tea",
    description: "Ceremonial and everyday tea essentials",
  },
  {
    name: "Limited Edition",
    japaneseText: "限定版",
    icon: Sparkles,
    href: "/categories/limited",
    description: "Special collections and unique pieces",
  },
];
</script>

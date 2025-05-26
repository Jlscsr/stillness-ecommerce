<template>
  <section class="bg-dusty-blue py-16 px-4 md:px-8 lg:px-16 text-center">
    <div class="max-w-4xl mx-auto">
      <ScrollAnimation type="fade">
        <span class="text-sm uppercase tracking-widest text-cream/80 mb-2 block"
          >特別オファー</span
        >
      </ScrollAnimation>

      <ScrollAnimation type="slide-up" :delay="0.1">
        <h2 class="text-xl md:text-3xl font-light text-cream mb-3">
          Free Shipping on Orders Over $100
        </h2>
      </ScrollAnimation>

      <ScrollAnimation type="fade" :delay="0.2">
        <p class="text-cream/90 font-light mb-6 max-w-2xl mx-auto">
          Experience the essence of mindful living with our curated collection.
          Each purchase supports traditional craftsmanship and sustainable
          practices. Use code <span class="font-medium">MINDFUL</span> at
          checkout for free shipping on orders over $100.
        </p>
      </ScrollAnimation>

      <ScrollAnimation type="fade" :delay="0.3">
        <div class="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <router-link
            to="/products"
            class="inline-block px-6 py-3 bg-cream text-dusty-blue font-medium rounded-sm hover:bg-cream/90 transition-colors"
          >
            Shop Now
          </router-link>
        </div>
      </ScrollAnimation>
    </div>
  </section>
</template>

<script setup lang="ts">
import ScrollAnimation from "@/components/ui/ScrollAnimation.vue";
</script>

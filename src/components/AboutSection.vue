<template>
  <section id="about" class="py-20 px-4 md:px-8 lg:px-16 bg-terracotta/5">
    <div class="max-w-7xl mx-auto">
      <ScrollAnimation type="fade">
        <div class="text-center mb-12">
          <span
            class="text-sm uppercase tracking-widest text-charcoal/70 mb-2 block"
          >
            私たちについて
          </span>
          <h2 class="text-2xl md:text-3xl font-light text-charcoal">
            Our Philosophy
          </h2>
        </div>
      </ScrollAnimation>

      <div class="grid md:grid-cols-2 gap-12 items-center">
        <ScrollAnimation type="slide-right" :delay="0.2">
          <div
            class="relative h-[400px] md:h-[500px] rounded-sm overflow-hidden"
          >
            <ImageWithLoading
              src="https://res.cloudinary.com/duz4cbg9w/image/upload/v1748146690/about_section_img_zrzplu.png"
              alt="About Section Image"
              container-class="w-full h-full"
              image-class="absolute inset-0 w-full h-full object-cover"
              root-margin="100px"
            />
          </div>
        </ScrollAnimation>

        <div>
          <ScrollAnimation type="slide-left" :delay="0.3">
            <h3 class="text-xl md:text-2xl font-light text-charcoal mb-4">
              Finding Beauty in Simplicity
              <span class="text-sage">侘寂</span>
            </h3>
          </ScrollAnimation>

          <ScrollAnimation type="fade" :delay="0.4">
            <p class="text-charcoal/80 mb-4">
              Founded in 2025, Stillness was born from a desire to bring the
              principles of Japanese minimalism and mindfulness into everyday
              living. Our journey began with a simple question: how can we
              create spaces that foster tranquility in our busy modern lives?
            </p>
          </ScrollAnimation>

          <ScrollAnimation type="fade" :delay="0.5">
            <p class="text-charcoal/80 mb-4">
              Each product in our collection is thoughtfully sourced or crafted
              to embody the principles of
              <span class="italic">wabi-sabi</span> — the Japanese concept of
              finding beauty in imperfection and impermanence. We work with
              artisans who share our commitment to quality, sustainability, and
              mindful creation.
            </p>
          </ScrollAnimation>

          <ScrollAnimation type="slide-up" :delay="0.6">
            <div class="grid grid-cols-3 gap-4 mb-6">
              <div class="text-center p-4 bg-cream rounded-sm">
                <h4 class="text-charcoal font-medium mb-1">簡素</h4>
                <p class="text-sm text-charcoal/70">Simplicity</p>
              </div>
              <div class="text-center p-4 bg-cream rounded-sm">
                <h4 class="text-charcoal font-medium mb-1">調和</h4>
                <p class="text-sm text-charcoal/70">Harmony</p>
              </div>
              <div class="text-center p-4 bg-cream rounded-sm">
                <h4 class="text-charcoal font-medium mb-1">自然</h4>
                <p class="text-sm text-charcoal/70">Nature</p>
              </div>
            </div>
          </ScrollAnimation>

          <ScrollAnimation type="fade" :delay="0.7">
            <router-link
              :to="{ name: 'about-us' }"
              class="inline-block px-6 py-2 border border-charcoal/20 text-charcoal font-medium rounded-sm hover:bg-charcoal/5 transition-colors"
            >
              Our Full Story
            </router-link>
          </ScrollAnimation>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import ScrollAnimation from "@/components/ui/ScrollAnimation.vue";
import ImageWithLoading from "@/components/ui/ImageWithLoading.vue";
</script>

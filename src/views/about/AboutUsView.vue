<template>
  <!-- Hero Section -->
  <section class="pt-32 pb-16 px-4 md:px-8 lg:px-16 relative overflow-hidden">
    <div class="max-w-7xl mx-auto">
      <div class="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <ScrollAnimation type="fade">
            <span
              class="text-sm uppercase tracking-widest text-charcoal/70 mb-2 block"
              >私たちについて</span
            >
          </ScrollAnimation>
          <ScrollAnimation type="slide-up" :delay="0.1">
            <h1 class="text-4xl md:text-5xl font-light text-charcoal mb-6">
              Our Story
            </h1>
          </ScrollAnimation>
          <ScrollAnimation type="fade" :delay="0.2">
            <p class="text-lg text-charcoal/80 mb-6">
              Discover the journey behind Stillness and our commitment to
              bringing Japanese principles of simplicity, harmony, and
              mindfulness into everyday living.
            </p>
          </ScrollAnimation>
        </div>
        <ScrollAnimation type="scale" :delay="0.3">
          <div
            class="relative h-[300px] md:h-[500px] rounded-sm overflow-hidden"
          >
            <ImageWithLoading
              src="https://res.cloudinary.com/duz4cbg9w/image/upload/v1748151312/about_us_page_img_u1nvip.png"
              alt="Japanese Vase with Plant"
              container-class="w-full h-full"
              image-class="w-full h-full object-cover"
            />
          </div>
        </ScrollAnimation>
      </div>
    </div>
  </section>

  <!-- Our Beginning -->
  <section class="py-16 px-4 md:px-8 lg:px-16 bg-beige/10">
    <div class="max-w-4xl mx-auto">
      <ScrollAnimation type="fade">
        <h2
          class="text-2xl md:text-3xl font-light text-charcoal mb-8 text-center"
        >
          Our Beginning
        </h2>
      </ScrollAnimation>
      <ScrollAnimation type="fade" :delay="0.1">
        <p class="text-charcoal/80 mb-6">
          Stillness was founded in 2025 out of a quiet desire to return to what
          feels essential. In a world that moves faster with each passing day,
          it was born as a counterpoint — a gentle reminder that beauty doesn’t
          always demand attention, and that the objects we choose to surround
          ourselves with can shape how we feel, think, and live.
        </p>
      </ScrollAnimation>

      <ScrollAnimation type="fade" :delay="0.2">
        <p class="text-charcoal/80 mb-6">
          The idea was not sudden, but slowly formed — shaped by encounters with
          honest materials, quiet rituals, and the enduring wisdom found in
          handcraft. There was a deep respect for process, for the imperfections
          that make each piece feel alive, and for the stories that emerge from
          things made with care and intention.
        </p>
      </ScrollAnimation>

      <ScrollAnimation type="fade" :delay="0.3">
        <p class="text-charcoal/80 mb-6">
          From the beginning, Stillness sought to create more than just
          products. It became a space — a mindset — for those drawn to
          simplicity, to the poetry of restraint, and to the calm presence that
          thoughtful design brings. It started small, with just a few objects
          that reflected these values, and grew naturally, shaped by shared
          appreciation rather than trends.
        </p>
      </ScrollAnimation>

      <ScrollAnimation type="fade" :delay="0.4">
        <p class="text-charcoal/80">
          Today, Stillness continues to evolve, not by chasing noise or speed,
          but by deepening its connection to what matters. Each collection is a
          quiet offering — an invitation to pause, to notice, and to reconnect
          with the essence of living well.
        </p>
      </ScrollAnimation>
    </div>
  </section>

  <!-- Our Philosophy -->
  <section class="py-16 px-4 md:px-8 lg:px-16">
    <div class="max-w-7xl mx-auto">
      <ScrollAnimation type="fade">
        <h2
          class="text-2xl md:text-3xl font-light text-charcoal mb-8 text-center"
        >
          Our Philosophy
        </h2>
      </ScrollAnimation>

      <div class="grid md:grid-cols-3 gap-8">
        <ScrollAnimation type="slide-up" :delay="0.1">
          <div class="bg-cream p-6 rounded-sm border border-charcoal/10">
            <div
              class="w-12 h-12 bg-beige/30 rounded-sm flex items-center justify-center mb-4"
            >
              <span class="text-charcoal text-xl">簡</span>
            </div>
            <h3 class="text-xl font-light text-charcoal mb-3">
              Simplicity (Kanso)
            </h3>
            <p class="text-charcoal/80">
              We believe in the power of simplicity to bring clarity and focus
              to our lives. Our products feature clean lines, natural materials,
              and thoughtful functionality that eliminates the unnecessary and
              emphasizes what truly matters.
            </p>
          </div>
        </ScrollAnimation>

        <ScrollAnimation type="slide-up" :delay="0.2">
          <div class="bg-cream p-6 rounded-sm border border-charcoal/10">
            <div
              class="w-12 h-12 bg-beige/30 rounded-sm flex items-center justify-center mb-4"
            >
              <span class="text-charcoal text-xl">侘</span>
            </div>
            <h3 class="text-xl font-light text-charcoal mb-3">
              Imperfection (Wabi)
            </h3>
            <p class="text-charcoal/80">
              We embrace the Japanese concept of wabi-sabi, finding beauty in
              imperfection and impermanence. Our handcrafted products celebrate
              the unique variations, textures, and patinas that develop over
              time and with use.
            </p>
          </div>
        </ScrollAnimation>

        <ScrollAnimation type="slide-up" :delay="0.3">
          <div class="bg-cream p-6 rounded-sm border border-charcoal/10">
            <div
              class="w-12 h-12 bg-beige/30 rounded-sm flex items-center justify-center mb-4"
            >
              <span class="text-charcoal text-xl">間</span>
            </div>
            <h3 class="text-xl font-light text-charcoal mb-3">Space (Ma)</h3>
            <p class="text-charcoal/80">
              We value the concept of "ma" – the meaningful space or interval
              between elements. This principle guides our curation process,
              ensuring that each product has room to breathe and serve its
              purpose without excess or clutter.
            </p>
          </div>
        </ScrollAnimation>
      </div>
    </div>
  </section>

  <!-- Meet Our Team -->
  <TeamSection />

  <!-- Sustainability -->
  <section class="py-16 px-4 md:px-8 lg:px-16">
    <div class="max-w-7xl mx-auto">
      <ScrollAnimation type="fade">
        <div class="text-center mb-12">
          <span
            class="text-sm uppercase tracking-widest text-charcoal/70 mb-2 block"
            >持続可能性</span
          >
          <h2 class="text-2xl md:text-3xl font-light text-charcoal">
            Our Commitment to Sustainability
          </h2>
        </div>
      </ScrollAnimation>

      <div class="grid md:grid-cols-3 gap-8">
        <ScrollAnimation type="slide-up" :delay="0.1">
          <div class="bg-cream p-6 rounded-sm border border-charcoal/10">
            <h3 class="text-xl font-light text-charcoal mb-3">
              Natural Materials
            </h3>
            <p class="text-charcoal/80">
              We prioritize natural, renewable materials like clay, linen,
              bamboo, and sustainably harvested wood. These materials not only
              create beautiful products but also have a lower environmental
              impact and can biodegrade at the end of their lifecycle.
            </p>
          </div>
        </ScrollAnimation>

        <ScrollAnimation type="slide-up" :delay="0.2">
          <div class="bg-cream p-6 rounded-sm border border-charcoal/10">
            <h3 class="text-xl font-light text-charcoal mb-3">
              Mindful Production
            </h3>
            <p class="text-charcoal/80">
              We work with artisans who employ traditional techniques that
              typically use less energy and create less waste than mass
              production. We produce in small batches to ensure quality and
              prevent overstock, reducing unnecessary consumption.
            </p>
          </div>
        </ScrollAnimation>

        <ScrollAnimation type="slide-up" :delay="0.3">
          <div class="bg-cream p-6 rounded-sm border border-charcoal/10">
            <h3 class="text-xl font-light text-charcoal mb-3">
              Thoughtful Packaging
            </h3>
            <p class="text-charcoal/80">
              Our packaging is designed to be minimal, recyclable, and beautiful
              enough to be reused. We use plant-based inks, recycled paper, and
              avoid plastic wherever possible, embracing the Japanese concept of
              "furoshiki" – the art of fabric wrapping.
            </p>
          </div>
        </ScrollAnimation>
      </div>
    </div>
  </section>

  <!-- Join Our Journey -->
  <section
    class="py-16 px-4 md:px-8 lg:px-16 bg-dusty-blue text-cream text-center"
  >
    <div class="max-w-3xl mx-auto">
      <ScrollAnimation type="fade">
        <h2 class="text-2xl md:text-3xl font-light mb-6">Join Our Journey</h2>
      </ScrollAnimation>
      <ScrollAnimation type="fade" :delay="0.1">
        <p class="mb-8">
          We're grateful to have you as part of our community. As we continue to
          grow and evolve, we remain committed to our founding principles and to
          bringing moments of stillness and beauty to your everyday life.
        </p>
      </ScrollAnimation>
      <ScrollAnimation type="fade" :delay="0.2">
        <router-link
          to="/contact"
          class="inline-block px-8 py-3 bg-cream text-dusty-blue font-medium rounded-sm hover:bg-cream/90 transition-colors"
        >
          Get in Touch
        </router-link>
      </ScrollAnimation>
    </div>
  </section>
</template>

<script setup lang="ts">
// Import components
import ScrollAnimation from "@components/ui/ScrollAnimation.vue";
import TeamSection from "@components/TeamSection.vue";
import ImageWithLoading from "@components/ui/ImageWithLoading.vue";
</script>

<style scoped></style>

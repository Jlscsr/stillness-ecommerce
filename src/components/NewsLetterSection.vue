<template>
  <section class="py-16 px-4 bg-beige/20">
    <div class="max-w-4xl mx-auto text-center">
      <span
        class="text-sm uppercase tracking-widest text-charcoal/70 mb-2 block"
        >ニュースレター</span
      >
      <h2 class="text-2xl md:text-3xl font-light text-charcoal mb-4">
        Join Our Community
      </h2>
      <p class="text-charcoal/80 mb-8 max-w-2xl mx-auto">
        Subscribe to our newsletter for mindful living tips, new product
        announcements, and exclusive offers. We send thoughtfully curated
        content that aligns with the principles of simplicity and intention.
      </p>
      <form @submit.prevent="handleSubmit" class="max-w-md mx-auto">
        <div class="flex flex-col sm:flex-row gap-2">
          <input
            v-model="email"
            type="email"
            placeholder="Your email address"
            class="px-4 py-3 bg-cream border border-charcoal/10 focus:border-sage focus:outline-none flex-1 rounded-sm"
            required
          />
          <button
            type="submit"
            class="bg-charcoal text-cream px-6 py-3 font-medium hover:bg-charcoal/90 transition-colors rounded-sm"
          >
            Subscribe
          </button>
        </div>
        <p class="text-xs text-charcoal/60 mt-3 text-left">
          By subscribing, you agree to our Privacy Policy. You can unsubscribe
          at any time.
        </p>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";

const email = ref("");

const handleSubmit = () => {
  // Handle newsletter subscription logic here
  console.log("Newsletter subscription:", email.value);

  // You can add your subscription logic here, for example:
  // - Send to API endpoint
  // - Show success message
  // - Reset form

  // Reset form after submission
  email.value = "";
};
</script>

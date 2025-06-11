<template>
  <footer class="bg-cream py-16 px-4 border-t border-charcoal/10">
    <div class="max-w-6xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <div>
          <div class="flex items-center mb-6">
            <div
              class="w-8 h-8 rounded-sm bg-beige flex items-center justify-center mr-2"
            >
              <span class="text-charcoal font-light">静</span>
            </div>
            <span class="text-charcoal text-lg font-light tracking-wider"
              >Stillness</span
            >
          </div>
          <p class="text-charcoal/70 mb-6">
            Curated essentials for mindful living, inspired by Japanese
            principles of simplicity and harmony. Our mission is to bring
            tranquility and intention to everyday moments.
          </p>
          <div class="flex space-x-4">
            <a
              href="https://instagram.com"
              class="text-charcoal/60 hover:text-sage transition-colors"
            >
              <Instagram class="h-5 w-5" />
              <span class="sr-only">Instagram</span>
            </a>
            <a
              href="https://twitter.com"
              class="text-charcoal/60 hover:text-sage transition-colors"
            >
              <Twitter class="h-5 w-5" />
              <span class="sr-only">Twitter</span>
            </a>
            <a
              href="https://facebook.com"
              class="text-charcoal/60 hover:text-sage transition-colors"
            >
              <Facebook class="h-5 w-5" />
              <span class="sr-only">Facebook</span>
            </a>
            <a
              href="https://youtube.com"
              class="text-charcoal/60 hover:text-sage transition-colors"
            >
              <Youtube class="h-5 w-5" />
              <span class="sr-only">YouTube</span>
            </a>
          </div>
        </div>

        <div>
          <h3 class="text-charcoal font-medium mb-4">Shop</h3>
          <ul class="space-y-2">
            <li>
              <router-link
                to="/products"
                class="text-charcoal/70 hover:text-charcoal transition-colors"
              >
                Best Sellers
              </router-link>
            </li>
            <li>
              <router-link
                to="/products"
                class="text-charcoal/70 hover:text-charcoal transition-colors"
              >
                Collections
              </router-link>
            </li>
            <li>
              <router-link
                to="/products"
                class="text-charcoal/70 hover:text-charcoal transition-colors"
              >
                Seasonals
              </router-link>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="text-charcoal font-medium mb-4">About</h3>
          <ul class="space-y-2">
            <li>
              <router-link
                to="/about-us"
                class="text-charcoal/70 hover:text-charcoal transition-colors"
              >
                Our Story
              </router-link>
            </li>
            <li>
              <router-link
                to="/about-us"
                class="text-charcoal/70 hover:text-charcoal transition-colors"
              >
                Sustainability
              </router-link>
            </li>
            <li>
              <router-link
                to="/about-us"
                class="text-charcoal/70 hover:text-charcoal transition-colors"
              >
                Journal
              </router-link>
            </li>
            <li>
              <router-link
                to="/about-us"
                class="text-charcoal/70 hover:text-charcoal transition-colors"
              >
                Our Team
              </router-link>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="text-charcoal font-medium mb-4">Connect</h3>
          <p class="text-charcoal/70 mb-4">
            Sign up for our newsletter to receive updates, exclusive offers, and
            mindful living inspiration.
          </p>
          <form class="mb-4" @submit.prevent="handleNewsletterSubmit">
            <div class="flex">
              <input
                v-model="email"
                type="email"
                placeholder="Your email"
                class="px-3 py-2 bg-cream border border-charcoal/20 focus:border-beige focus:outline-none flex-1"
                required
              />
              <button
                type="submit"
                class="bg-beige text-charcoal px-4 py-2 font-medium hover:bg-beige/90 transition-colors"
              >
                Join
              </button>
            </div>
          </form>
          <ul class="space-y-2">
            <li>
              <router-link
                to="/contact"
                class="text-charcoal/70 hover:text-charcoal transition-colors"
              >
                FAQ
              </router-link>
            </li>
            <li>
              <router-link
                to="/contact"
                class="text-charcoal/70 hover:text-charcoal transition-colors"
              >
                Contact Us
              </router-link>
            </li>
            <li>
              <router-link
                to="/contact"
                class="text-charcoal/70 hover:text-charcoal transition-colors"
              >
                Store Locations
              </router-link>
            </li>
          </ul>
        </div>
      </div>

      <div
        class="pt-8 border-t border-charcoal/10 flex flex-col md:flex-row justify-center items-center text-charcoal/60 text-sm"
      >
        <p>
          © {{ currentYear }} Stillness. All rights reserved.
          <span class="text-xs">静けさ</span>
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { Instagram, Twitter, Facebook, Youtube } from "lucide-vue-next";

const email = ref("");
const currentYear = computed(() => new Date().getFullYear());

const handleNewsletterSubmit = () => {
  // Handle newsletter subscription logic here
  console.log("Newsletter subscription:", email.value);
  // You can emit an event or call an API here
  email.value = ""; // Clear the input after submission
};
</script>

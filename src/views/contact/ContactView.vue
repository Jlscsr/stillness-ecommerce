<template>
  <!-- Hero Section -->
  <section class="pt-32 pb-16 px-4 md:px-8 lg:px-16 relative overflow-hidden">
    <div class="max-w-7xl mx-auto">
      <div class="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <ScrollAnimation type="fade">
            <span
              class="text-sm uppercase tracking-widest text-charcoal/70 mb-2 block"
              >お問い合わせ</span
            >
          </ScrollAnimation>
          <ScrollAnimation type="slide-up" :delay="0.1">
            <h1 class="text-4xl md:text-5xl font-light text-charcoal mb-6">
              Contact Us
            </h1>
          </ScrollAnimation>
          <ScrollAnimation type="fade" :delay="0.2">
            <p class="text-lg text-charcoal/80 mb-6">
              We'd love to hear from you. Whether you have a question about our
              products, want to collaborate, or simply want to say hello, we're
              here to help.
            </p>
          </ScrollAnimation>
        </div>
        <ScrollAnimation type="scale" :delay="0.3">
          <div
            class="relative h-[300px] md:h-[500px] rounded-sm overflow-hidden"
          >
            <ImageWithLoading
              src="https://res.cloudinary.com/duz4cbg9w/image/upload/v1748151311/contact_page_img_q4xlfa.png"
              alt="Japanese Vase Plant"
              container-class="w-full h-full"
              image-class="w-full h-full object-cover"
            />
          </div>
        </ScrollAnimation>
      </div>
    </div>
  </section>

  <!-- Contact Information -->
  <section class="py-16 px-4 md:px-8 lg:px-16 bg-beige/10">
    <div class="max-w-7xl mx-auto">
      <ScrollAnimation type="fade">
        <h2
          class="text-2xl md:text-3xl font-light text-charcoal mb-12 text-center"
        >
          Get in Touch
        </h2>
      </ScrollAnimation>

      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <ScrollAnimation type="slide-up" :delay="0.1">
          <div
            class="bg-cream p-6 rounded-sm border border-charcoal/10 text-center"
          >
            <div
              class="w-12 h-12 bg-beige/30 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <MapPin class="h-6 w-6 text-charcoal/70" />
            </div>
            <h3 class="text-lg font-medium text-charcoal mb-2">Visit Us</h3>
            <p class="text-charcoal/80">
              123 Harmony Way<br />
              Portland, OR 97205<br />
              United States
            </p>
          </div>
        </ScrollAnimation>

        <ScrollAnimation type="slide-up" :delay="0.2">
          <div
            class="bg-cream p-6 rounded-sm border border-charcoal/10 text-center"
          >
            <div
              class="w-12 h-12 bg-beige/30 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Phone class="h-6 w-6 text-charcoal/70" />
            </div>
            <h3 class="text-lg font-medium text-charcoal mb-2">Call Us</h3>
            <p class="text-charcoal/80">
              <a
                href="tel:+15035551234"
                class="hover:text-sage transition-colors"
              >
                +1 (503) 555-1234
              </a>
            </p>
            <p class="text-charcoal/60 text-sm mt-2">
              Customer service hours only
            </p>
          </div>
        </ScrollAnimation>

        <ScrollAnimation type="slide-up" :delay="0.3">
          <div
            class="bg-cream p-6 rounded-sm border border-charcoal/10 text-center"
          >
            <div
              class="w-12 h-12 bg-beige/30 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Mail class="h-6 w-6 text-charcoal/70" />
            </div>
            <h3 class="text-lg font-medium text-charcoal mb-2">Email Us</h3>
            <p class="text-charcoal/80">
              <a
                href="mailto:hello@stillness.com"
                class="hover:text-sage transition-colors"
              >
                hello@stillness.com
              </a>
            </p>
            <p class="text-charcoal/60 text-sm mt-2">
              We'll respond within 24 hours
            </p>
          </div>
        </ScrollAnimation>

        <ScrollAnimation type="slide-up" :delay="0.4">
          <div
            class="bg-cream p-6 rounded-sm border border-charcoal/10 text-center"
          >
            <div
              class="w-12 h-12 bg-beige/30 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Clock class="h-6 w-6 text-charcoal/70" />
            </div>
            <h3 class="text-lg font-medium text-charcoal mb-2">Hours</h3>
            <p class="text-charcoal/80">
              Monday - Friday: 10am - 6pm<br />
              Saturday: 11am - 5pm<br />
              Sunday: Closed
            </p>
          </div>
        </ScrollAnimation>
      </div>
    </div>
  </section>

  <!-- Contact Form and Map -->
  <section class="py-16 px-4 md:px-8 lg:px-16">
    <div class="max-w-7xl mx-auto">
      <div class="grid md:grid-cols-2 gap-12">
        <ScrollAnimation type="slide-right" :delay="0.1">
          <div>
            <h3 class="text-2xl font-light text-charcoal mb-6">
              Send Us a Message
            </h3>
            <div
              v-if="isSubmitted"
              class="bg-sage/10 border border-sage/20 p-6 rounded-sm text-center"
            >
              <div
                class="w-16 h-16 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Send class="h-8 w-8 text-sage" />
              </div>
              <h4 class="text-xl font-medium text-charcoal mb-2">
                Message Sent!
              </h4>
              <p class="text-charcoal/80 mb-4">
                Thank you for reaching out. We've received your message and will
                get back to you shortly.
              </p>
              <button
                @click="resetForm"
                class="px-6 py-2 bg-sage text-cream rounded-sm hover:bg-sage/90 transition-colors"
              >
                Send Another Message
              </button>
            </div>
            <form v-else @submit.prevent="handleSubmit" class="space-y-6">
              <div>
                <label
                  for="name"
                  class="block text-sm font-medium text-charcoal mb-1"
                >
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  v-model="formData.name"
                  required
                  class="w-full p-3 border border-charcoal/20 bg-cream rounded-sm focus:outline-none focus:border-sage"
                />
              </div>

              <div>
                <label
                  for="email"
                  class="block text-sm font-medium text-charcoal mb-1"
                >
                  Your Email *
                </label>
                <input
                  type="email"
                  id="email"
                  v-model="formData.email"
                  required
                  class="w-full p-3 border border-charcoal/20 bg-cream rounded-sm focus:outline-none focus:border-sage"
                />
              </div>

              <div>
                <label
                  for="subject"
                  class="block text-sm font-medium text-charcoal mb-1"
                >
                  Subject *
                </label>
                <select
                  id="subject"
                  v-model="formData.subject"
                  required
                  class="w-full p-3 border border-charcoal/20 bg-cream rounded-sm focus:outline-none focus:border-sage"
                >
                  <option value="">Please select</option>
                  <option value="Product Inquiry">Product Inquiry</option>
                  <option value="Order Status">Order Status</option>
                  <option value="Returns & Exchanges">
                    Returns & Exchanges
                  </option>
                  <option value="Collaboration">Collaboration</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label
                  for="message"
                  class="block text-sm font-medium text-charcoal mb-1"
                >
                  Your Message *
                </label>
                <textarea
                  id="message"
                  v-model="formData.message"
                  required
                  rows="6"
                  class="w-full p-3 border border-charcoal/20 bg-cream rounded-sm focus:outline-none focus:border-sage"
                ></textarea>
              </div>

              <p v-if="error" class="text-terracotta">{{ error }}</p>

              <button
                type="submit"
                :disabled="isSubmitting"
                :class="[
                  'px-8 py-3 rounded-sm transition-colors',
                  isSubmitting
                    ? 'bg-sage/50 text-cream/80 cursor-not-allowed'
                    : 'bg-sage text-cream hover:bg-sage/90',
                ]"
              >
                {{ isSubmitting ? "Sending..." : "Send Message" }}
              </button>
            </form>
          </div>
        </ScrollAnimation>

        <ScrollAnimation type="slide-left" :delay="0.2">
          <div>
            <h3 class="text-2xl font-light text-charcoal mb-6">Find Us</h3>
            <div class="relative h-[400px] rounded-sm overflow-hidden mb-4">
              <!-- This would be a real map in production -->
              <ImageWithLoading
                src="https://res.cloudinary.com/duz4cbg9w/image/upload/v1748153607/store_location_img_eky7yv.png"
                alt="Map location"
                container-class="w-full h-full"
                image-class="w-full h-full object-cover"
              />
            </div>
            <p class="text-charcoal/80 mb-4">
              Our showroom and store is located in the Pearl District of
              Portland, easily accessible by public transportation and with
              parking available nearby.
            </p>
            <p class="text-charcoal/80">
              We invite you to visit us in person to experience our products
              firsthand and to speak with our knowledgeable staff about
              incorporating mindful design into your space.
            </p>
          </div>
        </ScrollAnimation>
      </div>
    </div>
  </section>

  <!-- FAQ Section -->
  <section class="py-16 px-4 md:px-8 lg:px-16 bg-terracotta/5">
    <div class="max-w-4xl mx-auto">
      <ScrollAnimation type="fade">
        <h2
          class="text-2xl md:text-3xl font-light text-charcoal mb-12 text-center"
        >
          Frequently Asked Questions
        </h2>
      </ScrollAnimation>

      <div class="space-y-6">
        <ScrollAnimation type="slide-up" :delay="0.1">
          <div class="bg-cream p-6 rounded-sm border border-charcoal/10">
            <h3 class="text-lg font-medium text-charcoal mb-2">
              Do you ship internationally?
            </h3>
            <p class="text-charcoal/80">
              Yes, we ship to most countries worldwide. International shipping
              rates and delivery times vary by location. You can view shipping
              options and rates during checkout.
            </p>
          </div>
        </ScrollAnimation>

        <ScrollAnimation type="slide-up" :delay="0.2">
          <div class="bg-cream p-6 rounded-sm border border-charcoal/10">
            <h3 class="text-lg font-medium text-charcoal mb-2">
              What is your return policy?
            </h3>
            <p class="text-charcoal/80">
              We accept returns within 30 days of delivery for unused items in
              their original packaging. Custom or personalized items cannot be
              returned unless damaged or defective. Please visit our
              <router-link to="/returns" class="text-sage hover:underline">
                Returns & Exchanges
              </router-link>
              page for more details.
            </p>
          </div>
        </ScrollAnimation>

        <ScrollAnimation type="slide-up" :delay="0.3">
          <div class="bg-cream p-6 rounded-sm border border-charcoal/10">
            <h3 class="text-lg font-medium text-charcoal mb-2">
              Do you offer gift wrapping?
            </h3>
            <p class="text-charcoal/80">
              Yes, we offer traditional Japanese furoshiki gift wrapping using
              reusable fabric. You can select this option during checkout for a
              small additional fee. We also include handwritten notes upon
              request.
            </p>
          </div>
        </ScrollAnimation>

        <ScrollAnimation type="slide-up" :delay="0.4">
          <div class="bg-cream p-6 rounded-sm border border-charcoal/10">
            <h3 class="text-lg font-medium text-charcoal mb-2">
              Do you have a wholesale program?
            </h3>
            <p class="text-charcoal/80">
              Yes, we offer wholesale options for select retailers who share our
              values and aesthetic. Please contact us at
              <a
                href="mailto:wholesale@stillness.com"
                class="text-sage hover:underline"
              >
                wholesale@stillness.com
              </a>
              with information about your business for more details.
            </p>
          </div>
        </ScrollAnimation>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, nextTick } from "vue";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-vue-next";

// Import components
import ScrollAnimation from "@components/ui/ScrollAnimation.vue";
import ImageWithLoading from "@components/ui/ImageWithLoading.vue";

// Form data interface
interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Reactive form data
const formData = reactive<FormData>({
  name: "",
  email: "",
  subject: "",
  message: "",
});

// Component state
const isSubmitting = ref(false);
const isSubmitted = ref(false);
const error = ref("");

// Form submission handler
const handleSubmit = () => {
  isSubmitting.value = true;
  error.value = "";

  // Simulate form submission
  setTimeout(() => {
    isSubmitting.value = false;
    isSubmitted.value = true;
    // Reset form
    Object.assign(formData, {
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  }, 1500);
};

// Reset form and show form again
const resetForm = () => {
  isSubmitted.value = false;
  error.value = "";
};

// Force component refresh and ensure proper mounting
onMounted(async () => {
  await nextTick();
});
</script>

<style scoped>
/* Add any component-specific styles here if needed */
</style>

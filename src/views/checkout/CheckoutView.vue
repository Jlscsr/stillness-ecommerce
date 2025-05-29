<template>
  <main class="min-h-screen bg-cream">
    <!-- Order Confirmation View -->
    <div
      v-if="isComplete"
      class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16"
    >
      <div class="text-center">
        <div
          class="w-16 h-16 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <Check class="h-8 w-8 text-sage" />
        </div>
        <h1 class="text-3xl font-light text-charcoal mb-4">Order Confirmed</h1>
        <p class="text-charcoal/70 mb-6">
          Thank you for your order! Your order number is
          <span class="font-medium text-charcoal">{{ orderNumber }}</span
          >.
        </p>
        <p class="text-charcoal/70 mb-8">
          We've sent a confirmation email to
          <span class="font-medium text-charcoal">{{ formData.email }}</span>
          with your order details.
        </p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link
            to="/profile"
            class="px-6 py-3 bg-beige text-charcoal font-medium rounded-sm hover:bg-beige/90 transition-colors"
          >
            View Order Status
          </router-link>
          <router-link
            to="/products"
            class="px-6 py-3 border border-charcoal/20 text-charcoal font-medium rounded-sm hover:bg-charcoal/5 transition-colors"
          >
            Continue Shopping
          </router-link>
        </div>
      </div>
    </div>

    <!-- Checkout Form View -->
    <div v-else class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
      <div class="mb-6">
        <router-link
          v-if="step === 1"
          to="/cart"
          class="inline-flex items-center text-charcoal/70 hover:text-charcoal transition-colors"
        >
          <ArrowLeft class="h-4 w-4 mr-1" />
          <span>Back to Cart</span>
        </router-link>
        <a
          v-else
          href="#"
          @click.prevent="step = 1"
          class="inline-flex items-center text-charcoal/70 hover:text-charcoal transition-colors"
        >
          <ArrowLeft class="h-4 w-4 mr-1" />
          <span>Back to Shipping</span>
        </a>
      </div>

      <h1 class="text-3xl font-light text-charcoal mb-8">Checkout</h1>

      <!-- Checkout steps -->
      <div class="flex items-center mb-8">
        <div
          :class="`flex items-center ${
            step >= 1 ? 'text-sage' : 'text-charcoal/40'
          }`"
        >
          <div
            :class="`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 1
                ? 'bg-sage text-cream'
                : 'bg-charcoal/20 text-charcoal/60'
            }`"
          >
            1
          </div>
          <span class="ml-2 font-medium">Shipping</span>
        </div>
        <div
          :class="`w-12 h-0.5 mx-2 ${step >= 2 ? 'bg-sage' : 'bg-charcoal/20'}`"
        ></div>
        <div
          :class="`flex items-center ${
            step >= 2 ? 'text-sage' : 'text-charcoal/40'
          }`"
        >
          <div
            :class="`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 2
                ? 'bg-sage text-cream'
                : 'bg-charcoal/20 text-charcoal/60'
            }`"
          >
            2
          </div>
          <span class="ml-2 font-medium">Payment</span>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Form -->
        <div class="lg:col-span-2">
          <div class="bg-cream border border-charcoal/10 rounded-sm p-6">
            <form @submit.prevent="handleSubmit">
              <!-- Step 1: Shipping Information -->
              <div v-if="step === 1">
                <h2 class="text-lg font-medium text-charcoal mb-4">
                  Shipping Information
                </h2>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label
                      for="firstName"
                      class="block text-sm font-medium text-charcoal mb-1"
                    >
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      v-model="formData.firstName"
                      @blur="validateField('firstName')"
                      :class="[
                        'w-full p-2 border bg-cream rounded-sm focus:outline-none focus:border-sage',
                        firstNameError
                          ? 'border-red-500'
                          : 'border-charcoal/20',
                      ]"
                    />
                    <p v-if="firstNameError" class="mt-1 text-xs text-red-500">
                      {{ firstNameError }}
                    </p>
                  </div>
                  <div>
                    <label
                      for="lastName"
                      class="block text-sm font-medium text-charcoal mb-1"
                    >
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      v-model="formData.lastName"
                      @blur="validateField('lastName')"
                      :class="[
                        'w-full p-2 border bg-cream rounded-sm focus:outline-none focus:border-sage',
                        lastNameError ? 'border-red-500' : 'border-charcoal/20',
                      ]"
                    />
                    <p v-if="lastNameError" class="mt-1 text-xs text-red-500">
                      {{ lastNameError }}
                    </p>
                  </div>
                </div>

                <div class="mb-4">
                  <label
                    for="email"
                    class="block text-sm font-medium text-charcoal mb-1"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    v-model="formData.email"
                    @blur="validateField('email')"
                    :class="[
                      'w-full p-2 border bg-cream rounded-sm focus:outline-none focus:border-sage',
                      emailError ? 'border-red-500' : 'border-charcoal/20',
                    ]"
                  />
                  <p v-if="emailError" class="mt-1 text-xs text-red-500">
                    {{ emailError }}
                  </p>
                </div>

                <div class="mb-4">
                  <label
                    for="address"
                    class="block text-sm font-medium text-charcoal mb-1"
                  >
                    Address *
                  </label>
                  <input
                    type="text"
                    id="address"
                    v-model="formData.address"
                    @blur="validateField('address')"
                    :class="[
                      'w-full p-2 border bg-cream rounded-sm focus:outline-none focus:border-sage',
                      addressError ? 'border-red-500' : 'border-charcoal/20',
                    ]"
                  />
                  <p v-if="addressError" class="mt-1 text-xs text-red-500">
                    {{ addressError }}
                  </p>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label
                      for="city"
                      class="block text-sm font-medium text-charcoal mb-1"
                    >
                      City *
                    </label>
                    <input
                      type="text"
                      id="city"
                      v-model="formData.city"
                      @blur="validateField('city')"
                      :class="[
                        'w-full p-2 border bg-cream rounded-sm focus:outline-none focus:border-sage',
                        cityError ? 'border-red-500' : 'border-charcoal/20',
                      ]"
                    />
                    <p v-if="cityError" class="mt-1 text-xs text-red-500">
                      {{ cityError }}
                    </p>
                  </div>
                  <div>
                    <label
                      for="postalCode"
                      class="block text-sm font-medium text-charcoal mb-1"
                    >
                      Postal Code *
                    </label>
                    <input
                      type="text"
                      id="postalCode"
                      v-model="formData.postalCode"
                      @blur="validateField('postalCode')"
                      :class="[
                        'w-full p-2 border bg-cream rounded-sm focus:outline-none focus:border-sage',
                        postalCodeError
                          ? 'border-red-500'
                          : 'border-charcoal/20',
                      ]"
                    />
                    <p v-if="postalCodeError" class="mt-1 text-xs text-red-500">
                      {{ postalCodeError }}
                    </p>
                  </div>
                  <div>
                    <label
                      for="country"
                      class="block text-sm font-medium text-charcoal mb-1"
                    >
                      Country *
                    </label>
                    <select
                      id="country"
                      v-model="formData.country"
                      @blur="validateField('country')"
                      :class="[
                        'w-full p-2 border bg-cream rounded-sm focus:outline-none focus:border-sage',
                        countryError ? 'border-red-500' : 'border-charcoal/20',
                      ]"
                    >
                      <option value="Japan">Japan</option>
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                      <option value="United Kingdom">United Kingdom</option>
                    </select>
                    <p v-if="countryError" class="mt-1 text-xs text-red-500">
                      {{ countryError }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- Step 2: Payment Information -->
              <div v-if="step === 2">
                <h2 class="text-lg font-medium text-charcoal mb-4">
                  Payment Information
                </h2>

                <div class="flex items-center mb-6">
                  <CreditCard class="h-5 w-5 text-charcoal/60 mr-2" />
                  <span class="text-sm text-charcoal">Credit Card</span>
                </div>

                <div class="mb-4">
                  <label
                    for="cardName"
                    class="block text-sm font-medium text-charcoal mb-1"
                  >
                    Name on Card *
                  </label>
                  <input
                    type="text"
                    id="cardName"
                    v-model="formData.cardName"
                    @blur="validateField('cardName')"
                    :class="[
                      'w-full p-2 border bg-cream rounded-sm focus:outline-none focus:border-sage',
                      cardNameError ? 'border-red-500' : 'border-charcoal/20',
                    ]"
                  />
                  <p v-if="cardNameError" class="mt-1 text-xs text-red-500">
                    {{ cardNameError }}
                  </p>
                </div>

                <div class="mb-4">
                  <label
                    for="cardNumber"
                    class="block text-sm font-medium text-charcoal mb-1"
                  >
                    Card Number *
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    v-model="formData.cardNumber"
                    @blur="validateField('cardNumber')"
                    placeholder="XXXX XXXX XXXX XXXX"
                    :class="[
                      'w-full p-2 border bg-cream rounded-sm focus:outline-none focus:border-sage',
                      cardNumberError ? 'border-red-500' : 'border-charcoal/20',
                    ]"
                  />
                  <p v-if="cardNumberError" class="mt-1 text-xs text-red-500">
                    {{ cardNumberError }}
                  </p>
                </div>

                <div class="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label
                      for="expDate"
                      class="block text-sm font-medium text-charcoal mb-1"
                    >
                      Expiration Date *
                    </label>
                    <input
                      type="text"
                      id="expDate"
                      v-model="formData.expDate"
                      @blur="validateField('expDate')"
                      placeholder="MM/YY"
                      :class="[
                        'w-full p-2 border bg-cream rounded-sm focus:outline-none focus:border-sage',
                        expDateError ? 'border-red-500' : 'border-charcoal/20',
                      ]"
                    />
                    <p v-if="expDateError" class="mt-1 text-xs text-red-500">
                      {{ expDateError }}
                    </p>
                  </div>
                  <div>
                    <label
                      for="cvv"
                      class="block text-sm font-medium text-charcoal mb-1"
                    >
                      CVV *
                    </label>
                    <input
                      type="text"
                      id="cvv"
                      v-model="formData.cvv"
                      @blur="validateField('cvv')"
                      placeholder="XXX"
                      :class="[
                        'w-full p-2 border bg-cream rounded-sm focus:outline-none focus:border-sage',
                        cvvError ? 'border-red-500' : 'border-charcoal/20',
                      ]"
                    />
                    <p v-if="cvvError" class="mt-1 text-xs text-red-500">
                      {{ cvvError }}
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                :disabled="isSubmitting"
                :class="[
                  'w-full flex items-center justify-center px-6 py-3 rounded-sm transition-colors',
                  isSubmitting
                    ? 'bg-sage/50 text-cream/80 cursor-not-allowed'
                    : 'bg-sage text-cream hover:bg-sage/90',
                ]"
              >
                {{
                  isSubmitting
                    ? "Processing..."
                    : step === 1
                    ? "Continue to Payment"
                    : "Place Order"
                }}
              </button>
            </form>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="lg:col-span-1">
          <div
            ref="summaryRef"
            class="bg-cream border border-charcoal/10 rounded-sm sticky top-24 flex flex-col"
            :style="{
              maxHeight: summaryHeight ? `${summaryHeight}px` : 'auto',
            }"
          >
            <div class="p-6 border-b border-charcoal/10">
              <h2 class="text-lg font-medium text-charcoal">Order Summary</h2>
            </div>

            <div class="flex-1 overflow-y-auto p-6">
              <div class="mb-4">
                <p class="text-sm text-charcoal/70 mb-2">
                  {{ items.length }} items
                </p>
                <ul class="space-y-3">
                  <li
                    v-for="(item, index) in items"
                    :key="index"
                    class="flex justify-between text-sm"
                  >
                    <span class="text-charcoal">
                      {{ item.quantity }} × {{ item.name }}
                    </span>
                    <span class="text-charcoal font-medium">
                      ${{
                        (item.priceAtTimeOfAddition * item.quantity).toFixed(2)
                      }}
                    </span>
                  </li>
                </ul>
              </div>

              <div class="border-t border-charcoal/10 pt-4 space-y-3">
                <div class="flex justify-between text-sm">
                  <span class="text-charcoal/70">Subtotal</span>
                  <span class="text-charcoal">${{ subtotal.toFixed(2) }}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-charcoal/70">Shipping</span>
                  <span class="text-charcoal">${{ shipping.toFixed(2) }}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-charcoal/70">Tax</span>
                  <span class="text-charcoal">${{ tax.toFixed(2) }}</span>
                </div>
              </div>
            </div>

            <div class="p-6 border-t border-charcoal/10 bg-cream">
              <div class="flex justify-between font-medium text-charcoal mb-2">
                <span>Total</span>
                <span>${{ total.toFixed(2) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { ArrowLeft, CreditCard, Check } from "lucide-vue-next";
import { useFormValidation } from "@/hooks/useFormValidation";
import {
  required,
  email as emailValidator,
  pattern,
  minLength,
} from "@/composables/validators";
import { useCartStore } from "@/stores/cart.store";

const cartStore = useCartStore();
const { cart } = storeToRefs(cartStore);
const router = useRouter();
const step = ref(1);
const isSubmitting = ref(false);
const isComplete = ref(false);
const orderNumber = ref("");
const summaryRef = ref<HTMLElement | null>(null);
const summaryHeight = ref<number | null>(null);

// Form data
const formData = ref({
  firstName: "",
  lastName: "",
  email: "",
  address: "",
  city: "",
  postalCode: "",
  country: "Japan",
  cardName: "",
  cardNumber: "",
  expDate: "",
  cvv: "",
});

const items = computed(() => cart.value?.items || []);

// Computed values
const subtotal = computed(() => {
  return items.value.reduce((total, item) => {
    return total + item.priceAtTimeOfAddition * item.quantity;
  }, 0);
});

const shipping = computed(() => 10.0);
const tax = computed(() => subtotal.value * 0.08);
const total = computed(() => subtotal.value + shipping.value + tax.value);

// Setup form validation
const validationSchema = {
  firstName: [required()],
  lastName: [required()],
  email: [required(), emailValidator()],
  address: [required()],
  city: [required()],
  postalCode: [
    required(),
    pattern(/^\d{3,10}$/, "Please enter a valid postal code"),
  ],
  country: [required()],
  cardName: [required()],
  cardNumber: [
    required(),
    pattern(
      /^\d{4}(\s\d{4}){3}$/,
      "Please enter a valid card number in format XXXX XXXX XXXX XXXX"
    ),
  ],
  expDate: [
    required(),
    pattern(
      /^(0[1-9]|1[0-2])\/\d{2}$/,
      "Please enter a valid expiration date (MM/YY)"
    ),
  ],
  cvv: [required(), pattern(/^\d{3,4}$/, "CVV must be 3 or 4 digits")],
};

const {
  errors,
  firstName: firstNameError,
  lastName: lastNameError,
  email: emailError,
  address: addressError,
  city: cityError,
  postalCode: postalCodeError,
  country: countryError,
  cardName: cardNameError,
  cardNumber: cardNumberError,
  expDate: expDateError,
  cvv: cvvError,
  validateField,
  validate,
  resetValidation,
} = useFormValidation(formData, validationSchema);

// Methods
const handleSubmit = () => {
  if (step.value === 1) {
    // Validate shipping fields
    const shippingFields = [
      "firstName",
      "lastName",
      "email",
      "address",
      "city",
      "postalCode",
      "country",
    ];
    const isValid = shippingFields.every((field) =>
      validateField(field as keyof typeof formData)
    );

    if (isValid) {
      step.value = 2;
    }
    return;
  }

  // Validate payment fields
  const paymentFields = ["cardName", "cardNumber", "expDate", "cvv"];
  const isValid = paymentFields.every((field) =>
    validateField(field as keyof typeof formData)
  );

  if (!isValid) return;

  isSubmitting.value = true;
};

// Calculate and set the height for the summary container
const updateSummaryHeight = () => {
  if (summaryRef.value) {
    const viewportHeight = window.innerHeight;
    const summaryTop = summaryRef.value.getBoundingClientRect().top;
    const availableHeight = viewportHeight - summaryTop - 20; // 20px buffer
    summaryHeight.value = Math.max(300, availableHeight); // Minimum height of 300px
  }
};

onMounted(() => {
  updateSummaryHeight();
  window.addEventListener("resize", updateSummaryHeight);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateSummaryHeight);
});
</script>

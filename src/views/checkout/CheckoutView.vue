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
          v-else-if="step === 2"
          href="#"
          @click.prevent="step = 1"
          class="inline-flex items-center text-charcoal/70 hover:text-charcoal transition-colors"
        >
          <ArrowLeft class="h-4 w-4 mr-1" />
          <span>Back to Shipping</span>
        </a>
        <a
          v-else
          href="#"
          @click.prevent="step = 2"
          class="inline-flex items-center text-charcoal/70 hover:text-charcoal transition-colors"
        >
          <ArrowLeft class="h-4 w-4 mr-1" />
          <span>Back to Payment Method</span>
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
          <span class="ml-2 font-medium">Payment Method</span>
        </div>
        <div
          :class="`w-12 h-0.5 mx-2 ${step >= 3 ? 'bg-sage' : 'bg-charcoal/20'}`"
        ></div>
        <div
          :class="`flex items-center ${
            step >= 3 ? 'text-sage' : 'text-charcoal/40'
          }`"
        >
          <div
            :class="`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 3
                ? 'bg-sage text-cream'
                : 'bg-charcoal/20 text-charcoal/60'
            }`"
          >
            3
          </div>
          <span class="ml-2 font-medium">Payment Details</span>
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

              <!-- Step 2: Payment Method Selection -->
              <div v-if="step === 2">
                <h2 class="text-lg font-medium text-charcoal mb-4">
                  Payment Method
                </h2>

                <div class="space-y-4">
                  <!-- COD Option -->
                  <div
                    class="border border-charcoal/10 rounded-sm p-4 cursor-pointer"
                    :class="{
                      'border-sage bg-sage/5': formData.paymentMethod === 'cod',
                    }"
                    @click="formData.paymentMethod = 'cod'"
                  >
                    <div class="flex items-center">
                      <div class="mr-3">
                        <input
                          type="radio"
                          id="cod"
                          value="cod"
                          v-model="formData.paymentMethod"
                          class="h-4 w-4 text-sage focus:ring-sage"
                        />
                      </div>
                      <div>
                        <label
                          for="cod"
                          class="font-medium text-charcoal cursor-pointer"
                        >
                          Cash on Delivery (COD)
                        </label>
                        <p class="text-sm text-charcoal/70 mt-1">
                          Pay with cash when your order is delivered
                        </p>
                      </div>
                    </div>
                  </div>

                  <!-- Online Payment Option -->
                  <div
                    class="border border-charcoal/10 rounded-sm p-4 cursor-pointer"
                    :class="{
                      'border-sage bg-sage/5':
                        formData.paymentMethod === 'online',
                    }"
                    @click="formData.paymentMethod = 'online'"
                  >
                    <div class="flex items-center">
                      <div class="mr-3">
                        <input
                          type="radio"
                          id="online"
                          value="online"
                          v-model="formData.paymentMethod"
                          class="h-4 w-4 text-sage focus:ring-sage"
                        />
                      </div>
                      <div>
                        <label
                          for="online"
                          class="font-medium text-charcoal cursor-pointer"
                        >
                          Card Payment
                        </label>
                        <p class="text-sm text-charcoal/70 mt-1">
                          Pay securely with your credit or debit card
                        </p>
                      </div>
                    </div>
                  </div>

                  <p
                    v-if="paymentMethodError"
                    class="mt-1 text-xs text-red-500"
                  >
                    {{ paymentMethodError }}
                  </p>
                </div>
              </div>

              <!-- Step 3: PayPal Payment (only for online payment) -->
              <div v-if="step === 3">
                <h2 class="text-lg font-medium text-charcoal mb-4">
                  Payment with PayPal
                </h2>

                <div class="flex items-center mb-6">
                  <CreditCard class="h-5 w-5 text-sage mr-2" />
                  <span class="text-sm text-charcoal/70"
                    >Secured payment processing via PayPal</span
                  >
                </div>

                <!-- PayPal Button Container -->
                <div
                  class="mb-6 border border-charcoal/10 rounded-sm p-6 bg-white"
                >
                  <div class="flex justify-center items-center mb-4">
                    <img
                      src="/images/paypal-logo.png"
                      alt="PayPal"
                      class="h-8"
                      onerror="this.src='https://www.paypalobjects.com/webstatic/en_US/i/buttons/PP_logo_h_100x26.png'; this.onerror=null;"
                    />
                  </div>

                  <p class="text-sm text-charcoal/70 text-center mb-4">
                    You'll be redirected to PayPal to complete your payment
                    securely.
                  </p>

                  <!-- PayPal Button Placeholder (would be replaced by actual PayPal SDK in production) -->
                  <div id="paypal-button-container" class="w-full">
                    <button
                      type="button"
                      class="w-full bg-[#0070ba] hover:bg-[#003087] text-white font-medium py-3 px-4 rounded-sm transition-colors flex items-center justify-center"
                      @click="handlePayPalCheckout"
                    >
                      <span>Checkout with PayPal</span>
                    </button>
                  </div>

                  <p class="text-xs text-charcoal/50 text-center mt-4">
                    Note: This is a sandbox integration. No actual payment will
                    be processed.
                  </p>
                </div>
              </div>

              <button
                type="submit"
                :disabled="isSubmitting"
                :class="[
                  'w-full flex items-center justify-center px-6 py-3 rounded-sm transition-colors mt-5',
                  isSubmitting
                    ? 'bg-sage/50 text-cream/80 cursor-not-allowed'
                    : 'bg-sage text-cream hover:bg-sage/90',
                ]"
              >
                {{
                  isSubmitting
                    ? "Processing..."
                    : step === 1
                    ? "Continue to Payment Method"
                    : step === 2
                    ? formData.paymentMethod === "cod"
                      ? "Place Order"
                      : "Continue to Payment Details"
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
import { ref, computed, onMounted, onUnmounted, reactive } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { ArrowLeft, CreditCard, Check } from "lucide-vue-next";
import { useFormValidation } from "@/hooks/useFormValidation";
import {
  required,
  email as emailValidator,
  pattern,
  type Validator,
} from "@/composables/validators";
import { useCartStore } from "@/stores/cart.store";
import { useUserStore } from "@/stores/user.store";
import { type CartItem } from "@/types/Cart";

const cartStore = useCartStore();
const userStore = useUserStore();
const { userInfo } = storeToRefs(userStore);
const { cart } = storeToRefs(cartStore);
const router = useRouter();
const step = ref(1);
const isSubmitting = ref(false);
const isComplete = ref(false);
const orderNumber = ref("");
const summaryRef = ref<HTMLElement | null>(null);
const summaryHeight = ref<number | null>(null);

// Form data
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  paymentMethod: string;
}

const formData = reactive<FormData>({
  firstName: userInfo.value?.firstName || "",
  lastName: userInfo.value?.lastName || "",
  email: userInfo.value?.email || "",
  address: userInfo.value?.address?.street || "",
  city: userInfo.value?.address?.city || "",
  postalCode: userInfo.value?.address?.postalCode || "",
  country: userInfo.value?.address?.country || "",
  paymentMethod: "",
});

const items = computed<CartItem[]>(() => cart.value?.items || []);

// Computed values
const subtotal = computed(() => {
  return items.value.reduce((total, item) => {
    return total + (item.priceAtTimeOfAddition || 0) * item.quantity;
  }, 0);
});

const shipping = computed(() => 10.0);
const tax = computed(() => subtotal.value * 0.08);
const total = computed(() => subtotal.value + shipping.value + tax.value);

// Setup form validation
const validationSchema: Partial<Record<keyof FormData, Validator[]>> = {
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
  paymentMethod: [required("Please select a payment method")],
};

const { errors, validateField, validate, resetValidation } = useFormValidation(
  formData,
  validationSchema
);

// Extract individual field errors using computed properties
const firstNameError = computed(() => errors.firstName);
const lastNameError = computed(() => errors.lastName);
const emailError = computed(() => errors.email);
const addressError = computed(() => errors.address);
const cityError = computed(() => errors.city);
const postalCodeError = computed(() => errors.postalCode);
const countryError = computed(() => errors.country);
const paymentMethodError = computed(() => errors.paymentMethod);

// Methods
const handleSubmit = (): void => {
  if (step.value === 1) {
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
      validateField(field as keyof FormData)
    );

    if (isValid) {
      step.value = 2;
    }
    return;
  }

  if (step.value === 2) {
    // Validate payment method selection
    if (!validateField("paymentMethod")) {
      return;
    }

    // If COD is selected, skip to order confirmation
    if (formData.paymentMethod === "cod") {
      // Process order with COD payment
      isSubmitting.value = true;
      // Simulate order processing
      setTimeout(() => {
        orderNumber.value = `ORD-${Math.floor(Math.random() * 1000000)
          .toString()
          .padStart(6, "0")}`;
        isComplete.value = true;
        isSubmitting.value = false;
      }, 1500);
      return;
    }

    // If online payment is selected, proceed to payment details
    step.value = 3;
    return;
  }

  // For PayPal, we don't need to validate card fields
  isSubmitting.value = true;

  // Here we would normally redirect to PayPal, but for the sandbox we'll just simulate
  setTimeout(() => {
    orderNumber.value = `ORD-${Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, "0")}`;
    isComplete.value = true;
    isSubmitting.value = false;
  }, 1500);
};

// Handle PayPal checkout button click
const handlePayPalCheckout = (): void => {
  // This would typically integrate with the PayPal SDK
  // For now, we'll simulate a successful payment
  isSubmitting.value = true;

  // Simulate PayPal processing time
  setTimeout(() => {
    orderNumber.value = `ORD-${Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, "0")}`;
    isComplete.value = true;
    isSubmitting.value = false;
  }, 2000);
};

// Calculate and set the height for the summary container
const updateSummaryHeight = (): void => {
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

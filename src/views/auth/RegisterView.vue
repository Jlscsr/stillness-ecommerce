<!-- src/views/RegisterView.vue -->
<template>
  <div class="pt-16 pb-16 px-4 bg-cream">
    <div
      class="max-w-md mx-auto bg-white p-8 rounded-sm border border-charcoal/10 shadow-sm"
    >
      <h1 class="text-2xl font-light text-charcoal mb-6 text-center">
        Create Account
      </h1>

      <div
        v-if="error"
        class="bg-terracotta/10 border border-terracotta/20 text-terracotta p-3 rounded-sm mb-4"
      >
        {{ error }}
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <!-- First + Last Name -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-charcoal mb-1"
              >First Name</label
            >
            <input
              v-model="formData.firstName"
              @blur="validateField('firstName')"
              type="text"
              class="w-full p-2 border border-charcoal/20 rounded-sm focus:outline-none focus:border-sage"
            />
            <p v-if="errors.firstName" class="text-terracotta text-sm mt-1">
              {{ errors.firstName }}
            </p>
          </div>
          <div>
            <label class="block text-sm font-medium text-charcoal mb-1"
              >Last Name</label
            >
            <input
              v-model="formData.lastName"
              @blur="validateField('lastName')"
              type="text"
              class="w-full p-2 border border-charcoal/20 rounded-sm focus:outline-none focus:border-sage"
            />
            <p v-if="errors.lastName" class="text-terracotta text-sm mt-1">
              {{ errors.lastName }}
            </p>
          </div>
        </div>

        <!-- Email -->
        <div>
          <label class="block text-sm font-medium text-charcoal mb-1"
            >Email</label
          >
          <input
            v-model="formData.email"
            @blur="validateField('email')"
            type="email"
            class="w-full p-2 border border-charcoal/20 rounded-sm focus:outline-none focus:border-sage"
          />
          <p v-if="errors.email" class="text-terracotta text-sm mt-1">
            {{ errors.email }}
          </p>
        </div>

        <!-- Password -->
        <div class="relative">
          <label class="block text-sm font-medium text-charcoal mb-1"
            >Password</label
          >
          <input
            v-model="formData.password"
            @blur="validateField('password')"
            :type="showPassword ? 'text' : 'password'"
            class="w-full p-2 pr-10 border border-charcoal/20 rounded-sm focus:outline-none focus:border-sage"
          />
          <button
            type="button"
            class="absolute right-3 top-8 text-charcoal/50 hover:text-charcoal"
            @click="showPassword = !showPassword"
          >
            <EyeOff v-if="showPassword" class="h-4 w-4" />
            <Eye v-else class="h-4 w-4" />
          </button>
          <p v-if="errors.password" class="text-terracotta text-sm mt-1">
            {{ errors.password }}
          </p>
          <p class="text-xs text-charcoal/60 mt-1">
            Must be at least 6 characters
          </p>
        </div>

        <!-- Confirm Password -->
        <div class="relative">
          <label class="block text-sm font-medium text-charcoal mb-1"
            >Confirm Password</label
          >
          <input
            v-model="formData.confirmPassword"
            @blur="validateField('confirmPassword')"
            :type="showConfirmPassword ? 'text' : 'password'"
            class="w-full p-2 pr-10 border border-charcoal/20 rounded-sm focus:outline-none focus:border-sage"
          />
          <button
            type="button"
            class="absolute right-3 top-8 text-charcoal/50 hover:text-charcoal"
            @click="showConfirmPassword = !showConfirmPassword"
          >
            <EyeOff v-if="showConfirmPassword" class="h-4 w-4" />
            <Eye v-else class="h-4 w-4" />
          </button>
          <p v-if="errors.confirmPassword" class="text-terracotta text-sm mt-1">
            {{ errors.confirmPassword }}
          </p>
        </div>

        <!-- Accept Terms -->
        <div class="flex items-center">
          <input
            type="checkbox"
            v-model="formData.acceptTerms"
            @change="validateField('acceptTerms')"
            class="h-4 w-4 border-charcoal/20 rounded mr-2"
          />
          <label class="text-sm text-charcoal/70">
            I agree to the
            <span class="text-sage hover:underline cursor-pointer"
              >Terms of Service</span
            >
            and
            <span class="text-sage hover:underline cursor-pointer"
              >Privacy Policy</span
            >
          </label>
        </div>
        <p v-if="errors.acceptTerms" class="text-terracotta text-sm mt-1 ml-6">
          {{ errors.acceptTerms }}
        </p>

        <!-- Submit -->
        <button
          type="submit"
          :disabled="isSubmitDisabled"
          class="w-full py-2 rounded-sm transition-colors"
          :class="
            isSubmitDisabled
              ? 'bg-sage/50 text-cream/80 cursor-not-allowed'
              : 'bg-sage text-cream hover:bg-sage/90'
          "
        >
          {{ isLoading ? "Creating account..." : "Create Account" }}
        </button>
      </form>

      <div class="mt-6 text-center">
        <p class="text-sm text-charcoal/70">
          Already have an account?
          <router-link
            :to="{ name: 'login' }"
            class="text-sage hover:underline"
          >
            Login
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { Eye, EyeOff } from "lucide-vue-next";

import { useFormValidation } from "@hooks/useFormValidation";
import { required, minLength, email, sameAs } from "@/composables/validators";
import { useAuthStore } from "@stores/auth.store";

const { userRegister } = useAuthStore();
const router = useRouter();

const formData = reactive({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  acceptTerms: false,
});

const schema = {
  firstName: [required("First name is required.")],
  lastName: [required("Last name is required.")],
  email: [required(), email()],
  password: [required(), minLength(6)],
  confirmPassword: [
    required("Please confirm password."),
    sameAs(() => formData.password, "Passwords must match."),
  ],
  acceptTerms: [
    (v: unknown) => (v === true ? null : "You must accept the terms."),
  ],
};

const { errors, validateField, validate } = useFormValidation(formData, schema);

const showPassword = ref(false);
const showConfirmPassword = ref(false);
const isLoading = ref(false);
const error = ref("");

const isSubmitDisabled = computed(
  () =>
    isLoading.value ||
    Object.values(errors).some((e) => e != null) ||
    !formData.firstName.trim() ||
    !formData.lastName.trim() ||
    !formData.email.trim() ||
    formData.password.length < 6 ||
    formData.password !== formData.confirmPassword ||
    !formData.acceptTerms
);

async function handleSubmit() {
  if (!validate()) {
    error.value = "Please fix the errors in the form.";
    return;
  }

  isLoading.value = true;
  error.value = "";
  try {
    const response = await userRegister({ ...formData });

    if (!response.success) {
      error.value = response.error || "Registration failed.";
      return;
    }
    router.push({ name: "home" });
  } catch {
    error.value = "Failed to create account. Please try again.";
  } finally {
    isLoading.value = false;
    resetForm();
  }
}

const resetForm = () => {
  formData.firstName = "";
  formData.lastName = "";
  formData.email = "";
  formData.password = "";
  formData.confirmPassword = "";
  formData.acceptTerms = false;
  showPassword.value = false;
  showConfirmPassword.value = false;
};
</script>

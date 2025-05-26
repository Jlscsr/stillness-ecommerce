<template>
  <div class="pt-32 pb-16 px-4 bg-cream">
    <div
      class="max-w-md mx-auto bg-white p-8 rounded-sm border border-charcoal/10 shadow-sm"
    >
      <h1 class="text-2xl font-light text-charcoal mb-6 text-center">Login</h1>

      <div
        v-if="error"
        class="bg-terracotta/10 border border-terracotta/20 text-terracotta p-3 rounded-sm mb-4"
      >
        {{ error }}
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-4">
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
        </div>

        <!-- Remember Me & Forgot -->
        <div class="flex items-center justify-between">
          <router-link
            to="/forgot-password"
            class="text-sm text-sage hover:underline"
          >
            Forgot password?
          </router-link>
        </div>

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
          {{ isLoading ? "Logging in..." : "Login" }}
        </button>
      </form>

      <div class="mt-6 text-center">
        <p class="text-sm text-charcoal/70">
          Don't have an account?
          <router-link to="/register" class="text-sage hover:underline">
            Register
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
import { required, email } from "@composables/validators";
import { useAuthStore } from "@/stores/auth.store";

const { userLogin, isLoading } = useAuthStore();
const router = useRouter();

// form state
const formData = reactive({
  email: "",
  password: "",
  rememberMe: false,
});

// validation schema
const schema = {
  email: [required("Email is required."), email("Invalid email address.")],
  password: [required("Password is required.")],
};

const { errors, validateField, validate } = useFormValidation(formData, schema);

// UI state
const showPassword = ref(false);
const error = ref("");

// disable submit if invalid or loading
const isSubmitDisabled = computed(
  () =>
    isLoading ||
    Object.values(errors).some((e) => e != null) ||
    !formData.email.trim() ||
    formData.password === ""
);

// submit handler
async function handleSubmit() {
  error.value = "";
  if (!validate()) {
    error.value = "Please fix the errors before continuing.";
    return;
  }

  try {
    const response = await userLogin({
      email: formData.email,
      password: formData.password,
    });
    if (!response.success) {
      error.value = response.error || "Login failed. Please try again.";
      return;
    }
    router.push({ name: "home" });
  } catch {
    error.value = "Failed to login. Please check your credentials.";
  }
}
</script>

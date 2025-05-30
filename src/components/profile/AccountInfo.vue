<template>
  <div>
    <h2 class="text-xl font-medium text-charcoal mb-6">Profile Information</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Personal Information Section -->
      <div>
        <h3 class="text-sm font-medium text-charcoal mb-2">
          Personal Information
        </h3>

        <!-- View Mode -->
        <div v-if="!isEditingPersonal" class="bg-beige/10 p-4 rounded-sm">
          <div class="mb-3">
            <p class="text-xs text-charcoal/60">Full Name</p>
            <p class="text-sm text-charcoal">
              {{ user?.firstName }} {{ user?.lastName }}
            </p>
          </div>
          <div class="mb-3">
            <p class="text-xs text-charcoal/60">Email Address</p>
            <p class="text-sm text-charcoal">{{ user?.email }}</p>
          </div>
          <div>
            <p class="text-xs text-charcoal/60">Member Since</p>
            <p class="text-sm text-charcoal">
              {{ memberSince(user?.createdAt) }}
            </p>
          </div>
        </div>

        <!-- Edit Mode -->
        <form
          v-else
          class="bg-beige/10 p-4 rounded-sm"
          @submit.prevent="savePersonalInfo"
        >
          <div class="flex flex-col md:flex-row gap-4">
            <div class="mb-3">
              <label for="fullName" class="block text-xs text-charcoal/60 mb-1"
                >First Name</label
              >
              <input
                type="text"
                id="fullName"
                v-model="personalForm.firstName"
                @blur="validatePersonalField('firstName')"
                :class="[
                  'w-full p-2 border bg-cream rounded-sm focus:outline-none focus:border-sage',
                  firstNameError ? 'border-red-500' : 'border-charcoal/20',
                ]"
              />
              <p v-if="firstNameError" class="mt-1 text-xs text-red-500">
                {{ firstNameError }}
              </p>
            </div>

            <div class="mb-3">
              <label for="fullName" class="block text-xs text-charcoal/60 mb-1"
                >Last Name</label
              >
              <input
                type="text"
                id="fullName"
                v-model="personalForm.lastName"
                @blur="validatePersonalField('lastName')"
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

          <div class="mb-3">
            <label for="email" class="block text-xs text-charcoal/60 mb-1"
              >Email Address</label
            >
            <input
              type="email"
              id="email"
              v-model="personalForm.email"
              @blur="validatePersonalField('email')"
              :class="[
                'w-full p-2 border bg-cream rounded-sm focus:outline-none focus:border-sage',
                emailError ? 'border-red-500' : 'border-charcoal/20',
              ]"
            />
            <p v-if="emailError" class="mt-1 text-xs text-red-500">
              {{ emailError }}
            </p>
          </div>

          <div class="flex space-x-3 mt-4">
            <button
              type="submit"
              :disabled="isSaving"
              class="px-4 py-2 bg-sage text-cream rounded-sm hover:bg-sage/90 transition-colors disabled:bg-sage/50 disabled:cursor-not-allowed"
            >
              {{ isSaving ? "Saving..." : "Save Changes" }}
            </button>
            <button
              type="button"
              @click="cancelPersonalEdit"
              class="px-4 py-2 border border-charcoal/20 text-charcoal rounded-sm hover:bg-charcoal/5 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>

        <button
          v-if="!isEditingPersonal"
          class="mt-3 text-sm text-sage hover:text-sage/80 transition-colors"
          @click="editPersonalInfo"
        >
          Edit Personal Information
        </button>
      </div>

      <!-- Shipping Address Section -->
      <div>
        <h3 class="text-sm font-medium text-charcoal mb-2">Shipping Address</h3>

        <!-- View Mode -->
        <div v-if="!isEditingAddress" class="bg-beige/10 p-4 rounded-sm">
          <p class="text-sm text-charcoal">
            {{ formatUserAddress(user?.address) }}
          </p>
        </div>

        <!-- Edit Mode -->
        <form
          v-else
          class="bg-beige/10 p-4 rounded-sm"
          @submit.prevent="saveShippingAddress"
        >
          <div class="mb-3">
            <label for="street" class="block text-xs text-charcoal/60 mb-1"
              >Street Address</label
            >
            <input
              type="text"
              id="street"
              v-model="addressForm.street"
              @blur="validateAddressField('street')"
              :class="[
                'w-full p-2 border bg-cream rounded-sm focus:outline-none focus:border-sage',
                streetError ? 'border-red-500' : 'border-charcoal/20',
              ]"
            />
            <p v-if="streetError" class="mt-1 text-xs text-red-500">
              {{ streetError }}
            </p>
          </div>

          <div class="mb-3">
            <label for="city" class="block text-xs text-charcoal/60 mb-1"
              >City</label
            >
            <input
              type="text"
              id="city"
              v-model="addressForm.city"
              @blur="validateAddressField('city')"
              :class="[
                'w-full p-2 border bg-cream rounded-sm focus:outline-none focus:border-sage',
                cityError ? 'border-red-500' : 'border-charcoal/20',
              ]"
            />
            <p v-if="cityError" class="mt-1 text-xs text-red-500">
              {{ cityError }}
            </p>
          </div>

          <div class="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label
                for="postalCode"
                class="block text-xs text-charcoal/60 mb-1"
                >Postal Code</label
              >
              <input
                type="text"
                id="postalCode"
                v-model="addressForm.postalCode"
                @blur="validateAddressField('postalCode')"
                :class="[
                  'w-full p-2 border bg-cream rounded-sm focus:outline-none focus:border-sage',
                  postalCodeError ? 'border-red-500' : 'border-charcoal/20',
                ]"
              />
              <p v-if="postalCodeError" class="mt-1 text-xs text-red-500">
                {{ postalCodeError }}
              </p>
            </div>

            <div>
              <label for="country" class="block text-xs text-charcoal/60 mb-1"
                >Country</label
              >
              <select
                id="country"
                v-model="addressForm.country"
                @blur="validateAddressField('country')"
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

          <div class="flex space-x-3 mt-4">
            <button
              type="submit"
              :disabled="isSaving"
              class="px-4 py-2 bg-sage text-cream rounded-sm hover:bg-sage/90 transition-colors disabled:bg-sage/50 disabled:cursor-not-allowed"
            >
              {{ isSaving ? "Saving..." : "Save Changes" }}
            </button>
            <button
              type="button"
              @click="cancelAddressEdit"
              class="px-4 py-2 border border-charcoal/20 text-charcoal rounded-sm hover:bg-charcoal/5 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>

        <button
          v-if="!isEditingAddress"
          class="mt-3 text-sm text-sage hover:text-sage/80 transition-colors"
          @click="editShippingAddress"
        >
          Edit Shipping Address
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { useFormValidation } from "@/hooks/useFormValidation";
import {
  required,
  email as emailValidator,
  pattern,
  type Validator,
} from "@/composables/validators";
import { type UserCredentials } from "@/types/User";
import { useUserStore } from "@/stores/user.store";
import { useToastStore } from "@/stores/toast.store";

// Props
interface Props {
  user: UserCredentials | null;
}

interface PersonalFormData {
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
}

interface AddressFormData {
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

const props = defineProps<Props>();

const userStore = useUserStore();
const toastStore = useToastStore();

// Edit state
const isEditingPersonal = ref(false);
const isEditingAddress = ref(false);
const isSaving = ref(false);

// Forms
const personalForm = reactive<PersonalFormData>({
  firstName: props.user?.firstName || "",
  lastName: props.user?.lastName || "",
  email: props.user?.email,
});

const addressForm = reactive<AddressFormData>({
  street: props.user?.address?.street || "",
  city: props.user?.address?.city || "",
  postalCode: props.user?.address?.postalCode || "",
  country: props.user?.address?.country || "",
});

// Personal form validation
const personalValidationSchema: Partial<
  Record<keyof PersonalFormData, Validator[]>
> = {
  firstName: [required("First Name is required")],
  lastName: [required("Last Name is required")],
  email: [
    required("Email is required"),
    emailValidator("Please enter a valid email address"),
  ],
};

const {
  errors: personalErrors,
  validateField: validatePersonalField,
  validate: validatePersonal,
  resetValidation: resetPersonalValidation,
} = useFormValidation(personalForm, personalValidationSchema);

const firstNameError = computed(() => personalErrors.firstName);
const lastNameError = computed(() => personalErrors.lastName);
const emailError = computed(() => personalErrors.email);

// Address form validation
const addressValidationSchema: Record<keyof AddressFormData, Validator[]> = {
  street: [required("Street address is required")],
  city: [required("City is required")],
  postalCode: [
    required("Postal code is required"),
    pattern(/^[0-9\-]{3,10}$/, "Please enter a valid postal code"),
  ],
  country: [required("Country is required")],
};

const {
  errors: addressErrors,
  validateField: validateAddressField,
  validate: validateAddress,
  resetValidation: resetAddressValidation,
} = useFormValidation(addressForm, addressValidationSchema);

const streetError = computed(() => addressErrors.street);
const cityError = computed(() => addressErrors.city);
const postalCodeError = computed(() => addressErrors.postalCode);
const countryError = computed(() => addressErrors.country);

// Methods
const editPersonalInfo = () => {
  // Reset form to current user data
  personalForm.firstName = props.user?.firstName;
  personalForm.lastName = props.user?.lastName;
  personalForm.email = props.user?.email;

  resetPersonalValidation();
  isEditingPersonal.value = true;
};

const savePersonalInfo = async () => {
  if (!validatePersonal()) return;

  isSaving.value = true;

  try {
    const response = await userStore.updateUser(personalForm);

    if (!response.success) {
      return toastStore.error("Failed to update user info. Please try again.");
    }

    toastStore.success("User info updated successfully");

    isEditingPersonal.value = false;
  } catch (error) {
    console.error("Error saving personal info:", error);
  } finally {
    isSaving.value = false;
  }
};

const cancelPersonalEdit = () => {
  isEditingPersonal.value = false;
  resetPersonalValidation();
};

const editShippingAddress = () => {
  addressForm.street = props.user?.address?.street || "";
  addressForm.city = props.user?.address?.city || "";
  addressForm.postalCode = props.user?.address?.postalCode || "";
  addressForm.country = props.user?.address?.country || "";

  resetAddressValidation();
  isEditingAddress.value = true;
};

const saveShippingAddress = async () => {
  if (!validateAddress()) return;

  isSaving.value = true;

  try {
    const response = await userStore.updateUserAddress(addressForm);

    if (!response.success) {
      return toastStore.error("Failed to update address. Please try again.");
    }

    toastStore.success("Shipping address updated successfully");

    isEditingAddress.value = false;
  } catch (error) {
    console.error("Error saving address:", error);
  } finally {
    isSaving.value = false;
  }
};

const cancelAddressEdit = () => {
  isEditingAddress.value = false;
  resetAddressValidation();
};

const memberSince = (date: Date | string | undefined) => {
  if (!date) return "N/A";
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const formatUserAddress = (address: any) => {
  if (!address) return "No address provided";
  return `${address.street}, ${address.city}, ${address.postalCode}, ${address.country}`;
};
</script>

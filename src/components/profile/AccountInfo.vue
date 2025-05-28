<template>
  <div>
    <h2 class="text-xl font-medium text-charcoal mb-6">Profile Information</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Personal Information Section -->
      <div>
        <h3 class="text-sm font-medium text-charcoal mb-2">Personal Information</h3>
        
        <!-- View Mode -->
        <div v-if="!isEditingPersonal" class="bg-beige/10 p-4 rounded-sm">
          <div class="mb-3">
            <p class="text-xs text-charcoal/60">Full Name</p>
            <p class="text-sm text-charcoal">{{ user.fullName }}</p>
          </div>
          <div class="mb-3">
            <p class="text-xs text-charcoal/60">Email Address</p>
            <p class="text-sm text-charcoal">{{ user.email }}</p>
          </div>
          <div>
            <p class="text-xs text-charcoal/60">Member Since</p>
            <p class="text-sm text-charcoal">{{ user.memberSince }}</p>
          </div>
        </div>
        
        <!-- Edit Mode -->
        <form v-else class="bg-beige/10 p-4 rounded-sm" @submit.prevent="savePersonalInfo">
          <div class="mb-3">
            <label for="fullName" class="block text-xs text-charcoal/60 mb-1">Full Name</label>
            <input 
              type="text" 
              id="fullName" 
              v-model="personalForm.fullName"
              @blur="validateField('fullName')"
              :class="[
                'w-full p-2 border bg-cream rounded-sm focus:outline-none focus:border-sage',
                fullNameError ? 'border-red-500' : 'border-charcoal/20'
              ]"
            />
            <p v-if="fullNameError" class="mt-1 text-xs text-red-500">{{ fullNameError }}</p>
          </div>
          
          <div class="mb-3">
            <label for="email" class="block text-xs text-charcoal/60 mb-1">Email Address</label>
            <input 
              type="email" 
              id="email" 
              v-model="personalForm.email"
              @blur="validateField('email')"
              :class="[
                'w-full p-2 border bg-cream rounded-sm focus:outline-none focus:border-sage',
                emailError ? 'border-red-500' : 'border-charcoal/20'
              ]"
            />
            <p v-if="emailError" class="mt-1 text-xs text-red-500">{{ emailError }}</p>
          </div>
          
          <div class="mb-3">
            <label for="phone" class="block text-xs text-charcoal/60 mb-1">Phone Number</label>
            <input 
              type="tel" 
              id="phone" 
              v-model="personalForm.phone"
              @blur="validateField('phone')"
              :class="[
                'w-full p-2 border bg-cream rounded-sm focus:outline-none focus:border-sage',
                phoneError ? 'border-red-500' : 'border-charcoal/20'
              ]"
            />
            <p v-if="phoneError" class="mt-1 text-xs text-red-500">{{ phoneError }}</p>
          </div>
          
          <div class="flex space-x-3 mt-4">
            <button 
              type="submit"
              :disabled="isSaving"
              class="px-4 py-2 bg-sage text-cream rounded-sm hover:bg-sage/90 transition-colors disabled:bg-sage/50 disabled:cursor-not-allowed"
            >
              {{ isSaving ? 'Saving...' : 'Save Changes' }}
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
          <p class="text-sm text-charcoal">{{ user.address }}</p>
        </div>
        
        <!-- Edit Mode -->
        <form v-else class="bg-beige/10 p-4 rounded-sm" @submit.prevent="saveShippingAddress">
          <div class="mb-3">
            <label for="street" class="block text-xs text-charcoal/60 mb-1">Street Address</label>
            <input 
              type="text" 
              id="street" 
              v-model="addressForm.street"
              @blur="validateField('street')"
              :class="[
                'w-full p-2 border bg-cream rounded-sm focus:outline-none focus:border-sage',
                streetError ? 'border-red-500' : 'border-charcoal/20'
              ]"
            />
            <p v-if="streetError" class="mt-1 text-xs text-red-500">{{ streetError }}</p>
          </div>
          
          <div class="mb-3">
            <label for="city" class="block text-xs text-charcoal/60 mb-1">City</label>
            <input 
              type="text" 
              id="city" 
              v-model="addressForm.city"
              @blur="validateField('city')"
              :class="[
                'w-full p-2 border bg-cream rounded-sm focus:outline-none focus:border-sage',
                cityError ? 'border-red-500' : 'border-charcoal/20'
              ]"
            />
            <p v-if="cityError" class="mt-1 text-xs text-red-500">{{ cityError }}</p>
          </div>
          
          <div class="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label for="postalCode" class="block text-xs text-charcoal/60 mb-1">Postal Code</label>
              <input 
                type="text" 
                id="postalCode" 
                v-model="addressForm.postalCode"
                @blur="validateField('postalCode')"
                :class="[
                  'w-full p-2 border bg-cream rounded-sm focus:outline-none focus:border-sage',
                  postalCodeError ? 'border-red-500' : 'border-charcoal/20'
                ]"
              />
              <p v-if="postalCodeError" class="mt-1 text-xs text-red-500">{{ postalCodeError }}</p>
            </div>
            
            <div>
              <label for="country" class="block text-xs text-charcoal/60 mb-1">Country</label>
              <select 
                id="country" 
                v-model="addressForm.country"
                @blur="validateField('country')"
                :class="[
                  'w-full p-2 border bg-cream rounded-sm focus:outline-none focus:border-sage',
                  countryError ? 'border-red-500' : 'border-charcoal/20'
                ]"
              >
                <option value="Japan">Japan</option>
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
                <option value="United Kingdom">United Kingdom</option>
              </select>
              <p v-if="countryError" class="mt-1 text-xs text-red-500">{{ countryError }}</p>
            </div>
          </div>
          
          <div class="flex space-x-3 mt-4">
            <button 
              type="submit"
              :disabled="isSaving"
              class="px-4 py-2 bg-sage text-cream rounded-sm hover:bg-sage/90 transition-colors disabled:bg-sage/50 disabled:cursor-not-allowed"
            >
              {{ isSaving ? 'Saving...' : 'Save Changes' }}
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
import { ref } from 'vue';
import { useFormValidation } from '@/hooks/useFormValidation';
import { required, email as emailValidator, pattern, minLength } from '@/composables/validators';

// Props
interface Props {
  user: {
    fullName: string;
    email: string;
    memberSince: string;
    address: string;
    phone?: string;
  };
}

const props = withDefaults(defineProps<Props>(), {
  user: () => ({
    fullName: 'Akiko Tanaka',
    email: 'akiko.tanaka@example.com',
    memberSince: 'November 2022',
    address: '1-2-3 Shibuya, Tokyo, Japan',
    phone: '+81 3-1234-5678'
  })
});

// Edit state
const isEditingPersonal = ref(false);
const isEditingAddress = ref(false);
const isSaving = ref(false);

// Forms
const personalForm = ref({
  fullName: props.user.fullName,
  email: props.user.email,
  phone: props.user.phone || ''
});

const addressForm = ref({
  street: props.user.address.split(',')[0] || '',
  city: props.user.address.split(',')[1]?.trim() || '',
  postalCode: '',
  country: 'Japan'
});

// Personal form validation
const personalValidationSchema = {
  fullName: [required('Full name is required')],
  email: [required('Email is required'), emailValidator('Please enter a valid email address')],
  phone: [pattern(/^\+?[0-9\s\-()]{8,}$/, 'Please enter a valid phone number')]
};

const {
  fullName: fullNameError,
  email: emailError,
  phone: phoneError,
  validateField: validatePersonalField,
  validate: validatePersonal,
  resetValidation: resetPersonalValidation
} = useFormValidation(personalForm, personalValidationSchema);

// Address form validation
const addressValidationSchema = {
  street: [required('Street address is required')],
  city: [required('City is required')],
  postalCode: [required('Postal code is required'), pattern(/^[0-9\-]{3,10}$/, 'Please enter a valid postal code')],
  country: [required('Country is required')]
};

const {
  street: streetError,
  city: cityError,
  postalCode: postalCodeError,
  country: countryError,
  validateField: validateAddressField,
  validate: validateAddress,
  resetValidation: resetAddressValidation
} = useFormValidation(addressForm, addressValidationSchema);

// Unified validation field method
const validateField = (field: string) => {
  if (Object.keys(personalForm.value).includes(field)) {
    return validatePersonalField(field as keyof typeof personalForm.value);
  } else if (Object.keys(addressForm.value).includes(field)) {
    return validateAddressField(field as keyof typeof addressForm.value);
  }
  return false;
};

// Methods
const editPersonalInfo = () => {
  // Reset form to current user data
  personalForm.value = {
    fullName: props.user.fullName,
    email: props.user.email,
    phone: props.user.phone || ''
  };
  resetPersonalValidation();
  isEditingPersonal.value = true;
};

const savePersonalInfo = async () => {
  if (!validatePersonal()) return;
  
  isSaving.value = true;
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // In a real app, you would update the user data on the server
    console.log('Personal info saved:', personalForm.value);
    
    // Close the form
    isEditingPersonal.value = false;
  } catch (error) {
    console.error('Error saving personal info:', error);
  } finally {
    isSaving.value = false;
  }
};

const cancelPersonalEdit = () => {
  isEditingPersonal.value = false;
  resetPersonalValidation();
};

const editShippingAddress = () => {
  // Parse the address - in a real app, these would be separate fields
  const addressParts = props.user.address.split(',');
  
  addressForm.value = {
    street: addressParts[0] || '',
    city: addressParts[1]?.trim() || '',
    postalCode: '',  // This would be stored in user data in a real app
    country: 'Japan'
  };
  
  resetAddressValidation();
  isEditingAddress.value = true;
};

const saveShippingAddress = async () => {
  if (!validateAddress()) return;
  
  isSaving.value = true;
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // In a real app, you would update the address on the server
    const formattedAddress = `${addressForm.value.street}, ${addressForm.value.city}, ${addressForm.value.country}`;
    console.log('Address saved:', formattedAddress);
    
    // Close the form
    isEditingAddress.value = false;
  } catch (error) {
    console.error('Error saving address:', error);
  } finally {
    isSaving.value = false;
  }
};

const cancelAddressEdit = () => {
  isEditingAddress.value = false;
  resetAddressValidation();
};
</script>

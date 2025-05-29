<template>
  <div class="p-6 space-y-8">
    <h2 class="text-2xl font-light text-charcoal">UI Components Demo</h2>
    
    <!-- Toast Examples -->
    <div class="space-y-4">
      <h3 class="text-xl font-light text-charcoal">Toast Notifications</h3>
      <div class="flex flex-wrap gap-3">
        <button 
          @click="showSuccessToast" 
          class="px-4 py-2 bg-sage/20 text-sage border border-sage/20 rounded-sm hover:bg-sage/30 transition-colors"
        >
          Success Toast
        </button>
        <button 
          @click="showErrorToast" 
          class="px-4 py-2 bg-red-50 text-red-600 border border-red-100 rounded-sm hover:bg-red-100 transition-colors"
        >
          Error Toast
        </button>
        <button 
          @click="showInfoToast" 
          class="px-4 py-2 bg-beige/20 text-charcoal border border-beige/20 rounded-sm hover:bg-beige/30 transition-colors"
        >
          Info Toast
        </button>
        <button 
          @click="showWarningToast" 
          class="px-4 py-2 bg-amber-50 text-amber-600 border border-amber-100 rounded-sm hover:bg-amber-100 transition-colors"
        >
          Warning Toast
        </button>
      </div>
    </div>
    
    <!-- Modal Examples -->
    <div class="space-y-4">
      <h3 class="text-xl font-light text-charcoal">Confirmation Modals</h3>
      <div class="flex flex-wrap gap-3">
        <button 
          @click="showDefaultModal" 
          class="px-4 py-2 bg-beige text-charcoal rounded-sm hover:bg-beige/90 transition-colors"
        >
          Default Modal
        </button>
        <button 
          @click="showDangerModal" 
          class="px-4 py-2 bg-red-500 text-white rounded-sm hover:bg-red-600 transition-colors"
        >
          Danger Modal
        </button>
        <button 
          @click="showCustomModal" 
          class="px-4 py-2 bg-charcoal/80 text-white rounded-sm hover:bg-charcoal transition-colors"
        >
          Custom Modal
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToastStore } from '@/stores/toast.store';
import { useModalStore } from '@/stores/modal.store';

const toastStore = useToastStore();
const modalStore = useModalStore();

// Toast examples
const showSuccessToast = () => {
  toastStore.success('Item added to cart successfully', 5000);
};

const showErrorToast = () => {
  toastStore.error('Could not process your payment. Please try again.', 5000);
};

const showInfoToast = () => {
  toastStore.info('Your order will be delivered in 3-5 business days.', 5000);
};

const showWarningToast = () => {
  toastStore.warning('Only 2 items left in stock!', 5000);
};

// Modal examples
const showDefaultModal = async () => {
  const confirmed = await modalStore.open({
    title: 'Confirm Action',
    message: 'Are you sure you want to proceed with this action?',
    confirmText: 'Proceed',
    cancelText: 'Go back'
  });
  
  if (confirmed) {
    toastStore.success('Action confirmed!');
  }
};

const showDangerModal = async () => {
  const confirmed = await modalStore.open({
    title: 'Delete Item',
    message: 'Are you sure you want to remove this item? This action cannot be undone.',
    confirmText: 'Delete',
    cancelText: 'Cancel',
    confirmVariant: 'danger'
  });
  
  if (confirmed) {
    toastStore.success('Item removed successfully!');
  }
};

const showCustomModal = async () => {
  const confirmed = await modalStore.open({
    title: 'Subscribe to Newsletter',
    message: 'Would you like to receive weekly updates about new arrivals and exclusive offers?',
    confirmText: 'Subscribe',
    cancelText: 'Maybe later',
    confirmVariant: 'neutral',
    size: 'sm'
  });
  
  if (confirmed) {
    toastStore.success('Thanks for subscribing!');
  } else {
    toastStore.info('You can subscribe anytime from your account settings.');
  }
};
</script>

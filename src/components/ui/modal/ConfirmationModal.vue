<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      >
        <!-- Backdrop -->
        <div
          @click="cancel"
          class="absolute inset-0 bg-charcoal/30 backdrop-blur-sm transition-opacity"
        ></div>

        <!-- Modal container -->
        <div
          :class="[
            'relative bg-cream border border-charcoal/10 rounded-sm shadow-lg max-h-[90vh] overflow-y-auto transition-all duration-300 ease-in-out',
            sizeClasses
          ]"
          @click.stop
        >
          <!-- Modal header -->
          <div class="flex items-center justify-between p-4 border-b border-charcoal/10">
            <h3 class="text-lg font-medium text-charcoal">
              {{ title }}
            </h3>
            <button
              @click="cancel"
              class="text-charcoal/60 hover:text-charcoal transition-colors"
              aria-label="Close"
            >
              <X class="h-5 w-5" />
            </button>
          </div>

          <!-- Modal content -->
          <div class="p-5">
            <p class="text-charcoal/80 leading-relaxed" v-html="message">
            </p>
          </div>

          <!-- Modal footer -->
          <div class="flex items-center justify-end gap-3 p-4 border-t border-charcoal/10">
            <button
              v-if="!hideCancel"
              @click="cancel"
              class="px-4 py-2 text-sm border border-charcoal/20 rounded-sm text-charcoal hover:bg-charcoal/5 transition-colors"
            >
              {{ cancelText }}
            </button>
            <button
              @click="confirm"
              :class="[
                'px-4 py-2 text-sm rounded-sm transition-colors',
                variantClasses
              ]"
            >
              {{ confirmText }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useModalStore } from '@/stores/modal.store';
import { X } from 'lucide-vue-next';

const modalStore = useModalStore();
const { state } = storeToRefs(modalStore);

// Computed properties
const isOpen = computed(() => state.value.isOpen);
const title = computed(() => state.value.title);
const message = computed(() => state.value.message);
const confirmText = computed(() => state.value.confirmText);
const cancelText = computed(() => state.value.cancelText);
const confirmVariant = computed(() => state.value.confirmVariant);
const size = computed(() => state.value.size);
const hideCancel = computed(() => state.value.hideCancel);

// Size classes
const sizeClasses = computed(() => {
  const sizes = {
    'sm': 'w-full max-w-md',
    'md': 'w-full max-w-lg',
    'lg': 'w-full max-w-2xl'
  };
  return sizes[size.value as keyof typeof sizes] || sizes.md;
});

// Variant classes for confirm button
const variantClasses = computed(() => {
  const variants = {
    'primary': 'bg-beige text-charcoal hover:bg-beige/90',
    'danger': 'bg-red-500 text-white hover:bg-red-600',
    'neutral': 'bg-charcoal/80 text-white hover:bg-charcoal'
  };
  return variants[confirmVariant.value as keyof typeof variants] || variants.primary;
});

// Methods
const confirm = () => {
  modalStore.confirm();
};

const cancel = () => {
  modalStore.cancel();
};
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>

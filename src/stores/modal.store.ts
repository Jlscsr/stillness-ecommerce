import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export interface ModalOptions {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmVariant?: 'primary' | 'danger' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  hideCancel?: boolean;
}

export interface ModalState extends ModalOptions {
  isOpen: boolean;
  resolve: ((value: boolean) => void) | null;
}

const defaultOptions: ModalOptions = {
  title: '',
  message: '',
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  confirmVariant: 'primary',
  size: 'md',
  hideCancel: false
};

export const useModalStore = defineStore('modal', () => {
  // Modal state
  const state = ref<ModalState>({
    ...defaultOptions,
    isOpen: false,
    resolve: null
  });
  
  // Computed properties
  const isOpen = computed(() => state.value.isOpen);
  
  // Methods
  const open = (options: ModalOptions): Promise<boolean> => {
    return new Promise((resolve) => {
      state.value = {
        ...defaultOptions,
        ...options,
        isOpen: true,
        resolve
      };
    });
  };
  
  const confirm = () => {
    if (state.value.resolve) {
      state.value.resolve(true);
    }
    state.value.isOpen = false;
  };
  
  const cancel = () => {
    if (state.value.resolve) {
      state.value.resolve(false);
    }
    state.value.isOpen = false;
  };
  
  return {
    state: computed(() => state.value),
    isOpen,
    open,
    confirm,
    cancel
  };
});

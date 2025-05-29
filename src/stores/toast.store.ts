import { defineStore } from "pinia";
import { ref, computed } from "vue";

export type ToastType = "success" | "error" | "info" | "warning";

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration: number;
  dismissible: boolean;
}

export const useToastStore = defineStore("toast", () => {
  const toasts = ref<Toast[]>([]);

  const generateId = () => {
    return `toast-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  };

  // Add a new toast
  const add = (
    message: string,
    type: ToastType = "info",
    duration: number = 5000,
    dismissible: boolean = true
  ) => {
    clear();

    const id = generateId();
    const toast: Toast = { id, message, type, duration, dismissible };
    toasts.value.push(toast);

    if (duration > 0) {
      setTimeout(() => {
        remove(id);
      }, duration);
    }

    return id;
  };

  const success = (message: string, duration?: number, dismissible?: boolean) =>
    add(message, "success", duration, dismissible);

  const error = (message: string, duration?: number, dismissible?: boolean) =>
    add(message, "error", duration, dismissible);

  const info = (message: string, duration?: number, dismissible?: boolean) =>
    add(message, "info", duration, dismissible);

  const warning = (message: string, duration?: number, dismissible?: boolean) =>
    add(message, "warning", duration, dismissible);

  const remove = (id: string) => {
    toasts.value = toasts.value.filter((toast) => toast.id !== id);
  };

  const clear = () => {
    toasts.value = [];
  };

  return {
    toasts: computed(() => toasts.value),
    add,
    success,
    error,
    info,
    warning,
    remove,
    clear,
  };
});

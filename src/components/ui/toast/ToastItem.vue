<template>
  <div
    :class="[
      'fixed min-w-[300px] max-w-md p-4 rounded-sm shadow-md transition-all duration-300 ease-in-out flex items-start',
      positionClasses,
      typeClasses,
      isVisible ? 'translate-y-0 opacity-100' : enterClass,
    ]"
    role="alert"
  >
    <div class="flex-shrink-0 mr-3">
      <CheckCircle v-if="type === 'success'" class="h-5 w-5" />
      <AlertCircle v-else-if="type === 'error'" class="h-5 w-5" />
      <AlertTriangle v-else-if="type === 'warning'" class="h-5 w-5" />
      <Info v-else class="h-5 w-5" />
    </div>

    <div class="flex-1 mr-2">
      <p class="text-sm" v-html="message"></p>
    </div>

    <button
      v-if="dismissible"
      @click="handleDismissClick"
      class="flex-shrink-0 text-current/70 hover:text-current transition-colors"
      aria-label="Dismiss"
    >
      <X class="h-4 w-4" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import {
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  Info,
  X,
} from "lucide-vue-next";
import type { ToastType } from "@/stores/toast.store";

interface Props {
  id: string;
  message: string;
  type: ToastType;
  duration: number;
  dismissible: boolean;
  position?:
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left"
    | "top-center"
    | "bottom-center";
  index?: number;
}

const props = withDefaults(defineProps<Props>(), {
  position: "top-right",
  index: 0,
});

const emit = defineEmits<{
  (e: "dismiss", id: string): void;
}>();

const isVisible = ref(false);

// Position classes based on the position prop
const positionClasses = computed(() => {
  const positions = {
    "top-right": "top-24 right-4",
    "top-left": "top-24 left-4",
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "top-center": "top-24 left-1/2 -translate-x-1/2",
    "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
  };

  return positions[props.position] || positions["top-right"];
});

// Entry animation direction based on position
const enterClass = computed(() => {
  if (props.position.startsWith("top")) {
    return "-translate-y-4 opacity-0";
  } else {
    return "translate-y-4 opacity-0";
  }
});

const typeClasses = computed(() => {
  const types = {
    success: "bg-sage/20 text-sage border border-sage/20",
    error: "bg-red-50 text-red-600 border border-red-100",
    warning: "bg-amber-50 text-amber-600 border border-amber-100",
    info: "bg-beige/20 text-charcoal border border-beige/20",
  };

  return types[props.type] || types["info"];
});

const getStaggeredDelay = () => {
  return 50 * props.index;
};

// Methods
const dismiss = () => {
  isVisible.value = false;
  setTimeout(() => {
    emit("dismiss", props.id);
  }, 300);
};

const handleDismissClick = (e: Event) => {
  e.stopPropagation();
  dismiss();
};

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true;
  }, getStaggeredDelay());

  if (props.duration > 0) {
    setTimeout(dismiss, props.duration + getStaggeredDelay());
  }
});

onBeforeUnmount(() => {
  isVisible.value = false;
});
</script>

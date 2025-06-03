<template>
  <Teleport to="body">
    <div class="toast-container">
      <Transition name="toast">
        <ToastItem
          v-if="currentToast"
          :key="currentToast.id"
          :id="currentToast.id"
          :message="currentToast.message"
          :type="currentToast.type"
          :duration="currentToast.duration"
          :dismissible="currentToast.dismissible"
          :position="position"
          :index="0"
          @dismiss="handleDismiss"
        />
      </Transition>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useToastStore } from "@/stores/toast.store";
import ToastItem from "./ToastItem.vue";

interface Props {
  position?:
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left"
    | "top-center"
    | "bottom-center";
}

const { position } = withDefaults(defineProps<Props>(), {
  position: "top-right",
});

const toastStore = useToastStore();
const { toasts } = storeToRefs(toastStore);

// Get only the most recent toast
const currentToast = computed(() => {
  return toasts.value.length > 0 ? toasts.value[toasts.value.length - 1] : null;
});

const handleDismiss = (id: string) => {
  toastStore.remove(id);
};
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.toast-leave-active {
  position: absolute;
}
</style>

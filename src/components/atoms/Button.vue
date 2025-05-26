<template>
  <button :class="buttonClass" @click="props.onClick">
    {{ props.text }}
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
}

const props = defineProps<ButtonProps>();

const buttonClass = computed(() => {
  return `bg-beige text-charcoal px-4 py-2 rounded-sm hover:bg-beige/90 transition-colors text-sm ${
    props.className || ""
  }`;
});
</script>

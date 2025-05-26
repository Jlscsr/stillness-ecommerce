<template>
  <router-link to="/" class="flex items-center">
    <div
      :class="[
        'rounded-sm bg-beige flex items-center justify-center mr-2 overflow-hidden',
        isSmall ? 'w-7 h-7' : 'w-8 h-8',
      ]"
    >
      <span :class="['text-charcoal font-light', isSmall ? 'text-sm' : '']"
        >静</span
      >
    </div>
    <span
      :class="[
        'text-charcoal font-light tracking-wider',
        isSmall ? 'text-base' : 'text-lg',
      ]"
      >Stillness</span
    >
  </router-link>
</template>

<script setup lang="ts">
import { computed } from "vue";
interface LogoProps {
  variant?: "default" | "small";
}

const props = defineProps<LogoProps>();
const isSmall = computed(() => props.variant === "small");
</script>

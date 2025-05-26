<template>
  <div class="border-b border-charcoal/10 py-4">
    <button
      class="flex items-center justify-between w-full text-left"
      @click="$emit('toggle')"
    >
      <div>
        <span class="text-sm font-medium text-charcoal">{{ title }}</span>
        <span class="text-xs text-charcoal/50 ml-2">{{ japaneseTitle }}</span>
      </div>
      <ChevronDown
        :class="[
          'h-4 w-4 text-charcoal/70 transition-transform',
          expanded ? 'rotate-180' : '',
        ]"
      />
    </button>
    <div
      :class="[
        'overflow-hidden transition-all duration-300',
        expanded ? 'max-h-96 mt-4' : 'max-h-0',
      ]"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronDown } from "lucide-vue-next";

interface Props {
  title: string;
  japaneseTitle: string;
  expanded: boolean;
}

defineProps<Props>();
defineEmits<{
  toggle: [];
}>();
</script>

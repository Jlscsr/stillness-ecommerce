<template>
  <div class="fixed bottom-5 right-5 z-30 sm:bottom-6 sm:right-6">
    <button
      type="button"
      class="group relative flex h-14 w-14 items-center justify-center rounded-full border border-charcoal/10 bg-beige text-charcoal shadow-[0_18px_38px_rgba(51,51,51,0.22)] backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-sage/40 hover:bg-sage hover:text-cream focus:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
      aria-label="Chat assistant coming soon"
      title="Chat assistant coming soon"
      @click="emit('open')"
    >
      <MessageCircle
        class="h-6 w-6 transition-transform duration-300 group-hover:scale-105"
        :stroke-width="1.75"
        aria-hidden="true"
      />

      <span
        class="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-beige bg-sage transition-colors duration-300 group-hover:border-sage"
        aria-hidden="true"
      ></span>

      <span
        class="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-sm border border-charcoal/10 bg-charcoal px-3 py-2 text-xs font-medium text-cream opacity-0 shadow-md transition-opacity duration-200 sm:block group-hover:opacity-100 group-focus-visible:opacity-100"
      >
        Chat assistant coming soon
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { MessageCircle } from "lucide-vue-next";

const emit = defineEmits<{
  (event: "open"): void;
}>();
</script>

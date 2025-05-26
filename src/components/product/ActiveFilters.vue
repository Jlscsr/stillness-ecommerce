<template>
  <div v-if="hasAnyFilter" class="flex flex-wrap gap-2 mt-4">
    <!-- Price Range -->
    <div
      v-if="hasPriceFilter"
      class="flex items-center bg-sage/10 text-sage px-2 py-1 rounded"
    >
      <span
        >Price: ${{ filters.priceRange[0] }}–${{ filters.priceRange[1] }}</span
      >
      <button
        class="ml-1 text-sage hover:text-charcoal"
        @click="emitRemove('priceRange')"
        aria-label="Remove price filter"
      >
        <X class="h-3 w-3" />
      </button>
    </div>

    <!-- Category -->
    <div
      v-for="cat in filters.categories"
      :key="cat"
      class="flex items-center bg-sage/10 text-sage px-2 py-1 rounded"
    >
      <span>Category: {{ getLabel(categoryOptions, cat) }}</span>
      <button
        class="ml-1 text-sage hover:text-charcoal"
        @click="emitRemove('categories', cat)"
        :aria-label="`Remove ${getLabel(categoryOptions, cat)} category filter`"
      >
        <X class="h-3 w-3" />
      </button>
    </div>

    <!-- Material -->
    <div
      v-for="mat in filters.materials"
      :key="mat"
      class="flex items-center bg-sage/10 text-sage px-2 py-1 rounded"
    >
      <span>Material: {{ getLabel(materialOptions, mat) }}</span>
      <button
        class="ml-1 text-sage hover:text-charcoal"
        @click="emitRemove('materials', mat)"
        :aria-label="`Remove ${getLabel(materialOptions, mat)} material filter`"
      >
        <X class="h-3 w-3" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { X } from "lucide-vue-next";
import type { PropType } from "vue";
import type { FilterState } from "@/components/product/ProductFilters.vue";

interface Option {
  id: string;
  label: string;
}

// Props
const props = defineProps({
  filters: {
    type: Object as PropType<FilterState>,
    required: true,
  },
  categoryOptions: {
    type: Array as PropType<Option[]>,
    required: true,
  },
  materialOptions: {
    type: Array as PropType<Option[]>,
    required: true,
  },
});

// Emits
const emit = defineEmits<{
  (e: "removeFilter", type: keyof FilterState, value?: string): void;
}>();

// Helpers
const getLabel = (opts: Option[], id: string) =>
  opts.find((o) => o.id === id)?.label || id;

// Defaults
const DEFAULT_MIN = 0;
const DEFAULT_MAX = 200;

// Flags
const hasPriceFilter = computed(() => {
  const [min, max] = props.filters.priceRange;
  return min !== DEFAULT_MIN || max !== DEFAULT_MAX;
});
const hasAnyFilter = computed(() => {
  return (
    hasPriceFilter.value ||
    props.filters.categories.length > 0 ||
    props.filters.materials.length > 0
  );
});

// Emit wrapper
function emitRemove(type: keyof FilterState, value?: string) {
  emit("removeFilter", type, value);
}
</script>

<style scoped>
/* scoped tweaks */
</style>

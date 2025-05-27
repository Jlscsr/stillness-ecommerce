<template>
  <div class="border-t border-charcoal/10 pt-12">
    <!-- Tabs -->
    <div class="flex border-b border-charcoal/10">
      <button
        v-for="tab in visibleTabs"
        :key="tab.id"
        class="px-6 py-3 text-sm font-medium transition-colors relative"
        :class="
          activeTab === tab.id
            ? 'text-charcoal'
            : 'text-charcoal/60 hover:text-charcoal'
        "
        @click="setActiveTab(tab.id)"
      >
        {{ tab.label }}
        <span
          v-if="activeTab === tab.id"
          class="absolute bottom-0 left-0 w-full h-0.5 bg-sage"
        />
      </button>
    </div>

    <!-- Tab content -->
    <div class="py-8">
      <!-- Description Tab -->
      <div
        v-if="activeTab === 'description'"
        class="prose prose-stone max-w-none"
      >
        <div class="text-charcoal/80">
          {{ product.longDescription || product.description }}
        </div>
      </div>

      <!-- Materials & Care Tab -->
      <div v-if="activeTab === 'details'" class="prose prose-stone max-w-none">
        <div class="space-y-4">
          <div v-if="product.materials">
            <h4 class="font-medium mb-2 text-charcoal">Materials</h4>
            <p class="text-charcoal/80">{{ product.materials.join(", ") }}</p>
          </div>

          <div v-if="product.dimensions">
            <h4 class="font-medium mb-2 text-charcoal">Dimensions</h4>
            <p class="text-charcoal/80">{{ product.dimensions }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import type { Product } from "@/types/Product";

interface Props {
  product: Product;
}

const props = defineProps<Props>();
const activeTab = ref("description");

const setActiveTab = (tabId: string) => {
  activeTab.value = tabId;
};

const visibleTabs = computed(() => {
  const tabs = [
    {
      id: "description",
      label: "Description",
      show: true,
    },
    {
      id: "details",
      label: "Materials",
      show: Boolean(props.product.materials || props.product.dimensions),
    },
  ].filter((tab) => tab.show);

  return tabs;
});
</script>

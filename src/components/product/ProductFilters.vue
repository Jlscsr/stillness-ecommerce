<template>
  <div v-if="!isMobile" class="w-full">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-light text-charcoal">Filters</h3>
      <button
        v-if="activeFilterCount > 0"
        class="text-sm text-sage hover:text-charcoal transition-colors"
        @click="clearAllFilters"
      >
        Clear all
      </button>
    </div>

    <!-- Price Range Filter -->
    <FilterSection
      title="Price Range"
      japaneseTitle="価格帯"
      :expanded="expandedSections.price"
      @toggle="toggleSection('price')"
    >
      <div class="px-2">
        <input
          type="range"
          :min="0"
          :max="200"
          :step="5"
          v-model="filters.priceRange[0]"
          class="w-full h-2 bg-gray-200 rounded-lg appearance-none slider my-3"
          @input="handlePriceChange"
        />
        <input
          type="range"
          :min="0"
          :max="200"
          :step="5"
          v-model="filters.priceRange[1]"
          class="w-full h-2 bg-gray-200 rounded-lg appearance-none slider my-3"
          @input="handlePriceChange"
        />
        <div class="flex items-center justify-between text-sm text-charcoal/70">
          <span>${{ filters.priceRange[0] }}</span>
          <span>${{ filters.priceRange[1] }}</span>
        </div>
      </div>
    </FilterSection>

    <!-- Category Filter -->
    <FilterSection
      title="Category"
      japaneseTitle="カテゴリー"
      :expanded="expandedSections.category"
      @toggle="toggleSection('category')"
    >
      <div class="space-y-2">
        <div
          v-for="option in categoryOptions"
          :key="option.id"
          class="flex items-center space-x-2"
        >
          <Checkbox
            :id="`category-${option.id}`"
            :checked="filters.categories.includes(option.id)"
            @update:checked="
              (checked) =>
                handleCheckboxChange(option.id, 'categories', checked)
            "
          />
          <label
            :for="`category-${option.id}`"
            class="text-sm text-charcoal flex items-center cursor-pointer"
          >
            {{ option.label }}
            <span class="text-xs text-charcoal/50 ml-2">{{
              option.japaneseText
            }}</span>
          </label>
        </div>
      </div>
    </FilterSection>

    <!-- Material Filter -->
    <FilterSection
      title="Material"
      japaneseTitle="素材"
      :expanded="expandedSections.material"
      @toggle="toggleSection('material')"
    >
      <div class="space-y-2">
        <div
          v-for="option in materialOptions"
          :key="option.id"
          class="flex items-center space-x-2"
        >
          <Checkbox
            :id="`material-${option.id}`"
            :checked="filters.materials.includes(option.id)"
            @update:checked="
              (checked) => handleCheckboxChange(option.id, 'materials', checked)
            "
          />
          <label
            :for="`material-${option.id}`"
            class="text-sm text-charcoal flex items-center cursor-pointer"
          >
            {{ option.label }}
            <span class="text-xs text-charcoal/50 ml-2">{{
              option.japaneseText
            }}</span>
          </label>
        </div>
      </div>
    </FilterSection>

    <div class="mt-6 text-center text-sm text-charcoal/70">
      Showing {{ productCount }} products
    </div>
  </div>

  <!-- Mobile Filters -->
  <div v-else>
    <button
      class="flex items-center justify-center space-x-2 py-2 px-4 bg-cream border border-charcoal/20 rounded-sm text-charcoal w-full"
      @click="isMobileFiltersOpen = !isMobileFiltersOpen"
    >
      <Filter class="h-4 w-4" />
      <span class="text-sm font-medium">Filters</span>
      <span
        v-if="activeFilterCount > 0"
        class="bg-sage text-cream text-xs rounded-full h-5 w-5 flex items-center justify-center ml-auto"
      >
        {{ activeFilterCount }}
      </span>
    </button>

    <!-- Mobile filters slide-out panel -->
    <div
      v-if="isMobileFiltersOpen"
      class="fixed inset-0 bg-black/50 z-40"
      @click="isMobileFiltersOpen = false"
    ></div>

    <div
      :class="[
        'fixed top-0 right-0 h-full w-full max-w-sm bg-cream z-50 transform transition-transform duration-300 ease-in-out shadow-xl',
        isMobileFiltersOpen ? 'translate-x-0' : 'translate-x-full',
      ]"
    >
      <div
        class="flex items-center justify-between p-4 border-b border-charcoal/10"
      >
        <h3 class="text-lg font-medium text-charcoal">Filters</h3>
        <button
          class="text-charcoal/70 hover:text-charcoal p-1"
          @click="isMobileFiltersOpen = false"
        >
          <X class="h-5 w-5" />
        </button>
      </div>

      <div class="p-4 overflow-y-auto h-[calc(100vh-140px)]">
        <div class="flex items-center justify-between mb-6">
          <button
            v-if="activeFilterCount > 0"
            class="text-sm text-sage hover:text-charcoal transition-colors underline"
            @click="clearAllFilters"
          >
            Clear all filters
          </button>
        </div>

        <!-- Mobile Price Range Filter -->
        <FilterSection
          title="Price Range"
          japaneseTitle="価格帯"
          :expanded="expandedSections.price"
          @toggle="toggleSection('price')"
        >
          <div class="px-2">
            <div class="space-y-4">
              <div>
                <label class="text-xs text-charcoal/70 mb-1 block"
                  >Min Price</label
                >
                <input
                  type="range"
                  :min="0"
                  :max="200"
                  :step="5"
                  v-model="filters.priceRange[0]"
                  class="w-full h-2 bg-gray-200 rounded-lg appearance-none slider"
                  @input="handlePriceChange"
                />
              </div>
              <div>
                <label class="text-xs text-charcoal/70 mb-1 block"
                  >Max Price</label
                >
                <input
                  type="range"
                  :min="0"
                  :max="200"
                  :step="5"
                  v-model="filters.priceRange[1]"
                  class="w-full h-2 bg-gray-200 rounded-lg appearance-none slider"
                  @input="handlePriceChange"
                />
              </div>
            </div>
            <div
              class="flex items-center justify-between text-sm text-charcoal/70 mt-3"
            >
              <span>${{ filters.priceRange[0] }}</span>
              <span>${{ filters.priceRange[1] }}</span>
            </div>
          </div>
        </FilterSection>

        <!-- Mobile Category Filter -->
        <FilterSection
          title="Category"
          japaneseTitle="カテゴリー"
          :expanded="expandedSections.category"
          @toggle="toggleSection('category')"
        >
          <div class="space-y-3">
            <div
              v-for="option in categoryOptions"
              :key="option.id"
              class="flex items-center space-x-3"
            >
              <Checkbox
                :id="`mobile-category-${option.id}`"
                :checked="filters.categories.includes(option.id)"
                @update:checked="
                  (checked) =>
                    handleCheckboxChange(option.id, 'categories', checked)
                "
              />
              <label
                :for="`mobile-category-${option.id}`"
                class="text-sm text-charcoal flex flex-col cursor-pointer flex-1"
              >
                <span>{{ option.label }}</span>
                <span class="text-xs text-charcoal/50">{{
                  option.japaneseText
                }}</span>
              </label>
            </div>
          </div>
        </FilterSection>

        <!-- Mobile Material Filter -->
        <FilterSection
          title="Material"
          japaneseTitle="素材"
          :expanded="expandedSections.material"
          @toggle="toggleSection('material')"
        >
          <div class="space-y-3">
            <div
              v-for="option in materialOptions"
              :key="option.id"
              class="flex items-center space-x-3"
            >
              <Checkbox
                :id="`mobile-material-${option.id}`"
                :checked="filters.materials.includes(option.id)"
                @update:checked="
                  (checked) =>
                    handleCheckboxChange(option.id, 'materials', checked)
                "
              />
              <label
                :for="`mobile-material-${option.id}`"
                class="text-sm text-charcoal flex flex-col cursor-pointer flex-1"
              >
                <span>{{ option.label }}</span>
                <span class="text-xs text-charcoal/50">{{
                  option.japaneseText
                }}</span>
              </label>
            </div>
          </div>
        </FilterSection>
      </div>

      <!-- Mobile Footer -->
      <div class="p-4 border-t border-charcoal/10 bg-cream">
        <div class="flex items-center justify-between">
          <div class="text-sm text-charcoal/70">
            {{ productCount }} products
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from "vue";
import { X, Filter } from "lucide-vue-next";
import FilterSection from "@components/product/FilterSection.vue";
import Checkbox from "@components/atoms/Checkbox.vue";

export interface FilterState {
  priceRange: [number, number];
  categories: string[];
  materials: string[];
}

interface Props {
  initialFilters: FilterState;
  productCount: number;
  isMobile?: boolean;
}

interface Emits {
  (e: "filterChange", filters: FilterState): void;
}

const props = withDefaults(defineProps<Props>(), {
  isMobile: false,
});

const emit = defineEmits<Emits>();

const filters = reactive<FilterState>({ ...props.initialFilters });
const expandedSections = reactive({
  price: true,
  category: true,
  material: true,
});
const isMobileFiltersOpen = ref(false);

// Materials options
const materialOptions = [
  { id: "ceramic", label: "Ceramic", japaneseText: "陶器" },
  { id: "linen", label: "Linen", japaneseText: "リネン" },
  { id: "bamboo", label: "Bamboo", japaneseText: "竹" },
  { id: "cotton", label: "Cotton", japaneseText: "綿" },
  { id: "wood", label: "Wood", japaneseText: "木" },
];

// Category options
const categoryOptions = [
  { id: "home", label: "Home", japaneseText: "家" },
  { id: "apparel", label: "Apparel", japaneseText: "衣類" },
  { id: "decor", label: "Decor", japaneseText: "装飾" },
  { id: "wellness", label: "Wellness", japaneseText: "健康" },
  { id: "tea", label: "Tea", japaneseText: "お茶" },
];

// Update parent component when filters change
watch(
  filters,
  (newFilters) => {
    console.log("Change");
    emit("filterChange", { ...newFilters });
  },
  { deep: true }
);

watch(
  () => props.initialFilters,
  (newFilters) => {
    Object.assign(filters, newFilters);
  },
  {
    deep: true,
  }
);

// Toggle section expansion
const toggleSection = (section: keyof typeof expandedSections) => {
  expandedSections[section] = !expandedSections[section];
};

// Handle price range change
const handlePriceChange = () => {
  // Ensure min is not greater than max
  if (filters.priceRange[0] > filters.priceRange[1]) {
    const temp = filters.priceRange[0];
    filters.priceRange[0] = filters.priceRange[1];
    filters.priceRange[1] = temp;
  }
};

// Handle checkbox change - updated to work with custom checkbox
const handleCheckboxChange = (
  id: string,
  type: "categories" | "materials",
  checked: boolean
) => {
  const currentValues = filters[type];
  const index = currentValues.indexOf(id);

  if (checked && index === -1) {
    currentValues.push(id);
  } else if (!checked && index > -1) {
    currentValues.splice(index, 1);
  }
};

// Clear all filters
const clearAllFilters = () => {
  filters.priceRange = [0, 200];
  filters.categories = [];
  filters.materials = [];
};

// Count active filters
const activeFilterCount = computed(() => {
  return (
    (filters.categories.length > 0 ? 1 : 0) +
    (filters.materials.length > 0 ? 1 : 0) +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 200 ? 1 : 0)
  );
});
</script>

<style scoped>
.slider::-webkit-slider-thumb {
  appearance: none;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #8b9467;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #8b9467;
  cursor: pointer;
  border: none;
}
</style>

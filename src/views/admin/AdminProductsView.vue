<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-light text-charcoal">Product Management</h1>
      <router-link to="/admin/products/add">
        <button
          class="bg-sage hover:bg-sage/90 text-white px-4 py-2 rounded-md flex items-center"
        >
          <Plus class="h-4 w-4 mr-2" />
          Add Product
        </button>
      </router-link>
    </div>

    <div class="bg-white rounded-lg shadow-sm border border-charcoal/10 mb-6">
      <div class="p-6 pb-2">
        <h3 class="text-lg font-medium text-charcoal">Products</h3>
      </div>
      <div class="p-6">
        <!-- Filter Controls -->
        <div class="flex flex-col sm:flex-row gap-4 mb-6">
          <div class="relative flex-1">
            <Search
              class="absolute left-2.5 top-2.5 h-4 w-4 text-charcoal/50"
            />
            <input
              type="text"
              placeholder="Search products..."
              v-model="searchQuery"
              class="w-full py-2 px-4 pl-9 border border-charcoal/20 rounded-md focus:outline-none focus:ring-1 focus:ring-sage focus:border-sage"
            />
          </div>
          <div class="flex gap-2">
            <!-- Category Filter Dropdown -->
            <div class="relative">
              <button
                @click="toggleCategoryDropdown"
                class="w-[150px] flex items-center justify-between px-4 py-2 border border-charcoal/20 rounded-md text-charcoal hover:bg-cream"
              >
                {{
                  selectedCategory === "all"
                    ? "All Categories"
                    : selectedCategory
                }}
                <ChevronDown class="h-4 w-4 opacity-50" />
              </button>
              <div
                v-if="showCategoryDropdown"
                class="absolute right-0 z-10 mt-1 w-[150px] rounded-md bg-white shadow-lg border border-charcoal/10"
              >
                <div class="py-1">
                  <button
                    @click="selectCategory('all')"
                    class="w-full text-left px-4 py-2 text-sm text-charcoal hover:bg-cream"
                  >
                    All Categories
                  </button>
                  <button
                    v-for="category in categories"
                    :key="category"
                    @click="selectCategory(category)"
                    class="w-full text-left px-4 py-2 text-sm text-charcoal hover:bg-cream"
                  >
                    {{ category }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Products Table -->
        <div class="rounded-md border overflow-hidden">
          <table class="min-w-full divide-y divide-charcoal/10">
            <thead class="bg-cream">
              <tr>
                <th
                  class="px-4 py-3 text-left text-xs font-medium text-charcoal/70 uppercase tracking-wider"
                >
                  Image
                </th>
                <th
                  @click="handleSort('name')"
                  class="px-4 py-3 text-left text-xs font-medium text-charcoal/70 uppercase tracking-wider cursor-pointer"
                >
                  <div class="flex items-center">
                    Name
                    <ArrowUpDown class="ml-2 h-4 w-4" />
                  </div>
                </th>
                <th
                  @click="handleSort('category')"
                  class="px-4 py-3 text-left text-xs font-medium text-charcoal/70 uppercase tracking-wider cursor-pointer"
                >
                  <div class="flex items-center">
                    Category
                    <ArrowUpDown class="ml-2 h-4 w-4" />
                  </div>
                </th>
                <th
                  @click="handleSort('price')"
                  class="px-4 py-3 text-left text-xs font-medium text-charcoal/70 uppercase tracking-wider cursor-pointer"
                >
                  <div class="flex items-center">
                    Price
                    <ArrowUpDown class="ml-2 h-4 w-4" />
                  </div>
                </th>
                <th
                  class="px-4 py-3 text-center text-xs font-medium text-charcoal/70 uppercase tracking-wider"
                >
                  Stock
                </th>
                <th
                  class="px-4 py-3 text-right text-xs font-medium text-charcoal/70 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-charcoal/10">
              <tr v-if="filteredProducts.length === 0">
                <td colspan="6" class="text-center py-10 text-charcoal/70">
                  No products found
                </td>
              </tr>
              <tr
                v-for="product in filteredProducts"
                :key="product._id"
                class="hover:bg-cream/50"
              >
                <td class="px-4 py-4 whitespace-nowrap">
                  <ImageWithLoading
                    :src="product.images[0]?.src || '/placeholder.svg'"
                    :alt="product.name"
                    image-class="h-full w-full object-cover"
                    root-margin="100px"
                    container-class="h-10 w-10 overflow-hidden rounded-sm bg-cream"
                  />
                </td>
                <td class="px-4 py-4 whitespace-nowrap">
                  <div>
                    <div class="font-medium">{{ product.name }}</div>
                    <div
                      v-if="product.japaneseText"
                      class="text-xs text-charcoal/60"
                    >
                      {{ product.japaneseText }}
                    </div>
                  </div>
                </td>
                <td class="px-4 py-4 whitespace-nowrap">
                  <span
                    class="inline-flex items-center px-2 py-1 rounded-full bg-beige/20 text-charcoal text-xs"
                  >
                    {{ product.category }}
                  </span>
                </td>
                <td class="px-4 py-4 whitespace-nowrap">
                  ${{ product.price.toFixed(2) }}
                </td>
                <td class="px-4 py-4 whitespace-nowrap text-center">
                  <span
                    v-if="product.stock > 0"
                    class="inline-flex items-center px-2 py-1 rounded-full bg-sage/10 text-sage text-xs"
                  >
                    In Stock
                  </span>
                  <span
                    v-else
                    class="inline-flex items-center px-2 py-1 rounded-full bg-terracotta/10 text-terracotta text-xs"
                  >
                    Out of Stock
                  </span>
                </td>
                <td class="px-4 py-4 whitespace-nowrap text-right">
                  <div class="relative">
                    <button
                      @click="toggleActionDropdown(product._id)"
                      class="h-8 w-8 p-0 rounded-full hover:bg-cream flex items-center justify-center"
                    >
                      <span class="sr-only">Open menu</span>
                      <MoreHorizontal class="h-4 w-4" />
                    </button>
                    <div
                      v-if="activeActionDropdown === product._id"
                      class="absolute right-0 z-10 mt-1 w-[120px] rounded-md bg-white shadow-lg border border-charcoal/10"
                    >
                      <div class="py-1">
                        <router-link :to="`/admin/products/${product._id}`">
                          <button
                            class="w-full flex items-center text-left px-4 py-2 text-sm text-charcoal hover:bg-cream"
                          >
                            <Eye class="mr-2 h-4 w-4" />
                            View
                          </button>
                        </router-link>
                        <router-link
                          :to="`/admin/products/${product._id}/edit`"
                        >
                          <button
                            class="w-full flex items-center text-left px-4 py-2 text-sm text-charcoal hover:bg-cream"
                          >
                            <Pencil class="mr-2 h-4 w-4" />
                            Edit
                          </button>
                        </router-link>
                        <button
                          class="w-full flex items-center text-left px-4 py-2 text-sm text-terracotta hover:bg-cream"
                          @click="openDeleteDialog(product)"
                        >
                          <Trash2 class="mr-2 h-4 w-4" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Dialog -->
    <div v-if="deleteDialogOpen" class="fixed inset-0 z-50 overflow-y-auto">
      <div
        class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0"
      >
        <div
          class="fixed inset-0 transition-opacity"
          @click="deleteDialogOpen = false"
        >
          <div class="absolute inset-0 bg-charcoal/30"></div>
        </div>

        <!-- Dialog Panel -->
        <div
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        >
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 class="text-lg leading-6 font-medium text-charcoal">
                  Delete Product
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-charcoal/70">
                    Are you sure you want to delete this product? This action
                    cannot be undone.
                  </p>
                </div>
              </div>
            </div>

            <div
              v-if="productToDelete"
              class="mt-4 flex items-center space-x-4"
            >
              <div class="h-16 w-16 overflow-hidden rounded-sm bg-cream">
                <img
                  :src="productToDelete.images[0]?.src || '/placeholder.svg'"
                  :alt="productToDelete.name"
                  class="h-full w-full object-cover"
                />
              </div>
              <div>
                <h4 class="font-medium">{{ productToDelete.name }}</h4>
                <p class="text-sm text-charcoal/70">
                  ${{ productToDelete.price.toFixed(2) }} •
                  {{ productToDelete.category }}
                </p>
              </div>
            </div>
          </div>
          <div
            class="bg-cream/50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"
          >
            <button
              type="button"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-terracotta text-base font-medium text-white hover:bg-terracotta/90 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
              @click="confirmDelete"
            >
              Delete
            </button>
            <button
              type="button"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-charcoal/20 shadow-sm px-4 py-2 bg-white text-base font-medium text-charcoal hover:bg-cream focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              @click="deleteDialogOpen = false"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, onUnmounted } from "vue";
import {
  Search,
  ArrowUpDown,
  ChevronDown,
  MoreHorizontal,
  Plus,
  Pencil,
  Trash2,
  Eye,
} from "lucide-vue-next";
import { useProductStore } from "@/stores/product.store";
import { type Product } from "@/types/Product";
import ImageWithLoading from "@/components/ui/ImageWithLoading.vue";

const productStore = useProductStore();

// State
const products = computed(() => productStore.products);
const filteredProducts = ref<Product[]>([]);
const searchQuery = ref("");
const sortField = ref("name");
const sortDirection = ref<"asc" | "desc">("asc");
const selectedCategory = ref<string>("all");
const deleteDialogOpen = ref(false);
const productToDelete = ref<Product | null>(null);

// UI state
const showCategoryDropdown = ref(false);
const activeActionDropdown = ref<string | number | null>(null);

// Toggle dropdown visibility
const toggleCategoryDropdown = () => {
  showCategoryDropdown.value = !showCategoryDropdown.value;
  activeActionDropdown.value = null;
};

const toggleActionDropdown = (productId: string | number) => {
  if (activeActionDropdown.value === productId) {
    activeActionDropdown.value = null;
  } else {
    activeActionDropdown.value = productId;
  }
  showCategoryDropdown.value = false;
};

// Close dropdowns when clicking outside
const closeDropdowns = () => {
  showCategoryDropdown.value = false;
  activeActionDropdown.value = null;
};

// Event listener for closing dropdowns when clicking outside
onMounted(() => {
  document.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    if (!target.closest(".relative")) {
      closeDropdowns();
    }
  });

  filteredProducts.value = products.value;
});

// Cleanup listeners
onUnmounted(() => {
  document.removeEventListener("click", closeDropdowns);
});

// Get all categories from products
const categories = computed(() => {
  return [...new Set(products.value.map((product) => product.category))];
});

// Handle dropdown selections
const selectCategory = (category: string) => {
  selectedCategory.value = category;
  showCategoryDropdown.value = false;
};

// Handle sorting
const handleSort = (field: keyof Product) => {
  if (field === sortField.value) {
    sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
  } else {
    sortField.value = field;
    sortDirection.value = "asc";
  }
};

// Delete product functions
const openDeleteDialog = (product: Product) => {
  productToDelete.value = product;
  deleteDialogOpen.value = true;
  activeActionDropdown.value = null;
};

const confirmDelete = () => {
  if (productToDelete.value) {
    deleteDialogOpen.value = false;
    productToDelete.value = null;
  }
};

// Filter and sort products
watch(
  [products, searchQuery, sortField, sortDirection, selectedCategory],
  () => {
    let result = [...products.value];

    // Filter by search query
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          (product.japaneseText &&
            product.japaneseText.toLowerCase().includes(query))
      );
    }

    // Filter by category
    if (selectedCategory.value !== "all") {
      result = result.filter(
        (product) => product.category === selectedCategory.value
      );
    }

    // Sort results
    result = result.sort((a, b) => {
      let aValue = a[sortField.value as keyof Product];
      let bValue = b[sortField.value as keyof Product];

      // Handle special case for sorting by name (case insensitive)
      if (
        sortField.value === "name" &&
        typeof aValue === "string" &&
        typeof bValue === "string"
      ) {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection.value === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else {
        // Handle non-string values (like numbers)
        return sortDirection.value === "asc"
          ? (aValue as any) - (bValue as any)
          : (bValue as any) - (aValue as any);
      }
    });

    filteredProducts.value = result;
  },
  { immediate: true }
);

// Mock data functions (replace with actual API calls in production)
</script>

<style scoped>
/* Any component-specific styles can go here */
</style>

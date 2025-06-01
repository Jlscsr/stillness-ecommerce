<template>
  <div class="p-6">
    <div class="flex items-center mb-6">
      <router-link to="/admin/products" class="mr-4">
        <button class="rounded-full p-2 hover:bg-cream flex items-center justify-center">
          <ArrowLeft class="h-5 w-5" />
        </button>
      </router-link>
      <h1 class="text-2xl font-light text-charcoal">Add New Product</h1>
    </div>

    <form @submit.prevent="handleSubmit">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left Column - Product Details -->
        <div class="lg:col-span-2 space-y-6">
          <div class="bg-white rounded-lg shadow-sm border border-charcoal/10">
            <div class="p-6 pb-2">
              <h3 class="text-lg font-medium text-charcoal">Product Information</h3>
              <p class="text-sm text-charcoal/60">Basic information about the product</p>
            </div>
            <div class="p-6 space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="space-y-2">
                  <label for="name" class="block text-sm font-medium text-charcoal">Product Name *</label>
                  <input
                    id="name"
                    v-model="productData.name"
                    type="text"
                    required
                    class="w-full p-2 border border-charcoal/20 rounded-md focus:outline-none focus:ring-1 focus:ring-sage focus:border-sage"
                  />
                </div>
                <div class="space-y-2">
                  <label for="japaneseText" class="block text-sm font-medium text-charcoal">Japanese Text (Optional)</label>
                  <input
                    id="japaneseText"
                    v-model="productData.japaneseText"
                    type="text"
                    class="w-full p-2 border border-charcoal/20 rounded-md focus:outline-none focus:ring-1 focus:ring-sage focus:border-sage"
                  />
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="space-y-2">
                  <label for="price" class="block text-sm font-medium text-charcoal">Price ($) *</label>
                  <input
                    id="price"
                    v-model="productData.price"
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    class="w-full p-2 border border-charcoal/20 rounded-md focus:outline-none focus:ring-1 focus:ring-sage focus:border-sage"
                  />
                </div>
                <div class="space-y-2">
                  <label for="category" class="block text-sm font-medium text-charcoal">Category *</label>
                  <div class="relative">
                    <select
                      id="category"
                      v-model="productData.category"
                      required
                      class="w-full p-2 border border-charcoal/20 rounded-md focus:outline-none focus:ring-1 focus:ring-sage focus:border-sage appearance-none"
                    >
                      <option value="" disabled>Select category</option>
                      <option value="Home">Home</option>
                      <option value="Apparel">Apparel</option>
                      <option value="Decor">Decor</option>
                      <option value="Wellness">Wellness</option>
                      <option value="Dining">Dining</option>
                      <option value="Tea">Tea</option>
                    </select>
                    <ChevronDown class="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 pointer-events-none text-charcoal/50" />
                  </div>
                </div>
              </div>

              <div class="space-y-2">
                <label for="description" class="block text-sm font-medium text-charcoal">Short Description *</label>
                <textarea
                  id="description"
                  v-model="productData.description"
                  rows="2"
                  required
                  class="w-full p-2 border border-charcoal/20 rounded-md focus:outline-none focus:ring-1 focus:ring-sage focus:border-sage"
                ></textarea>
              </div>

              <div class="space-y-2">
                <label for="fullDescription" class="block text-sm font-medium text-charcoal">Full Description</label>
                <textarea
                  id="fullDescription"
                  v-model="productData.fullDescription"
                  rows="4"
                  class="w-full p-2 border border-charcoal/20 rounded-md focus:outline-none focus:ring-1 focus:ring-sage focus:border-sage"
                ></textarea>
              </div>

              <div class="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="inStock"
                  v-model="productData.inStock"
                  class="h-4 w-4 text-sage focus:ring-sage rounded"
                />
                <label for="inStock" class="block text-sm text-charcoal">In Stock</label>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-sm border border-charcoal/10">
            <div class="p-6 pb-2">
              <h3 class="text-lg font-medium text-charcoal">Product Details</h3>
              <p class="text-sm text-charcoal/60">Additional information about the product</p>
            </div>
            <div class="p-6 space-y-4">
              <div class="space-y-2">
                <label for="materials" class="block text-sm font-medium text-charcoal">Materials</label>
                <input
                  id="materials"
                  v-model="productData.materials"
                  type="text"
                  class="w-full p-2 border border-charcoal/20 rounded-md focus:outline-none focus:ring-1 focus:ring-sage focus:border-sage"
                />
              </div>

              <div class="space-y-2">
                <label for="dimensions" class="block text-sm font-medium text-charcoal">Dimensions</label>
                <input
                  id="dimensions"
                  v-model="productData.dimensions"
                  type="text"
                  class="w-full p-2 border border-charcoal/20 rounded-md focus:outline-none focus:ring-1 focus:ring-sage focus:border-sage"
                />
              </div>

              <div class="space-y-2">
                <label for="care" class="block text-sm font-medium text-charcoal">Care Instructions</label>
                <textarea
                  id="care"
                  v-model="productData.care"
                  rows="2"
                  class="w-full p-2 border border-charcoal/20 rounded-md focus:outline-none focus:ring-1 focus:ring-sage focus:border-sage"
                ></textarea>
              </div>

              <div class="space-y-2">
                <label for="shipping" class="block text-sm font-medium text-charcoal">Shipping Information</label>
                <textarea
                  id="shipping"
                  v-model="productData.shipping"
                  rows="2"
                  class="w-full p-2 border border-charcoal/20 rounded-md focus:outline-none focus:ring-1 focus:ring-sage focus:border-sage"
                ></textarea>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-sm border border-charcoal/10">
            <div class="p-6 pb-2 flex justify-between items-center">
              <div>
                <h3 class="text-lg font-medium text-charcoal">Variants</h3>
                <p class="text-sm text-charcoal/60">Add product variants like size or color</p>
              </div>
              <button
                type="button"
                @click="addVariant"
                class="inline-flex items-center px-3 py-1.5 border border-charcoal/20 text-sm font-medium rounded-md bg-white hover:bg-cream"
              >
                <Plus class="h-4 w-4 mr-2" />
                Add Variant
              </button>
            </div>
            <div class="p-6">
              <div v-if="productData.variants.length === 0" class="text-center py-6 text-charcoal/60">
                No variants added
              </div>
              <div v-else class="space-y-4">
                <div
                  v-for="(variant, index) in productData.variants"
                  :key="index"
                  class="flex items-end gap-4 pb-4 border-b border-charcoal/10"
                >
                  <div class="flex-1 space-y-2">
                    <label :for="`variant-${index}-name`" class="block text-sm font-medium text-charcoal">Name</label>
                    <input
                      :id="`variant-${index}-name`"
                      v-model="variant.name"
                      type="text"
                      placeholder="e.g. Small, Red, etc."
                      class="w-full p-2 border border-charcoal/20 rounded-md focus:outline-none focus:ring-1 focus:ring-sage focus:border-sage"
                    />
                  </div>
                  <div class="flex items-center space-x-2 pb-2">
                    <input
                      :id="`variant-${index}-inStock`"
                      v-model="variant.inStock"
                      type="checkbox"
                      class="h-4 w-4 text-sage focus:ring-sage rounded"
                    />
                    <label :for="`variant-${index}-inStock`" class="block text-sm text-charcoal">In Stock</label>
                  </div>
                  <button
                    type="button"
                    @click="removeVariant(index)"
                    class="p-2 rounded-full hover:bg-cream flex items-center justify-center"
                  >
                    <X class="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column - Images and Submit -->
        <div class="space-y-6">
          <div class="bg-white rounded-lg shadow-sm border border-charcoal/10">
            <div class="p-6 pb-2">
              <h3 class="text-lg font-medium text-charcoal">Product Images</h3>
              <p class="text-sm text-charcoal/60">Upload product images</p>
            </div>
            <div class="p-6">
              <div
                @click="triggerFileInput"
                class="border-2 border-dashed border-charcoal/20 rounded-md p-6 text-center cursor-pointer hover:bg-charcoal/5 transition-colors"
              >
                <input
                  type="file"
                  ref="fileInput"
                  accept="image/*"
                  multiple
                  class="hidden"
                  @change="handleImageUpload"
                />
                <Upload class="h-10 w-10 text-charcoal/40 mx-auto mb-2" />
                <p class="text-sm text-charcoal/70 mb-1">Click to upload or drag and drop</p>
                <p class="text-xs text-charcoal/50">PNG, JPG, GIF up to 10MB</p>
              </div>

              <div v-if="images.length > 0" class="mt-4 grid grid-cols-2 gap-2">
                <div
                  v-for="(src, index) in images"
                  :key="index"
                  class="relative group rounded-md overflow-hidden"
                >
                  <img
                    :src="src"
                    :alt="`Product image ${index + 1}`"
                    class="w-full h-[100px] object-cover"
                  />
                  <button
                    type="button"
                    @click="removeImage(index)"
                    class="absolute top-1 right-1 bg-terracotta/80 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X class="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="flex justify-between">
            <router-link to="/admin/products">
              <button
                type="button"
                class="px-4 py-2 border border-charcoal/20 text-charcoal rounded-md hover:bg-cream"
              >
                Cancel
              </button>
            </router-link>
            <button
              type="submit"
              :disabled="isSubmitting"
              class="px-4 py-2 bg-sage text-white rounded-md hover:bg-sage/90 disabled:opacity-50"
            >
              {{ isSubmitting ? "Creating..." : "Create Product" }}
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { X, Upload, Plus, ArrowLeft, ChevronDown } from 'lucide-vue-next';

const router = useRouter();
const fileInput = ref<HTMLInputElement | null>(null);
const isSubmitting = ref(false);
const images = ref<string[]>([]);

// Product data state
const productData = reactive({
  name: '',
  japaneseText: '',
  price: '',
  description: '',
  fullDescription: '',
  category: '',
  materials: '',
  dimensions: '',
  care: '',
  shipping: '',
  inStock: true,
  variants: [{ name: '', inStock: true }],
});

// Trigger file input click
const triggerFileInput = () => {
  fileInput.value?.click();
};

// Handle image uploads
const handleImageUpload = (e: Event) => {
  const input = e.target as HTMLInputElement;
  const files = input.files;
  if (!files) return;

  const newImages: string[] = [];
  for (let i = 0; i < files.length; i++) {
    newImages.push(URL.createObjectURL(files[i]));
  }

  images.value = [...images.value, ...newImages];
};

// Remove an image
const removeImage = (index: number) => {
  const newImages = [...images.value];
  newImages.splice(index, 1);
  images.value = newImages;
};

// Handle variant changes
const addVariant = () => {
  productData.variants.push({ name: '', inStock: true });
};

// Remove a variant
const removeVariant = (index: number) => {
  productData.variants.splice(index, 1);
};

// Handle form submission
const handleSubmit = async () => {
  isSubmitting.value = true;

  try {
    // Prepare the product data
    const newProduct = {
      id: Date.now().toString(), // Use timestamp as temporary ID
      name: productData.name,
      japaneseText: productData.japaneseText || undefined,
      price: Number.parseFloat(productData.price) || 0,
      description: productData.description,
      fullDescription: productData.fullDescription || undefined,
      category: productData.category,
      materials: productData.materials || undefined,
      dimensions: productData.dimensions || undefined,
      care: productData.care || undefined,
      shipping: productData.shipping || undefined,
      inStock: productData.inStock,
      images: images.value.map((src, i) => ({ 
        id: i + 1, 
        src, 
        alt: `${productData.name} image ${i + 1}` 
      })),
      variants:
        productData.variants.length > 0
          ? productData.variants
              .filter((v) => v.name)
              .map((v, i) => ({
                id: i + 1,
                name: v.name,
                inStock: v.inStock,
              }))
          : undefined,
    };

    // In a real app, we would make an API call to save the product
    console.log('New product:', newProduct);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Redirect to products page
    router.push('/admin/products');
  } catch (error) {
    console.error('Error creating product:', error);
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
/* Component-specific styles */
</style>

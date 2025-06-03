<template>
  <div class="p-6">
    <div class="flex items-center mb-6">
      <router-link to="/admin/products" class="mr-4">
        <button
          class="rounded-full p-2 hover:bg-cream flex items-center justify-center"
        >
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
              <h3 class="text-lg font-medium text-charcoal">
                Product Information
              </h3>
              <p class="text-sm text-charcoal/60">
                Basic information about the product
              </p>
            </div>
            <div class="p-6 space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="space-y-2">
                  <label
                    for="name"
                    class="block text-sm font-medium text-charcoal"
                    >Product Name *</label
                  >
                  <input
                    id="name"
                    v-model="productData.name"
                    type="text"
                    required
                    class="w-full p-2 border border-charcoal/20 rounded-md focus:outline-none focus:ring-1 focus:ring-sage focus:border-sage"
                  />
                </div>
                <div class="space-y-2">
                  <label
                    for="japaneseText"
                    class="block text-sm font-medium text-charcoal"
                    >Japanese Text (Optional)</label
                  >
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
                  <label
                    for="price"
                    class="block text-sm font-medium text-charcoal"
                    >Price ($) *</label
                  >
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
                  <label
                    for="category"
                    class="block text-sm font-medium text-charcoal"
                    >Category *</label
                  >
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
                    <ChevronDown
                      class="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 pointer-events-none text-charcoal/50"
                    />
                  </div>
                </div>
              </div>

              <div class="space-y-2">
                <label
                  for="description"
                  class="block text-sm font-medium text-charcoal"
                  >Short Description *</label
                >
                <textarea
                  id="description"
                  v-model="productData.description"
                  rows="2"
                  required
                  class="w-full p-2 border border-charcoal/20 rounded-md focus:outline-none focus:ring-1 focus:ring-sage focus:border-sage"
                ></textarea>
              </div>

              <div class="space-y-2">
                <label
                  for="stock"
                  class="block text-sm font-medium text-charcoal"
                  >Stock *</label
                >
                <input
                  id="stock"
                  v-model="productData.stock"
                  type="number"
                  min="0"
                  required
                  class="w-full p-2 border border-charcoal/20 rounded-md focus:outline-none focus:ring-1 focus:ring-sage focus:border-sage"
                />
              </div>

              <div class="space-y-2">
                <label
                  for="longDescription"
                  class="block text-sm font-medium text-charcoal"
                  >Long Description</label
                >
                <textarea
                  id="longDescription"
                  v-model="productData.longDescription"
                  rows="4"
                  class="w-full p-2 border border-charcoal/20 rounded-md focus:outline-none focus:ring-1 focus:ring-sage focus:border-sage"
                ></textarea>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-sm border border-charcoal/10">
            <div class="p-6 pb-2">
              <h3 class="text-lg font-medium text-charcoal">Product Details</h3>
              <p class="text-sm text-charcoal/60">
                Additional information about the product
              </p>
            </div>
            <div class="p-6 space-y-4">
              <div class="space-y-2">
                <label
                  for="materials"
                  class="block text-sm font-medium text-charcoal"
                  >Materials</label
                >
                <div class="flex gap-2">
                  <input
                    id="materials"
                    v-model="materialsInput"
                    type="text"
                    placeholder="Enter materials"
                    @keyup="handleMaterialsKeyup"
                    class="flex-1 p-2 border border-charcoal/20 rounded-md focus:outline-none focus:ring-1 focus:ring-sage focus:border-sage"
                  />
                  <button
                    type="button"
                    @click="addMaterial"
                    class="px-3 py-2 bg-sage text-white rounded-md hover:bg-sage/90"
                  >
                    Add
                  </button>
                </div>
                <div class="flex flex-wrap gap-2 mt-2">
                  <div
                    v-for="(material, index) in productData.materials"
                    :key="index"
                    class="bg-cream px-2 py-1 rounded-md flex items-center"
                  >
                    <span class="text-sm">{{ material }}</span>
                    <button
                      type="button"
                      @click="removeMaterial(index)"
                      class="ml-2"
                    >
                      <X class="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>

              <div class="space-y-2">
                <label
                  for="dimensions"
                  class="block text-sm font-medium text-charcoal"
                  >Dimensions</label
                >
                <input
                  id="dimensions"
                  v-model="productData.dimensions"
                  type="text"
                  class="w-full p-2 border border-charcoal/20 rounded-md focus:outline-none focus:ring-1 focus:ring-sage focus:border-sage"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column - Images -->
        <div class="space-y-6">
          <div class="bg-white rounded-lg shadow-sm border border-charcoal/10">
            <div class="p-6 pb-2">
              <h3 class="text-lg font-medium text-charcoal">Product Images</h3>
              <p class="text-sm text-charcoal/60">
                Upload images for this product
              </p>
            </div>
            <div class="p-6">
              <div class="mb-4">
                <button
                  type="button"
                  @click="triggerFileInput"
                  class="w-full border-2 border-dashed border-charcoal/20 rounded-md p-6 flex flex-col items-center justify-center hover:bg-cream/30"
                >
                  <Upload class="h-6 w-6 text-charcoal/50 mb-2" />
                  <span class="text-sm text-charcoal/70"
                    >Click to upload images</span
                  >
                  <span class="text-xs text-charcoal/50 mt-1"
                    >JPG, PNG or SVG (max. 5MB)</span
                  >
                </button>
                <input
                  ref="fileInput"
                  type="file"
                  accept="image/*"
                  multiple
                  class="hidden"
                  @change="handleImageUpload"
                />
              </div>

              <div
                v-if="productData.images.length === 0"
                class="text-center py-6 text-charcoal/60"
              >
                No images added
              </div>
              <div v-else class="grid grid-cols-2 gap-4">
                <div
                  v-for="(image, index) in productData.images"
                  :key="index"
                  class="relative aspect-square border border-charcoal/10 rounded-md overflow-hidden group"
                >
                  <img
                    :src="image.src"
                    :alt="image.alt"
                    class="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    @click="removeImage(index)"
                    class="absolute top-2 right-2 p-1 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X class="h-4 w-4" />
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
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { X, Upload, Plus, ArrowLeft, ChevronDown } from "lucide-vue-next";
import type { Image, ProductRequestBody } from "@/types/Product";
import { useAdminStore } from "@/stores/admin.store";
import { useToastStore } from "@/stores/toast.store";

const router = useRouter();
const adminStore = useAdminStore();
const toastStore = useToastStore();
const fileInput = ref<HTMLInputElement | null>(null);
const isSubmitting = ref(false);
const uploadedImages = ref<File[]>([]);
const materialsInput = ref("");

// Product data state
const productData = reactive({
  name: "",
  japaneseText: "",
  description: "",
  longDescription: "",
  price: "",
  category: "",
  stock: 0,
  materials: [] as string[],
  dimensions: "",
  images: [] as Image[],
});

// Materials handling
const addMaterial = () => {
  if (materialsInput.value.trim()) {
    // Split by comma and add each material
    const materials = materialsInput.value
      .split(",")
      .map((m) => m.trim())
      .filter((m) => m);
    productData.materials.push(...materials);
    materialsInput.value = "";
  }
};

// Watch for Enter key on materials input
const handleMaterialsKeyup = (e: KeyboardEvent) => {
  if (e.key === "Enter") {
    e.preventDefault();
    addMaterial();
  }
};

// Remove a material
const removeMaterial = (index: number) => {
  productData.materials.splice(index, 1);
};

// Trigger file input click
const triggerFileInput = () => {
  fileInput.value?.click();
};

// Handle image uploads
const handleImageUpload = (e: Event) => {
  const input = e.target as HTMLInputElement;
  const files = input.files;
  if (!files) return;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    uploadedImages.value.push(file);

    // Create object URL for preview
    const imageUrl = URL.createObjectURL(file);

    // Add to product images array
    productData.images.push({
      _id: Date.now() + i, // Temporary ID
      src: imageUrl,
      alt: file.name,
    });
  }
};

// Convert file to base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

// Remove an image
const removeImage = (index: number) => {
  productData.images.splice(index, 1);
  uploadedImages.value.splice(index, 1);
};

// Handle form submission
const handleSubmit = async () => {
  isSubmitting.value = true;

  try {
    // Add materials if any are in the input field
    if (materialsInput.value.trim()) {
      addMaterial();
    }

    // Convert all images to base64
    const imagePromises = uploadedImages.value.map(async (file, index) => {
      const base64 = await fileToBase64(file);
      return {
        _id: index + 1, // Temporary ID
        src: base64,
        alt:
          productData.images[index]?.alt ||
          `${productData.name} image ${index + 1}`,
      };
    });

    const base64Images = await Promise.all(imagePromises);

    // Prepare the product data according to ProductRequestBody
    const productRequestData: ProductRequestBody = {
      name: productData.name,
      description: productData.description,
      price: Number.parseFloat(productData.price) || 0,
      category: productData.category,
      stock: productData.stock,
      materials: productData.materials,
      dimensions: productData.dimensions,
      images: base64Images,
      // Optional fields
      ...(productData.japaneseText
        ? { japaneseText: productData.japaneseText }
        : {}),
      ...(productData.longDescription
        ? { longDescription: productData.longDescription }
        : {}),
    };

    const response = await adminStore.addNewProduct(productRequestData);

    if (!response.success) {
      toastStore.error("Failed to create product. Please try again.");
      return;
    }

    toastStore.success("Product created successfully!");

    router.push("/admin/products");
  } catch (error) {
    console.error("Error creating product:", error);
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
/* Component-specific styles */
</style>

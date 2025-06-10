<template>
  <section class="mt-16 border-t border-charcoal/10 pt-12">
    <h2 class="text-2xl font-light text-charcoal mb-8">Customer Reviews</h2>

    <!-- Reviews summary -->
    <div class="flex flex-col md:flex-row gap-8 mb-12">
      <div class="md:w-1/3">
        <div class="bg-cream p-6 border border-charcoal/10 rounded-sm">
          <div class="flex items-center mb-4">
            <div class="flex mr-2">
              <component
                v-for="(star, index) in renderStars(averageRating)"
                :key="`star-${index}`"
                :is="star.component"
                :class="star.class"
              />
            </div>
            <span class="text-lg font-medium text-charcoal">{{
              averageRating.toFixed(1)
            }}</span>
          </div>
          <p class="text-sm text-charcoal/70 mb-4">
            Based on {{ productReviews.length }}
            {{ productReviews.length === 1 ? "review" : "reviews" }}
          </p>
          <div class="space-y-2">
            <div
              v-for="rating in [5, 4, 3, 2, 1]"
              :key="rating"
              class="flex items-center"
            >
              <span class="text-xs text-charcoal/70 w-8"
                >{{ rating }} star</span
              >
              <div
                class="flex-1 mx-2 h-2 bg-charcoal/10 rounded-full overflow-hidden"
              >
                <div
                  class="h-full bg-sage"
                  :style="{ width: `${getRatingPercentage(rating)}%` }"
                ></div>
              </div>
              <span class="text-xs text-charcoal/70 w-8">{{
                getRatingCount(rating)
              }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="md:w-2/3">
        <!-- Review list -->
        <div v-if="productReviews.length > 0" class="space-y-6">
          <div
            v-for="review in productReviews"
            :key="review._id"
            class="border-b border-charcoal/10 pb-6"
          >
            <div class="flex justify-between mb-2">
              <h3 class="font-medium text-charcoal">{{ review.title }}</h3>
              <div class="flex">
                <component
                  v-for="(star, index) in renderStars(review.rating)"
                  :key="`review-star-${review._id}-${index}`"
                  :is="star.component"
                  :class="star.class"
                />
              </div>
            </div>
            <div class="flex items-center text-sm text-charcoal/70 mb-3">
              <span>{{ review.name }}</span>
              <span class="mx-2">•</span>
              <span>{{ formatDate(review.createdAt) }}</span>
            </div>
            <p class="text-charcoal/80">{{ review.text }}</p>
          </div>
        </div>
        <div
          v-else
          class="text-center py-8 border border-charcoal/10 rounded-sm"
        >
          <p class="text-charcoal/70">
            No reviews yet. Be the first to review this product!
          </p>
        </div>
      </div>
    </div>

    <!-- Write a review form -->
    <div class="bg-terracotta/5 p-6 rounded-sm">
      <h3 class="text-xl font-light text-charcoal mb-6">Write a Review</h3>

      <div
        v-if="isSubmitted"
        class="bg-sage/10 border border-sage/20 p-4 rounded-sm text-center"
      >
        <p class="text-sage font-medium">Thank you for your review!</p>
        <p class="text-charcoal/70 mt-2">Your review has been submitted!</p>
      </div>
      <form v-else @submit="handleSubmit">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label
              for="name"
              class="block text-sm font-medium text-charcoal mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              v-model="newReview.name"
              required
              class="w-full p-2 border border-charcoal/20 bg-cream rounded-sm focus:outline-none focus:border-sage"
            />
          </div>
          <div>
            <label
              for="email"
              class="block text-sm font-medium text-charcoal mb-1"
            >
              Email (will not be published)
            </label>
            <input
              type="email"
              id="email"
              v-model="newReview.email"
              required
              class="w-full p-2 border border-charcoal/20 bg-cream rounded-sm focus:outline-none focus:border-sage"
            />
          </div>
        </div>

        <div class="mb-6">
          <label class="block text-sm font-medium text-charcoal mb-1"
            >Rating</label
          >
          <div class="flex">
            <button
              v-for="rating in [1, 2, 3, 4, 5]"
              :key="rating"
              type="button"
              @click="handleRatingChange(rating)"
              class="p-1"
            >
              <Star
                class="h-6 w-6 transition-colors"
                :class="
                  rating <= newReview.rating
                    ? 'fill-sage text-sage'
                    : 'text-charcoal/20'
                "
              />
            </button>
          </div>
        </div>

        <div class="mb-6">
          <label
            for="title"
            class="block text-sm font-medium text-charcoal mb-1"
          >
            Review Title
          </label>
          <input
            type="text"
            id="title"
            v-model="newReview.title"
            required
            class="w-full p-2 border border-charcoal/20 bg-cream rounded-sm focus:outline-none focus:border-sage"
          />
        </div>

        <div class="mb-6">
          <label
            for="text"
            class="block text-sm font-medium text-charcoal mb-1"
          >
            Review
          </label>
          <textarea
            id="text"
            v-model="newReview.text"
            required
            rows="4"
            class="w-full p-2 border border-charcoal/20 bg-cream rounded-sm focus:outline-none focus:border-sage"
          ></textarea>
        </div>

        <button
          type="submit"
          :disabled="isSubmitting"
          class="px-6 py-2 rounded-sm transition-colors"
          :class="
            isSubmitting
              ? 'bg-charcoal/20 text-charcoal/50 cursor-not-allowed'
              : 'bg-sage text-cream hover:bg-sage/90'
          "
        >
          {{ isSubmitting ? "Submitting..." : "Submit Review" }}
        </button>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import {
  getAllProductReviews,
  createNewProductReview,
} from "@/services/review.service";
import { type Review, type ReviewRequestBody } from "@/types/Review";
import { Star, StarHalf } from "lucide-vue-next";
import { useToastStore } from "@/stores/toast.store";

interface Props {
  productId: string;
}

const props = defineProps<Props>();

const toastStore = useToastStore();

const newReview = ref<ReviewRequestBody>({
  productId: props.productId,
  name: "",
  email: "",
  rating: 5,
  title: "",
  text: "",
});
const isSubmitting = ref(false);
const isSubmitted = ref(false);

// Filter reviews for this product
const productReviews = ref<Review[]>([]);

const averageRating = computed(() =>
  productReviews.value.length > 0
    ? productReviews.value.reduce((sum, review) => sum + review.rating, 0) /
      productReviews.value.length
    : 0
);

const handleRatingChange = (rating: number) => {
  newReview.value.rating = rating;
};

const handleSubmit = async (e: Event) => {
  e.preventDefault();
  isSubmitting.value = true;

  try {
    const response = await createNewProductReview(newReview.value);

    if (!response.success) {
      toastStore.error("Failed to submit review. Please try again later.");
      return;
    }

    toastStore.success("Review submitted successfully!");
    await getAllReviews();
  } catch (error) {
  } finally {
    isSubmitting.value = false;
    isSubmitted.value = true;
    newReview.value = {
      productId: props.productId,
      name: "",
      email: "",
      rating: 5,
      title: "",
      text: "",
    };
  }
};

const getAllReviews = async () => {
  try {
    const response = await getAllProductReviews(props.productId);

    if (!response.success) {
      console.error("Failed to fetch reviews:", response.message);
      return;
    }

    productReviews.value = response.data.filter(
      (review: Review) => review.productId === props.productId
    );
  } catch (error) {
    console.error("Error fetching reviews:", error);
  }
};

// Render stars for ratings
const renderStars = (rating: number) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  // Full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push({
      component: Star,
      class: "h-4 w-4 fill-sage text-sage",
    });
  }

  // Half star
  if (hasHalfStar) {
    stars.push({
      component: StarHalf,
      class: "h-4 w-4 fill-sage text-sage",
    });
  }

  // Empty stars
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  for (let i = 0; i < emptyStars; i++) {
    stars.push({
      component: Star,
      class: "h-4 w-4 text-charcoal/20",
    });
  }

  return stars;
};

const getRatingCount = (rating: number) => {
  return productReviews.value.filter((r) => Math.floor(r.rating) === rating)
    .length;
};

const getRatingPercentage = (rating: number) => {
  const count = getRatingCount(rating);
  return productReviews.value.length > 0
    ? (count / productReviews.value.length) * 100
    : 0;
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString();
};

onMounted(async () => {
  await getAllReviews();
});
</script>

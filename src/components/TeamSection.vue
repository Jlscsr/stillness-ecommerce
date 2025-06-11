<template>
  <section class="py-16 px-4 md:px-8 lg:px-16 bg-sage/5">
    <div class="max-w-7xl mx-auto">
      <ScrollAnimation type="fade">
        <div class="text-center mb-12">
          <span
            class="text-sm uppercase tracking-widest text-charcoal/70 mb-2 block"
            >チーム</span
          >
          <h2 class="text-2xl md:text-3xl font-light text-charcoal">
            Meet Our Team
          </h2>
          <p class="mt-4 max-w-2xl mx-auto text-charcoal/70">
            This e-commerce platform was created as a final project for our
            school. Our team members worked together to create this
            Japanese-inspired online shopping experience.
          </p>
        </div>
      </ScrollAnimation>

      <div class="relative">
        <!-- Scroll buttons - hidden on mobile (touch scroll instead) -->
        <template v-if="!isMobile">
          <button
            @click="scroll('left')"
            :class="
              cn(
                'absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-cream/80 hover:bg-cream rounded-full p-2 shadow-md transition-opacity duration-300',
                canScrollLeft ? 'opacity-100' : 'opacity-0 pointer-events-none'
              )
            "
            aria-label="Scroll left"
            :disabled="!canScrollLeft"
          >
            <ChevronLeft class="h-6 w-6 text-charcoal" />
          </button>

          <button
            @click="scroll('right')"
            :class="
              cn(
                'absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-cream/80 hover:bg-cream rounded-full p-2 shadow-md transition-opacity duration-300',
                canScrollRight ? 'opacity-100' : 'opacity-0 pointer-events-none'
              )
            "
            aria-label="Scroll right"
            :disabled="!canScrollRight"
          >
            <ChevronRight class="h-6 w-6 text-charcoal" />
          </button>
        </template>

        <!-- Scrollable container -->
        <div
          ref="scrollContainerRef"
          class="flex overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide"
          aria-label="Team members carousel"
          role="region"
          tabindex="0"
          @scroll="updateScrollButtonsState"
        >
          <div
            v-for="(member, index) in teamMembers"
            :key="member.name"
            class="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/3 px-4 snap-start"
          >
            <ScrollAnimation type="scale" :delay="0.1 + index * 0.05">
              <div
                class="bg-cream p-6 rounded-sm border border-charcoal/10 flex flex-col items-center text-center h-full"
              >
                <ImageWithLoading
                  :src="member.image || '/placeholder.svg'"
                  :alt="member.name || 'Team Member'"
                  container-class="relative w-32 h-32 rounded-full overflow-hidden mb-4"
                  image-class="w-full h-full object-cover"
                  root-margin="100px"
                />

                <h3 class="text-xl font-light text-charcoal mb-1">
                  {{ member.name }}
                </h3>
                <p class="text-charcoal/70 mb-3">{{ member.role }}</p>
                <p class="text-charcoal/80 text-sm">{{ member.description }}</p>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </div>

      <!-- Scroll indicator dots for mobile -->
      <div class="flex justify-center mt-6 md:hidden">
        <button
          v-for="(_, index) in teamMembers"
          :key="index"
          :class="`h-2 w-2 mx-1 rounded-full ${
            index < 3 ? 'bg-sage' : 'bg-charcoal/20'
          }`"
          :aria-label="`Go to team member ${index + 1}`"
          @click="scrollToMember(index)"
        />
      </div>

      <ScrollAnimation type="fade" :delay="0.5">
        <div class="mt-12 text-center">
          <p class="text-charcoal/80 max-w-2xl mx-auto mb-6">
            This project represents our collective vision of bringing Japanese
            aesthetic principles to the digital realm. We've applied concepts of
            simplicity, harmony, and mindfulness to create not just an
            e-commerce platform, but an immersive experience that honors the
            beauty of Japanese craftsmanship and design philosophy.
          </p>
        </div>
      </ScrollAnimation>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import { ChevronLeft, ChevronRight } from "lucide-vue-next";
import ScrollAnimation from "@/components/ui/ScrollAnimation.vue";
import ImageWithLoading from "@/components/ui/ImageWithLoading.vue";
import { cn } from "@/composables/utils";

interface TeamMember {
  name: string;
  role: string;
  description: string;
  image: string;
}

const scrollContainerRef = ref<HTMLDivElement | null>(null);
const canScrollLeft = ref(false);
const canScrollRight = ref(true);
const isMobile = ref(false);

const teamMembers: TeamMember[] = [
  {
    name: "Julius Raagas",
    role: "Developer | Project Manager",
    description:
      "Led the development team and built the full-stack application, managing both the Vue.js frontend and Node.js backend to deliver a seamless e-commerce platform.",
    image:
      "https://res.cloudinary.com/duz4cbg9w/image/upload/v1749613592/47_agauqa.png",
  },
  {
    name: "Aaron Jan A. Saguisa",
    role: "UI Designer",
    description:
      "Designed the look and feel of the website, mixing Japanese design style with modern web design to make it both beautiful and easy to use.",
    image:
      "https://res.cloudinary.com/duz4cbg9w/image/upload/v1749613592/47_agauqa.png",
  },
  {
    name: "Mariel P. Costales",
    role: "Documentation Specialist",
    description:
      "Wrote clear documentation for the project, creating guides and technical notes to help anyone understand how the website works.",
    image:
      "https://res.cloudinary.com/duz4cbg9w/image/upload/v1749613592/93_xvfawx.png",
  },
  {
    name: "Angelie Q. Larioque",
    role: "UI Designer",
    description:
      "Worked on making the website easy to use, focusing on user experience and creating designs that help customers enjoy shopping on the site.",
    image:
      "https://res.cloudinary.com/duz4cbg9w/image/upload/v1749613592/93_xvfawx.png",
  },
  {
    name: "Jeff Lopez",
    role: "Documentation Specialist",
    description:
      "Created technical documentation and guides, making sure all the project information is well organized and easy to understand for the team.",
    image:
      "https://res.cloudinary.com/duz4cbg9w/image/upload/v1749613592/47_agauqa.png",
  },
  {
    name: "Ej Desabille",
    role: "Documentation Specialist",
    description:
      "Managed documentation and quality checks, making sure everything is properly documented and the website works as it should.",
    image:
      "https://res.cloudinary.com/duz4cbg9w/image/upload/v1749613592/47_agauqa.png",
  },
  {
    name: "Exequiel Marcolita",
    role: "UI Designer",
    description:
      "Focused on creating intuitive user interfaces and visual design elements, ensuring the website provides a seamless and aesthetically pleasing user experience.",
    image:
      "https://res.cloudinary.com/duz4cbg9w/image/upload/v1749613592/47_agauqa.png",
  },
];

// Check if we're on mobile
const checkMobile = () => {
  isMobile.value = window.innerWidth < 768;
};

// Update scroll buttons state
const updateScrollButtonsState = () => {
  if (!scrollContainerRef.value) return;

  const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.value;
  canScrollLeft.value = scrollLeft > 0;
  canScrollRight.value = scrollLeft < scrollWidth - clientWidth - 10; // 10px buffer
};

const scroll = (direction: "left" | "right") => {
  if (!scrollContainerRef.value) return;

  const container = scrollContainerRef.value;
  const scrollAmount = container.clientWidth * 0.8; // Scroll 80% of the visible width

  container.scrollBy({
    left: direction === "left" ? -scrollAmount : scrollAmount,
    behavior: "smooth",
  });
};

const scrollToMember = (index: number) => {
  if (scrollContainerRef.value) {
    const itemWidth = scrollContainerRef.value.clientWidth;
    scrollContainerRef.value.scrollTo({
      left: itemWidth * (index / 3), // Adjust for the number of items visible
      behavior: "smooth",
    });
  }
};

onMounted(async () => {
  checkMobile();
  window.addEventListener("resize", checkMobile);

  await nextTick();
  if (scrollContainerRef.value) {
    // Initial check
    updateScrollButtonsState();
  }
});

onUnmounted(() => {
  window.removeEventListener("resize", checkMobile);
});
</script>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>

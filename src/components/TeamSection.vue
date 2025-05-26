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
            This e-commerce platform was created as a final project by a group
            of seven students passionate about Japanese aesthetics and web
            development. Each member brought their unique skills and
            perspectives to create this immersive shopping experience.
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
                <div
                  class="relative w-32 h-32 rounded-full overflow-hidden mb-4"
                >
                  <img
                    :src="member.image || '/placeholder.svg'"
                    :alt="`${member.name} - ${member.role}`"
                    class="w-full h-full object-cover"
                  />
                </div>
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
    name: "Yuki Nakamura",
    role: "Project Lead",
    description:
      "Coordinated the team's efforts and ensured the project aligned with Japanese design principles. Specializes in user experience design and project management.",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "Hiroshi Tanaka",
    role: "Frontend Developer",
    description:
      "Implemented the responsive user interface with a focus on subtle animations and transitions that reflect the Japanese aesthetic of elegant simplicity.",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "Mei Zhang",
    role: "Backend Developer",
    description:
      "Built the server-side architecture and database systems that power the e-commerce functionality, ensuring a seamless shopping experience.",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "Aiko Yamamoto",
    role: "UI/UX Designer",
    description:
      "Created the visual language of the site, incorporating traditional Japanese color palettes and design principles to create an immersive and authentic experience.",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "Kenji Sato",
    role: "Content Strategist",
    description:
      "Developed the product descriptions and cultural context, ensuring authentic representation of Japanese concepts like wabi-sabi and ma throughout the site.",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "Sakura Ito",
    role: "Accessibility Specialist",
    description:
      "Ensured the website is accessible to all users, implementing ARIA attributes and keyboard navigation while maintaining the aesthetic integrity of the design.",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "Takashi Kimura",
    role: "QA Engineer",
    description:
      "Rigorously tested all aspects of the site across devices and browsers, ensuring a flawless user experience that embodies the Japanese principle of quality craftsmanship.",
    image: "/placeholder.svg?height=200&width=200",
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

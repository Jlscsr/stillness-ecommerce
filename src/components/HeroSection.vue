<template>
  <section
    class="relative min-h-[100vh] flex items-center justify-center overflow-hidden pt-16 px-4 md:px-8 lg:px-16"
  >
    <!-- Canvas for Particles -->
    <canvas ref="canvas" class="absolute inset-0 w-full h-full"></canvas>

    <div
      class="container mx-auto grid md:grid-cols-2 gap-8 items-center relative z-10 flex-col-reverse md:flex-row grid-cols-1"
      :class="{ flex: true, 'md:grid': true }"
    >
      <!-- Left Column - Text Content -->
      <div class="text-left">
        <div
          v-motion="{
            initial: { opacity: 0, y: 20 },
            enter: {
              opacity: 1,
              y: 0,
              transition: { delay: 0, duration: 800 },
            },
          }"
          class="text-sm uppercase tracking-widest text-charcoal/70 mb-3 block"
        >
          静けさ
        </div>

        <h1
          v-motion="{
            initial: { opacity: 0, y: 20 },
            enter: {
              opacity: 1,
              y: 0,
              transition: { delay: 100, duration: 800 },
            },
          }"
          class="text-4xl md:text-6xl font-light text-charcoal mb-6"
        >
          Find Your <span class="font-normal">Stillness</span>
        </h1>

        <p
          v-motion="{
            initial: { opacity: 0, y: 20 },
            enter: {
              opacity: 1,
              y: 0,
              transition: { delay: 200, duration: 800 },
            },
          }"
          class="text-lg text-charcoal/80 mb-8 max-w-md"
        >
          Curated essentials for mindful living, inspired by Japanese principles
          of simplicity and harmony.
        </p>

        <div
          v-motion="{
            initial: { opacity: 0, y: 20 },
            enter: {
              opacity: 1,
              y: 0,
              transition: { delay: 300, duration: 800 },
            },
          }"
          class="flex flex-wrap gap-4"
        >
          <RouterLink
            to="#featured"
            class="px-8 py-3 bg-beige text-charcoal font-medium rounded-sm hover:bg-beige/90 transition-colors"
          >
            Explore
          </RouterLink>
        </div>
      </div>

      <!-- Right Column - Image -->
      <div
        ref="imageRef"
        class="relative w-full rounded-sm overflow-hidden shadow-lg"
      >
        <img
          src="../assets/images/hero-image.png"
          alt="Japanese inspired interior design"
          class="object-cover object-center"
          loading="lazy"
        />

        <!-- Overlay gradient -->
        <div
          class="absolute inset-0 bg-gradient-to-t from-cream/20 to-transparent"
        ></div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { RouterLink } from "vue-router";

// Canvas setup
const canvas = ref<HTMLCanvasElement | null>(null);
let animationFrameId: number;
let ctx: CanvasRenderingContext2D | null = null;
let particles: Array<{
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  speed: number;
  offset: number;
  color: string;
  opacity: number;
  timeOffset: number;
}> = [];

// Particle configuration
const colors = ["#97B19C", "#B6BE92", "#F3EDE6", "#D6C3B3", "#A7BCC8"];
const PARTICLE_COUNT = 30;
const MIN_SIZE = 8;
const MAX_SIZE = 25;
const MIN_SPEED = 0.1;
const MAX_SPEED = 0.5;
const OPACITY_MIN = 0.15;
const OPACITY_MAX = 0.25;
const DRIFT_AMOUNT = 30;

// Canvas sizing
let canvasWidth = 0;
let canvasHeight = 0;

// Initialize canvas
const initCanvas = () => {
  if (!canvas.value) return false;

  ctx = canvas.value.getContext("2d");
  if (!ctx) return false;

  resizeCanvas();
  return true;
};

// Resize canvas properly
const resizeCanvas = () => {
  if (!canvas.value || !ctx) return;

  const rect = canvas.value.getBoundingClientRect();
  canvasWidth = rect.width;
  canvasHeight = rect.height;

  // Set canvas size without DPR scaling for simplicity
  canvas.value.width = canvasWidth;
  canvas.value.height = canvasHeight;

  // Clear any existing transforms
  ctx.setTransform(1, 0, 0, 1, 0, 0);
};

// Create particles
const createParticles = () => {
  particles = Array.from({ length: PARTICLE_COUNT }, () => {
    const baseX = Math.random() * canvasWidth;
    const baseY = Math.random() * canvasHeight;
    const size = Math.random() * (MAX_SIZE - MIN_SIZE) + MIN_SIZE;
    const speed = Math.random() * (MAX_SPEED - MIN_SPEED) + MIN_SPEED;

    return {
      x: baseX,
      y: baseY,
      baseX,
      baseY,
      size,
      speed,
      offset: Math.random() * Math.PI * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: Math.random() * (OPACITY_MAX - OPACITY_MIN) + OPACITY_MIN,
      timeOffset: Math.random() * 100,
    };
  });
};

// Animation loop
const animate = () => {
  if (!ctx || !canvas.value) return;

  // Clear canvas completely - no trails
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  // Convert hex to rgba helper function
  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  // Update and draw particles
  particles.forEach((particle) => {
    if (!ctx) return; // Additional null check inside loop

    // Update time offset
    particle.timeOffset += 0.008;

    // Gentle floating movement
    particle.x =
      particle.baseX +
      Math.sin(particle.timeOffset + particle.offset) * DRIFT_AMOUNT;
    particle.y =
      particle.baseY +
      Math.cos(particle.timeOffset * 0.7 + particle.offset) *
        (DRIFT_AMOUNT * 0.8);

    // Wrap particles around screen edges
    if (particle.x < -particle.size) {
      particle.baseX = canvasWidth + particle.size;
    }
    if (particle.x > canvasWidth + particle.size) {
      particle.baseX = -particle.size;
    }
    if (particle.y < -particle.size) {
      particle.baseY = canvasHeight + particle.size;
    }
    if (particle.y > canvasHeight + particle.size) {
      particle.baseY = -particle.size;
    }

    // Draw simple solid circle - no gradient
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fillStyle = hexToRgba(particle.color, particle.opacity);
    ctx.fill();
  });

  animationFrameId = requestAnimationFrame(animate);
};

// Debounced resize handler
let resizeTimeout: number;
const handleResize = () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    if (canvas.value && ctx) {
      resizeCanvas();
      createParticles(); // Recreate particles for new canvas size
    }
  }, 100);
};

// Initialize particle system
const initParticles = () => {
  if (!initCanvas()) return;

  createParticles();

  // Add resize listener
  window.addEventListener("resize", handleResize);

  // Start animation
  animationFrameId = requestAnimationFrame(animate);
};

// Cleanup
onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
  if (resizeTimeout) clearTimeout(resizeTimeout);
  if (animationFrameId) cancelAnimationFrame(animationFrameId);
});

// Initialize on mount
onMounted(() => {
  // Small delay to ensure DOM is fully rendered
  setTimeout(initParticles, 100);
});
</script>

<style scoped>
.min-h-\[85vh\] {
  min-height: 85vh;
}

/* Ensure proper spacing and typography */
.text-charcoal {
  color: #333333;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .pt-16 {
    padding-top: 4rem;
  }

  .text-4xl {
    font-size: 2.25rem;
    line-height: 2.5rem;
  }
}
</style>

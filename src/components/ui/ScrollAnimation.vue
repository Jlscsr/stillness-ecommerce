<template>
  <div
    ref="target"
    :class="className"
    :style="currentStyles"
    class="transition-all"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { useIntersectionObserver } from "@vueuse/core";

type AnimationType =
  | "fade"
  | "slide-up"
  | "slide-right"
  | "slide-left"
  | "scale"
  | "brush";

interface Props {
  type?: AnimationType;
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: "fade",
  delay: 0,
  duration: 800,
  threshold: 0.1,
  className: "",
});

const target = ref<HTMLElement>();
const isIntersecting = ref(false);
const hasAnimated = ref(false);

// Set up intersection observer
useIntersectionObserver(
  target,
  ([{ isIntersecting: intersecting }]) => {
    console.log("Intersection detected:", intersecting); // Debug log
    if (intersecting && !hasAnimated.value) {
      setTimeout(() => {
        isIntersecting.value = true;
        hasAnimated.value = true;
      }, props.delay * 1000);
    }
  },
  {
    threshold: props.threshold,
  }
);

const getInitialState = (type: AnimationType) => {
  switch (type) {
    case "fade":
      return {
        opacity: "0",
        transform: "none",
      };
    case "slide-up":
      return {
        opacity: "0",
        transform: "translateY(30px)",
      };
    case "slide-right":
      return {
        opacity: "0",
        transform: "translateX(-30px)",
      };
    case "slide-left":
      return {
        opacity: "0",
        transform: "translateX(30px)",
      };
    case "scale":
      return {
        opacity: "0",
        transform: "scale(0.95)",
      };
    case "brush":
      return {
        opacity: "0",
        transform: "none",
      };
    default:
      return {
        opacity: "0",
        transform: "none",
      };
  }
};

const getFinalState = (type: AnimationType) => {
  switch (type) {
    case "fade":
      return {
        opacity: "1",
        transform: "none",
      };
    case "slide-up":
      return {
        opacity: "1",
        transform: "translateY(0px)",
      };
    case "slide-right":
      return {
        opacity: "1",
        transform: "translateX(0px)",
      };
    case "slide-left":
      return {
        opacity: "1",
        transform: "translateX(0px)",
      };
    case "scale":
      return {
        opacity: "1",
        transform: "scale(1)",
      };
    case "brush":
      return {
        opacity: "1",
        transform: "none",
      };
    default:
      return {
        opacity: "1",
        transform: "none",
      };
  }
};

const getTransitionStyle = () => {
  const duration = props.duration / 1000; // Convert to seconds for CSS
  const easing = "cubic-bezier(0.22, 1, 0.36, 1)";

  return `opacity ${duration}s ${easing}, transform ${duration}s ${easing}`;
};

// Computed styles that change based on intersection
const currentStyles = computed(() => {
  const baseStyles = isIntersecting.value
    ? getFinalState(props.type)
    : getInitialState(props.type);

  return {
    ...baseStyles,
    transition: getTransitionStyle(),
  };
});

// Debug: Log when component mounts
onMounted(() => {
  console.log("ScrollAnimation mounted, type:", props.type);
});

// Debug: Watch intersection changes
watch(isIntersecting, (newValue) => {
  console.log("Animation triggered:", newValue, "Type:", props.type);
});
</script>

import { ref, onMounted, onUnmounted, type Ref } from "vue";

export function useMediaQuery(query: string): Ref<boolean> {
  const matches = ref(false);
  let media: MediaQueryList | null = null;
  let listener: ((e: MediaQueryListEvent) => void) | null = null;

  const cleanup = () => {
    if (media && listener) {
      media.removeEventListener("change", listener);
    }
  };

  onMounted(() => {
    media = window.matchMedia(query);
    matches.value = media.matches;

    listener = (e: MediaQueryListEvent) => {
      matches.value = e.matches;
    };

    media.addEventListener("change", listener);
  });

  onUnmounted(() => {
    cleanup();
  });

  return matches;
}

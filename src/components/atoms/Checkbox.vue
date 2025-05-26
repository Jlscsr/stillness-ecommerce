<template>
  <button
    :id="id"
    ref="checkboxRef"
    type="button"
    role="checkbox"
    :aria-checked="checked"
    :aria-describedby="ariaDescribedby"
    :aria-labelledby="ariaLabelledby"
    :disabled="disabled"
    :class="rootClasses"
    @click="handleClick"
    @keydown="handleKeydown"
    @focus="handleFocus"
    @blur="handleBlur"
  >
    <span :class="indicatorClasses" v-show="checked">
      <Check :size="12" />
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed, ref, type ComponentPublicInstance } from "vue";
import { Check } from "lucide-vue-next";
import { twMerge } from "tailwind-merge";

export interface CheckboxProps {
  id?: string;
  checked?: boolean;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  value?: string;
  ariaDescribedby?: string;
  ariaLabelledby?: string;
  class?: string;
}

export interface CheckboxEmits {
  "update:checked": [checked: boolean];
  change: [checked: boolean, event: Event];
}

const props = withDefaults(defineProps<CheckboxProps>(), {
  checked: false,
  disabled: false,
  required: false,
});

const emit = defineEmits<CheckboxEmits>();

const checkboxRef = ref<ComponentPublicInstance | null>(null);

const rootClasses = computed(() => {
  return twMerge(
    "peer h-4 w-4 shrink-0 rounded-sm border border-charcoal/20 shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sage disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-sage data-[state=checked]:text-cream inline-flex items-center justify-center transition-colors",
    props.checked && "bg-sage text-cream border-sage",
    props.class
  );
});

const indicatorClasses = computed(() => {
  return twMerge("flex items-center justify-center text-current");
});

const handleClick = (event: Event) => {
  if (props.disabled) return;

  const newChecked = !props.checked;
  emit("update:checked", newChecked);
  emit("change", newChecked, event);
};

const handleKeydown = (event: KeyboardEvent) => {
  if (props.disabled) return;

  if (event.key === " " || event.key === "Enter") {
    event.preventDefault();
    handleClick(event);
  }
};

const handleFocus = () => {
  // Focus handling can be extended here if needed
};

const handleBlur = () => {
  // Blur handling can be extended here if needed
};

// Expose methods for parent components
defineExpose({
  focus: () => {
    checkboxRef.value?.$el?.focus();
  },
  blur: () => {
    checkboxRef.value?.$el?.blur();
  },
});
</script>

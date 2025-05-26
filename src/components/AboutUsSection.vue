<template>
  <ScrollAnimation type="scale" :threshold="0.3" class-name="my-custom-class">
    <div>This will scale in</div>
  </ScrollAnimation>
</template>

<script setup lang="ts">
import ScrollAnimation from "@components/ui/ScrollAnimation.vue";
</script>

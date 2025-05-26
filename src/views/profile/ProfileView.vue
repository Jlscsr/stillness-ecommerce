<template>
  <h1>ProfileView</h1>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// Mock order data
const orders = ref([
  {
    id: "WU12345678",
    date: "May 15, 2023",
    total: 149.97,
    status: "Delivered",
    items: [
      { id: 1, name: "Product 1" },
      { id: 2, name: "Product 2" },
    ],
  },
  {
    id: "WU98765432",
    date: "April 2, 2023",
    total: 89.99,
    status: "Delivered",
    items: [{ id: 3, name: "Product 3" }],
  },
]);

const editProfile = () => {
  // In a real app, this would open an edit form or navigate to an edit page
  console.log("Edit profile clicked");
};
</script>

<template>
  <div
    class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-md text-center">
      <h1 class="text-6xl font-bold text-gray-900 mb-4">404</h1>
      <h2 class="text-3xl font-extrabold text-gray-900">Page not found</h2>
      <p class="mt-4 text-lg text-gray-600">
        Sorry, we couldn't find the page you're looking for.
      </p>
      <div class="mt-8">
        <router-link
          to="/"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Go back home
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Component logic here
</script>

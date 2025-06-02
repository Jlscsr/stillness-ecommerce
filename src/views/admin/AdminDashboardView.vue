<template>
  <div class="p-6">
    <div
      class="flex flex-col md:flex-row md:items-center md:justify-between mb-6"
    >
      <h1 class="text-2xl font-light text-charcoal">Dashboard</h1>
    </div>

    <!-- KPI Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <!-- Total Users Card -->
      <div class="bg-white rounded-lg shadow-sm border border-charcoal/10">
        <div class="p-6">
          <div class="flex items-start justify-between">
            <div>
              <p class="text-sm font-medium text-charcoal/70">Total Users</p>
              <h3 class="text-2xl font-light text-charcoal mt-2">
                {{ totalUsers }}
              </h3>
            </div>
            <div class="bg-sage/10 p-3 rounded-full">
              <Users class="h-5 w-5 text-sage" />
            </div>
          </div>
        </div>
      </div>

      <!-- Total Products Card -->
      <div class="bg-white rounded-lg shadow-sm border border-charcoal/10">
        <div class="p-6">
          <div class="flex items-start justify-between">
            <div>
              <p class="text-sm font-medium text-charcoal/70">Total Products</p>
              <h3 class="text-2xl font-light text-charcoal mt-2">
                {{ totalProducts }}
              </h3>
            </div>
            <div class="bg-beige/20 p-3 rounded-full">
              <ShoppingBag class="h-5 w-5 text-beige" />
            </div>
          </div>
        </div>
      </div>

      <!-- Total Orders Card -->
      <div class="bg-white rounded-lg shadow-sm border border-charcoal/10">
        <div class="p-6">
          <div class="flex items-start justify-between">
            <div>
              <p class="text-sm font-medium text-charcoal/70">Total Orders</p>
              <h3 class="text-2xl font-light text-charcoal mt-2">
                {{ totalOrders }}
              </h3>
            </div>
            <div class="bg-dusty-blue/10 p-3 rounded-full">
              <Package class="h-5 w-5 text-dusty-blue" />
            </div>
          </div>
        </div>
      </div>

      <!-- Revenue Card -->
      <div class="bg-white rounded-lg shadow-sm border border-charcoal/10">
        <div class="p-6">
          <div class="flex items-start justify-between">
            <div>
              <p class="text-sm font-medium text-charcoal/70">Revenue</p>
              <h3 class="text-2xl font-light text-charcoal mt-2">
                ${{ revenue.toLocaleString() }}
              </h3>
            </div>
            <div class="bg-terracotta/10 p-3 rounded-full">
              <DollarSign class="h-5 w-5 text-terracotta" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <!-- Sales Chart -->
      <div class="bg-white rounded-lg shadow-sm border border-charcoal/10">
        <div class="p-6">
          <h3 class="text-lg font-medium text-charcoal">Sales Overview</h3>
          <p class="text-sm text-charcoal/70">Daily sales for the past week</p>
          <div class="h-[300px] mt-4">
            <!-- Chart placeholder until we install chart.js properly -->
            <div
              class="w-full h-full flex items-center justify-center border border-dashed border-charcoal/20 rounded-lg"
            >
              <div class="text-center">
                <p class="text-charcoal/60 mb-2">Sales Chart</p>
                <p class="text-xs text-charcoal/50">$5,400 - $10,500</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Orders Chart -->
      <div class="bg-white rounded-lg shadow-sm border border-charcoal/10">
        <div class="p-6">
          <h3 class="text-lg font-medium text-charcoal">Order Activity</h3>
          <p class="text-sm text-charcoal/70">Daily orders for the past week</p>
          <div class="h-[300px] mt-4">
            <!-- Chart placeholder until we install chart.js properly -->
            <div
              class="w-full h-full flex items-center justify-center border border-dashed border-charcoal/20 rounded-lg"
            >
              <div class="text-center">
                <p class="text-charcoal/60 mb-2">Orders Chart</p>
                <p class="text-xs text-charcoal/50">12 - 28 orders</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from "vue";
import { Users, ShoppingBag, Package, DollarSign } from "lucide-vue-next";

import { useProductStore } from "@/stores/product.store";
import { useAdminStore } from "@/stores/admin.store";

const adminStore = useAdminStore();
const productStore = useProductStore();

// State for dashboard
const totalUsers = computed(() => adminStore.dashboardData.totalUsers || 0);
const totalProducts = computed(() => {
  return productStore.products.length || 0;
});
const totalOrders = computed(() => adminStore.dashboardData.totalOrders || 0);
const revenue = computed(() => {
  return adminStore.dashboardData.totalRevenue || 0;
});

onMounted(() => {});
</script>

<style scoped>
/* Add any component-specific styles here */
</style>

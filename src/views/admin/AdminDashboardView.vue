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

    <!-- Recent Activity Section -->
    <div class="bg-white rounded-lg shadow-sm border border-charcoal/10">
      <div class="p-6">
        <h3 class="text-lg font-medium text-charcoal">Recent Activity</h3>
        <p class="text-sm text-charcoal/70 mb-4">
          Latest updates from your store
        </p>
        <div class="space-y-6">
          <div class="flex items-start">
            <div class="bg-sage/10 p-2 rounded-full mr-4">
              <Users class="h-4 w-4 text-sage" />
            </div>
            <div>
              <p class="text-sm font-medium text-charcoal">
                New user registered
              </p>
              <p class="text-xs text-charcoal/60 mt-1">
                Akiko Tanaka just created an account
              </p>
              <p class="text-xs text-charcoal/60 mt-1">23 minutes ago</p>
            </div>
          </div>

          <div class="flex items-start">
            <div class="bg-dusty-blue/10 p-2 rounded-full mr-4">
              <Package class="h-4 w-4 text-dusty-blue" />
            </div>
            <div>
              <p class="text-sm font-medium text-charcoal">New order placed</p>
              <p class="text-xs text-charcoal/60 mt-1">
                Order #JP-123456 for $89.00
              </p>
              <p class="text-xs text-charcoal/60 mt-1">1 hour ago</p>
            </div>
          </div>

          <div class="flex items-start">
            <div class="bg-beige/20 p-2 rounded-full mr-4">
              <ShoppingBag class="h-4 w-4 text-beige" />
            </div>
            <div>
              <p class="text-sm font-medium text-charcoal">
                Product added to inventory
              </p>
              <p class="text-xs text-charcoal/60 mt-1">
                Linen Throw Blanket (10 units)
              </p>
              <p class="text-xs text-charcoal/60 mt-1">3 hours ago</p>
            </div>
          </div>

          <div class="flex items-start">
            <div class="bg-terracotta/10 p-2 rounded-full mr-4">
              <DollarSign class="h-4 w-4 text-terracotta" />
            </div>
            <div>
              <p class="text-sm font-medium text-charcoal">Payment received</p>
              <p class="text-xs text-charcoal/60 mt-1">
                Payment of $133.00 for Order #JP-876543
              </p>
              <p class="text-xs text-charcoal/60 mt-1">5 hours ago</p>
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
  return productStore.products.length || 0; // Assuming products are loaded in the product store
});
const totalOrders = computed(() => adminStore.dashboardData.totalOrders || 0);
const revenue = computed(() => {
  return adminStore.dashboardData.totalRevenue || 0;
});

// We'll add chart configuration later when we install chart.js

onMounted(() => {});
</script>

<style scoped>
/* Add any component-specific styles here */
</style>

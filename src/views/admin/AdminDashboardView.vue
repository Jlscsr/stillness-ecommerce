<template>
  <div class="p-6">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
      <h1 class="text-2xl font-light text-charcoal">Dashboard</h1>
      <div class="flex items-center mt-2 md:mt-0">
        <CalendarRange class="h-5 w-5 text-charcoal/70 mr-2" />
        <span class="text-sm text-charcoal/70">Last 7 days</span>
      </div>
    </div>

    <!-- KPI Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <!-- Total Users Card -->
      <div class="bg-white rounded-lg shadow-sm border border-charcoal/10">
        <div class="p-6">
          <div class="flex items-start justify-between">
            <div>
              <p class="text-sm font-medium text-charcoal/70">Total Users</p>
              <h3 class="text-2xl font-light text-charcoal mt-2">{{ totalUsers }}</h3>
              <div class="flex items-center mt-1">
                <span class="text-xs font-medium text-sage flex items-center">
                  <ArrowUpRight class="h-3 w-3 mr-1" />
                  +12%
                </span>
                <span class="text-xs text-charcoal/60 ml-2">vs last week</span>
              </div>
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
              <h3 class="text-2xl font-light text-charcoal mt-2">{{ totalProducts }}</h3>
              <div class="flex items-center mt-1">
                <span class="text-xs font-medium text-sage flex items-center">
                  <ArrowUpRight class="h-3 w-3 mr-1" />
                  +5%
                </span>
                <span class="text-xs text-charcoal/60 ml-2">vs last week</span>
              </div>
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
              <h3 class="text-2xl font-light text-charcoal mt-2">{{ totalOrders }}</h3>
              <div class="flex items-center mt-1">
                <span class="text-xs font-medium text-sage flex items-center">
                  <ArrowUpRight class="h-3 w-3 mr-1" />
                  +18%
                </span>
                <span class="text-xs text-charcoal/60 ml-2">vs last week</span>
              </div>
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
              <div class="flex items-center mt-1">
                <span
                  class="text-xs font-medium text-terracotta flex items-center"
                >
                  <ArrowDownRight class="h-3 w-3 mr-1" />
                  -3%
                </span>
                <span class="text-xs text-charcoal/60 ml-2">vs last week</span>
              </div>
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
            <div class="w-full h-full flex items-center justify-center border border-dashed border-charcoal/20 rounded-lg">
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
            <div class="w-full h-full flex items-center justify-center border border-dashed border-charcoal/20 rounded-lg">
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
        <p class="text-sm text-charcoal/70 mb-4">Latest updates from your store</p>
        <div class="space-y-6">
          <div class="flex items-start">
            <div class="bg-sage/10 p-2 rounded-full mr-4">
              <Users class="h-4 w-4 text-sage" />
            </div>
            <div>
              <p class="text-sm font-medium text-charcoal">New user registered</p>
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
import { ref, onMounted } from 'vue';
import {
  Users,
  ShoppingBag,
  Package,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  CalendarRange
} from 'lucide-vue-next';

// Mock data for admin dashboard
const salesData = [
  { date: '2023-05-01', value: 5400 },
  { date: '2023-05-02', value: 7600 },
  { date: '2023-05-03', value: 6200 },
  { date: '2023-05-04', value: 8100 },
  { date: '2023-05-05', value: 7200 },
  { date: '2023-05-06', value: 9000 },
  { date: '2023-05-07', value: 10500 },
];

const ordersData = [
  { date: '2023-05-01', value: 12 },
  { date: '2023-05-02', value: 18 },
  { date: '2023-05-03', value: 14 },
  { date: '2023-05-04', value: 20 },
  { date: '2023-05-05', value: 17 },
  { date: '2023-05-06', value: 22 },
  { date: '2023-05-07', value: 28 },
];

// State for dashboard
const totalUsers = ref(145);
const totalProducts = ref(0);
const totalOrders = ref(348);
const revenue = ref(42850);

// We'll add chart configuration later when we install chart.js

onMounted(() => {
  // Simulate fetching product data
  // In a real app, you would call an API here
  totalProducts.value = 72; // Example value, replace with actual API call
});
</script>

<style scoped>
/* Add any component-specific styles here */
</style>

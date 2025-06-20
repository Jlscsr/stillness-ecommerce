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
            <SalesChart :chart-data="salesChartData" />
          </div>
        </div>
      </div>

      <!-- Orders Chart -->
      <div class="bg-white rounded-lg shadow-sm border border-charcoal/10">
        <div class="p-6">
          <h3 class="text-lg font-medium text-charcoal">Order Activity</h3>
          <p class="text-sm text-charcoal/70">Daily orders for the past week</p>
          <div class="h-[300px] mt-4">
            <OrdersChart :chart-data="ordersChartData" />
          </div>
        </div>
      </div>
    </div>

    <!-- Additional Charts -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <!-- Order Status Distribution -->
      <div class="bg-white rounded-lg shadow-sm border border-charcoal/10">
        <div class="p-6">
          <h3 class="text-lg font-medium text-charcoal">
            Order Status Distribution
          </h3>
          <p class="text-sm text-charcoal/70">Current order statuses</p>
          <div class="h-[300px] mt-4">
            <OrderStatusChart :chart-data="orderStatusChartData" />
          </div>
        </div>
      </div>

      <!-- Revenue by Month -->
      <div class="bg-white rounded-lg shadow-sm border border-charcoal/10">
        <div class="p-6">
          <h3 class="text-lg font-medium text-charcoal">Monthly Revenue</h3>
          <p class="text-sm text-charcoal/70">Revenue trend over time</p>
          <div class="h-[300px] mt-4">
            <MonthlyRevenueChart :chart-data="monthlyRevenueChartData" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { Users, ShoppingBag, Package, DollarSign } from "lucide-vue-next";

import { useProductStore } from "@/stores/product.store";
import { useAdminStore } from "@/stores/admin.store";

// Import chart components
import SalesChart from "@/components/charts/SalesChart.vue";
import OrdersChart from "@/components/charts/OrdersChart.vue";
import OrderStatusChart from "@/components/charts/OrderStatusChart.vue";
import MonthlyRevenueChart from "@/components/charts/MontlyRevenueChart.vue";

const adminStore = useAdminStore();
const productStore = useProductStore();

// Initialize data
onMounted(async () => {
  await adminStore.fetchOrders();
  await adminStore.fetchUsers();
});

// State for dashboard
const totalUsers = computed(() => adminStore.dashboardData.totalUsers || 0);
const totalProducts = computed(() => {
  return productStore.products.length || 0;
});
const totalOrders = computed(() => adminStore.dashboardData.totalOrders || 0);
const revenue = computed(() => {
  return adminStore.dashboardData.totalRevenue || 0;
});

// Chart data computations
const salesChartData = computed(() => {
  const last7Days = getLast7Days();
  const dailySales = last7Days.map((date) => {
    const dayOrders = adminStore.orders.filter((order) => {
      const orderDate = new Date(order.createdAt).toDateString();
      return (
        orderDate === date.toDateString() && order.paymentStatus === "paid"
      );
    });

    const dailyRevenue = dayOrders.reduce(
      (sum, order) => sum + order.totalAmount,
      0
    );
    return {
      date: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      revenue: dailyRevenue,
    };
  });

  return {
    labels: dailySales.map((item) => item.date),
    datasets: [
      {
        label: "Daily Sales",
        data: dailySales.map((item) => item.revenue),
        borderColor: "#8B7355", // sage color
        backgroundColor: "rgba(139, 115, 85, 0.1)",
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "#8B7355",
        pointBorderColor: "#8B7355",
        pointHoverBackgroundColor: "#8B7355",
        pointHoverBorderColor: "#8B7355",
      },
    ],
  };
});

const ordersChartData = computed(() => {
  const last7Days = getLast7Days();
  const dailyOrders = last7Days.map((date) => {
    const dayOrderCount = adminStore.orders.filter((order) => {
      const orderDate = new Date(order.createdAt).toDateString();
      return orderDate === date.toDateString();
    }).length;

    return {
      date: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      count: dayOrderCount,
    };
  });

  return {
    labels: dailyOrders.map((item) => item.date),
    datasets: [
      {
        label: "Daily Orders",
        data: dailyOrders.map((item) => item.count),
        backgroundColor: "#A8B5C8", // dusty-blue color
        borderColor: "#A8B5C8",
        borderWidth: 1,
        borderRadius: 4,
        borderSkipped: false,
      },
    ],
  };
});

const orderStatusChartData = computed(() => {
  const statusCounts = adminStore.orders.reduce((acc, order) => {
    acc[order.orderStatus] = (acc[order.orderStatus] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const colors = {
    pending: "#F4A261",
    confirmed: "#2A9D8F",
    processing: "#E76F51",
    shipped: "#E9C46A",
    delivered: "#264653",
    cancelled: "#E63946",
  };

  return {
    labels: Object.keys(statusCounts).map(
      (status) => status.charAt(0).toUpperCase() + status.slice(1)
    ),
    datasets: [
      {
        data: Object.values(statusCounts),
        backgroundColor: Object.keys(statusCounts).map(
          (status) => colors[status as keyof typeof colors] || "#8B7355"
        ),
        borderWidth: 0,
        hoverOffset: 4,
      },
    ],
  };
});

const monthlyRevenueChartData = computed(() => {
  const last6Months = getLast6Months();
  const monthlyRevenue = last6Months.map((date) => {
    const monthOrders = adminStore.orders.filter((order) => {
      const orderDate = new Date(order.createdAt);
      return (
        orderDate.getMonth() === date.getMonth() &&
        orderDate.getFullYear() === date.getFullYear() &&
        order.paymentStatus === "paid"
      );
    });

    const monthlyTotal = monthOrders.reduce(
      (sum, order) => sum + order.totalAmount,
      0
    );
    return {
      month: date.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      }),
      revenue: monthlyTotal,
    };
  });

  return {
    labels: monthlyRevenue.map((item) => item.month),
    datasets: [
      {
        label: "Monthly Revenue",
        data: monthlyRevenue.map((item) => item.revenue),
        backgroundColor: "#D4A574", // terracotta color
        borderColor: "#D4A574",
        borderWidth: 2,
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  };
});

// Helper functions
function getLast7Days(): Date[] {
  const dates = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dates.push(date);
  }
  return dates;
}

function getLast6Months(): Date[] {
  const dates = [];
  for (let i = 5; i >= 0; i--) {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    dates.push(date);
  }
  return dates;
}
</script>

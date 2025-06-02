<template>
  <div class="p-6">
    <h1 class="text-2xl font-light text-charcoal mb-6">Order History</h1>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div class="bg-white rounded-lg shadow-sm border border-charcoal/10">
        <div class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-charcoal/70">Total Orders</p>
              <h3 class="text-2xl font-light text-charcoal mt-1">
                {{ filteredOrders.length }}
              </h3>
            </div>
            <div class="bg-beige/20 p-2 rounded-full">
              <Calendar class="h-5 w-5 text-beige" />
            </div>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-lg shadow-sm border border-charcoal/10">
        <div class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-charcoal/70">Total Sales</p>
              <h3 class="text-2xl font-light text-charcoal mt-1">
                {{ formatCurrency(totalSales) }}
              </h3>
            </div>
            <div class="bg-sage/10 p-2 rounded-full">
              <Calendar class="h-5 w-5 text-sage" />
            </div>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-lg shadow-sm border border-charcoal/10">
        <div class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-charcoal/70">Average Order</p>
              <h3 class="text-2xl font-light text-charcoal mt-1">
                {{ formatCurrency(averageOrderValue) }}
              </h3>
            </div>
            <div class="bg-dusty-blue/10 p-2 rounded-full">
              <Calendar class="h-5 w-5 text-dusty-blue" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-sm border border-charcoal/10 mb-6">
      <div class="p-6 pb-2">
        <h3 class="text-lg font-medium text-charcoal">Order Records</h3>
      </div>
      <div class="p-6">
        <!-- Filter Controls -->
        <div class="flex flex-col sm:flex-row gap-4 mb-6">
          <div class="relative flex-1">
            <Search
              class="absolute left-2.5 top-2.5 h-4 w-4 text-charcoal/50"
            />
            <input
              type="text"
              placeholder="Search orders..."
              v-model="searchQuery"
              class="w-full py-2 px-4 pl-9 border border-charcoal/20 rounded-md focus:outline-none focus:ring-1 focus:ring-sage focus:border-sage"
            />
          </div>
          <div class="flex gap-2">
            <div class="relative">
              <button
                @click="toggleDateDropdown"
                class="flex items-center justify-between px-4 py-2 w-[150px] border border-charcoal/20 rounded-md text-charcoal hover:bg-cream"
              >
                <Calendar class="h-4 w-4 mr-2" />
                {{ getPeriodDisplayName(selectedPeriod) }}
                <ChevronDown class="h-4 w-4 opacity-50" />
              </button>
              <div
                v-if="showDateDropdown"
                class="absolute right-0 z-10 mt-1 w-[150px] rounded-md bg-white shadow-lg border border-charcoal/10"
              >
                <div class="py-1">
                  <button
                    @click="filterByDateRange('all')"
                    class="w-full flex items-center text-left px-4 py-2 text-sm text-charcoal hover:bg-cream"
                  >
                    All Time
                  </button>
                  <button
                    @click="filterByDateRange('last7days')"
                    class="w-full flex items-center text-left px-4 py-2 text-sm text-charcoal hover:bg-cream"
                  >
                    Last 7 Days
                  </button>
                  <button
                    @click="filterByDateRange('last30days')"
                    class="w-full flex items-center text-left px-4 py-2 text-sm text-charcoal hover:bg-cream"
                  >
                    Last 30 Days
                  </button>
                  <button
                    @click="filterByDateRange('last3months')"
                    class="w-full flex items-center text-left px-4 py-2 text-sm text-charcoal hover:bg-cream"
                  >
                    Last 3 Months
                  </button>
                  <button
                    @click="filterByDateRange('last6months')"
                    class="w-full flex items-center text-left px-4 py-2 text-sm text-charcoal hover:bg-cream"
                  >
                    Last 6 Months
                  </button>
                  <button
                    @click="filterByDateRange('lastyear')"
                    class="w-full flex items-center text-left px-4 py-2 text-sm text-charcoal hover:bg-cream"
                  >
                    Last Year
                  </button>
                </div>
              </div>
            </div>

            <button
              class="flex items-center px-4 py-2 border border-charcoal/20 rounded-md text-charcoal hover:bg-cream"
            >
              <Download class="h-4 w-4 mr-2" />
              Export
            </button>
          </div>
        </div>

        <!-- Orders Table -->
        <div class="rounded-md border overflow-hidden">
          <table class="min-w-full divide-y divide-charcoal/10">
            <thead class="bg-cream">
              <tr>
                <th
                  @click="handleSort('id')"
                  class="px-4 py-3 text-left text-xs font-medium text-charcoal/70 uppercase tracking-wider cursor-pointer"
                >
                  <div class="flex items-center">
                    Order ID
                    <ArrowUpDown class="ml-2 h-4 w-4" />
                  </div>
                </th>
                <th
                  @click="handleSort('date')"
                  class="px-4 py-3 text-left text-xs font-medium text-charcoal/70 uppercase tracking-wider cursor-pointer"
                >
                  <div class="flex items-center">
                    Date
                    <ArrowUpDown class="ml-2 h-4 w-4" />
                  </div>
                </th>
                <th
                  @click="handleSort('customerName')"
                  class="px-4 py-3 text-left text-xs font-medium text-charcoal/70 uppercase tracking-wider cursor-pointer"
                >
                  <div class="flex items-center">
                    Customer
                    <ArrowUpDown class="ml-2 h-4 w-4" />
                  </div>
                </th>
                <th
                  @click="handleSort('total')"
                  class="px-4 py-3 text-left text-xs font-medium text-charcoal/70 uppercase tracking-wider cursor-pointer"
                >
                  <div class="flex items-center">
                    Total
                    <ArrowUpDown class="ml-2 h-4 w-4" />
                  </div>
                </th>
                <th
                  class="px-4 py-3 text-left text-xs font-medium text-charcoal/70 uppercase tracking-wider"
                >
                  Payment
                </th>
                <th
                  class="px-4 py-3 text-left text-xs font-medium text-charcoal/70 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  class="px-4 py-3 text-left text-xs font-medium text-charcoal/70 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-charcoal/10">
              <tr v-if="filteredOrders.length === 0">
                <td colspan="7" class="text-center py-10 text-charcoal/70">
                  No orders found
                </td>
              </tr>
              <tr
                v-for="order in filteredOrders"
                :key="order.id"
                class="hover:bg-cream/50"
              >
                <td class="px-4 py-4 whitespace-nowrap font-medium">
                  {{ order.id }}
                </td>
                <td class="px-4 py-4 whitespace-nowrap">
                  {{ formatDate(order.date) }}
                </td>
                <td class="px-4 py-4 whitespace-nowrap">
                  <div class="font-medium">{{ order.customerName }}</div>
                  <div class="text-xs text-charcoal/60">
                    {{ order.customerEmail }}
                  </div>
                </td>
                <td class="px-4 py-4 whitespace-nowrap">
                  ${{ order.total.toFixed(2) }}
                </td>
                <td class="px-4 py-4 whitespace-nowrap">
                  <span
                    class="inline-flex items-center px-2 py-1 rounded-full border border-charcoal/20 text-xs capitalize"
                  >
                    {{ order.paymentMethod.replace("_", " ") }}
                  </span>
                </td>
                <td class="px-4 py-4 whitespace-nowrap">
                  <span
                    :class="[
                      'inline-flex items-center px-2 py-1 rounded-full text-xs capitalize',
                      order.status === 'delivered'
                        ? 'bg-sage/10 text-sage'
                        : 'bg-terracotta/10 text-terracotta',
                    ]"
                  >
                    {{ order.status }}
                  </span>
                </td>
                <td class="px-4 py-4 whitespace-nowrap">
                  <div class="relative">
                    <button
                      @click="toggleActionDropdown(order.id)"
                      class="h-8 w-8 p-0 rounded-full hover:bg-cream flex items-center justify-center"
                    >
                      <span class="sr-only">Open menu</span>
                      <MoreHorizontal class="h-4 w-4" />
                    </button>
                    <div
                      v-if="activeActionDropdown === order.id"
                      class="absolute left-0 z-10 mt-1 w-[160px] rounded-md bg-white shadow-lg border border-charcoal/10"
                    >
                      <div class="py-1">
                        <button
                          class="w-full flex items-center text-left px-4 py-2 text-sm text-charcoal hover:bg-cream"
                        >
                          View Details
                        </button>
                        <button
                          class="w-full flex items-center text-left px-4 py-2 text-sm text-charcoal hover:bg-cream"
                        >
                          <Download class="h-4 w-4 mr-2" />
                          Download Invoice
                        </button>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination or load more -->
        <div
          v-if="orders.length > filteredOrders.length"
          class="mt-4 text-center"
        >
          <p class="text-sm text-charcoal/60">
            Showing {{ filteredOrders.length }} of {{ orders.length }} orders
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, onUnmounted } from "vue";
import {
  Search,
  ArrowUpDown,
  ChevronDown,
  MoreHorizontal,
  Download,
  Calendar,
} from "lucide-vue-next";

// Types
type OrderStatus = "delivered" | "cancelled";
type PaymentMethod = "credit_card" | "paypal" | "bank_transfer";

interface Order {
  id: string;
  date: string;
  customerName: string;
  customerEmail: string;
  total: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  items: Array<{ id: string; name: string; quantity: number; price: number }>;
}

// State
const orders = ref<Order[]>([]);
const filteredOrders = ref<Order[]>([]);
const searchQuery = ref("");
const sortField = ref<keyof Order>("date");
const sortDirection = ref<"asc" | "desc">("desc");
const selectedPeriod = ref<string>("all");

// UI state
const showDateDropdown = ref(false);
const activeActionDropdown = ref<string | null>(null);

// Computed values
const totalSales = computed(() =>
  filteredOrders.value
    .filter((o) => o.status === "delivered")
    .reduce((sum, order) => sum + order.total, 0)
);

const averageOrderValue = computed(() => {
  const deliveredOrders = filteredOrders.value.filter(
    (o) => o.status === "delivered"
  );
  return deliveredOrders.length ? totalSales.value / deliveredOrders.length : 0;
});

// Toggle dropdown visibility
const toggleDateDropdown = () => {
  showDateDropdown.value = !showDateDropdown.value;
  activeActionDropdown.value = null;
};

const toggleActionDropdown = (orderId: string) => {
  if (activeActionDropdown.value === orderId) {
    activeActionDropdown.value = null;
  } else {
    activeActionDropdown.value = orderId;
  }
  showDateDropdown.value = false;
};

// Close dropdowns when clicking outside
const closeDropdowns = () => {
  showDateDropdown.value = false;
  activeActionDropdown.value = null;
};

// Event listener for closing dropdowns when clicking outside
onMounted(() => {
  document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    if (!target.closest(".relative")) {
      closeDropdowns();
    }
  });

  // Load initial data
  loadHistoricalOrders();
});

// Cleanup listeners
onUnmounted(() => {
  document.removeEventListener("click", closeDropdowns);
});

// Format date
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString();
};

// Format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

// Get period display name
const getPeriodDisplayName = (period: string) => {
  switch (period) {
    case "last7days":
      return "Last 7 Days";
    case "last30days":
      return "Last 30 Days";
    case "last3months":
      return "Last 3 Months";
    case "last6months":
      return "Last 6 Months";
    case "lastyear":
      return "Last Year";
    default:
      return "All Time";
  }
};

// Handle sorting
const handleSort = (field: keyof Order) => {
  if (field === sortField.value) {
    sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
  } else {
    sortField.value = field;
    sortDirection.value = "desc";
  }
};

// Filter by date range
const filterByDateRange = (period: string) => {
  selectedPeriod.value = period;
  showDateDropdown.value = false;

  const now = new Date();
  let startDate = new Date();

  switch (period) {
    case "last7days":
      startDate.setDate(now.getDate() - 7);
      break;
    case "last30days":
      startDate.setDate(now.getDate() - 30);
      break;
    case "last3months":
      startDate.setMonth(now.getMonth() - 3);
      break;
    case "last6months":
      startDate.setMonth(now.getMonth() - 6);
      break;
    case "lastyear":
      startDate.setFullYear(now.getFullYear() - 1);
      break;
    default:
      // 'all' - no date filtering
      startDate = new Date(0); // Beginning of time
  }

  if (period === "all") {
    filteredOrders.value = orders.value.slice(0, 100); // Limit to 100 for performance
  } else {
    const filteredByDate = orders.value.filter(
      (order) =>
        new Date(order.date) >= startDate && new Date(order.date) <= now
    );
    filteredOrders.value = filteredByDate;
  }
};

// Load historical orders (simulated)
const loadHistoricalOrders = () => {
  // Mock data - in a real app, this would be an API call
  orders.value = [
    {
      id: "ORD-1001",
      date: "2025-05-10T14:30:00Z",
      customerName: "John Doe",
      customerEmail: "john.doe@example.com",
      total: 129.99,
      status: "delivered",
      paymentMethod: "credit_card",
      items: [
        { id: "prod-001", name: "Ceramic Tea Set", quantity: 1, price: 89.99 },
        {
          id: "prod-003",
          name: "Matcha Tea Powder",
          quantity: 1,
          price: 28.99,
        },
      ],
    },
    {
      id: "ORD-1002",
      date: "2025-05-08T09:15:00Z",
      customerName: "Jane Smith",
      customerEmail: "jane.smith@example.com",
      total: 79.99,
      status: "delivered",
      paymentMethod: "paypal",
      items: [
        {
          id: "prod-004",
          name: "Linen Kimono Robe",
          quantity: 1,
          price: 79.99,
        },
      ],
    },
    {
      id: "ORD-1003",
      date: "2025-05-01T11:45:00Z",
      customerName: "Robert Johnson",
      customerEmail: "robert.j@example.com",
      total: 43.49,
      status: "delivered",
      paymentMethod: "credit_card",
      items: [
        {
          id: "prod-005",
          name: "Bamboo Incense Holder",
          quantity: 1,
          price: 24.5,
        },
        {
          id: "prod-006",
          name: "Aromatic Bath Salts",
          quantity: 1,
          price: 18.99,
        },
      ],
    },
    {
      id: "ORD-1004",
      date: "2025-04-25T09:45:00Z",
      customerName: "Emily Davis",
      customerEmail: "emily.d@example.com",
      total: 35.5,
      status: "delivered",
      paymentMethod: "credit_card",
      items: [
        {
          id: "prod-002",
          name: "Linen Pillow Covers",
          quantity: 1,
          price: 35.5,
        },
      ],
    },
    {
      id: "ORD-1005",
      date: "2025-04-24T16:20:00Z",
      customerName: "Michael Wilson",
      customerEmail: "michael.w@example.com",
      total: 89.99,
      status: "cancelled",
      paymentMethod: "bank_transfer",
      items: [
        { id: "prod-001", name: "Ceramic Tea Set", quantity: 1, price: 89.99 },
      ],
    },
    {
      id: "ORD-1006",
      date: "2025-04-18T10:30:00Z",
      customerName: "Sarah Johnson",
      customerEmail: "sarah.j@example.com",
      total: 159.97,
      status: "delivered",
      paymentMethod: "credit_card",
      items: [
        {
          id: "prod-004",
          name: "Linen Kimono Robe",
          quantity: 1,
          price: 79.99,
        },
        {
          id: "prod-007",
          name: "Meditation Cushion",
          quantity: 1,
          price: 79.98,
        },
      ],
    },
    {
      id: "ORD-1007",
      date: "2025-04-10T14:15:00Z",
      customerName: "David Brown",
      customerEmail: "david.b@example.com",
      total: 128.99,
      status: "cancelled",
      paymentMethod: "paypal",
      items: [
        {
          id: "prod-008",
          name: "Japanese Sake Set",
          quantity: 1,
          price: 128.99,
        },
      ],
    },
  ];

  // Filter only completed or cancelled orders (default behavior)
  const historicalOrders = orders.value.filter(
    (order) => order.status === "delivered" || order.status === "cancelled"
  );

  filteredOrders.value = historicalOrders;
};

// Filter and sort orders when query changes
watch([searchQuery, sortField, sortDirection], () => {
  let result = [...filteredOrders.value];

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(
      (order) =>
        order.id.toLowerCase().includes(query) ||
        order.customerName.toLowerCase().includes(query) ||
        order.customerEmail.toLowerCase().includes(query)
    );
  }

  // Sort results
  result = result.sort((a, b) => {
    if (sortField.value === "date") {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortDirection.value === "asc" ? dateA - dateB : dateB - dateA;
    }

    if (sortField.value === "total") {
      return sortDirection.value === "asc"
        ? a.total - b.total
        : b.total - a.total;
    }

    const aValue = a[sortField.value];
    const bValue = b[sortField.value];

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection.value === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return 0;
  });

  filteredOrders.value = result;
});
</script>

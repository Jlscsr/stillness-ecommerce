<template>
  <div class="p-6">
    <h1 class="text-2xl font-light text-charcoal mb-6">Order Management</h1>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      <div class="bg-white rounded-lg shadow-sm border border-charcoal/10 bg-charcoal/5">
        <div class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-charcoal/70">All Orders</p>
              <h3 class="text-2xl font-light text-charcoal mt-1">{{ orders.length }}</h3>
            </div>
            <div class="bg-charcoal/10 p-2 rounded-full">
              <Package class="h-5 w-5 text-charcoal/70" />
            </div>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-lg shadow-sm border border-charcoal/10 bg-dusty-blue/5">
        <div class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-charcoal/70">Processing</p>
              <h3 class="text-2xl font-light text-charcoal mt-1">
                {{ processingCount }}
              </h3>
            </div>
            <div class="bg-dusty-blue/10 p-2 rounded-full">
              <Clock class="h-5 w-5 text-dusty-blue" />
            </div>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-lg shadow-sm border border-charcoal/10 bg-sage/5">
        <div class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-charcoal/70">Delivered</p>
              <h3 class="text-2xl font-light text-charcoal mt-1">
                {{ deliveredCount }}
              </h3>
            </div>
            <div class="bg-sage/10 p-2 rounded-full">
              <CheckCircle class="h-5 w-5 text-sage" />
            </div>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-lg shadow-sm border border-charcoal/10 bg-terracotta/5">
        <div class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-charcoal/70">Cancelled</p>
              <h3 class="text-2xl font-light text-charcoal mt-1">
                {{ cancelledCount }}
              </h3>
            </div>
            <div class="bg-terracotta/10 p-2 rounded-full">
              <XCircle class="h-5 w-5 text-terracotta" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-sm border border-charcoal/10 mb-6">
      <div class="p-6 pb-2">
        <h3 class="text-lg font-medium text-charcoal">Active Orders</h3>
      </div>
      <div class="p-6">
        <!-- Filter Controls -->
        <div class="flex flex-col sm:flex-row gap-4 mb-6">
          <div class="relative flex-1">
            <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-charcoal/50" />
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
                @click="toggleStatusDropdown"
                class="flex items-center justify-between px-4 py-2 w-[160px] border border-charcoal/20 rounded-md text-charcoal hover:bg-cream"
              >
                <div class="flex items-center">
                  <Filter class="h-4 w-4 mr-2" />
                  <template v-if="selectedStatus === 'all'">
                    All Statuses
                  </template>
                  <span v-else class="flex items-center">
                    <component :is="getStatusIcon(selectedStatus)" class="h-3 w-3 mr-1" />
                    <span class="capitalize">{{ selectedStatus }}</span>
                  </span>
                </div>
                <ChevronDown class="h-4 w-4 opacity-50" />
              </button>
              <div
                v-if="showStatusDropdown"
                class="absolute right-0 z-10 mt-1 w-[160px] rounded-md bg-white shadow-lg border border-charcoal/10"
              >
                <div class="py-1">
                  <button
                    @click="selectStatus('all')"
                    class="w-full flex items-center text-left px-4 py-2 text-sm text-charcoal hover:bg-cream"
                  >
                    All Statuses
                  </button>
                  <button
                    @click="selectStatus('pending')"
                    class="w-full flex items-center text-left px-4 py-2 text-sm text-charcoal hover:bg-cream"
                  >
                    <Clock class="h-4 w-4 mr-2" />
                    Pending
                  </button>
                  <button
                    @click="selectStatus('processing')"
                    class="w-full flex items-center text-left px-4 py-2 text-sm text-charcoal hover:bg-cream"
                  >
                    <Package class="h-4 w-4 mr-2" />
                    Processing
                  </button>
                  <button
                    @click="selectStatus('shipped')"
                    class="w-full flex items-center text-left px-4 py-2 text-sm text-charcoal hover:bg-cream"
                  >
                    <Truck class="h-4 w-4 mr-2" />
                    Shipped
                  </button>
                  <button
                    @click="selectStatus('delivered')"
                    class="w-full flex items-center text-left px-4 py-2 text-sm text-charcoal hover:bg-cream"
                  >
                    <CheckCircle class="h-4 w-4 mr-2" />
                    Delivered
                  </button>
                  <button
                    @click="selectStatus('cancelled')"
                    class="w-full flex items-center text-left px-4 py-2 text-sm text-charcoal hover:bg-cream"
                  >
                    <XCircle class="h-4 w-4 mr-2" />
                    Cancelled
                  </button>
                </div>
              </div>
            </div>
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
                <th class="px-4 py-3 text-left text-xs font-medium text-charcoal/70 uppercase tracking-wider">Payment</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-charcoal/70 uppercase tracking-wider">Status</th>
                <th class="px-4 py-3 text-right text-xs font-medium text-charcoal/70 uppercase tracking-wider">Actions</th>
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
                <td class="px-4 py-4 whitespace-nowrap font-medium">{{ order.id }}</td>
                <td class="px-4 py-4 whitespace-nowrap">{{ formatDate(order.date) }}</td>
                <td class="px-4 py-4 whitespace-nowrap">
                  <div class="font-medium">{{ order.customerName }}</div>
                  <div class="text-xs text-charcoal/60">{{ order.customerEmail }}</div>
                </td>
                <td class="px-4 py-4 whitespace-nowrap">${{ order.total.toFixed(2) }}</td>
                <td class="px-4 py-4 whitespace-nowrap">
                  <span class="inline-flex items-center px-2 py-1 rounded-full border border-charcoal/20 text-xs capitalize">
                    {{ order.paymentMethod.replace("_", " ") }}
                  </span>
                </td>
                <td class="px-4 py-4 whitespace-nowrap">
                  <span
                    :class="[
                      'inline-flex items-center px-2 py-1 rounded-full text-xs capitalize',
                      getStatusColor(order.status)
                    ]"
                  >
                    <component :is="getStatusIcon(order.status)" class="h-3 w-3 mr-1" />
                    {{ order.status }}
                  </span>
                </td>
                <td class="px-4 py-4 whitespace-nowrap text-right">
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
                      class="absolute right-0 z-10 mt-1 w-[160px] rounded-md bg-white shadow-lg border border-charcoal/10"
                    >
                      <div class="py-1">
                        <button
                          class="w-full flex items-center text-left px-4 py-2 text-sm text-charcoal hover:bg-cream"
                        >
                          View Details
                        </button>
                        <button
                          @click="openUpdateDialog(order)"
                          class="w-full flex items-center text-left px-4 py-2 text-sm text-charcoal hover:bg-cream"
                        >
                          Update Status
                        </button>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Status Update Dialog -->
    <div v-if="updateDialogOpen" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 transition-opacity" @click="updateDialogOpen = false">
          <div class="absolute inset-0 bg-charcoal/30"></div>
        </div>

        <!-- Dialog Panel -->
        <div
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        >
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 class="text-lg leading-6 font-medium text-charcoal">Update Order Status</h3>
                <p class="text-sm text-charcoal/70 mt-1">
                  Change the status for order {{ orderToUpdate?.id }}
                </p>
              </div>
            </div>

            <div v-if="orderToUpdate" class="mt-4 space-y-4">
              <div>
                <p class="text-sm font-medium text-charcoal mb-2">Order Details</p>
                <div class="bg-cream p-3 rounded-sm text-sm">
                  <p>
                    <span class="text-charcoal/60">Customer:</span> {{ orderToUpdate.customerName }}
                  </p>
                  <p>
                    <span class="text-charcoal/60">Total:</span> ${{ orderToUpdate.total.toFixed(2) }}
                  </p>
                  <p>
                    <span class="text-charcoal/60">Date:</span> {{ formatDate(orderToUpdate.date) }}
                  </p>
                </div>
              </div>

              <div class="space-y-2">
                <label class="text-sm font-medium text-charcoal">Status</label>
                <div class="relative">
                  <select
                    v-model="newStatus"
                    class="w-full p-2 border border-charcoal/20 rounded-md focus:outline-none focus:ring-1 focus:ring-sage focus:border-sage appearance-none"
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <ChevronDown class="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 pointer-events-none text-charcoal/50" />
                </div>
              </div>

              <div v-if="newStatus === 'shipped' && !orderToUpdate.trackingNumber" class="space-y-2">
                <label class="text-sm font-medium text-charcoal">Tracking Number</label>
                <input
                  type="text"
                  placeholder="Enter tracking number"
                  class="w-full p-2 border border-charcoal/20 rounded-md focus:outline-none focus:ring-1 focus:ring-sage focus:border-sage"
                />
                <p class="text-xs text-charcoal/60">
                  This will be sent to the customer in the shipping confirmation email.
                </p>
              </div>
            </div>
          </div>
          <div class="bg-cream/50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              @click="confirmStatusUpdate"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-sage text-base font-medium text-white hover:bg-sage/90 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
            >
              Update
            </button>
            <button
              type="button"
              @click="updateDialogOpen = false"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-charcoal/20 shadow-sm px-4 py-2 bg-white text-base font-medium text-charcoal hover:bg-cream focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, onUnmounted } from 'vue';
import {
  Search,
  ArrowUpDown,
  ChevronDown,
  MoreHorizontal,
  Clock,
  CheckCircle,
  Truck,
  Package,
  XCircle,
  Filter
} from 'lucide-vue-next';

// Types
type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
type PaymentMethod = 'credit_card' | 'paypal' | 'bank_transfer';

interface Order {
  id: string;
  date: string;
  customerName: string;
  customerEmail: string;
  total: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  items: Array<{ id: string; name: string; quantity: number; price: number }>;
  trackingNumber?: string;
}

// State
const orders = ref<Order[]>([]);
const filteredOrders = ref<Order[]>([]);
const searchQuery = ref('');
const sortField = ref<keyof Order>('date');
const sortDirection = ref<'asc' | 'desc'>('desc');
const selectedStatus = ref<OrderStatus | 'all'>('all');
const updateDialogOpen = ref(false);
const orderToUpdate = ref<Order | null>(null);
const newStatus = ref<OrderStatus>('pending');

// UI state
const showStatusDropdown = ref(false);
const activeActionDropdown = ref<string | null>(null);

// Computed values
const processingCount = computed(() => 
  orders.value.filter(o => o.status === 'pending' || o.status === 'processing').length
);
const deliveredCount = computed(() => 
  orders.value.filter(o => o.status === 'delivered').length
);
const cancelledCount = computed(() => 
  orders.value.filter(o => o.status === 'cancelled').length
);

// Toggle dropdown visibility
const toggleStatusDropdown = () => {
  showStatusDropdown.value = !showStatusDropdown.value;
  activeActionDropdown.value = null;
};

const toggleActionDropdown = (orderId: string) => {
  if (activeActionDropdown.value === orderId) {
    activeActionDropdown.value = null;
  } else {
    activeActionDropdown.value = orderId;
  }
  showStatusDropdown.value = false;
};

// Close dropdowns when clicking outside
const closeDropdowns = () => {
  showStatusDropdown.value = false;
  activeActionDropdown.value = null;
};

// Event listener for closing dropdowns when clicking outside
onMounted(() => {
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (!target.closest('.relative')) {
      closeDropdowns();
    }
  });
  
  // Load initial data
  loadOrders();
});

// Cleanup listeners
onUnmounted(() => {
  document.removeEventListener('click', closeDropdowns);
});

// Select status
const selectStatus = (status: OrderStatus | 'all') => {
  selectedStatus.value = status;
  showStatusDropdown.value = false;
};

// Handle sorting
const handleSort = (field: keyof Order) => {
  if (field === sortField.value) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortField.value = field;
    sortDirection.value = 'desc';
  }
};

// Format date
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString();
};

// Get status color
const getStatusColor = (status: OrderStatus) => {
  switch (status) {
    case 'pending':
      return 'bg-charcoal/10 text-charcoal';
    case 'processing':
      return 'bg-dusty-blue/10 text-dusty-blue';
    case 'shipped':
      return 'bg-beige/20 text-beige';
    case 'delivered':
      return 'bg-sage/10 text-sage';
    case 'cancelled':
      return 'bg-terracotta/10 text-terracotta';
    default:
      return 'bg-charcoal/10 text-charcoal';
  }
};

// Get status icon
const getStatusIcon = (status: OrderStatus) => {
  switch (status) {
    case 'pending':
      return Clock;
    case 'processing':
      return Package;
    case 'shipped':
      return Truck;
    case 'delivered':
      return CheckCircle;
    case 'cancelled':
      return XCircle;
    default:
      return Clock;
  }
};

// Update order dialog
const openUpdateDialog = (order: Order) => {
  orderToUpdate.value = order;
  newStatus.value = order.status;
  updateDialogOpen.value = true;
  activeActionDropdown.value = null;
};

// Confirm status update
const confirmStatusUpdate = () => {
  if (orderToUpdate.value && newStatus.value) {
    // Update the order status
    const updatedOrder = { ...orderToUpdate.value, status: newStatus.value };
    
    // Update local state
    orders.value = orders.value.map(order => 
      order.id === updatedOrder.id ? updatedOrder : order
    );
    
    // Close the dialog
    updateDialogOpen.value = false;
    orderToUpdate.value = null;
  }
};

// Load orders (simulated)
const loadOrders = () => {
  // Mock data - in a real app, this would be an API call
  orders.value = [
    {
      id: "ORD-1001",
      date: "2025-05-28T08:00:00Z",
      customerName: "John Doe",
      customerEmail: "john.doe@example.com",
      total: 129.99,
      status: "pending",
      paymentMethod: "credit_card",
      items: [
        { id: "prod-001", name: "Ceramic Tea Set", quantity: 1, price: 89.99 },
        { id: "prod-003", name: "Matcha Tea Powder", quantity: 1, price: 28.99 }
      ]
    },
    {
      id: "ORD-1002",
      date: "2025-05-27T14:30:00Z",
      customerName: "Jane Smith",
      customerEmail: "jane.smith@example.com",
      total: 79.99,
      status: "processing",
      paymentMethod: "paypal",
      items: [
        { id: "prod-004", name: "Linen Kimono Robe", quantity: 1, price: 79.99 }
      ]
    },
    {
      id: "ORD-1003",
      date: "2025-05-26T11:15:00Z",
      customerName: "Robert Johnson",
      customerEmail: "robert.j@example.com",
      total: 43.49,
      status: "shipped",
      paymentMethod: "credit_card",
      items: [
        { id: "prod-005", name: "Bamboo Incense Holder", quantity: 1, price: 24.50 },
        { id: "prod-006", name: "Aromatic Bath Salts", quantity: 1, price: 18.99 }
      ],
      trackingNumber: "TRK123456789"
    },
    {
      id: "ORD-1004",
      date: "2025-05-25T09:45:00Z",
      customerName: "Emily Davis",
      customerEmail: "emily.d@example.com",
      total: 35.50,
      status: "delivered",
      paymentMethod: "credit_card",
      items: [
        { id: "prod-002", name: "Linen Pillow Covers", quantity: 1, price: 35.50 }
      ]
    },
    {
      id: "ORD-1005",
      date: "2025-05-24T16:20:00Z",
      customerName: "Michael Wilson",
      customerEmail: "michael.w@example.com",
      total: 89.99,
      status: "cancelled",
      paymentMethod: "bank_transfer",
      items: [
        { id: "prod-001", name: "Ceramic Tea Set", quantity: 1, price: 89.99 }
      ]
    }
  ];
  
  filteredOrders.value = [...orders.value];
};

// Filter and sort orders when query changes
watch(
  [searchQuery, sortField, sortDirection, selectedStatus],
  () => {
    let result = [...orders.value];

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

    // Filter by status
    if (selectedStatus.value !== 'all') {
      result = result.filter((order) => order.status === selectedStatus.value);
    }

    // Sort results
    result = result.sort((a, b) => {
      if (sortField.value === 'date') {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return sortDirection.value === 'asc' ? dateA - dateB : dateB - dateA;
      }

      if (sortField.value === 'total') {
        return sortDirection.value === 'asc' ? a.total - b.total : b.total - a.total;
      }

      const aValue = a[sortField.value];
      const bValue = b[sortField.value];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection.value === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      }

      return 0;
    });

    filteredOrders.value = result;
  },
  { immediate: true }
);
</script>

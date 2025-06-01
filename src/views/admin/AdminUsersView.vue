<template>
  <div class="p-6">
    <h1 class="text-2xl font-light text-charcoal mb-6">User Management</h1>

    <div class="bg-white rounded-lg shadow-sm border border-charcoal/10 mb-6">
      <div class="p-6 pb-2">
        <h3 class="text-lg font-medium text-charcoal">Users Overview</h3>
      </div>
      <div class="p-6">
        <!-- Filter Controls -->
        <div class="flex flex-col sm:flex-row gap-4 mb-6">
          <div class="relative flex-1">
            <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-charcoal/50" />
            <input
              type="text"
              placeholder="Search users..."
              v-model="searchQuery"
              class="w-full py-2 px-4 pl-9 border border-charcoal/20 rounded-md focus:outline-none focus:ring-1 focus:ring-sage focus:border-sage"
            />
          </div>
          <div class="flex gap-2">
            <!-- Role Filter Dropdown -->
            <div class="relative">
              <button
                @click="toggleRoleDropdown"
                class="w-[130px] flex items-center justify-between px-4 py-2 border border-charcoal/20 rounded-md text-charcoal hover:bg-cream"
              >
                {{ getRoleLabel }}
                <ChevronDown class="h-4 w-4 opacity-50" />
              </button>
              <div
                v-if="showRoleDropdown"
                class="absolute right-0 z-10 mt-1 w-[130px] rounded-md bg-white shadow-lg border border-charcoal/10"
              >
                <div class="py-1">
                  <button
                    @click="selectRole('all')"
                    class="w-full text-left px-4 py-2 text-sm text-charcoal hover:bg-cream"
                  >
                    All Roles
                  </button>
                  <button
                    @click="selectRole('customer')"
                    class="w-full text-left px-4 py-2 text-sm text-charcoal hover:bg-cream"
                  >
                    Customers
                  </button>
                  <button
                    @click="selectRole('admin')"
                    class="w-full text-left px-4 py-2 text-sm text-charcoal hover:bg-cream"
                  >
                    Admins
                  </button>
                </div>
              </div>
            </div>

            <!-- Status Filter Dropdown -->
            <div class="relative">
              <button
                @click="toggleStatusDropdown"
                class="w-[130px] flex items-center justify-between px-4 py-2 border border-charcoal/20 rounded-md text-charcoal hover:bg-cream"
              >
                {{ getStatusLabel }}
                <ChevronDown class="h-4 w-4 opacity-50" />
              </button>
              <div
                v-if="showStatusDropdown"
                class="absolute right-0 z-10 mt-1 w-[130px] rounded-md bg-white shadow-lg border border-charcoal/10"
              >
                <div class="py-1">
                  <button
                    @click="selectStatus('all')"
                    class="w-full text-left px-4 py-2 text-sm text-charcoal hover:bg-cream"
                  >
                    All Status
                  </button>
                  <button
                    @click="selectStatus('active')"
                    class="w-full text-left px-4 py-2 text-sm text-charcoal hover:bg-cream"
                  >
                    Active
                  </button>
                  <button
                    @click="selectStatus('inactive')"
                    class="w-full text-left px-4 py-2 text-sm text-charcoal hover:bg-cream"
                  >
                    Inactive
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Users Table -->
        <div class="rounded-md border overflow-hidden">
          <table class="min-w-full divide-y divide-charcoal/10">
            <thead class="bg-cream">
              <tr>
                <th
                  @click="handleSort('id')"
                  class="px-4 py-3 text-left text-xs font-medium text-charcoal/70 uppercase tracking-wider cursor-pointer"
                >
                  <div class="flex items-center">
                    ID
                    <ArrowUpDown class="ml-2 h-4 w-4" />
                  </div>
                </th>
                <th
                  @click="handleSort('name')"
                  class="px-4 py-3 text-left text-xs font-medium text-charcoal/70 uppercase tracking-wider cursor-pointer"
                >
                  <div class="flex items-center">
                    Name
                    <ArrowUpDown class="ml-2 h-4 w-4" />
                  </div>
                </th>
                <th
                  @click="handleSort('email')"
                  class="px-4 py-3 text-left text-xs font-medium text-charcoal/70 uppercase tracking-wider cursor-pointer"
                >
                  <div class="flex items-center">
                    Email
                    <ArrowUpDown class="ml-2 h-4 w-4" />
                  </div>
                </th>
                <th
                  @click="handleSort('joinDate')"
                  class="px-4 py-3 text-left text-xs font-medium text-charcoal/70 uppercase tracking-wider cursor-pointer"
                >
                  <div class="flex items-center">
                    Join Date
                    <ArrowUpDown class="ml-2 h-4 w-4" />
                  </div>
                </th>
                <th
                  class="px-4 py-3 text-center text-xs font-medium text-charcoal/70 uppercase tracking-wider"
                >
                  Orders
                </th>
                <th
                  class="px-4 py-3 text-center text-xs font-medium text-charcoal/70 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  class="px-4 py-3 text-center text-xs font-medium text-charcoal/70 uppercase tracking-wider"
                >
                  Role
                </th>
                <th
                  class="px-4 py-3 text-right text-xs font-medium text-charcoal/70 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-charcoal/10">
              <tr v-if="filteredUsers.length === 0">
                <td colspan="8" class="text-center py-10 text-charcoal/70">
                  No users found
                </td>
              </tr>
              <tr
                v-for="user in filteredUsers"
                :key="user.id"
                class="hover:bg-cream/50"
              >
                <td class="px-4 py-4 whitespace-nowrap font-medium text-charcoal">
                  {{ user.id.split("-")[1] }}
                </td>
                <td class="px-4 py-4 whitespace-nowrap text-charcoal">
                  {{ user.name }}
                </td>
                <td class="px-4 py-4 whitespace-nowrap text-charcoal">
                  {{ user.email }}
                </td>
                <td class="px-4 py-4 whitespace-nowrap text-charcoal">
                  {{ formatDate(user.joinDate) }}
                </td>
                <td class="px-4 py-4 whitespace-nowrap text-center text-charcoal">
                  {{ getUserOrderCount(user.id) }}
                </td>
                <td class="px-4 py-4 whitespace-nowrap text-center">
                  <span
                    v-if="user.status === 'active'"
                    class="inline-flex items-center px-2 py-1 rounded-full bg-sage/10 text-sage text-xs"
                  >
                    <CheckCircle class="h-3 w-3 mr-1" />
                    Active
                  </span>
                  <span
                    v-else
                    class="inline-flex items-center px-2 py-1 rounded-full bg-terracotta/10 text-terracotta text-xs"
                  >
                    <XCircle class="h-3 w-3 mr-1" />
                    Inactive
                  </span>
                </td>
                <td class="px-4 py-4 whitespace-nowrap text-center">
                  <span
                    v-if="user.role === 'admin'"
                    class="inline-flex items-center px-2 py-1 rounded-full bg-dusty-blue/10 text-dusty-blue text-xs"
                  >
                    <ShieldAlert class="h-3 w-3 mr-1" />
                    Admin
                  </span>
                  <span
                    v-else
                    class="inline-flex items-center px-2 py-1 rounded-full bg-beige/20 text-beige text-xs"
                  >
                    <Shield class="h-3 w-3 mr-1" />
                    Customer
                  </span>
                </td>
                <td class="px-4 py-4 whitespace-nowrap text-right">
                  <div class="relative">
                    <button
                      @click="toggleActionDropdown(user.id)"
                      class="h-8 w-8 p-0 rounded-full hover:bg-cream flex items-center justify-center"
                    >
                      <span class="sr-only">Open menu</span>
                      <MoreHorizontal class="h-4 w-4" />
                    </button>
                    <div
                      v-if="activeActionDropdown === user.id"
                      class="absolute right-0 z-10 mt-1 w-[160px] rounded-md bg-white shadow-lg border border-charcoal/10"
                    >
                      <div class="py-1">
                        <button
                          class="w-full flex items-center text-left px-4 py-2 text-sm text-charcoal hover:bg-cream"
                        >
                          <EyeIcon class="mr-2 h-4 w-4" />
                          View Details
                        </button>
                        <button
                          class="w-full flex items-center text-left px-4 py-2 text-sm text-charcoal hover:bg-cream"
                        >
                          <UserCog class="mr-2 h-4 w-4" />
                          Edit User
                        </button>
                        <button
                          v-if="user.status === 'active'"
                          class="w-full flex items-center text-left px-4 py-2 text-sm text-terracotta hover:bg-cream"
                        >
                          <XCircle class="mr-2 h-4 w-4" />
                          Deactivate
                        </button>
                        <button
                          v-else
                          class="w-full flex items-center text-left px-4 py-2 text-sm text-sage hover:bg-cream"
                        >
                          <CheckCircle class="mr-2 h-4 w-4" />
                          Activate
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
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, onUnmounted } from 'vue';
import {
  Search,
  ArrowUpDown,
  ChevronDown,
  MoreHorizontal,
  UserCog,
  EyeIcon,
  Shield,
  ShieldAlert,
  CheckCircle,
  XCircle
} from 'lucide-vue-next';

// Type definitions
interface User {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  status: 'active' | 'inactive';
  role: 'admin' | 'customer';
}

interface Order {
  id: string;
  customerId: string;
  // other order properties...
}

// State
const users = ref<User[]>([]);
const filteredUsers = ref<User[]>([]);
const searchQuery = ref('');
const sortField = ref<keyof User>('name');
const sortDirection = ref<'asc' | 'desc'>('asc');
const selectedRole = ref<User['role'] | 'all'>('all');
const selectedStatus = ref<User['status'] | 'all'>('all');

// UI state
const showRoleDropdown = ref(false);
const showStatusDropdown = ref(false);
const activeActionDropdown = ref<string | null>(null);

// Toggle dropdown visibility
const toggleRoleDropdown = () => {
  showRoleDropdown.value = !showRoleDropdown.value;
  showStatusDropdown.value = false;
  activeActionDropdown.value = null;
};

const toggleStatusDropdown = () => {
  showStatusDropdown.value = !showStatusDropdown.value;
  showRoleDropdown.value = false;
  activeActionDropdown.value = null;
};

const toggleActionDropdown = (userId: string) => {
  if (activeActionDropdown.value === userId) {
    activeActionDropdown.value = null;
  } else {
    activeActionDropdown.value = userId;
  }
  showRoleDropdown.value = false;
  showStatusDropdown.value = false;
};

// Close dropdowns when clicking outside
const closeDropdowns = () => {
  showRoleDropdown.value = false;
  showStatusDropdown.value = false;
  activeActionDropdown.value = null;
};

// Event listener for closing dropdowns when clicking outside
onMounted(() => {
  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    if (!target.closest('.relative')) {
      closeDropdowns();
    }
  });

  // Load users (dummy data for now)
  users.value = getAllUsers();
  filteredUsers.value = users.value;
});

// Handle dropdown selections
const selectRole = (role: User['role'] | 'all') => {
  selectedRole.value = role;
  showRoleDropdown.value = false;
};

const selectStatus = (status: User['status'] | 'all') => {
  selectedStatus.value = status;
  showStatusDropdown.value = false;
};

// Computed properties for dropdown labels
const getRoleLabel = computed(() => {
  if (selectedRole.value === 'all') return 'All Roles';
  if (selectedRole.value === 'customer') return 'Customers';
  return 'Admins';
});

const getStatusLabel = computed(() => {
  if (selectedStatus.value === 'all') return 'All Status';
  if (selectedStatus.value === 'active') return 'Active';
  return 'Inactive';
});

// Handle sorting
const handleSort = (field: keyof User) => {
  if (field === sortField.value) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortField.value = field;
    sortDirection.value = 'asc';
  }
};

// Format date
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString();
};

// Calculate total orders for a user
const getUserOrderCount = (userId: string) => {
  return getOrdersByCustomerId(userId).length;
};

// Filter and sort users
watch(
  [users, searchQuery, sortField, sortDirection, selectedRole, selectedStatus],
  () => {
    let result = [...users.value];

    // Filter by search query
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase();
      result = result.filter(
        (user) =>
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query) ||
          user.id.toLowerCase().includes(query)
      );
    }

    // Filter by role
    if (selectedRole.value !== 'all') {
      result = result.filter((user) => user.role === selectedRole.value);
    }

    // Filter by status
    if (selectedStatus.value !== 'all') {
      result = result.filter((user) => user.status === selectedStatus.value);
    }

    // Sort results
    result = result.sort((a, b) => {
      const aValue = a[sortField.value];
      const bValue = b[sortField.value];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection.value === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else {
        // Handle non-string values (like numbers)
        return sortDirection.value === 'asc'
          ? (aValue as any) - (bValue as any)
          : (bValue as any) - (aValue as any);
      }
    });

    filteredUsers.value = result;
  },
  { immediate: true }
);

// Mock data functions (replace with actual API calls in production)
function getAllUsers(): User[] {
  return [
    {
      id: 'user-001',
      name: 'Akiko Tanaka',
      email: 'akiko@example.com',
      joinDate: '2023-01-15',
      status: 'active',
      role: 'customer'
    },
    {
      id: 'user-002',
      name: 'Hiroshi Yamamoto',
      email: 'hiroshi@example.com',
      joinDate: '2023-02-20',
      status: 'active',
      role: 'customer'
    },
    {
      id: 'user-003',
      name: 'Sakura Ito',
      email: 'sakura@example.com',
      joinDate: '2023-03-10',
      status: 'inactive',
      role: 'customer'
    },
    {
      id: 'user-004',
      name: 'Takashi Sato',
      email: 'takashi@example.com',
      joinDate: '2023-01-05',
      status: 'active',
      role: 'admin'
    },
    {
      id: 'user-005',
      name: 'Yuki Nakamura',
      email: 'yuki@example.com',
      joinDate: '2023-04-25',
      status: 'active',
      role: 'customer'
    },
    {
      id: 'user-006',
      name: 'Kenji Suzuki',
      email: 'kenji@example.com',
      joinDate: '2023-02-12',
      status: 'inactive',
      role: 'customer'
    },
    {
      id: 'user-007',
      name: 'Ayumi Watanabe',
      email: 'ayumi@example.com',
      joinDate: '2023-03-30',
      status: 'active',
      role: 'admin'
    },
    {
      id: 'user-008',
      name: 'Hana Kobayashi',
      email: 'hana@example.com',
      joinDate: '2023-05-02',
      status: 'active',
      role: 'customer'
    }
  ];
}

function getOrdersByCustomerId(customerId: string): Order[] {
  // Mock orders data
  const orders: Record<string, Order[]> = {
    'user-001': [{ id: 'order-001', customerId: 'user-001' }, { id: 'order-002', customerId: 'user-001' }],
    'user-002': [{ id: 'order-003', customerId: 'user-002' }],
    'user-003': [],
    'user-004': [{ id: 'order-004', customerId: 'user-004' }],
    'user-005': [{ id: 'order-005', customerId: 'user-005' }, { id: 'order-006', customerId: 'user-005' }, { id: 'order-007', customerId: 'user-005' }],
    'user-006': [],
    'user-007': [{ id: 'order-008', customerId: 'user-007' }],
    'user-008': [{ id: 'order-009', customerId: 'user-008' }, { id: 'order-010', customerId: 'user-008' }]
  };
  
  return orders[customerId] || [];
}
</script>

<style scoped>
/* Any component-specific styles can go here */
</style>

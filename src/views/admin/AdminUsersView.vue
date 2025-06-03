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
            <Search
              class="absolute left-2.5 top-2.5 h-4 w-4 text-charcoal/50"
            />
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
          </div>
        </div>

        <!-- Users Table -->
        <div
          class="rounded-md border overflow-hidden max-h-[600px] overflow-y-auto"
        >
          <table class="min-w-full divide-y divide-charcoal/10">
            <thead class="bg-cream">
              <tr>
                <th
                  @click="handleSort('_id')"
                  class="px-4 py-3 text-left text-xs font-medium text-charcoal/70 uppercase tracking-wider cursor-pointer"
                >
                  <div class="flex items-center">
                    ID
                    <ArrowUpDown class="ml-2 h-4 w-4" />
                  </div>
                </th>
                <th
                  @click="handleSort('firstName')"
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
                  @click="handleSort('createdAt')"
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
                  Role
                </th>
                <th
                  class="px-4 py-3 text-center text-xs font-medium text-charcoal/70 uppercase tracking-wider"
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
                :key="user._id"
                class="hover:bg-cream/50"
              >
                <td
                  class="px-4 py-4 whitespace-nowrap font-medium text-charcoal"
                >
                  {{ user._id }}
                </td>
                <td class="px-4 py-4 whitespace-nowrap text-charcoal">
                  {{ user.firstName }}
                </td>
                <td class="px-4 py-4 whitespace-nowrap text-charcoal">
                  {{ user.email }}
                </td>
                <td class="px-4 py-4 whitespace-nowrap text-charcoal">
                  {{ formatDate(user.createdAt) }}
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
                <td class="px-4 py-4 whitespace-nowrap">
                  <div class="relative flex justify-end">
                    <button
                      @click="toggleActionDropdown(user._id)"
                      class="h-8 w-8 p-0 rounded-full hover:bg-cream flex items-center justify-center ml-auto"
                    >
                      <span class="sr-only">Open menu</span>
                      <MoreHorizontal class="h-4 w-4" />
                    </button>
                    <div
                      v-if="activeActionDropdown === user._id"
                      class="absolute right-0 z-10 mt-1 w-[160px] rounded-md bg-white shadow-lg border border-charcoal/10"
                    >
                      <div class="py-1">
                        <button
                          @click="openUserDetailsDialog(user)"
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

  <!-- User Details Dialog -->
  <div
    v-if="showUserDetailsDialog"
    class="fixed inset-0 bg-charcoal/50 flex items-center justify-center z-50 p-4"
  >
    <div
      class="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto"
    >
      <!-- Dialog Header -->
      <div
        class="p-6 border-b border-charcoal/10 flex justify-between items-center"
      >
        <h2 class="text-xl font-light text-charcoal">User Details</h2>
        <button
          @click="closeUserDetailsDialog"
          class="h-8 w-8 rounded-full hover:bg-cream flex items-center justify-center"
        >
          <span class="sr-only">Close</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-5 w-5"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <!-- Dialog Content -->
      <div class="p-6" v-if="selectedUser">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Personal Information -->
          <div class="space-y-4">
            <h3
              class="text-lg font-medium text-charcoal border-b border-charcoal/10 pb-2"
            >
              Personal Information
            </h3>
            <div class="space-y-2">
              <div class="flex">
                <span class="w-32 text-charcoal/70">User ID:</span>
                <span class="text-charcoal font-medium">{{
                  selectedUser._id
                }}</span>
              </div>
              <div class="flex">
                <span class="w-32 text-charcoal/70">First Name:</span>
                <span class="text-charcoal">{{ selectedUser.firstName }}</span>
              </div>
              <div class="flex">
                <span class="w-32 text-charcoal/70">Last Name:</span>
                <span class="text-charcoal">{{ selectedUser.lastName }}</span>
              </div>
              <div class="flex">
                <span class="w-32 text-charcoal/70">Email:</span>
                <span class="text-charcoal">{{ selectedUser.email }}</span>
              </div>
              <div class="flex">
                <span class="w-32 text-charcoal/70">Role:</span>
                <span
                  class="inline-flex items-center px-2 py-1 rounded-full text-xs"
                  :class="
                    selectedUser.role === 'admin'
                      ? 'bg-sage/20 text-sage'
                      : 'bg-beige/20 text-beige'
                  "
                >
                  <component
                    :is="selectedUser.role === 'admin' ? ShieldAlert : Shield"
                    class="h-3 w-3 mr-1"
                  />
                  {{ selectedUser.role === "admin" ? "Admin" : "Customer" }}
                </span>
              </div>
              <div class="flex">
                <span class="w-32 text-charcoal/70">Joined:</span>
                <span class="text-charcoal">{{
                  formatDate(selectedUser.createdAt)
                }}</span>
              </div>
            </div>
          </div>

          <!-- Shipping Information -->
          <div class="space-y-4">
            <h3
              class="text-lg font-medium text-charcoal border-b border-charcoal/10 pb-2"
            >
              Shipping Information
            </h3>
            <div v-if="selectedUser.address" class="space-y-2">
              <div class="flex">
                <span class="w-32 text-charcoal/70">Address:</span>
                <span class="text-charcoal">{{
                  selectedUser.address.street
                }}</span>
              </div>
              <div class="flex">
                <span class="w-32 text-charcoal/70">City:</span>
                <span class="text-charcoal">{{
                  selectedUser.address.city
                }}</span>
              </div>
              <div class="flex">
                <span class="w-32 text-charcoal/70">Postal Code:</span>
                <span class="text-charcoal">{{
                  selectedUser.address.postalCode
                }}</span>
              </div>
              <div class="flex">
                <span class="w-32 text-charcoal/70">Country:</span>
                <span class="text-charcoal">{{
                  selectedUser.address.country
                }}</span>
              </div>
            </div>
            <div v-else class="italic text-charcoal/50">
              No shipping information available
            </div>
          </div>

          <!-- Account Status -->
          <div class="space-y-4 md:col-span-2">
            <h3
              class="text-lg font-medium text-charcoal border-b border-charcoal/10 pb-2"
            >
              Account Status
            </h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="bg-cream/50 rounded-lg p-4">
                <div class="text-charcoal/70 text-sm mb-1">Created At</div>
                <div class="text-charcoal">
                  {{ formatDate(selectedUser.createdAt) }}
                </div>
              </div>
              <div class="bg-cream/50 rounded-lg p-4">
                <div class="text-charcoal/70 text-sm mb-1">Last Updated</div>
                <div class="text-charcoal">
                  {{ formatDate(selectedUser.updatedAt) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Dialog Footer -->
      <div class="p-4 border-t border-charcoal/10 flex justify-end gap-2">
        <button
          @click="closeUserDetailsDialog"
          class="px-4 py-2 border border-charcoal/20 rounded-md text-charcoal hover:bg-cream"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import {
  Search,
  ArrowUpDown,
  ChevronDown,
  MoreHorizontal,
  UserCog,
  EyeIcon,
  Shield,
  ShieldAlert,
} from "lucide-vue-next";
import { useAdminStore } from "@/stores/admin.store";
import { type UserResponse } from "@/types/User";

const adminStore = useAdminStore();


// State
const users = computed(() => adminStore.users);
const filteredUsers = ref<UserResponse[]>([]);
const searchQuery = ref("");
const sortField = ref("name");
const sortDirection = ref<"asc" | "desc">("asc");
const selectedRole = ref("all");
const selectedStatus = ref("all");

// UI state
const showRoleDropdown = ref(false);
const showStatusDropdown = ref(false);
const activeActionDropdown = ref<string | null>(null);
const showUserDetailsDialog = ref(false);
const selectedUser = ref<UserResponse | null>(null);

// Toggle dropdown visibility
const toggleRoleDropdown = () => {
  showRoleDropdown.value = !showRoleDropdown.value;
  showStatusDropdown.value = false;
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

// User details dialog
const openUserDetailsDialog = (user: UserResponse) => {
  selectedUser.value = user;
  showUserDetailsDialog.value = true;
  closeDropdowns();
};

const closeUserDetailsDialog = () => {
  showUserDetailsDialog.value = false;
  setTimeout(() => {
    selectedUser.value = null;
  }, 200);
};

// Event listener for closing dropdowns when clicking outside
onMounted(() => {
  document.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    if (!target.closest(".relative")) {
      closeDropdowns();
    }
  });

  filteredUsers.value = users.value;
});

// Handle dropdown selections
const selectRole = (role: UserResponse["role"] | "all") => {
  selectedRole.value = role;
  showRoleDropdown.value = false;
};

// Computed properties for dropdown labels
const getRoleLabel = computed(() => {
  if (selectedRole.value === "all") return "All Roles";
  if (selectedRole.value === "customer") return "Customers";
  return "Admins";
});

// Handle sorting
const handleSort = (field: keyof UserResponse) => {
  if (field === sortField.value) {
    sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
  } else {
    sortField.value = field as string;
    sortDirection.value = "asc";
  }
};

// Format date
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString();
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
          user.firstName.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query) ||
          user._id.toLowerCase().includes(query)
      );
    }

    // Filter by role
    if (selectedRole.value !== "all") {
      result = result.filter((user) => user.role === selectedRole.value);
    }

    // Sort results
    result = result.sort((a, b) => {
      const aValue = a[sortField.value as keyof UserResponse];
      const bValue = b[sortField.value as keyof UserResponse];

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection.value === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else {
        // Handle non-string values (like numbers)
        return sortDirection.value === "asc"
          ? (aValue as any) - (bValue as any)
          : (bValue as any) - (aValue as any);
      }
    });

    filteredUsers.value = result;
  },
  { immediate: true }
);
</script>

<style scoped>
/* Any component-specific styles can go here */
</style>

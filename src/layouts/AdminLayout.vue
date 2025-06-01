<template>
  <div class="min-h-screen bg-cream flex">
    <!-- Mobile Header -->
    <div
      class="lg:hidden fixed top-0 left-0 right-0 h-16 bg-cream border-b border-charcoal/10 flex items-center justify-between px-4 z-30"
    >
      <button
        @click="toggleMobileMenu"
        class="text-charcoal/70 hover:text-charcoal"
      >
        <Menu class="h-6 w-6" />
      </button>
      <router-link to="/admin" class="flex items-center">
        <Logo variant="small" />
      </router-link>
      <div class="w-6"></div>
      <!-- Empty div for flex spacing -->
    </div>

    <!-- Mobile Menu Overlay -->
    <div
      v-if="isMobile && mobileMenuOpen"
      class="fixed inset-0 bg-charcoal/50 z-40 lg:hidden"
      @click="setMobileMenuOpen(false)"
    ></div>

    <!-- Sidebar -->
    <aside
      :class="[
        'fixed inset-y-0 left-0 bg-white border-r border-charcoal/10 transition-all duration-300 z-50',
        collapsed ? 'w-[70px]' : 'w-64',
        isMobile
          ? mobileMenuOpen
            ? 'translate-x-0'
            : '-translate-x-full'
          : 'translate-x-0',
      ]"
    >
      <div class="flex flex-col h-full">
        <div
          class="h-16 flex items-center justify-between px-4 border-b border-charcoal/10"
        >
          <router-link v-if="!collapsed" to="/admin" class="flex items-center">
            <Logo variant="small" />
          </router-link>
          <button
            @click="isMobile ? setMobileMenuOpen(false) : toggleSidebar()"
            class="text-charcoal/70 hover:text-charcoal ml-auto"
          >
            <component
              :is="collapsed ? ChevronRight : ChevronLeft"
              class="h-5 w-5 transition-transform"
            />
          </button>
        </div>

        <nav class="flex-1 overflow-y-auto py-4">
          <ul class="space-y-1">
            <li v-for="item in navItems" :key="item.name">
              <router-link
                :to="item.path"
                :class="[
                  'flex items-center h-12 px-4 text-sm transition-colors',
                  isActive(item.path)
                    ? 'bg-sage/10 text-sage font-medium'
                    : 'text-charcoal/70 hover:text-charcoal hover:bg-cream',
                ]"
                @click="isMobile ? setMobileMenuOpen(false) : null"
              >
                <component
                  :is="item.icon"
                  :class="[
                    'h-5 w-5',
                    isActive(item.path) ? 'text-sage' : 'text-charcoal/70',
                  ]"
                />
                <span v-if="!collapsed" class="ml-3">{{ item.name }}</span>
              </router-link>
            </li>
          </ul>
        </nav>

        <div class="border-t border-charcoal/10 p-4">
          <router-link
            to="/"
            :class="[
              'flex items-center text-sm text-charcoal/70 hover:text-charcoal transition-colors',
              collapsed && 'justify-center',
            ]"
          >
            <span v-if="!collapsed">Back to Store</span>
            <ShoppingBag v-if="collapsed" class="h-5 w-5" />
          </router-link>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <main
      :class="[
        'flex-1 transition-all duration-300',
        collapsed ? 'lg:ml-[70px]' : 'lg:ml-64',
        isMobile ? 'ml-0' : '',
      ]"
    >
      <div class="min-h-screen pt-16 lg:pt-0">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  Package,
  History,
  Settings,
  ChevronLeft,
  ChevronRight,
  Menu,
} from "lucide-vue-next";
import Logo from "@/components/atoms/Logo.vue";

import { useAdminStore } from "@/stores/admin.store";

const adminStore = useAdminStore();

// State management with Vue refs
const collapsed = ref(false);
const isMobile = ref(false);
const mobileMenuOpen = ref(false);
const route = useRoute();

// Check if current route is active
const isActive = (path: string) => {
  // Exact match for dashboard
  if (path === "/admin") {
    return route.path === "/admin";
  }

  // For nested routes, ensure we don't highlight parent routes
  // when a child route is active
  const currentPath = route.path;

  // Check if this is the Orders route and we're on the history page
  if (path === "/admin/orders" && currentPath === "/admin/orders/history") {
    return false;
  }

  // Otherwise use the default behavior
  return (
    currentPath.startsWith(path) &&
    // Make sure the current path doesn't have additional segments
    // that would match a more specific menu item
    !navItems.some(
      (item) =>
        item.path !== path &&
        item.path.startsWith(path) &&
        currentPath.startsWith(item.path)
    )
  );
};

// Navigation items
const navItems = [
  { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { name: "Users", path: "/admin/users", icon: Users },
  { name: "Products", path: "/admin/products", icon: Package },
  { name: "Orders", path: "/admin/orders", icon: ShoppingBag },
  { name: "Order History", path: "/admin/orders/history", icon: History },
  { name: "Settings", path: "/admin/settings", icon: Settings },
];

// Toggle sidebar collapsed state
const toggleSidebar = () => {
  collapsed.value = !collapsed.value;
};

// Toggle mobile menu
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

// Set mobile menu state
const setMobileMenuOpen = (state: boolean) => {
  mobileMenuOpen.value = state;
};

// Event listeners to close dropdown when clicking outside
onMounted(async () => {
  document.addEventListener("click", (e) => {
    // Close mobile menu when clicking outside
    if (
      mobileMenuOpen.value &&
      e.target &&
      !(e.target as HTMLElement).closest(".sidebar-menu")
    ) {
      mobileMenuOpen.value = false;
    }
  });

  try {
    // Fetch admin dashboard data
    await adminStore.fetchUsers();
    await adminStore.fetchOrders();
  } catch (error) {
    console.error("Error initializing admin store:", error);
  }
});

// Check mobile on mount and handle resize
onMounted(() => {
  const checkMobile = () => {
    isMobile.value = window.innerWidth < 1024;
    if (window.innerWidth < 1024) {
      collapsed.value = true;
    }
  };

  checkMobile();
  window.addEventListener("resize", checkMobile);

  // Cleanup event listener on component unmount
  onUnmounted(() => {
    window.removeEventListener("resize", checkMobile);
  });
});
</script>

<style scoped>
/* You can add any component-specific styles here */
</style>

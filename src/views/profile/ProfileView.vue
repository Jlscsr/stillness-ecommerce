<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
    <h1 class="text-3xl font-light text-charcoal mb-8">My Account</h1>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <!-- Sidebar -->
      <div class="lg:col-span-1">
        <div class="bg-cream border border-charcoal/10 rounded-sm p-6">
          <AccountSidebar
            :user="{
              fullName: user?.firstName + ' ' + user?.lastName,
              createdAt: user?.createdAt,
            }"
            :activeTab="activeTab"
            @setTab="setActiveTab"
          />
        </div>
      </div>

      <!-- Main Content Area -->
      <div class="lg:col-span-3">
        <div
          v-if="activeTab === 'profile'"
          class="bg-cream border border-charcoal/10 rounded-sm p-6"
        >
          <AccountInfo :user="user" />
        </div>

        <div v-else-if="activeTab === 'orders'">
          <AccountOrders
            :pendingOrders="pendingOrders"
            :orderHistory="orderHistory"
            :expandedOrders="expandedOrders"
            @toggleOrder="toggleOrderExpand"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

import AccountSidebar from "@/components/profile/AccountSidebar.vue";
import AccountInfo from "@/components/profile/AccountInfo.vue";
import AccountOrders from "@/components/profile/AccountOrders.vue";

import { useUserStore } from "@stores/user.store";
import { type UserCredentials } from "@/types/User";

const userStore = useUserStore();

// State management
const activeTab = ref("profile");
const expandedOrders = ref<string[]>([]);

const user = computed<UserCredentials | null>(() => userStore.userInfo);

// Methods
const setActiveTab = (tab: string) => {
  activeTab.value = tab;
};

const toggleOrderExpand = (orderId: string) => {
  if (expandedOrders.value.includes(orderId)) {
    expandedOrders.value = expandedOrders.value.filter((id) => id !== orderId);
  } else {
    expandedOrders.value.push(orderId);
  }
};

// Dummy order data exactly matching the NextJS reference
const pendingOrders = ref([
  {
    id: "JP-123456",
    date: "May 15, 2023",
    status: "Processing",
    total: 89.0,
    items: [
      {
        id: "1",
        name: "Ceramic Tea Set",
        quantity: 1,
        price: 89.0,
        image: null,
      },
    ],
  },
]);

const orderHistory = ref([
  {
    id: "JP-987654",
    date: "April 2, 2023",
    status: "Delivered",
    total: 125.0,
    items: [
      {
        id: "2",
        name: "Linen Throw Blanket",
        price: 65.0,
        quantity: 1,
        image: null,
      },
      {
        id: "5",
        name: "Natural Incense Set",
        price: 28.0,
        quantity: 1,
        image: null,
      },
      {
        id: "7",
        name: "Wooden Chopstick Set",
        price: 32.0,
        quantity: 1,
        image: null,
      },
    ],
  },
  {
    id: "JP-876543",
    date: "February 18, 2023",
    status: "Delivered",
    total: 133.0,
    items: [
      {
        id: "4",
        name: "Meditation Cushion",
        price: 55.0,
        quantity: 1,
        image: null,
      },
      {
        id: "6",
        name: "Linen Kimono Robe",
        price: 78.0,
        quantity: 1,
        image: null,
      },
    ],
  },
]);
</script>

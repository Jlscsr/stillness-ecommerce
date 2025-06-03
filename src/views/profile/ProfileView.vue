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
import { useRoute, useRouter } from "vue-router";

import AccountSidebar from "@/components/profile/AccountSidebar.vue";
import AccountInfo from "@/components/profile/AccountInfo.vue";
import AccountOrders from "@/components/profile/AccountOrders.vue";

import { useUserStore } from "@stores/user.store";
import { useUserOrdersStore } from "@stores/userOrders.store";
import { type UserCredentials } from "@/types/User";

const userStore = useUserStore();
const userOrdersStore = useUserOrdersStore();
const route = useRoute();
const router = useRouter();

// State management
const activeTab = ref((route.query.tab as string) || "profile");
const expandedOrders = ref<string[]>([]);

const user = computed<UserCredentials | null>(() => {
  if (!userStore.userInfo) return null;
  return userStore.userInfo as unknown as UserCredentials;
});
const pendingOrders = computed(() => userOrdersStore.pendingOrders);
const orderHistory = computed(() => userOrdersStore.orderHistory);

// Methods
const setActiveTab = (tab: string) => {
  router.push({ name: "profile", query: { tab } });
  activeTab.value = tab;
};

const toggleOrderExpand = (orderId: string) => {
  if (expandedOrders.value.includes(orderId)) {
    expandedOrders.value = expandedOrders.value.filter((id) => id !== orderId);
  } else {
    expandedOrders.value.push(orderId);
  }
};
</script>

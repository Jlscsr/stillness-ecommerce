<template>
  <div>
    <div class="flex items-center mb-6">
      <div
        class="w-12 h-12 bg-beige/30 rounded-full flex items-center justify-center mr-3"
      >
        <User class="h-6 w-6 text-charcoal/70" />
      </div>
      <div>
        <h2 class="text-lg font-medium text-charcoal">
          {{ user.fullName || "Guest" }}
        </h2>
        <p class="text-sm text-charcoal/60">
          Member since
          {{ memberSince(user?.createdAt) || "N/A" }}
        </p>
      </div>
    </div>

    <nav class="space-y-1">
      <button
        @click="$emit('setTab', 'profile')"
        class="w-full flex items-center px-3 py-2 text-sm rounded-sm transition-colors"
        :class="
          activeTab === 'profile'
            ? 'bg-beige/20 text-charcoal font-medium'
            : 'text-charcoal/70 hover:bg-beige/10 hover:text-charcoal'
        "
      >
        <User class="h-4 w-4 mr-3" />
        Profile
      </button>

      <button
        @click="$emit('setTab', 'orders')"
        class="w-full flex items-center px-3 py-2 text-sm rounded-sm transition-colors"
        :class="
          activeTab === 'orders'
            ? 'bg-beige/20 text-charcoal font-medium'
            : 'text-charcoal/70 hover:bg-beige/10 hover:text-charcoal'
        "
      >
        <Package class="h-4 w-4 mr-3" />
        Orders
      </button>

      <router-link
        to="/cart"
        class="w-full flex items-center px-3 py-2 text-sm rounded-sm text-charcoal/70 hover:bg-beige/10 hover:text-charcoal transition-colors"
      >
        <ShoppingBag class="h-4 w-4 mr-3" />
        Cart
      </router-link>

      <button
        @click="logout"
        class="w-full flex items-center px-3 py-2 text-sm rounded-sm text-charcoal/70 hover:bg-beige/10 hover:text-charcoal transition-colors"
      >
        <LogOut class="h-4 w-4 mr-3" />
        Logout
      </button>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { User, Package, ShoppingBag, LogOut } from "lucide-vue-next";
import { useAuthStore } from "@/stores/auth.store";

// Props
interface Props {
  user: {
    fullName: string;
    createdAt: Date | string | undefined;
  };
  activeTab: string;
}

withDefaults(defineProps<Props>(), {
  activeTab: "profile",
});

// Emits
defineEmits(["setTab"]);

// Setup
const router = useRouter();
const authStore = useAuthStore();

const memberSince = (date: Date | string | undefined) => {
  if (!date) return "N/A";
  const createdAt = new Date(date);
  const now = new Date();
  const diff = now.getFullYear() - createdAt.getFullYear();
  return diff > 0
    ? `${diff} year${diff > 1 ? "s" : ""} ago`
    : "Less than a year";
};

// Methods
const logout = () => {
  authStore.logoutUser();
  router.push("/");
};
</script>

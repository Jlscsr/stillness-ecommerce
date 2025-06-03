<template>
  <div>
    <!-- Pending Orders Section -->
    <div class="bg-cream border border-charcoal/10 rounded-sm p-6 mb-8">
      <h2 class="text-xl font-medium text-charcoal mb-6">Pending Orders</h2>

      <div v-if="pendingOrders.length > 0" class="space-y-4">
        <div
          v-for="order in pendingOrders"
          :key="order._id"
          class="border border-charcoal/10 rounded-sm overflow-hidden"
        >
          <div
            class="bg-beige/10 p-4 flex flex-wrap items-center justify-between cursor-pointer"
            @click="$emit('toggleOrder', order._id)"
          >
            <div>
              <p class="text-sm font-medium text-charcoal">
                Order # {{ order.orderNumber }}
              </p>
              <p class="text-xs text-charcoal/60">
                Placed on {{ formatDate(order.createdAt) }}
              </p>
            </div>
            <div class="flex items-center">
              <div class="flex items-center mr-4">
                <Clock class="h-4 w-4 text-sage mr-1" />
                <span class="text-sm text-sage">{{ order.orderStatus }}</span>
              </div>
              <button
                class="text-charcoal/70 hover:text-charcoal transition-colors"
                aria-label="Toggle order details"
              >
                <ChevronDown
                  class="h-5 w-5 transition-transform"
                  :class="{
                    'rotate-180':
                      order._id && expandedOrders.includes(order._id),
                  }"
                />
              </button>
            </div>
          </div>

          <div
            v-if="order._id && expandedOrders.includes(order._id)"
            class="p-4"
          >
            <ul class="divide-y divide-charcoal/10">
              <li
                v-for="item in order.orderItems"
                :key="item._id"
                class="py-3 flex items-center"
              >
                <div
                  class="h-16 w-16 flex-shrink-0 overflow-hidden rounded-sm bg-cream mr-4 flex items-center justify-center"
                >
                  <img
                    v-if="item.image"
                    :src="item.image.src"
                    :alt="item.image.alt"
                    class="h-full w-full object-cover object-center"
                  />
                  <div v-else class="w-12 h-12 bg-beige/20"></div>
                </div>
                <div class="flex-1">
                  <h3 class="text-sm font-medium text-charcoal">
                    {{ item.name }}
                  </h3>
                  <p class="text-xs text-charcoal/60">
                    Quantity: {{ item.quantity }}
                  </p>
                </div>
                <div class="text-sm font-medium text-charcoal">
                  ${{ item.total.toFixed(2) }}
                </div>
              </li>
            </ul>

            <div
              class="mt-4 pt-4 border-t border-charcoal/10 flex justify-between"
            >
              <span class="text-sm font-medium text-charcoal">Total</span>
              <span class="text-sm font-medium text-charcoal"
                >${{ order.totalAmount.toFixed(2) }}</span
              >
            </div>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-8">
        <Package class="h-12 w-12 text-charcoal/30 mx-auto mb-4" />
        <p class="text-charcoal/70">You don't have any pending orders.</p>
      </div>
    </div>

    <!-- Order History Section -->
    <div class="bg-cream border border-charcoal/10 rounded-sm p-6">
      <h2 class="text-xl font-medium text-charcoal mb-6">Order History</h2>

      <div v-if="orderHistory.length > 0" class="space-y-4">
        <div
          v-for="order in orderHistory"
          :key="order._id"
          class="border border-charcoal/10 rounded-sm overflow-hidden"
        >
          <div
            class="bg-beige/10 p-4 flex flex-wrap items-center justify-between cursor-pointer"
            @click="$emit('toggleOrder', order._id)"
          >
            <div>
              <p class="text-sm font-medium text-charcoal">
                Order #{{ order.orderNumber }}
              </p>
              <p class="text-xs text-charcoal/60">
                Placed on {{ formatDate(order.createdAt) }}
              </p>
            </div>
            <div class="flex items-center">
              <div class="flex items-center mr-4">
                <CheckCircle class="h-4 w-4 text-sage mr-1" />
                <span class="text-sm text-sage">{{ order.orderStatus }}</span>
              </div>
              <button
                class="text-charcoal/70 hover:text-charcoal transition-colors"
                aria-label="Toggle order details"
              >
                <ChevronDown
                  class="h-5 w-5 transition-transform"
                  :class="{
                    'rotate-180':
                      order._id && expandedOrders.includes(order._id),
                  }"
                />
              </button>
            </div>
          </div>

          <div
            v-if="order._id && expandedOrders.includes(order._id)"
            class="p-4"
          >
            <ul class="divide-y divide-charcoal/10">
              <li
                v-for="item in order.orderItems"
                :key="item._id"
                class="py-3 flex items-center"
              >
                <div
                  class="h-16 w-16 flex-shrink-0 overflow-hidden rounded-sm bg-cream mr-4 flex items-center justify-center"
                >
                  <img
                    v-if="item.image"
                    :src="item.image.src"
                    :alt="item.image.alt"
                    class="h-full w-full object-cover object-center"
                  />
                  <div v-else class="w-12 h-12 bg-beige/20"></div>
                </div>
                <div class="flex-1">
                  <h3 class="text-sm font-medium text-charcoal">
                    {{ item.name }}
                  </h3>
                  <p class="text-xs text-charcoal/60">
                    Quantity: {{ item.quantity }}
                  </p>
                </div>
                <div class="text-sm font-medium text-charcoal">
                  ${{ item.total.toFixed(2) }}
                </div>
              </li>
            </ul>

            <div
              class="mt-4 pt-4 border-t border-charcoal/10 flex justify-between"
            >
              <span class="text-sm font-medium text-charcoal">Total</span>
              <span class="text-sm font-medium text-charcoal"
                >${{ order.totalAmount.toFixed(2) }}</span
              >
            </div>

            <div class="mt-4 flex justify-end">
              <button
                class="text-sm text-sage hover:text-sage/80 transition-colors"
              >
                View Order Details
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-8">
        <Package class="h-12 w-12 text-charcoal/30 mx-auto mb-4" />
        <p class="text-charcoal/70">You don't have any order history yet.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Package, CheckCircle, Clock, ChevronDown } from "lucide-vue-next";
import { type Order } from "@/types/Order";

// Props
interface Props {
  pendingOrders: Order[];
  orderHistory: Order[];
  expandedOrders: string[];
}

// Define props with defaults
withDefaults(defineProps<Props>(), {
  pendingOrders: () => [],
  orderHistory: () => [],
  expandedOrders: () => [],
});

// Emits for parent component communication
defineEmits(["toggleOrder"]);

const formatDate = (date: Date | string | undefined): string => {
  if (!date) return "";
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  return new Date(date).toLocaleDateString("en-US", options);
};
</script>

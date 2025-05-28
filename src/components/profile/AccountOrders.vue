<template>
  <div>
    <!-- Pending Orders Section -->
    <div class="bg-cream border border-charcoal/10 rounded-sm p-6 mb-8">
      <h2 class="text-xl font-medium text-charcoal mb-6">Pending Orders</h2>
      
      <div v-if="pendingOrders.length > 0" class="space-y-4">
        <div v-for="order in pendingOrders" :key="order.id" class="border border-charcoal/10 rounded-sm overflow-hidden">
          <div 
            class="bg-beige/10 p-4 flex flex-wrap items-center justify-between cursor-pointer"
            @click="$emit('toggleOrder', order.id)"
          >
            <div>
              <p class="text-sm font-medium text-charcoal">Order #{{ order.id }}</p>
              <p class="text-xs text-charcoal/60">Placed on {{ order.date }}</p>
            </div>
            <div class="flex items-center">
              <div class="flex items-center mr-4">
                <Clock class="h-4 w-4 text-sage mr-1" />
                <span class="text-sm text-sage">{{ order.status }}</span>
              </div>
              <button 
                class="text-charcoal/70 hover:text-charcoal transition-colors"
                aria-label="Toggle order details"
              >
                <ChevronDown 
                  class="h-5 w-5 transition-transform"
                  :class="{ 'rotate-180': expandedOrders.includes(order.id) }"
                />
              </button>
            </div>
          </div>
          
          <div v-if="expandedOrders.includes(order.id)" class="p-4">
            <ul class="divide-y divide-charcoal/10">
              <li v-for="item in order.items" :key="item.id" class="py-3 flex items-center">
                <div class="h-16 w-16 flex-shrink-0 overflow-hidden rounded-sm bg-cream mr-4 flex items-center justify-center">
                  <img 
                    v-if="item.image" 
                    :src="item.image" 
                    :alt="item.name" 
                    class="h-full w-full object-cover object-center"
                  />
                  <div v-else class="w-12 h-12 bg-beige/20"></div>
                </div>
                <div class="flex-1">
                  <h3 class="text-sm font-medium text-charcoal">{{ item.name }}</h3>
                  <p class="text-xs text-charcoal/60">Quantity: {{ item.quantity }}</p>
                </div>
                <div class="text-sm font-medium text-charcoal">
                  ${{ (item.price * item.quantity).toFixed(2) }}
                </div>
              </li>
            </ul>
            
            <div class="mt-4 pt-4 border-t border-charcoal/10 flex justify-between">
              <span class="text-sm font-medium text-charcoal">Total</span>
              <span class="text-sm font-medium text-charcoal">${{ order.total.toFixed(2) }}</span>
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
        <div v-for="order in orderHistory" :key="order.id" class="border border-charcoal/10 rounded-sm overflow-hidden">
          <div 
            class="bg-beige/10 p-4 flex flex-wrap items-center justify-between cursor-pointer"
            @click="$emit('toggleOrder', order.id)"
          >
            <div>
              <p class="text-sm font-medium text-charcoal">Order #{{ order.id }}</p>
              <p class="text-xs text-charcoal/60">Placed on {{ order.date }}</p>
            </div>
            <div class="flex items-center">
              <div class="flex items-center mr-4">
                <CheckCircle class="h-4 w-4 text-sage mr-1" />
                <span class="text-sm text-sage">{{ order.status }}</span>
              </div>
              <button 
                class="text-charcoal/70 hover:text-charcoal transition-colors"
                aria-label="Toggle order details"
              >
                <ChevronDown 
                  class="h-5 w-5 transition-transform"
                  :class="{ 'rotate-180': expandedOrders.includes(order.id) }"
                />
              </button>
            </div>
          </div>
          
          <div v-if="expandedOrders.includes(order.id)" class="p-4">
            <ul class="divide-y divide-charcoal/10">
              <li v-for="item in order.items" :key="item.id" class="py-3 flex items-center">
                <div class="h-16 w-16 flex-shrink-0 overflow-hidden rounded-sm bg-cream mr-4 flex items-center justify-center">
                  <img 
                    v-if="item.image" 
                    :src="item.image" 
                    :alt="item.name" 
                    class="h-full w-full object-cover object-center"
                  />
                  <div v-else class="w-12 h-12 bg-beige/20"></div>
                </div>
                <div class="flex-1">
                  <h3 class="text-sm font-medium text-charcoal">{{ item.name }}</h3>
                  <p class="text-xs text-charcoal/60">Quantity: {{ item.quantity }}</p>
                </div>
                <div class="text-sm font-medium text-charcoal">
                  ${{ (item.price * item.quantity).toFixed(2) }}
                </div>
              </li>
            </ul>
            
            <div class="mt-4 pt-4 border-t border-charcoal/10 flex justify-between">
              <span class="text-sm font-medium text-charcoal">Total</span>
              <span class="text-sm font-medium text-charcoal">${{ order.total.toFixed(2) }}</span>
            </div>
            
            <div class="mt-4 flex justify-end">
              <button class="text-sm text-sage hover:text-sage/80 transition-colors">
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
import { Package, CheckCircle, Clock, ChevronDown } from 'lucide-vue-next';

// Define types
interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image?: string;
}

interface Order {
  id: string;
  date: string;
  status: string;
  items: OrderItem[];
  total: number;
}

// Props
interface Props {
  pendingOrders: Order[];
  orderHistory: Order[];
  expandedOrders: string[];
}

// Default props and dummy data
const props = withDefaults(defineProps<Props>(), {
  pendingOrders: () => [],
  orderHistory: () => [],
  expandedOrders: () => []
});

// Emits for parent component communication
defineEmits(['toggleOrder']);
</script>

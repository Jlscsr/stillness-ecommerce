import { defineStore } from "pinia";
import { computed, ref } from "vue";
import type { Order } from "@/types/Order";
import { addNewOrder, fetchUserOrders } from "@services/order.service";

export const useUserOrdersStore = defineStore("userOrders", () => {
  const userOrders = ref<Order[]>([]);
  const ordersCount = computed(() => userOrders.value.length);

  const pendingOrders = computed(() => {
    return userOrders.value.filter(
      (order) =>
        order.orderStatus !== "delivered" && order.orderStatus !== "cancelled"
    );
  });

  const orderHistory = computed(() => {
    return userOrders.value.filter(
      (order) =>
        order.orderStatus === "delivered" || order.orderStatus === "cancelled"
    );
  });

  const getUserOrders = async (): Promise<void> => {
    try {
      const response = await fetchUserOrders();

      if (!response.success) {
        throw new Error(response.message);
      }

      userOrders.value = response.data || [];
    } catch (error) {
      console.error("Failed to fetch user orders:", error);
    }
  };

  const addNewUserOrder = async (payload: object) => {
    try {
      const response = await addNewOrder(payload);

      if (!response.success) {
        return { success: false, message: response.message };
      }
      return {
        success: true,
        message: "Your order has been placed successfully!",
      };
    } catch (error) {
      return { success: false, message: "Failed to place order." };
    }
  };
  return {
    userOrders,
    ordersCount,
    pendingOrders,
    orderHistory,
    getUserOrders,
    addNewUserOrder,
  };
});

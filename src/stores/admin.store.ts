import { defineStore } from "pinia";
import { computed, ref } from "vue";
import type { UserResponse } from "@/types/User";
import type { Order } from "@/types/Order";
import { getUsers } from "@/services/user.service";
import { getOrders } from "@/services/order.service";

export const useAdminStore = defineStore("admin", () => {
  const users = ref<UserResponse[] | []>([]);
  const orders = ref<Order[] | []>([]);

  const dashboardData = computed(() => {
    const totalUsers = users.value.length;
    const totalOrders = orders.value.length;
    const totalRevenue = orders.value.reduce(
      (sum, order) => sum + order.totalAmount,
      0
    );

    return {
      totalUsers,
      totalOrders,
      totalRevenue,
    };
  });

  const fetchUsers = async () => {
    try {
      const response = await getUsers();

      if (!response.success) {
        return {
          success: false,
          message: response.message,
        };
      }
      users.value = response.data || [];
      return {
        success: true,
        message: "Users fetched successfully.",
      };
    } catch (error) {
      return {
        success: false,
        message: "Failed to fetch users.",
      };
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await getOrders();

      if (!response.success) {
        return {
          success: false,
          message: response.message,
        };
      }
      orders.value = response.data || [];
      return {
        success: true,
        message: "Orders fetched successfully.",
      };
    } catch (error) {
      return {
        success: false,
        message: "Failed to fetch orders.",
      };
    }
  };
  return {
    users,
    orders,
    dashboardData,
    fetchUsers,
    fetchOrders,
  };
});

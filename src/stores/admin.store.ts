import { defineStore } from "pinia";
import { computed, ref } from "vue";
import type { UserResponse } from "@/types/User";
import type { Order } from "@/types/Order";
import { getUsers } from "@/services/user.service";
import {
  getOrders,
  updateOrderPaymentStatus,
  updateOrderStatus,
} from "@/services/order.service";
import { addProduct, deleteProduct, updateProduct } from "@/services/product.service";
import type { ProductRequestBody } from "@/types/Product";

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

  const updateUserOrderPaymentStatus = async (
    orderId: string,
    newPaymentStatus: string
  ): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await updateOrderPaymentStatus(orderId, {
        paymentStatus: newPaymentStatus,
      });

      if (!response.success) {
        return {
          success: false,
          message: response.message,
        };
      }

      return {
        success: true,
        message: "Order payment status updated successfully.",
      };
    } catch (error) {
      return {
        success: false,
        message: "Failed to update order payment status.",
      };
    }
  };

  const updateUserOrderStatus = async (
    orderId: string,
    newOrderStatus: string
  ): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await updateOrderStatus(orderId, {
        orderStatus: newOrderStatus,
      });
      if (!response.success) {
        return {
          success: false,
          message: response.message,
        };
      }

      await fetchOrders();
      return {
        success: true,
        message: "Order status updated successfully.",
      };
    } catch (error) {
      return {
        success: false,
        message: "Failed to update order status.",
      };
    }
  };

  const addNewProduct = async (
    payload: ProductRequestBody
  ): Promise<{
    success: boolean;
    message: string;
  }> => {
    try {
      const response = await addProduct(payload);
      if (!response.success) {
        return {
          success: false,
          message: response.message,
        };
      }
      return {
        success: true,
        message: "Product added successfully.",
      };
    } catch (error) {
      return {
        success: false,
        message: "Failed to add product.",
      };
    }
  };

  const deleteSelectedProduct = async (
    productId: string
  ): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await deleteProduct(productId);
      if (!response.success) {
        return {
          success: false,
          message: response.message,
        };
      }
      return {
        success: true,
        message: "Product deleted successfully.",
      };
    } catch (error) {
      return {
        success: false,
        message: "Failed to delete product.",
      };
    }
  };

  const updateProductData = async (
    productId: string,
    payload: ProductRequestBody
  ): Promise<{
    success: boolean;
    message: string;
  }> => {
    try {
      const response = await updateProduct(productId, payload);
      if (!response.success) {
        return {
          success: false,
          message: response.message,
        };
      }
      return {
        success: true,
        message: "Product updated successfully.",
      };
    } catch (error) {
      return {
        success: false,
        message: "Failed to update product.",
      };
    }
  };
  return {
    users,
    orders,
    dashboardData,
    fetchUsers,
    fetchOrders,
    updateUserOrderPaymentStatus,
    updateUserOrderStatus,
    deleteSelectedProduct,
    addNewProduct,
    updateProductData,
  };
});

<template>
  <div class="p-6">
    <h1 class="text-2xl font-light text-charcoal mb-6">Order Management</h1>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      <div
        class="bg-white rounded-lg shadow-sm border border-charcoal/10 bg-charcoal/5"
      >
        <div class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-charcoal/70">All Orders</p>
              <h3 class="text-2xl font-light text-charcoal mt-1">
                {{ orders.length }}
              </h3>
            </div>
            <div class="bg-charcoal/10 p-2 rounded-full">
              <Package class="h-5 w-5 text-charcoal/70" />
            </div>
          </div>
        </div>
      </div>
      <div
        class="bg-white rounded-lg shadow-sm border border-charcoal/10 bg-dusty-blue/5"
      >
        <div class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-charcoal/70">Processing</p>
              <h3 class="text-2xl font-light text-charcoal mt-1">
                {{ processingCount }}
              </h3>
            </div>
            <div class="bg-dusty-blue/10 p-2 rounded-full">
              <Clock class="h-5 w-5 text-dusty-blue" />
            </div>
          </div>
        </div>
      </div>
      <div
        class="bg-white rounded-lg shadow-sm border border-charcoal/10 bg-sage/5"
      >
        <div class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-charcoal/70">Delivered</p>
              <h3 class="text-2xl font-light text-charcoal mt-1">
                {{ deliveredCount }}
              </h3>
            </div>
            <div class="bg-sage/10 p-2 rounded-full">
              <CheckCircle class="h-5 w-5 text-sage" />
            </div>
          </div>
        </div>
      </div>
      <div
        class="bg-white rounded-lg shadow-sm border border-charcoal/10 bg-terracotta/5"
      >
        <div class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-charcoal/70">Cancelled</p>
              <h3 class="text-2xl font-light text-charcoal mt-1">
                {{ cancelledCount }}
              </h3>
            </div>
            <div class="bg-terracotta/10 p-2 rounded-full">
              <XCircle class="h-5 w-5 text-terracotta" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-sm border border-charcoal/10 mb-6">
      <div class="p-6 pb-2">
        <h3 class="text-lg font-medium text-charcoal">Active Orders</h3>
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
              placeholder="Search orders..."
              v-model="searchQuery"
              class="w-full py-2 px-4 pl-9 border border-charcoal/20 rounded-md focus:outline-none focus:ring-1 focus:ring-sage focus:border-sage"
            />
          </div>
          <div class="flex gap-2">
            <div class="relative">
              <button
                @click="toggleStatusDropdown"
                class="flex items-center justify-between px-4 py-2 w-[160px] border border-charcoal/20 rounded-md text-charcoal hover:bg-cream"
              >
                <div class="flex items-center">
                  <Filter class="h-4 w-4 mr-2" />
                  <template v-if="selectedStatus === 'all'">
                    All Statuses
                  </template>
                  <span v-else class="flex items-center">
                    <component
                      :is="getStatusIcon(selectedStatus)"
                      class="h-3 w-3 mr-1"
                    />
                    <span class="capitalize">{{ selectedStatus }}</span>
                  </span>
                </div>
                <ChevronDown class="h-4 w-4 opacity-50" />
              </button>
              <div
                v-if="showStatusDropdown"
                class="absolute right-0 z-10 mt-1 w-[160px] rounded-md bg-white shadow-lg border border-charcoal/10"
              >
                <div class="py-1">
                  <button
                    @click="selectStatus('all')"
                    class="w-full flex items-center text-left px-4 py-2 text-sm text-charcoal hover:bg-cream"
                  >
                    All Statuses
                  </button>
                  <button
                    @click="selectStatus('pending')"
                    class="w-full flex items-center text-left px-4 py-2 text-sm text-charcoal hover:bg-cream"
                  >
                    <Clock class="h-4 w-4 mr-2" />
                    Pending
                  </button>
                  <button
                    @click="selectStatus('processing')"
                    class="w-full flex items-center text-left px-4 py-2 text-sm text-charcoal hover:bg-cream"
                  >
                    <Package class="h-4 w-4 mr-2" />
                    Processing
                  </button>
                  <button
                    @click="selectStatus('shipped')"
                    class="w-full flex items-center text-left px-4 py-2 text-sm text-charcoal hover:bg-cream"
                  >
                    <Truck class="h-4 w-4 mr-2" />
                    Shipped
                  </button>
                  <button
                    @click="selectStatus('delivered')"
                    class="w-full flex items-center text-left px-4 py-2 text-sm text-charcoal hover:bg-cream"
                  >
                    <CheckCircle class="h-4 w-4 mr-2" />
                    Delivered
                  </button>
                  <button
                    @click="selectStatus('cancelled')"
                    class="w-full flex items-center text-left px-4 py-2 text-sm text-charcoal hover:bg-cream"
                  >
                    <XCircle class="h-4 w-4 mr-2" />
                    Cancelled
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Orders Table -->
        <div
          class="rounded-md border overflow-hidden max-h[600px] overflow-y-auto"
        >
          <table class="min-w-full divide-y divide-charcoal/10">
            <thead class="bg-cream">
              <tr>
                <th
                  @click="handleSort('_id')"
                  class="px-4 py-3 text-left text-xs font-medium text-charcoal/70 uppercase tracking-wider cursor-pointer"
                >
                  <div class="flex items-center">
                    Order ID
                    <ArrowUpDown class="ml-2 h-4 w-4" />
                  </div>
                </th>
                <th
                  @click="handleSort('createdAt')"
                  class="px-4 py-3 text-left text-xs font-medium text-charcoal/70 uppercase tracking-wider cursor-pointer"
                >
                  <div class="flex items-center">
                    Date
                    <ArrowUpDown class="ml-2 h-4 w-4" />
                  </div>
                </th>
                <th
                  @click="handleSort('shippingInformation')"
                  class="px-4 py-3 text-left text-xs font-medium text-charcoal/70 uppercase tracking-wider cursor-pointer"
                >
                  <div class="flex items-center">
                    Customer
                    <ArrowUpDown class="ml-2 h-4 w-4" />
                  </div>
                </th>
                <th
                  @click="handleSort('totalAmount')"
                  class="px-4 py-3 text-left text-xs font-medium text-charcoal/70 uppercase tracking-wider cursor-pointer"
                >
                  <div class="flex items-center">
                    Total
                    <ArrowUpDown class="ml-2 h-4 w-4" />
                  </div>
                </th>
                <th
                  class="px-4 py-3 text-left text-xs font-medium text-charcoal/70 uppercase tracking-wider"
                >
                  Payment
                </th>
                <th
                  class="px-4 py-3 text-left text-xs font-medium text-charcoal/70 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  class="px-4 py-3 text-right text-xs font-medium text-charcoal/70 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-charcoal/10">
              <tr v-if="filteredOrders.length === 0">
                <td colspan="7" class="text-center py-10 text-charcoal/70">
                  No orders found
                </td>
              </tr>
              <tr
                v-for="order in filteredOrders"
                :key="order._id"
                class="hover:bg-cream/50"
              >
                <td class="px-4 py-4 whitespace-nowrap font-medium">
                  {{ order.orderNumber }}
                </td>
                <td class="px-4 py-4 whitespace-nowrap">
                  {{ formatDate(order.createdAt) }}
                </td>
                <td class="px-4 py-4 whitespace-nowrap">
                  <div class="font-medium">
                    {{ order.shippingInformation.firstName }}
                    {{ order.shippingInformation.lastName }}
                  </div>
                  <div class="text-xs text-charcoal/60">
                    {{ order.shippingInformation.email }}
                  </div>
                </td>
                <td class="px-4 py-4 whitespace-nowrap">
                  ${{ order.totalAmount.toFixed(2) }}
                </td>
                <td class="px-4 py-4 whitespace-nowrap">
                  <span
                    class="inline-flex items-center px-2 py-1 rounded-full border border-charcoal/20 text-xs capitalize"
                  >
                    {{ order.paymentMethod.replace("_", " ") }}
                  </span>
                </td>
                <td class="px-4 py-4 whitespace-nowrap">
                  <span
                    :class="[
                      'inline-flex items-center px-2 py-1 rounded-full text-xs capitalize',
                      getStatusColor(order.orderStatus),
                    ]"
                  >
                    <component
                      :is="getStatusIcon(order.orderStatus)"
                      class="h-3 w-3 mr-1"
                    />
                    {{ order.orderStatus }}
                  </span>
                </td>
                <td class="px-4 py-4 whitespace-nowrap text-right">
                  <div class="relative">
                    <button
                      @click="toggleActionDropdown(order._id ? order._id : '')"
                      class="h-8 w-8 p-0 rounded-full hover:bg-cream flex items-center justify-center"
                    >
                      <span class="sr-only">Open menu</span>
                      <MoreHorizontal class="h-4 w-4" />
                    </button>
                    <div
                      v-if="activeActionDropdown === order._id"
                      class="absolute right-0 z-10 mt-1 w-[160px] rounded-md bg-white shadow-lg border border-charcoal/10"
                    >
                      <div class="py-1">
                        <button
                          @click="openOrderDetailsDialog(order)"
                          class="w-full flex items-center text-left px-4 py-2 text-sm text-charcoal hover:bg-cream"
                        >
                          <Eye class="mr-2 h-4 w-4" />
                          View Details
                        </button>
                        <button
                          @click="openUpdateDialog(order)"
                          class="w-full flex items-center text-left px-4 py-2 text-sm text-charcoal hover:bg-cream"
                        >
                          <Pencil class="mr-2 h-4 w-4" />
                          Update Status
                        </button>
                        <button
                          v-if="order.paymentStatus !== 'paid'"
                          @click="openPaymentStatusDialog(order)"
                          class="w-full flex items-center text-left px-4 py-2 text-sm text-charcoal hover:bg-cream"
                        >
                          <CreditCard class="mr-2 h-4 w-4" />
                          Update Payment
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

    <!-- Status Update Dialog -->
    <div v-if="updateDialogOpen" class="fixed inset-0 z-50 overflow-y-auto">
      <div
        class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0"
      >
        <div
          class="fixed inset-0 transition-opacity"
          @click="updateDialogOpen = false"
        >
          <div class="absolute inset-0 bg-charcoal/30"></div>
        </div>

        <!-- Dialog Panel -->
        <div
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        >
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 class="text-lg leading-6 font-medium text-charcoal">
                  Update Order Status
                </h3>
                <p class="text-sm text-charcoal/70 mt-1">
                  Change the status for order {{ orderToUpdate?._id }}
                </p>
              </div>
            </div>

            <div v-if="orderToUpdate" class="mt-4 space-y-4">
              <div>
                <p class="text-sm font-medium text-charcoal mb-2">
                  Order Details
                </p>
                <div class="bg-cream p-3 rounded-sm text-sm">
                  <p>
                    <span class="text-charcoal/60">Customer:</span>
                    {{ orderToUpdate.shippingInformation.firstName }}
                    {{ orderToUpdate.shippingInformation.lastName }}
                  </p>
                  <p>
                    <span class="text-charcoal/60">Total:</span> ${{
                      orderToUpdate.totalAmount.toFixed(2)
                    }}
                  </p>
                  <p>
                    <span class="text-charcoal/60">Date:</span>
                    {{ formatDate(orderToUpdate.createdAt) }}
                  </p>
                </div>
              </div>

              <div class="space-y-2">
                <label class="text-sm font-medium text-charcoal">Status</label>
                <div class="relative">
                  <select
                    v-model="newStatus"
                    class="w-full p-2 border border-charcoal/20 rounded-md focus:outline-none focus:ring-1 focus:ring-sage focus:border-sage appearance-none"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <ChevronDown
                    class="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 pointer-events-none text-charcoal/50"
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            class="bg-cream/50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"
          >
            <button
              type="button"
              @click="confirmStatusUpdate"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-sage text-base font-medium text-white hover:bg-sage/90 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
            >
              Update
            </button>
            <button
              type="button"
              @click="updateDialogOpen = false"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-charcoal/20 shadow-sm px-4 py-2 bg-white text-base font-medium text-charcoal hover:bg-cream focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Payment Status Update Dialog -->
  <div
    v-if="paymentStatusDialogOpen"
    class="fixed inset-0 bg-charcoal/50 flex items-center justify-center z-50 p-4"
  >
    <div class="bg-white rounded-lg shadow-lg w-full max-w-md">
      <div class="p-6 border-b border-charcoal/10">
        <h2 class="text-xl font-light text-charcoal">Update Payment Status</h2>
      </div>
      <div class="p-6">
        <p class="mb-4 text-charcoal">
          Order #{{ orderToUpdatePayment?.orderNumber }}
        </p>
        <div class="mb-4">
          <label class="block text-sm font-medium text-charcoal mb-2">
            Payment Status
          </label>
          <div class="flex gap-3">
            <button
              @click="newPaymentStatus = 'pending'"
              class="flex-1 px-4 py-2 rounded-md text-charcoal border"
              :class="
                newPaymentStatus === 'pending'
                  ? 'bg-dusty-blue/10 border-dusty-blue/50'
                  : 'border-charcoal/20 hover:bg-cream'
              "
            >
              <div class="flex justify-center items-center gap-2">
                <Clock
                  class="h-4 w-4"
                  :class="
                    newPaymentStatus === 'pending' ? 'text-dusty-blue' : ''
                  "
                />
                <span>Pending</span>
              </div>
            </button>
            <button
              @click="newPaymentStatus = 'paid'"
              class="flex-1 px-4 py-2 rounded-md text-charcoal border"
              :class="
                newPaymentStatus === 'paid'
                  ? 'bg-sage/10 border-sage/50'
                  : 'border-charcoal/20 hover:bg-cream'
              "
            >
              <div class="flex justify-center items-center gap-2">
                <DollarSign
                  class="h-4 w-4"
                  :class="newPaymentStatus === 'paid' ? 'text-sage' : ''"
                />
                <span>Paid</span>
              </div>
            </button>
          </div>
        </div>
      </div>
      <div class="p-4 border-t border-charcoal/10 flex justify-end gap-2">
        <button
          @click="cancelPaymentStatusUpdate"
          class="px-4 py-2 border border-charcoal/20 rounded-md text-charcoal hover:bg-cream"
        >
          Cancel
        </button>
        <button
          @click="confirmPaymentStatusUpdate"
          class="px-4 py-2 bg-beige text-charcoal rounded-md hover:bg-beige/90"
        >
          Update
        </button>
      </div>
    </div>
  </div>

  <!-- Order Details Dialog -->
  <div
    v-if="showOrderDetailsDialog"
    class="fixed inset-0 bg-charcoal/50 flex items-center justify-center z-50 p-4"
  >
    <div
      class="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto"
    >
      <!-- Dialog Header -->
      <div
        class="p-6 border-b border-charcoal/10 flex justify-between items-center"
      >
        <h2 class="text-xl font-light text-charcoal">
          Order #{{ selectedOrder?.orderNumber }}
        </h2>
        <button
          @click="closeOrderDetailsDialog"
          class="h-8 w-8 rounded-full hover:bg-cream flex items-center justify-center"
        >
          <span class="sr-only">Close</span>
          <X class="h-5 w-5" />
        </button>
      </div>

      <!-- Dialog Content -->
      <div class="p-6" v-if="selectedOrder">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Order Status Section -->
          <div class="lg:col-span-3">
            <div
              class="bg-cream/30 p-4 rounded-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
            >
              <div>
                <div class="flex items-center gap-2">
                  <component
                    :is="getStatusIcon(selectedOrder.orderStatus as OrderStatus)"
                    class="h-5 w-5"
                    :class="getStatusColor(selectedOrder.orderStatus as OrderStatus).split(' ')[1]"
                  />
                  <span
                    class="inline-flex px-2 py-1 rounded-full text-xs"
                    :class="getStatusColor(selectedOrder.orderStatus as OrderStatus)"
                  >
                    {{
                      selectedOrder.orderStatus.charAt(0).toUpperCase() +
                      selectedOrder.orderStatus.slice(1)
                    }}
                  </span>
                </div>
                <p class="text-sm text-charcoal/70 mt-1">
                  Last updated: {{ formatDate(selectedOrder.updatedAt) }}
                </p>
              </div>
              <div class="flex flex-col sm:items-end">
                <div class="flex items-center gap-2">
                  <span class="text-sm text-charcoal/70">Payment:</span>
                  <span
                    class="inline-flex px-2 py-1 rounded-full text-xs"
                    :class="
                      selectedOrder.paymentStatus === 'paid'
                        ? 'bg-sage/10 text-sage'
                        : 'bg-dusty-blue/10 text-dusty-blue'
                    "
                  >
                    {{
                      selectedOrder.paymentStatus.charAt(0).toUpperCase() +
                      selectedOrder.paymentStatus.slice(1)
                    }}
                  </span>
                </div>
                <div class="flex items-center gap-2 mt-1">
                  <span class="text-sm text-charcoal/70">Method:</span>
                  <span class="text-sm text-charcoal">
                    {{
                      selectedOrder.paymentMethod === "cod"
                        ? "Cash on Delivery"
                        : "Online Payment"
                    }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Customer Information -->
          <div class="bg-white border border-charcoal/10 rounded-md p-4">
            <h3 class="text-md font-medium text-charcoal mb-3">
              Customer Information
            </h3>

            <div class="text-sm">
              <div class="mb-2">
                <div class="text-charcoal font-medium">
                  {{ selectedOrder.shippingInformation.firstName }}
                  {{ selectedOrder.shippingInformation.lastName }}
                </div>
                <div class="text-charcoal/70">
                  {{ selectedOrder.shippingInformation.email }}
                </div>
              </div>

              <div class="pt-2 border-t border-charcoal/10">
                <h4 class="text-sm font-medium text-charcoal mb-1">
                  Shipping Address
                </h4>
                <p class="text-charcoal/70">
                  {{ selectedOrder.shippingInformation.street }}<br />
                  {{ selectedOrder.shippingInformation.city }},
                  {{ selectedOrder.shippingInformation.postalCode }}<br />
                  {{ selectedOrder.shippingInformation.country }}
                </p>
              </div>
            </div>
          </div>

          <!-- Order Summary -->
          <div
            class="lg:col-span-2 bg-white border border-charcoal/10 rounded-md p-4"
          >
            <h3 class="text-md font-medium text-charcoal mb-3">
              Order Summary
            </h3>

            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-charcoal/10">
                <thead>
                  <tr>
                    <th
                      class="pb-2 text-left text-xs font-medium text-charcoal/70"
                    >
                      Product
                    </th>
                    <th
                      class="pb-2 text-center text-xs font-medium text-charcoal/70"
                    >
                      Quantity
                    </th>
                    <th
                      class="pb-2 text-right text-xs font-medium text-charcoal/70"
                    >
                      Price
                    </th>
                    <th
                      class="pb-2 text-right text-xs font-medium text-charcoal/70"
                    >
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-charcoal/10">
                  <tr v-for="item in selectedOrder.orderItems" :key="item._id">
                    <td class="py-3">
                      <div class="flex items-center">
                        <div class="h-12 w-12 flex-shrink-0 mr-3">
                          <img
                            :src="item.image.src"
                            :alt="item.image.alt"
                            class="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div>
                          <div class="text-sm font-medium text-charcoal">
                            {{ item.name }}
                          </div>
                          <div class="text-xs text-charcoal/60">
                            ID: {{ item.productId }}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="py-3 text-center text-sm text-charcoal">
                      {{ item.quantity }}
                    </td>
                    <td class="py-3 text-right text-sm text-charcoal">
                      ${{ item.priceAtTimeOfAddition.toFixed(2) }}
                    </td>
                    <td class="py-3 text-right text-sm text-charcoal">
                      ${{ item.total.toFixed(2) }}
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td
                      colspan="3"
                      class="pt-4 text-right text-sm font-medium text-charcoal"
                    >
                      Total:
                    </td>
                    <td
                      class="pt-4 text-right text-sm font-medium text-charcoal"
                    >
                      ${{ selectedOrder.totalAmount.toFixed(2) }}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          <!-- Order Timeline -->
          <div class="lg:col-span-3 mt-4">
            <div class="bg-white border border-charcoal/10 rounded-md p-4">
              <h3 class="text-md font-medium text-charcoal mb-3">
                Order Timeline
              </h3>

              <div class="relative">
                <!-- Timeline items would go here in a production app -->
                <div class="pl-6 border-l-2 border-sage pb-4">
                  <div
                    class="absolute left-0 w-4 h-4 bg-sage rounded-full"
                  ></div>
                  <p class="text-sm font-medium text-charcoal">Order Created</p>
                  <p class="text-xs text-charcoal/70">
                    {{ formatDate(selectedOrder.createdAt) }}
                  </p>
                </div>

                <div
                  v-if="selectedOrder.orderStatus !== 'pending'"
                  class="pl-6 border-l-2 border-dusty-blue pb-4"
                >
                  <div
                    class="absolute left-0 w-4 h-4 bg-dusty-blue rounded-full"
                  ></div>
                  <p class="text-sm font-medium text-charcoal">Processing</p>
                  <p class="text-xs text-charcoal/70">
                    Order confirmed and processing
                  </p>
                </div>

                <div
                  v-if="
                    selectedOrder.orderStatus === 'shipped' ||
                    selectedOrder.orderStatus === 'delivered'
                  "
                  class="pl-6 border-l-2 border-beige pb-4"
                >
                  <div
                    class="absolute left-0 w-4 h-4 bg-beige rounded-full"
                  ></div>
                  <p class="text-sm font-medium text-charcoal">Shipped</p>
                  <p class="text-xs text-charcoal/70">
                    Your order has been shipped
                  </p>
                </div>

                <div
                  v-if="selectedOrder.orderStatus === 'delivered'"
                  class="pl-6"
                >
                  <div
                    class="absolute left-0 w-4 h-4 bg-sage rounded-full"
                  ></div>
                  <p class="text-sm font-medium text-charcoal">Delivered</p>
                  <p class="text-xs text-charcoal/70">
                    Order successfully delivered
                  </p>
                </div>

                <div
                  v-if="selectedOrder.orderStatus === 'cancelled'"
                  class="pl-6"
                >
                  <div
                    class="absolute left-0 w-4 h-4 bg-terracotta rounded-full"
                  ></div>
                  <p class="text-sm font-medium text-charcoal">Cancelled</p>
                  <p class="text-xs text-charcoal/70">
                    Reason:
                    {{ selectedOrder.reasonOfCancellation || "Not specified" }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Dialog Footer -->
      <div class="p-4 border-t border-charcoal/10 flex justify-end gap-2">
        <button
          @click="closeOrderDetailsDialog"
          class="px-4 py-2 border border-charcoal/20 rounded-md text-charcoal hover:bg-cream"
        >
          Close
        </button>
        <button
          v-if="
            selectedOrder &&
            selectedOrder.orderStatus !== 'delivered' &&
            selectedOrder.orderStatus !== 'cancelled'
          "
          @click="openUpdateDialog(selectedOrder)"
          class="px-4 py-2 bg-beige text-charcoal rounded-md hover:bg-beige/90"
        >
          Update Status
        </button>
        <button
          v-if="selectedOrder && selectedOrder.paymentStatus !== 'paid'"
          @click="openPaymentStatusDialog(selectedOrder)"
          class="px-4 py-2 bg-cream text-charcoal rounded-md hover:bg-cream/80"
        >
          Update Payment
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, onUnmounted } from "vue";
import {
  Package,
  Search,
  Filter,
  ArrowUpDown,
  MoreHorizontal,
  Pencil,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
  Eye,
  X,
  CreditCard,
  DollarSign,
} from "lucide-vue-next";
import type { Order } from "@/types/Order";
import { useAdminStore } from "@/stores/admin.store";
import { useToastStore } from "@/stores/toast.store";

const adminStore = useAdminStore();
const toastStore = useToastStore();

// Types
type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

// State
const orders = computed(() => adminStore.orders);
const filteredOrders = ref<Order[]>([]);
const searchQuery = ref("");
const sortField = ref<keyof Order>("createdAt");
const sortDirection = ref<"asc" | "desc">("desc");
const selectedStatus = ref<OrderStatus | "all">("all");
const updateDialogOpen = ref(false);
const orderToUpdate = ref<Order | null>(null);
const newStatus = ref<OrderStatus | null>(null);
const showOrderDetailsDialog = ref(false);
const selectedOrder = ref<Order | null>(null);
const paymentStatusDialogOpen = ref(false);
const orderToUpdatePayment = ref<Order | null>(null);
const newPaymentStatus = ref<"pending" | "paid">("pending");

// UI state
const showStatusDropdown = ref(false);
const activeActionDropdown = ref<string | null>(null);

// Computed values
const processingCount = computed(
  () =>
    orders.value.filter(
      (o) => o.orderStatus === "pending" || o.orderStatus === "processing"
    ).length
);
const deliveredCount = computed(
  () => orders.value.filter((o) => o.orderStatus === "delivered").length
);
const cancelledCount = computed(
  () => orders.value.filter((o) => o.orderStatus === "cancelled").length
);

// Toggle dropdown visibility
const toggleStatusDropdown = () => {
  showStatusDropdown.value = !showStatusDropdown.value;
  activeActionDropdown.value = null;
};

const toggleActionDropdown = (orderId: string) => {
  if (activeActionDropdown.value === orderId) {
    activeActionDropdown.value = null;
  } else {
    activeActionDropdown.value = orderId;
  }
  showStatusDropdown.value = false;
};

// Close dropdowns when clicking outside
const closeDropdowns = () => {
  showStatusDropdown.value = false;
  activeActionDropdown.value = null;
};

// Event listener for closing dropdowns when clicking outside
onMounted(() => {
  document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    if (!target.closest(".relative")) {
      closeDropdowns();
    }
  });

  filteredOrders.value = [...orders.value];
});

// Cleanup listeners
onUnmounted(() => {
  document.removeEventListener("click", closeDropdowns);
});

// Select status
const selectStatus = (status: OrderStatus | "all") => {
  selectedStatus.value = status;
  showStatusDropdown.value = false;
};

// Handle sorting
const handleSort = (field: keyof Order) => {
  if (field === sortField.value) {
    sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
  } else {
    sortField.value = field;
    sortDirection.value = "desc";
  }
};

// Format date
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString();
};

// Get status color
const getStatusColor = (status: OrderStatus) => {
  switch (status) {
    case "pending":
      return "bg-charcoal/10 text-charcoal";
    case "confirmed":
      return "bg-dusty-blue/10 text-dusty-blue";
    case "processing":
      return "bg-dusty-blue/10 text-dusty-blue";
    case "shipped":
      return "bg-beige/20 text-beige";
    case "delivered":
      return "bg-sage/10 text-sage";
    case "cancelled":
      return "bg-terracotta/10 text-terracotta";
    default:
      return "bg-charcoal/10 text-charcoal";
  }
};

// Get status icon
const getStatusIcon = (status: OrderStatus) => {
  switch (status) {
    case "pending":
      return Clock;
    case "confirmed":
      return CheckCircle;
    case "processing":
      return Package;
    case "shipped":
      return Truck;
    case "delivered":
      return CheckCircle;
    case "cancelled":
      return XCircle;
    default:
      return Clock;
  }
};

// Order details dialog
const openOrderDetailsDialog = (order: Order) => {
  selectedOrder.value = order;
  showOrderDetailsDialog.value = true;
  activeActionDropdown.value = null;
};

const closeOrderDetailsDialog = () => {
  showOrderDetailsDialog.value = false;
  setTimeout(() => {
    selectedOrder.value = null;
  }, 200);
};

// Update order dialog
const openUpdateDialog = (order: Order) => {
  orderToUpdate.value = order;
  newStatus.value = order.orderStatus as OrderStatus;
  updateDialogOpen.value = true;

  // If coming from the details dialog, don't close it
  if (!showOrderDetailsDialog.value) {
    activeActionDropdown.value = null;
  }
};

// Payment status update dialog
const openPaymentStatusDialog = (order: Order) => {
  orderToUpdatePayment.value = order;
  newPaymentStatus.value = order.paymentStatus;
  paymentStatusDialogOpen.value = true;

  // If coming from the details dialog, don't close it
  if (!showOrderDetailsDialog.value) {
    activeActionDropdown.value = null;
  }
};

const cancelPaymentStatusUpdate = () => {
  paymentStatusDialogOpen.value = false;
  setTimeout(() => {
    orderToUpdatePayment.value = null;
  }, 200);
};

const confirmPaymentStatusUpdate = async () => {
  if (!orderToUpdatePayment.value || !orderToUpdatePayment.value._id) return;

  try {
    await adminStore.updateUserOrderPaymentStatus(
      orderToUpdatePayment.value._id,
      newPaymentStatus.value
    );

    // Update the local order in the list
    const index = filteredOrders.value.findIndex(
      (o) => o._id === orderToUpdatePayment.value?._id
    );

    if (index !== -1) {
      filteredOrders.value[index].paymentStatus = newPaymentStatus.value;
    }

    if (
      selectedOrder.value &&
      selectedOrder.value._id === orderToUpdatePayment.value._id
    ) {
      selectedOrder.value.paymentStatus = newPaymentStatus.value;
    }

    // Close the dialog
    paymentStatusDialogOpen.value = false;
    setTimeout(() => {
      orderToUpdatePayment.value = null;
    }, 200);

    // Show success message
    toastStore.success("Payment status updated successfully");
  } catch (error: any) {
    console.error("Error updating payment status:", error);
    toastStore.error(error?.message || "Failed to update payment status");
  }
};

// Confirm status update
const confirmStatusUpdate = async () => {
  if (orderToUpdate.value && newStatus.value && orderToUpdate.value._id) {
    const response = await adminStore.updateUserOrderStatus(
      orderToUpdate.value._id,
      newStatus.value
    );

    if (!response.success) {
      toastStore.error(response.message || "Failed to update order status");
      return;
    }

    // Update the local order in the list
    const index = filteredOrders.value.findIndex(
      (o) => o._id === orderToUpdate.value?._id
    );

    if (index !== -1) {
      filteredOrders.value[index].orderStatus = newStatus.value;
    }

    if (
      selectedOrder.value &&
      selectedOrder.value._id === orderToUpdate.value._id
    ) {
      selectedOrder.value.orderStatus = newStatus.value;
    }

    // Show success message
    toastStore.success("Order status updated successfully");

    // Close the dialog
    updateDialogOpen.value = false;
    orderToUpdate.value = null;
  }
};

// Filter and sort orders when query changes
watch(
  [searchQuery, sortField, sortDirection, selectedStatus],
  () => {
    let result = [...orders.value];

    // Filter by search query
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase();
      result = result.filter(
        (order) =>
          order._id?.toLowerCase().includes(query) ||
          order.shippingInformation.firstName.toLowerCase().includes(query) ||
          order.shippingInformation.lastName.toLowerCase().includes(query)
      );
    }

    // Filter by status
    if (selectedStatus.value !== "all") {
      result = result.filter(
        (order) => order.orderStatus === selectedStatus.value
      );
    }

    // Sort results
    result = result.sort((a, b) => {
      if (sortField.value === "createdAt") {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return sortDirection.value === "asc" ? dateA - dateB : dateB - dateA;
      }

      if (sortField.value === "totalAmount") {
        return sortDirection.value === "asc"
          ? a.totalAmount - b.totalAmount
          : b.totalAmount - a.totalAmount;
      }

      const aValue = a[sortField.value];
      const bValue = b[sortField.value];

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection.value === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return 0;
    });

    filteredOrders.value = result;
  },
  { immediate: true }
);
</script>

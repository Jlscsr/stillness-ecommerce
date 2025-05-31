export interface ShippingInformation {
  firstName: string;
  lastName: string;
  email: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface OrderItem {
  _id?: string;
  productId: string;
  name: string;
  image: {
    src: string;
    alt: string;
  };
  quantity: number;
  priceAtTimeOfAddition: number;
  total: number;
}

export interface Order {
  _id?: string;
  orderNumber: string;
  shippingInformation: ShippingInformation;
  orderItems: OrderItem[];
  paymentMethod: "cod" | "online";
  paymentStatus: "pending" | "paid";
  orderStatus:
    | "pending"
    | "confirmed"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled";
  reasonOfCancellation?: string;
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

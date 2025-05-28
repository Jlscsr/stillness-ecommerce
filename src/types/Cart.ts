export interface CartItem {
  productId: string;
  quantity: number;
  priceAtTimeOfAddition: number;
  image?: {
    _id: number;
    src: string;
    alt: string;
  };
  name?: string;
  updatedAt: Date;
  createdAt: Date;
}

export interface Cart {
  _id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  updatedAt: Date;
  createdAt: Date;
}

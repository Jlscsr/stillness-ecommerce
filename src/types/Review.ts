export interface Review {
  _id: string;
  productId: string;
  name: string;
  email: string;
  rating: number;
  title: string;
  text: string;
  createdAt: string;
  updatedAt: string;
}

export type ReviewRequestBody = Omit<Review, "_id" | "createdAt" | "updatedAt">;

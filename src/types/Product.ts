export interface Image {
  _id?: number | string;
  src: string;
  alt: string;
  storageProvider?: "supabase" | "cloudinary" | "external";
  bucket?: string;
  path?: string;
  role?: "main" | "gallery";
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  longDescription?: string;
  japaneseText?: string;
  price: number;
  images: Image[];
  category: string;
  stock: number;
  materials: string[];
  dimensions: string;
  createdAt: string;
  updatedAt: string;
}

export type ProductRequestBody = Omit<
  Product,
  "_id" | "createdAt" | "updatedAt"
>;

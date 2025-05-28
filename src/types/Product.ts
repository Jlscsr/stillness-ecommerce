export interface Image {
  _id: number;
  src: string;
  alt: string;
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

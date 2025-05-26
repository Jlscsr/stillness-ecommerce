interface Image {
  id: number;
  src: string;
  alt: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  japaneseText?: string;
  price: number;
  images: Image[];
  category: string;
  stock: number;
  materials: string;
  dimensions: string;
  createdAt: string;
  updatedAt: string;
}

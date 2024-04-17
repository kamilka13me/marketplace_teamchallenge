export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  discount: number | null;
  category: string;
  quantity: number;
  views: number;
  images: string[];
  created_at: string;
}

export interface SellerProduct extends Product {
  discount_start: string;
  discount_end: string;
  sellerId: string;
  isActive: boolean;
}

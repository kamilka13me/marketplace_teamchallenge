export interface Product {
  _id: string;
  name: string;
  description: string;
  brand: string;
  condition: string;
  status: string;
  price: number;
  discount: number | null;
  specifications: {
    specification: string;
    specificationDescription: string;
  }[];
  discountStart: string;
  sellerId: string;
  discountEnd: string;
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

import { EntityState } from '@reduxjs/toolkit';

import { Product } from '@/enteties/Product';

export interface ProductsPageSchema extends EntityState<Product, string> {
  isLoading?: boolean;
  error?: string;
  offset: number;
  limit: number;
  name: string;
  category: string;
  sortBy: string;
  sortDirection: '1' | '-1';
  discount: string;
  quantity: string;
  count: number;
  sellerId: string;
  minRating: number | null;
  minPrice: number | null;
  maxPrice: number | null;
}

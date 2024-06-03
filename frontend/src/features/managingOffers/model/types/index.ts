import { EntityState } from '@reduxjs/toolkit';

import { Product } from '@/enteties/Product';

export interface ApiOffersResponse {
  count: number;
  products: Product[];
}

export interface AdminOffersSchema extends EntityState<Product, string> {
  isLoading?: boolean;
  error?: string;
  totalOffers: number;

  // pagination
  offset: number;
  limit: number;
  // filters
  sellerId: string;
  status: string;
  sortBy: string;
  sortDirection: '1' | '-1';

  _inited: boolean;
}

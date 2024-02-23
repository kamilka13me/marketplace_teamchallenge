import { EntityState } from '@reduxjs/toolkit';

import { Product } from '@/enteties/Product';

export interface ProductsPageSchema extends EntityState<Product, string> {
  isLoading?: boolean;
  error?: string;

  // pagination
  page: number;
  limit: number;
  hasMore: boolean;
  // filters
  offset: string;
  name: string;
  category: string;
  sortBy: string;
  sortDirection: '1' | '-1';
  discount: string;
  quantity: string;

  _inited: boolean;
}

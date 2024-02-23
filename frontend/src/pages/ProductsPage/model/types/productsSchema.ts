import { EntityState } from '@reduxjs/toolkit';

import { Product } from '@/enteties/Product';

export interface ProductsPageSchema extends EntityState<Product, string> {
  isLoading?: boolean;
  error?: string;

  // pagination
  offset: number;
  limit: number;
  // filters
  name: string;
  category: string;
  sortBy: string;
  sortDirection: '1' | '-1';
  discount: string;
  quantity: string;

  _inited: boolean;
}

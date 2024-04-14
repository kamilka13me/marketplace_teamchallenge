import { EntityState } from '@reduxjs/toolkit';

import { SellerProduct } from '@/enteties/Product';

export interface SellerProductsPageSchema extends EntityState<SellerProduct, string> {
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

import { EntityState } from '@reduxjs/toolkit';

import { SellerProduct } from '@/enteties/Product';

export interface SellerProductsPageSchema extends EntityState<SellerProduct, string> {
  isLoading?: boolean;
  error?: string;
  totalProducts: number;

  // pagination
  offset: number;
  limit: number;
  // filters
  sortBy: string;
  sortDirection: '1' | '-1';

  _inited: boolean;
}

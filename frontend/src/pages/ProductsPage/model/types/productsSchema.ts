import { Product } from '@/enteties/Product';

export interface ProductsPageSchema {
  products: Product[];
  isLoading?: boolean;
  error?: string;

  // pagination
  page: number;
  limit: number;
  hasMore: boolean;
  // filters
  offset: number;
  name: string;
  category: string;
  sortBy: string;
  sortDirection: 1 | -1;
  discount: number;
  quantity: number;

  _inited: boolean;
}

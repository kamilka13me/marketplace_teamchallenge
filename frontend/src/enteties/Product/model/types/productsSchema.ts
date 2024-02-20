import { Product } from '@/enteties/Product';

export interface ProductSchema {
  products: Product[];
  isLoading: boolean;
  error?: string;
}

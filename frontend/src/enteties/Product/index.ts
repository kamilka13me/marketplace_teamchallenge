import { Product } from './model/types/product';
import { ProductSchema } from './model/types/productsSchema';

import {
  productsData,
  productsIsLoading,
} from '@/enteties/Product/model/selectors/productsSelector';
import {
  productsActions,
  productsReducer,
} from '@/enteties/Product/model/slices/productsSlice';

export type { Product, ProductSchema };
export { productsActions, productsReducer, productsIsLoading, productsData };

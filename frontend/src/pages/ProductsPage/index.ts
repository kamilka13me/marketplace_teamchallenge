import { ProductsPageAsync } from './ui/ProductsPage.async';

import {
  productsApi,
  useGetNewProductsQuery,
  useGetPopularProductsQuery,
  useGetPromotionsProductsQuery,
} from '@/pages/ProductsPage/model/services/getProducts';
import { productsPageReducer } from '@/pages/ProductsPage/model/slices/productsPageSlice';
import { ProductsPageSchema } from '@/pages/ProductsPage/model/types/productsSchema';

export {
  ProductsPageAsync as ProductsPage,
  useGetNewProductsQuery,
  useGetPopularProductsQuery,
  useGetPromotionsProductsQuery,
  productsApi,
  productsPageReducer,
};
export type { ProductsPageSchema };

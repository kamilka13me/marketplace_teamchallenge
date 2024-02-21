import { Product } from './model/types/product';
import { ProductSchema } from './model/types/productsSchema';

import {
  productsApi,
  useGetNewProductsQuery,
  useGetPopularProductsQuery,
  useGetPromotionsProductsQuery,
} from '@/enteties/Product/model/services/getProducts';
import ProductCardSkeleton from '@/enteties/Product/ui/ProductCard/ProductCardSkeleton';
import ProductSectionLayout from '@/enteties/Product/ui/ProductSectionLayout/ProductSectionLayout';

export type { Product, ProductSchema };
export {
  ProductSectionLayout,
  ProductCardSkeleton,
  useGetNewProductsQuery,
  useGetPopularProductsQuery,
  useGetPromotionsProductsQuery,
  productsApi,
};

import { Product, SellerProduct } from './model/types/product';
import ProductCardSkeleton from './ui/ProductCard/ProductCardSkeleton';
import ProductSectionLayout from './ui/ProductSectionLayout/ProductSectionLayout';

import { deleteProductsById } from '@/enteties/Product/model/services/deleteProductsById';
import ProductCard, {
  countDiscount,
} from '@/enteties/Product/ui/ProductCard/ProductCard';

export {
  ProductCard,
  ProductCardSkeleton,
  ProductSectionLayout,
  countDiscount,
  deleteProductsById,
};
export type { Product, SellerProduct };

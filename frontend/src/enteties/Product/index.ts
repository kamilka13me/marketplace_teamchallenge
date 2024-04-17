import { Product, SellerProduct } from './model/types/product';
import ProductCardSkeleton from './ui/ProductCard/ProductCardSkeleton';
import ProductSectionLayout from './ui/ProductSectionLayout/ProductSectionLayout';

import { deleteProductsById } from '@/enteties/Product/model/services/deleteProductsById';
import { countDiscount } from '@/enteties/Product/ui/ProductCard/ProductCard';

export type { Product, SellerProduct };
export { ProductSectionLayout, ProductCardSkeleton, countDiscount, deleteProductsById };

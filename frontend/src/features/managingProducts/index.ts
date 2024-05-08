import { sellerProductsPageReducer } from './model/slice/sellerProductsSlice';
import { SellerProductsPageSchema } from './model/types/sellerProductsSchema';

import { Statuses as ProductStatuses } from '@/features/managingProducts/ui/SellerProductStatusBadge';

export type { SellerProductsPageSchema, ProductStatuses };
export { sellerProductsPageReducer };

import { AxiosInstance } from 'axios';

import { SellerSchema } from '@/enteties/Seller/model/types/seller';
import { UserSchema } from '@/enteties/User';
import { SellerFeedbackPageSchema } from '@/features/managingFeedbacks/model/types/sellerFeedbackSchema';
import { AdminOffersSchema } from '@/features/managingOffers';
import { SellerProductsPageSchema } from '@/features/managingProducts';
import { LoginSchema } from '@/features/userAuth';
import { ProductsCommentsSchema } from '@/pages/ProductPage/model/types';
import { ProductsPageSchema } from '@/pages/ProductsPage';
import { rtkApi } from '@/shared/api/rtkApi';

export interface StateSchema {
  login: LoginSchema;
  user: UserSchema;
  sellerInfo: SellerSchema;
  products: ProductsPageSchema;
  sellerProducts: SellerProductsPageSchema;
  sellerFeedbacks: SellerFeedbackPageSchema;
  productComments: ProductsCommentsSchema;
  adminOffers: AdminOffersSchema;

  [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;
}

export interface ThunkExtraArg {
  api: AxiosInstance;
}

export interface ThunkConfig<T> {
  rejectValue: T;
  // extra: ThunkExtraArg;
  state: StateSchema;
}

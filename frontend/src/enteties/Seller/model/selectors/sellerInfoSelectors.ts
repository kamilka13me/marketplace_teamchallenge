import { StateSchema } from '@/app/providers/StoreProvider';

export const getSellerInfo = (state: StateSchema) => state.sellerInfo.sellerData;
export const getSellerSubscribe = (state: StateSchema) =>
  state.sellerInfo.sellerData?.subscribe;
export const getSellerId = (state: StateSchema) => state.sellerInfo.sellerData?.sellerId;
export const sellerInfoIsLoading = (state: StateSchema) => state.sellerInfo.isLoading;
export const sellerInfoHasError = (state: StateSchema) => state.sellerInfo.error;

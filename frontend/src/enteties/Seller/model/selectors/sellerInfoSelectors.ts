import { StateSchema } from '@/app/providers/StoreProvider';

export const getSellerInfo = (state: StateSchema) => state.sellerInfo.sellerData;
export const sellerInfoIsLoading = (state: StateSchema) => state.sellerInfo.isLoading;
export const sellerInfoHasError = (state: StateSchema) => state.sellerInfo.error;

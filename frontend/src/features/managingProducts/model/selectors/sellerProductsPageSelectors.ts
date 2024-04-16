import { StateSchema } from '@/app/providers/StoreProvider';

export const getSellerProductsPageLimit = (state: StateSchema) =>
  state.sellerProducts.limit;

export const getSellerProductsPageIsLoading = (state: StateSchema) =>
  state.sellerProducts.isLoading;

export const getSellerProductsPageError = (state: StateSchema) =>
  state.sellerProducts.error;

export const getSellerProductsPageSortBy = (state: StateSchema) =>
  state.sellerProducts.sortBy;

export const getSellerProductsPageInited = (state: StateSchema) =>
  state.sellerProducts._inited;

export const getSellerProductsPageOffset = (state: StateSchema) =>
  state.sellerProducts.offset;

export const getSellerProductsPageSortDirection = (state: StateSchema) =>
  state.products.sortDirection;

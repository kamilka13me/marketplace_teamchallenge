import { StateSchema } from '@/app/providers/StoreProvider';

export const getSellerProductsPageLimit = (state: StateSchema) =>
  state.sellerProducts.limit;

export const getSellerProductsPageIsLoading = (state: StateSchema) =>
  state.sellerProducts.isLoading;

export const getSellerProductsPageError = (state: StateSchema) =>
  state.sellerProducts.error;

export const getSellerProductsPageName = (state: StateSchema) =>
  state.sellerProducts.name;

export const getSellerProductsPageSortBy = (state: StateSchema) =>
  state.sellerProducts.sortBy;

export const getSellerProductsPageInited = (state: StateSchema) =>
  state.sellerProducts._inited;

export const getSellerProductsPageDiscount = (state: StateSchema) =>
  state.sellerProducts.discount;

export const getSellerProductsPageCategory = (state: StateSchema) =>
  state.sellerProducts.category;

export const getSellerProductsPageOffset = (state: StateSchema) =>
  state.sellerProducts.offset;

export const getSellerProductsPageQuantity = (state: StateSchema) =>
  state.sellerProducts.quantity;

export const getSellerProductsPageSortDirection = (state: StateSchema) =>
  state.products.sortDirection;

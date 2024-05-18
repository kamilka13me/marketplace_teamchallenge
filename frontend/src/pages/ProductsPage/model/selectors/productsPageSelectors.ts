import { StateSchema } from '@/app/providers/StoreProvider';

export const getProductsPageLimit = (state: StateSchema) => state.products.limit;

export const getProductsPageIsLoading = (state: StateSchema) => state.products.isLoading;

export const getProductsPageError = (state: StateSchema) => state.products.error;

export const getProductsPageName = (state: StateSchema) => state.products.name;

export const getProductsPageSortBy = (state: StateSchema) => state.products.sortBy;

export const getProductsPageDiscount = (state: StateSchema) => state.products.discount;

export const getProductsPageCategory = (state: StateSchema) => state.products.category;

export const getProductsPageOffset = (state: StateSchema) => state.products.offset;

export const getProductsPageQuantity = (state: StateSchema) => state.products.quantity;

export const getProductsPageSortDirection = (state: StateSchema) =>
  state.products.sortDirection;

export const getProductsCount = (state: StateSchema) => state.products.count;

export const getProductsPageSellerId = (state: StateSchema) => state.products.sellerId;

export const getProductsPageMinRating = (state: StateSchema) => state.products.minRating;

export const getProductsPageMinPrice = (state: StateSchema) => state.products.minPrice;

export const getProductsPageMaxPrice = (state: StateSchema) => state.products.maxPrice;

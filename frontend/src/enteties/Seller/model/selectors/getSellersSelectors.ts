import { StateSchema } from '@/app/providers/StoreProvider';

export const getIsSellersLoading = (state: StateSchema) => state.sellers.isLoading;
export const getTotalSellers = (state: StateSchema) => state.sellers.totalSellers;
export const getSellersStartDate = (state: StateSchema) => state.sellers.startDate;
export const getSellersEndDate = (state: StateSchema) => state.sellers.endDate;
export const getSellersSearch = (state: StateSchema) => state.sellers.search;
export const getSellersLimit = (state: StateSchema) => state.sellers.limit;
export const getSellersOffset = (state: StateSchema) => state.sellers.offset;
export const getSellersSortDirection = (state: StateSchema) =>
  state.sellers.sortDirection;

import { StateSchema } from '@/app/providers/StoreProvider';

export const getAdminOffersIsLoading = (state: StateSchema) =>
  state.adminOffers.isLoading;

export const getAdminOffersError = (state: StateSchema) => state.adminOffers.error;

export const getTotalAdminOffers = (state: StateSchema) => state.adminOffers.totalOffers;

export const getAdminOffersLimit = (state: StateSchema) => state.sellerProducts.limit;

export const getAdminOffersOffset = (state: StateSchema) => state.adminOffers.offset;

export const getAdminOffersSellerId = (state: StateSchema) => state.adminOffers.sellerId;

export const getAdminOffersStatus = (state: StateSchema) => state.adminOffers.status;

export const getAdminOffersSortBy = (state: StateSchema) => state.adminOffers.sortBy;

export const getAdminOffersSortDirection = (state: StateSchema) =>
  state.adminOffers.sortDirection;

export const getAdminOffersInited = (state: StateSchema) => state.adminOffers._inited;

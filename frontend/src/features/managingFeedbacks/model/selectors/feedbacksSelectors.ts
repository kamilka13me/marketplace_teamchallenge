import { StateSchema } from '@/app/providers/StoreProvider';

export const getSellerFeedbacksPageLimit = (state: StateSchema) =>
  state.sellerFeedbacks.limit;

export const getSellerFeedbacksPageIsLoading = (state: StateSchema) =>
  state.sellerFeedbacks.isLoading;

export const getSellerFeedbacksPageError = (state: StateSchema) =>
  state.sellerFeedbacks.error;

export const getSellerFeedbacksPageStartDate = (state: StateSchema) =>
  state.sellerFeedbacks.startDate;

export const getSellerFeedbacksPageEndDate = (state: StateSchema) =>
  state.sellerFeedbacks.endDate;

export const getSellerFeedbacksPageOffset = (state: StateSchema) =>
  state.sellerFeedbacks.offset;

export const getTotalSellerFeedbacks = (state: StateSchema) =>
  state.sellerFeedbacks.totalComments;

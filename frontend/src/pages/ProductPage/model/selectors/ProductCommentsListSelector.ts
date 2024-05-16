import { StateSchema } from '@/app/providers/StoreProvider';

export const getProductCommentsPageLimit = (state: StateSchema) =>
  state.productComments.limit;

export const getProductCommentsPageIsLoading = (state: StateSchema) =>
  state.productComments.isLoading;

export const getProductCommentsPageError = (state: StateSchema) =>
  state.productComments.error;

export const getProductCommentsPageOffset = (state: StateSchema) =>
  state.productComments.offset;

export const getProductCommentsPageHasMore = (state: StateSchema) =>
  state.productComments.offset;

export const getTotalProductFeedbacks = (state: StateSchema) =>
  state.productComments.totalComments;

import { IComment } from '@/enteties/Comment';
import { rtkApi } from '@/shared/api/rtkApi';
import { ApiRoutes } from '@/shared/const/apiEndpoints';

export const commentsApi = rtkApi.injectEndpoints({
  endpoints: (builder) => ({
    getComments: builder.query({
      query: ({ offset, productId }) =>
        `${ApiRoutes.PRODUCT_COMMENTS}?productId=${productId}&limit=10&offset=${offset}`,
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems) => {
        const uniqueComments = newItems.comments.filter(
          (newComment: IComment) =>
            !currentCache.comments.some(
              (existingComment: IComment) => existingComment._id === newComment._id,
            ),
        );

        currentCache.comments.push(...uniqueComments);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
    getProductRatings: builder.query({
      query: (productId) => `${ApiRoutes.PRODUCT_RATINGS}?productId=${productId}`,
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
  }),
});

export const { useGetCommentsQuery, useGetProductRatingsQuery } = commentsApi;

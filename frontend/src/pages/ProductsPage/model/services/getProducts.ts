import { rtkApi } from '@/shared/api/rtkApi';

export const productsApi = rtkApi.injectEndpoints({
  endpoints: (builder) => ({
    getNewProducts: builder.query({
      query: () => `/products?limit=4&offset=0&sortDirection=-1&status=published`,
    }),
    getPopularProducts: builder.query({
      query: () =>
        `/products?limit=4&offset=0&sortBy=views&sortDirection=-1&status=published`,
    }),
    getPromotionsProducts: builder.query({
      query: () =>
        `/products?limit=4&offset=0&sortBy=views&sortDirection=-1&discount=1&status=published`,
    }),
  }),
});

export const {
  useGetNewProductsQuery,
  useGetPopularProductsQuery,
  useGetPromotionsProductsQuery,
} = productsApi;

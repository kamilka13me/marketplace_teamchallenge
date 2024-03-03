import { rtkApi } from '@/shared/api/rtkApi';

export const productsApi = rtkApi.injectEndpoints({
  endpoints: (builder) => ({
    getNewProducts: builder.query({
      query: () => `/products?limit=4&offset=0&sortDirection=-1`,
    }),
    getPopularProducts: builder.query({
      query: () => `/products?limit=4&offset=0&sortBy=views&sortDirection=-1`,
    }),
    getPromotionsProducts: builder.query({
      query: () => `/products?limit=4&offset=0&sortBy=views&sortDirection=-1&discount=1`,
    }),
  }),
});

export const {
  useGetNewProductsQuery,
  useGetPopularProductsQuery,
  useGetPromotionsProductsQuery,
} = productsApi;

import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema';
import { Product } from '@/enteties/Product';
import {
  getProductsPageCategory,
  getProductsPageDiscount,
  getProductsPageLimit,
  getProductsPageMaxPrice,
  getProductsPageMinPrice,
  getProductsPageMinRating,
  getProductsPageName,
  getProductsPageOffset,
  getProductsPageQuantity,
  getProductsPageSellerId,
  getProductsPageSortBy,
  getProductsPageSortDirection,
} from '@/pages/ProductsPage/model/selectors/productsPageSelectors';
import { $api } from '@/shared/api/api';
import { ApiRoutes } from '@/shared/const/apiEndpoints';

interface ApiResponse {
  count: number;
  products: Product[];
}

interface FetchProductsListProps {
  replace?: boolean;
}

export const fetchProductsList = createAsyncThunk<
  ApiResponse,
  FetchProductsListProps,
  ThunkConfig<string>
>('productsPage/fetchProductsList', async (_, thunkApi) => {
  const { rejectWithValue, getState } = thunkApi;

  const limit = getProductsPageLimit(getState());
  const name = getProductsPageName(getState());
  const sortBy = getProductsPageSortBy(getState());
  const discount = getProductsPageDiscount(getState());
  const category = getProductsPageCategory(getState());
  const offset = getProductsPageOffset(getState());
  const quantity = getProductsPageQuantity(getState());
  const sortDirection = getProductsPageSortDirection(getState());
  const sellerId = getProductsPageSellerId(getState());
  const minRating = getProductsPageMinRating(getState());
  const minPrice = getProductsPageMinPrice(getState());
  const maxPrice = getProductsPageMaxPrice(getState());

  try {
    const response = await $api.get<ApiResponse>(ApiRoutes.PRODUCTS, {
      params: {
        offset,
        limit,
        name,
        category,
        quantity,
        sortDirection,
        sortBy,
        discount,
        sellerId,
        minRating,
        minPrice,
        maxPrice,
      },
    });

    if (!response.data) {
      throw new Error();
    }

    return response.data;
  } catch (e) {
    return rejectWithValue('error');
  }
});

import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { StateSchema } from '@/app/providers/StoreProvider';
import { Product } from '@/enteties/Product';
import {
  getProductsPageCategory,
  getProductsPageDiscount,
  getProductsPageLimit,
  getProductsPageName,
  getProductsPageOffset,
  getProductsPageQuantity,
  getProductsPageSortBy,
  getProductsPageSortDirection,
} from '@/pages/ProductsPage/model/selectors/productsPageSelectors';
import { $api } from '@/shared/api/api';
import { ApiRoutes } from '@/shared/const/apiEndpoints';
import { addQueryParams } from '@/shared/lib/url/addQueryParams';

interface FetchProductsListProps {
  replace?: boolean;
}
export interface ThunkExtraArg {
  api: AxiosInstance;
}

export interface ThunkConfig<T> {
  rejectValue: T;
  extra: ThunkExtraArg;
  state: StateSchema;
}

export const fetchProductsList = createAsyncThunk<
  Product[],
  FetchProductsListProps,
  ThunkConfig<string>
>('productsPage/fetchProductsList', async (props, thunkApi) => {
  const { rejectWithValue, getState } = thunkApi;

  const limit = getProductsPageLimit(getState());
  const name = getProductsPageName(getState());
  const sortBy = getProductsPageSortBy(getState());
  const discount = getProductsPageDiscount(getState());
  const category = getProductsPageCategory(getState());
  const offset = getProductsPageOffset(getState());
  const quantity = getProductsPageQuantity(getState());
  const sortDirection = getProductsPageSortDirection(getState());

  try {
    addQueryParams({
      limit: limit.toString(),
      offset: offset.toString(),
      name,
      category,
      sortBy,
      sortDirection,
      discount,
      quantity,
    });
    const response = await $api.get<Product[]>(ApiRoutes.PRODUCTS, {
      params: {
        offset,
        limit,
        name,
        category,
        quantity,
        sortDirection,
        sortBy,
        discount,
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

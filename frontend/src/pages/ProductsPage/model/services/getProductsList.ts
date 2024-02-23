import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { StateSchema } from '@/app/providers/StoreProvider';
import { Product } from '@/enteties/Product';
import {
  getProductsPageCategory,
  getProductsPageDiscount,
  getProductsPageLimit,
  getProductsPageName,
  getProductsPageNum,
  getProductsPageOffset,
  getProductsPageQuantity,
  getProductsPageSortBy,
  getProductsPageSortDirection,
} from '@/pages/ProductsPage/model/productsPageSelectors';
import { $api } from '@/shared/api/api';
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
  const page = getProductsPageNum(getState());
  const discount = getProductsPageDiscount(getState());
  const category = getProductsPageCategory(getState());
  const offset = getProductsPageOffset(getState());
  const quantity = getProductsPageQuantity(getState());
  const sortDirection = getProductsPageSortDirection(getState());

  try {
    addQueryParams({
      name,
      discount,
      category,
      offset,
      quantity,
      sortDirection,
      sortBy,
    });
    const response = await $api.get<Product[]>('/products', {
      params: {
        _page: page,
        _limit: limit,
        name,
        category,
        offset,
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

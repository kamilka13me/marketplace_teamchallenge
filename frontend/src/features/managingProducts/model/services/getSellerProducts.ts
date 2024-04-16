import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema';
import { SellerProduct } from '@/enteties/Product';
import {
  getSellerProductsPageLimit,
  getSellerProductsPageOffset,
  getSellerProductsPageSortBy,
  getSellerProductsPageSortDirection,
} from '@/features/managingProducts/model/selectors/sellerProductsPageSelectors';
import { $api } from '@/shared/api/api';
import { ApiRoutes } from '@/shared/const/apiEndpoints';
import { addQueryParams } from '@/shared/lib/url/addQueryParams';

interface FetchProductsListProps {
  replace?: boolean;
}

export const fetchSellerProductsList = createAsyncThunk<
  SellerProduct[],
  FetchProductsListProps,
  ThunkConfig<string>
>('productsPage/fetchProductsList', async (props, thunkApi) => {
  const { rejectWithValue, getState } = thunkApi;

  const limit = getSellerProductsPageLimit(getState());
  const sortBy = getSellerProductsPageSortBy(getState());
  const offset = getSellerProductsPageOffset(getState());
  const sortDirection = getSellerProductsPageSortDirection(getState());

  try {
    addQueryParams({
      limit: limit.toString(),
      offset: offset.toString(),
      sortBy,
      sortDirection,
    });
    const response = await $api.get<SellerProduct[]>(ApiRoutes.SELLER_PRODUCTS, {
      params: {
        offset,
        limit,
        sortDirection,
        sortBy,
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

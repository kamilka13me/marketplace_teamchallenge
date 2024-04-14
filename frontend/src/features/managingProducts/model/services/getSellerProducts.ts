import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema';
import { SellerProduct } from '@/enteties/Product';
import {
  getSellerProductsPageCategory,
  getSellerProductsPageDiscount,
  getSellerProductsPageLimit,
  getSellerProductsPageName,
  getSellerProductsPageOffset,
  getSellerProductsPageQuantity,
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
  const name = getSellerProductsPageName(getState());
  const sortBy = getSellerProductsPageSortBy(getState());
  const discount = getSellerProductsPageDiscount(getState());
  const category = getSellerProductsPageCategory(getState());
  const offset = getSellerProductsPageOffset(getState());
  const quantity = getSellerProductsPageQuantity(getState());
  const sortDirection = getSellerProductsPageSortDirection(getState());

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
    const response = await $api.get<SellerProduct[]>(ApiRoutes.SELLER_PRODUCTS, {
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

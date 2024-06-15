import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema';
import {
  getSellersEndDate,
  getSellersLimit,
  getSellersOffset,
  getSellersSearch,
  getSellersSortDirection,
  getSellersStartDate,
} from '@/enteties/Seller/model/selectors/getSellersSelectors';
import { UserSeller } from '@/enteties/Seller/model/types/seller';
import { $api } from '@/shared/api/api';
import { ApiRoutes } from '@/shared/const/apiEndpoints';

interface ApiResponse {
  totalCount: number;
  users: UserSeller[];
}

interface FetchSellersProps {
  replace?: boolean;
}

export const fetchAllSellers = createAsyncThunk<
  ApiResponse,
  FetchSellersProps,
  ThunkConfig<string>
>('sellers/fetchSellers', async (props, thunkApi) => {
  const { rejectWithValue, getState } = thunkApi;

  const startDate = getSellersStartDate(getState());
  const endDate = getSellersEndDate(getState());
  const search = getSellersSearch(getState());
  const limit = getSellersLimit(getState());
  const offset = getSellersOffset(getState());
  const sortDirection = getSellersSortDirection(getState());

  try {
    const response = await $api.get<ApiResponse>(
      `${ApiRoutes.USER}?role=seller&sortBy=created_at`,
      {
        params: {
          startDate,
          endDate,
          search,
          limit,
          offset,
          sortDirection,
        },
      },
    );

    if (!response.data) {
      throw new Error();
    }

    return response.data;
  } catch (e) {
    return rejectWithValue('error');
  }
});

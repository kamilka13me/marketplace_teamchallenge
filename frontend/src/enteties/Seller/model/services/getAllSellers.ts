import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema';
import { Seller } from '@/enteties/Seller/model/types/seller';
import { $api } from '@/shared/api/api';
import { ApiRoutes } from '@/shared/const/apiEndpoints';

interface ApiResponse {
  count: number;
  users: Seller[];
}

interface FetchSellersProps {
  replace?: boolean;
}

export const fetchAllSellers = createAsyncThunk<
  ApiResponse,
  FetchSellersProps,
  ThunkConfig<string>
>('sellers/fetchSellers', async (props, thunkApi) => {
  const { rejectWithValue } = thunkApi;

  try {
    const response = await $api.get<ApiResponse>(ApiRoutes.SELLER);

    if (!response.data) {
      throw new Error();
    }

    return response.data;
  } catch (e) {
    return rejectWithValue('error');
  }
});

import { createAsyncThunk } from '@reduxjs/toolkit';

import { Product } from '@/enteties/Product';
import { $api } from '@/shared/api/api';

interface ApiResponse {
  products: Product[];
}

export const getProducts = createAsyncThunk<ApiResponse>(
  'products/getProducts',
  async (authData, thunkApi) => {
    const { rejectWithValue } = thunkApi;

    try {
      const response = await $api.get(
        '/products?limit=4&offset=0&sortBy=_id&sortDirection=1',
      );

      if (response.status !== 200) {
        return rejectWithValue(`:: ${response.statusText} `);
      }

      return response.data;
    } catch (e: unknown) {
      if (e instanceof Error) {
        return rejectWithValue(`:: ${e.message}`);
      }

      return rejectWithValue('Unknown error occurred');
    }
  },
);

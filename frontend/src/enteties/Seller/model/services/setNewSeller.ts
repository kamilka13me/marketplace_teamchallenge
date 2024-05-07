import { createAsyncThunk } from '@reduxjs/toolkit';

import { $api } from '@/shared/api/api';
import { ApiRoutes } from '@/shared/const/apiEndpoints';

interface ApiResponse {}

interface newSellerDataProps {}

export const setNewSeller = createAsyncThunk<ApiResponse, newSellerDataProps>(
  'seller',
  async (newSellerData, thunkApi) => {
    const { rejectWithValue } = thunkApi;

    try {
      const response = await $api.post<ApiResponse>(ApiRoutes.SELLER_PRODUCTS, {
        ...newSellerData,
      });

      if (response.status !== 200) {
        if (response.status === 400) {
          return rejectWithValue(`:: ${response.statusText} `);
        }

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

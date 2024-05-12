import { createAsyncThunk } from '@reduxjs/toolkit';

import { Seller } from '@/enteties/Seller/model/types/seller';
import { $api } from '@/shared/api/api';
import { ApiRoutes } from '@/shared/const/apiEndpoints';

interface ApiResponse extends Seller {}

interface sellerDataProps {
  contacts: {
    phone: string;
    person: string;
  }[];
  communication: {
    messenger: string;
    phone: string;
  }[];
  generalCommunication: {
    messenger: string;
    phone: string;
  }[];
}

export const setSellerInfo = createAsyncThunk<ApiResponse, sellerDataProps>(
  'seller/updateInfo',
  async (sellerInfo, thunkApi) => {
    const { rejectWithValue } = thunkApi;

    try {
      const response = await $api.post<ApiResponse>(
        `${ApiRoutes.SELLER_PRODUCTS}/updateSellerInfo`,
        {
          ...sellerInfo,
        },
      );

      if (response.status !== 201) {
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

import { createAsyncThunk } from '@reduxjs/toolkit';

import { sellerInfoActions } from '@/enteties/Seller/model/slice/sellerSlice';
import { Seller } from '@/enteties/Seller/model/types/seller';
import { $api } from '@/shared/api/api';
import { ApiRoutes } from '@/shared/const/apiEndpoints';

interface ApiResponse extends Seller {}

interface Props {
  sellerId: string;
}

export const getSellerProfileInfo = createAsyncThunk<ApiResponse, Props>(
  'seller/info',
  async ({ sellerId }, thunkApi) => {
    const { dispatch, rejectWithValue } = thunkApi;

    try {
      const response = await $api.get<ApiResponse>(
        `${ApiRoutes.SELLER_INFO}?sellerId=${sellerId}`,
      );

      if (response.status !== 200) {
        if (response.status === 400) {
          return rejectWithValue(`:: ${response.statusText} `);
        }

        return rejectWithValue(`:: ${response.statusText} `);
      }

      dispatch(sellerInfoActions.setSellerData(response.data));

      return response.data;
    } catch (e: unknown) {
      if (e instanceof Error) {
        return rejectWithValue(`:: ${e.message}`);
      }

      return rejectWithValue('Unknown error occurred');
    }
  },
);

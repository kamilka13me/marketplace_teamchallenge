import { createAsyncThunk } from '@reduxjs/toolkit';

import { sellerInfoActions } from '@/enteties/Seller/model/slice/sellerSlice';
import { Seller } from '@/enteties/Seller/model/types/seller';
import { $api } from '@/shared/api/api';
import { ApiRoutes } from '@/shared/const/apiEndpoints';

interface ApiResponse {
  sellerInfo: Seller;
}

interface SellerProfileInfoProps {}

export const getSellerProfileInfo = createAsyncThunk<ApiResponse, SellerProfileInfoProps>(
  'seller/info',
  async (sellerProfileInfo, thunkApi) => {
    const { dispatch, rejectWithValue } = thunkApi;

    try {
      const response = await $api.get<ApiResponse>(ApiRoutes.USER, {
        ...sellerProfileInfo,
      });

      if (response.status !== 200) {
        if (response.status === 400) {
          return rejectWithValue(`:: ${response.statusText} `);
        }

        return rejectWithValue(`:: ${response.statusText} `);
      }

      const { sellerInfo } = response.data;

      dispatch(sellerInfoActions.setSellerData(sellerInfo));

      return response.data;
    } catch (e: unknown) {
      if (e instanceof Error) {
        return rejectWithValue(`:: ${e.message}`);
      }

      return rejectWithValue('Unknown error occurred');
    }
  },
);

import { createAsyncThunk } from '@reduxjs/toolkit';

import { userActions, UserWithWishlist } from '@/enteties/User';
import { $api } from '@/shared/api/api';
import { ApiRoutes } from '@/shared/const/apiEndpoints';

interface ApiResponse {
  user: UserWithWishlist;
}

interface Props {
  _id: string;
}

export const getUserWishlist = createAsyncThunk<ApiResponse, Props>(
  'user/Wishlist',
  async ({ _id }, thunkApi) => {
    const { dispatch, rejectWithValue } = thunkApi;

    try {
      const response = await $api.get<ApiResponse>(`${ApiRoutes.USER}/${_id}`);

      if (response.status !== 200) {
        return rejectWithValue(`:: ${response.statusText} `);
      }

      dispatch(userActions.setUserWishList(response.data.user.wishlist));

      return response.data;
    } catch (e: unknown) {
      if (e instanceof Error) {
        return rejectWithValue(`:: ${e.message}`);
      }

      return rejectWithValue('Unknown error occurred');
    }
  },
);

import { createAsyncThunk } from '@reduxjs/toolkit';

import { userActions } from '@/enteties/User';
import { $api } from '@/shared/api/api';

interface ApiResponse {
  user: {
    wishlist: string[];
  };
}

interface Props {
  _id: string;
}

export const getUserWishlist = createAsyncThunk<ApiResponse, Props>(
  'user/Wishlist',
  async ({ _id }, thunkApi) => {
    const { dispatch, rejectWithValue } = thunkApi;

    try {
      const response = await $api.get<ApiResponse>(`/users/${_id}`);

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

// $api
//     .get(`/users/${user?._id}`)
//     .then((res) => {
//         localStorage.setItem('wishlist', res.data.user.wishlist);
//     })
//     .catch((err) => {
//         // eslint-disable-next-line
//         console.error('Error in initWishlist:', err);
//     });

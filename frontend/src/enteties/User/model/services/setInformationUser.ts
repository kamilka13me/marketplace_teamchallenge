import { createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

import { userActions } from '@/enteties/User';
import { $api } from '@/shared/api/api';
import { ApiRoutes } from '@/shared/const/apiEndpoints';
import { COOKIE_KEY_USER } from '@/shared/const/cookies';

interface UserResponse {
  _id: string;
  username: string;
  surname: string;
  email: string;
  role: string;
  dob: string;
  isAccountConfirm: boolean;
  phoneNumber: string;
  wishlist: string[];
}

interface ApiResponse {
  message: string;
  user: UserResponse;
}

interface informationUserDataProps {
  username: string;
  surname: string;
  dob: string;
  phoneNumber: string;
}

export const setInformationUser = createAsyncThunk<ApiResponse, informationUserDataProps>(
  'users/setInformationUser',
  async (newUserData, thunkApi) => {
    const { dispatch, rejectWithValue } = thunkApi;

    try {
      const response = await $api.put<ApiResponse>(ApiRoutes.USER, {
        ...newUserData,
      });

      if (response.status !== 200) {
        return rejectWithValue(`:: ${response.statusText} `);
      }

      const { user } = response.data;

      Cookies.set(COOKIE_KEY_USER, JSON.stringify(response.data.user), {
        secure: true,
        sameSite: 'Strict',
      });

      dispatch(userActions.setAuthData(user));

      return response.data;
    } catch (e: unknown) {
      if (e instanceof Error) {
        return rejectWithValue(`:: ${e.message}`);
      }

      return rejectWithValue('Unknown error occurred');
    }
  },
);

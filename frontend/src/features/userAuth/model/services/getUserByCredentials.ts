import { createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

import { User, userActions } from '@/enteties/User';
import { $api } from '@/shared/api/api';

const EXPIRES_TIME = 7;

interface ApiResponse {
  token: string;
  message: string;
  user: User;
}

interface LoginByUsernameProps {
  email: string;
  password: string;
}

const cookiesAttr: Cookies.CookieAttributes = {
  expires: EXPIRES_TIME,
  secure: true,
};

export const getUserByCredentials = createAsyncThunk<ApiResponse, LoginByUsernameProps>(
  'login/getUserByCredentials',
  async (authData, thunkApi) => {
    const { dispatch, rejectWithValue } = thunkApi;

    try {
      const response = await $api.post<ApiResponse>('/auth', authData);

      const { token } = response.data;

      const currentDate = new Date();
      const futureDate = new Date(currentDate);

      futureDate.setDate(currentDate.getDate() + EXPIRES_TIME);

      if (response.status !== 200) {
        return rejectWithValue(`:: ${response.statusText} `);
      }

      // Set cookies for user, token, expiration date when user removes from cookies
      Cookies.set(`${import.meta.env.VITE_TOKEN}`, token, cookiesAttr);
      Cookies.set(
        `${import.meta.env.VITE_USER}`,
        JSON.stringify(response.data.user),
        cookiesAttr,
      );
      Cookies.set(
        `${import.meta.env.VITE_EXPIRATION_DATE_OF_USER}`,
        futureDate.toISOString(),
        cookiesAttr,
      );

      dispatch(userActions.setAuthData(response.data.user));

      return response.data;
    } catch (e: any) {
      return rejectWithValue(`:: ${e.message as string}`);
    }
  },
);

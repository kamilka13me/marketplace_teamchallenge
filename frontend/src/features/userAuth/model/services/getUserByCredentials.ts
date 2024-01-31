import { createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

import { User, userActions } from '@/enteties/User';
import { $api } from '@/shared/api/api';

interface ApiResponse {
  token: string;
  message: string;
  user: User;
}

interface LoginByUsernameProps {
  email: string;
  password: string;
}

export const getUserByCredentials = createAsyncThunk<ApiResponse, LoginByUsernameProps>(
  'login/getUserByCredentials',
  async (authData, thunkApi) => {
    const { dispatch, rejectWithValue } = thunkApi;

    try {
      const response = await $api.post<ApiResponse>('/auth', authData);
      const { token } = response.data;

      if (!response.data) {
        throw new Error();
      }
      Cookies.set('authToken', token, {
        expires: 7, // Expires in 7 days
        secure: true, // Only send over HTTPS
        httpOnly: true, // Prevent access from JavaScript
      });
      Cookies.set('user', JSON.stringify(response.data.user));
      dispatch(userActions.setAuthData(response.data.user));

      return response.data;
    } catch (e) {
      return rejectWithValue('error');
    }
  },
);

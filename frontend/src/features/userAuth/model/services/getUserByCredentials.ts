import { createAsyncThunk } from '@reduxjs/toolkit';

import { User } from '@/enteties/User';
import { $api } from '@/shared/api/api';

interface ApiResponse {
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
    const { rejectWithValue } = thunkApi;

    try {
      const response = await $api.post<ApiResponse>('/auth', authData);

      if (!response.data) {
        throw new Error();
      }

      return response.data;
    } catch (e) {
      return rejectWithValue('error');
    }
  },
);

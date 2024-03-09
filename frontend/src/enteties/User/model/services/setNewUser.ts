import { createAsyncThunk } from '@reduxjs/toolkit';

import { $api } from '@/shared/api/api';
import { ApiRoutes } from '@/shared/const/apiEndpoints';

interface ApiResponse {
  username: string;
  surname: string;
  email: string;
  password: string;
  role: string;
  views: string[];
  wishlist: string[];
}

interface newUserDataProps {
  username: string;
  email: string;
  password: string;
}

export const setNewUser = createAsyncThunk<ApiResponse, newUserDataProps>(
  'users',
  async (newUserData, thunkApi) => {
    const { rejectWithValue } = thunkApi;

    try {
      const response = await $api.post<ApiResponse>(ApiRoutes.USER, {
        ...newUserData,
      });

      if (response.status !== 201) {
        if (response.status === 409) {
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

import { createAsyncThunk } from '@reduxjs/toolkit';

import { $api } from '@/shared/api/api';
import { ApiRoutes } from '@/shared/const/apiEndpoints';

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
  oldPassword: string;
  newPassword: string;
}

export const setPasswordUser = createAsyncThunk<ApiResponse, informationUserDataProps>(
  'users/setPasswordUser',
  async (newUserData, thunkApi) => {
    const { rejectWithValue } = thunkApi;

    try {
      const response = await $api.put<ApiResponse>(`${ApiRoutes.USER}/password`, {
        ...newUserData,
      });

      if (response.status !== 200) {
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

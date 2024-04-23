import { createAsyncThunk } from '@reduxjs/toolkit';

import { $api } from '@/shared/api/api';
import { ApiRoutes } from '@/shared/const/apiEndpoints';

interface UserResponse {
  username: string;
  surname: string;
  email: string;
  password: string;
  role: string;
  views: string[];
  wishlist: string[];
  dob: string;
  phoneNumber: string;
}

interface ApiResponse {
  message: string;
  user: UserResponse;
}

interface emailRecoverPasswordProps {
  confirmToken: string;
  newPassword: string;
}

export const setRecoverPasswordUser = createAsyncThunk<
  ApiResponse,
  emailRecoverPasswordProps
>('users/setRecoverPasswordUser', async (newUserData, thunkApi) => {
  const { rejectWithValue } = thunkApi;

  try {
    const response = await $api.post<ApiResponse>(
      `${ApiRoutes.USER}/recover-password-confirm`,
      {
        ...newUserData,
      },
    );

    if (response.status !== 200) {
      if (response.status === 400) {
        return rejectWithValue(`:: ${response.statusText} `);
      }

      if (response.status === 404) {
        return rejectWithValue(`:: ${response.statusText} `);
      }

      if (response.status === 419) {
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
});

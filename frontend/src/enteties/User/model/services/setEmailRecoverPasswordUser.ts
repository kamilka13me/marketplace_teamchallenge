import { createAsyncThunk } from '@reduxjs/toolkit';

import { $api } from '@/shared/api/api';
import { ApiRoutes } from '@/shared/const/apiEndpoints';

interface ApiResponse {
  message: string;
}

interface emailRecoverPasswordProps {
  email: string;
}

export const setEmailRecoverPasswordUser = createAsyncThunk<
  ApiResponse,
  emailRecoverPasswordProps
>('users/setEmailRecoverPasswordUser', async (newUserData, thunkApi) => {
  const { rejectWithValue } = thunkApi;

  try {
    const response = await $api.post<ApiResponse>(`${ApiRoutes.USER}/recover-password`, {
      ...newUserData,
    });

    if (response.status !== 200) {
      if (response.status === 404) {
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

import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema';
import { User } from '@/enteties/User';
import { $api } from '@/shared/api/api';
import { ApiRoutes } from '@/shared/const/apiEndpoints';

interface ApiResponse {
  count: number;
  users: User[];
}

interface FetchUsersProps {
  replace?: boolean;
}

export const fetchAllUsers = createAsyncThunk<
  ApiResponse,
  FetchUsersProps,
  ThunkConfig<string>
>('users/fetchUsers', async (props, thunkApi) => {
  const { rejectWithValue } = thunkApi;

  try {
    const response = await $api.get<ApiResponse>(ApiRoutes.USER);

    if (!response.data) {
      throw new Error();
    }

    return response.data;
  } catch (e) {
    return rejectWithValue('error');
  }
});

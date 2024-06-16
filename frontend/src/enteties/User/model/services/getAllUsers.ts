import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema';
import { User } from '@/enteties/User';
import {
  getUsersLimit,
  getUsersOffset,
  getUsersSearch,
} from '@/enteties/User/model/selectors/getUsersSelectors';
import { $api } from '@/shared/api/api';
import { ApiRoutes } from '@/shared/const/apiEndpoints';

interface ApiResponse {
  totalCount: number;
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
  const { rejectWithValue, getState } = thunkApi;

  const limit = getUsersLimit(getState());
  const offset = getUsersOffset(getState());
  const search = getUsersSearch(getState());
  const role = 'user';

  try {
    const response = await $api.get<ApiResponse>(
      `${ApiRoutes.USER}?sortBy=created_at&sortDirection=-1`,
      {
        params: {
          limit,
          offset,
          search,
          role,
        },
      },
    );

    if (!response.data) {
      throw new Error();
    }

    return response.data;
  } catch (e) {
    return rejectWithValue('error');
  }
});

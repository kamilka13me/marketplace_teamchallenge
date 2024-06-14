import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema';
import { fetchAllUsers, usersActions } from '@/enteties/User';
import {
  getIsUsersLoading,
  getUsersLimit,
  getUsersOffset,
} from '@/enteties/User/model/selectors/getUsersSelectors';

export const fetchNextUsers = createAsyncThunk<void, void, ThunkConfig<string>>(
  'users/fetchNextUsers',
  async (_, thunkApi) => {
    const { getState, dispatch } = thunkApi;
    const offset = getUsersOffset(getState());
    const limit = getUsersLimit(getState());
    const isLoading = getIsUsersLoading(getState());

    if (!isLoading) {
      const currentPage = Math.ceil(offset / limit) + 1;
      const newOffset = currentPage * limit;

      dispatch(usersActions.setOffset(newOffset));
      dispatch(fetchAllUsers({}));
    }
  },
);

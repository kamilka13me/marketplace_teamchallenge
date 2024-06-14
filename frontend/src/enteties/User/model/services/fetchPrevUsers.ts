import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema';
import { fetchAllUsers, usersActions } from '@/enteties/User';
import {
  getIsUsersLoading,
  getUsersLimit,
  getUsersOffset,
} from '@/enteties/User/model/selectors/getUsersSelectors';

export const fetchPrevUsers = createAsyncThunk<void, void, ThunkConfig<string>>(
  'users/fetchPrevUsers',
  async (_, thunkApi) => {
    const { getState, dispatch } = thunkApi;
    const offset = getUsersOffset(getState());
    const limit = getUsersLimit(getState());
    const isLoading = getIsUsersLoading(getState());

    if (!isLoading) {
      if (offset >= 5) {
        const newOffset = offset - limit;

        dispatch(usersActions.setOffset(newOffset));
        dispatch(fetchAllUsers({}));
      }
    }
  },
);

import { createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

import { userActions } from '@/enteties/User';

export const initAuthData = createAsyncThunk('user/initAuthData', (_, thunkApi) => {
  const { rejectWithValue, dispatch } = thunkApi;

  const user = Cookies.get('user');

  if (user) {
    dispatch(userActions.setAuthData(JSON.parse(user)));
  }

  return rejectWithValue('');
});

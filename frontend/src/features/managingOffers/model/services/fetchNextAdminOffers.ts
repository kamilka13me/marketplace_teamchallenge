import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  getAdminOffersIsLoading,
  getAdminOffersLimit,
  getAdminOffersOffset,
} from '../selectors';
import { adminOffersActions } from '../slice';

import { fetchAdminOffersList } from './getAdminOffers';

import { ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema';

export const fetchNextAdminOffers = createAsyncThunk<void, void, ThunkConfig<string>>(
  'adminOffers/fetchNextAdminOffers',
  async (_, thunkApi) => {
    const { getState, dispatch } = thunkApi;
    const limit = getAdminOffersLimit(getState());
    const offset = getAdminOffersOffset(getState());
    const isLoading = getAdminOffersIsLoading(getState());

    if (!isLoading) {
      const currentPage = Math.ceil(offset / limit) + 1;
      const newOffset = currentPage * limit;

      dispatch(adminOffersActions.setOffset(newOffset));
      dispatch(fetchAdminOffersList({}));
    }
  },
);

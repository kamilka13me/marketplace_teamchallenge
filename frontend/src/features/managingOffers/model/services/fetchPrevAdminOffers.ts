import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  getAdminOffersIsLoading,
  getAdminOffersLimit,
  getAdminOffersOffset,
} from '../selectors';
import { adminOffersActions } from '../slice';

import { fetchAdminOffersList } from './getAdminOffers';

import { ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema';

export const fetchPrevAdminOffers = createAsyncThunk<void, void, ThunkConfig<string>>(
  'adminOffers/fetchPrevAdminOffers',
  async (_, thunkApi) => {
    const { getState, dispatch } = thunkApi;
    const limit = getAdminOffersLimit(getState());
    const offset = getAdminOffersOffset(getState());
    const isLoading = getAdminOffersIsLoading(getState());

    if (!isLoading) {
      if (offset >= 5) {
        const newOffset = offset - limit;

        dispatch(adminOffersActions.setOffset(newOffset));
        dispatch(fetchAdminOffersList({}));
      }
    }
  },
);

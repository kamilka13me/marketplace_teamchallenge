import { createAsyncThunk } from '@reduxjs/toolkit';

import { getAdminOffersInited } from '../selectors';
import { adminOffersActions } from '../slice';

import { fetchAdminOffersList } from './getAdminOffers';

import { ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema';

export const initAdminOffersTab = createAsyncThunk<
  void,
  URLSearchParams,
  ThunkConfig<string>
>('adminOffers/initAdminOffersTab', async (searchParams, thunkApi) => {
  const { getState, dispatch } = thunkApi;
  const inited = getAdminOffersInited(getState());

  if (!inited) {
    const statusFromUrl = searchParams?.get('status');
    const sortDirectionFromUrl = searchParams?.get('sortDirection') as '1' | '-1';

    if (statusFromUrl) {
      dispatch(adminOffersActions.setStatus(statusFromUrl));
    }

    if (sortDirectionFromUrl) {
      dispatch(adminOffersActions.setSortDirection(sortDirectionFromUrl));
    }

    dispatch(adminOffersActions.initState());
    dispatch(fetchAdminOffersList({}));
  }
});

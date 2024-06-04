import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  getAdminOffersEndDate,
  getAdminOffersLimit,
  getAdminOffersOffset,
  getAdminOffersSellerId,
  getAdminOffersSortBy,
  getAdminOffersSortDirection,
  getAdminOffersStartDate,
  getAdminOffersStatus,
} from '../selectors';
import { ApiOffersResponse } from '../types';

import { ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema';
import { $api } from '@/shared/api/api';
import { ApiRoutes } from '@/shared/const/apiEndpoints';
import { addQueryParams } from '@/shared/lib/url/addQueryParams';

interface FetchAdminOffersListProps {
  replace?: boolean;
}

export const fetchAdminOffersList = createAsyncThunk<
  ApiOffersResponse,
  FetchAdminOffersListProps,
  ThunkConfig<string>
>('adminOffers/fetchAdminOffersList', async (props, thunkApi) => {
  const { rejectWithValue, getState } = thunkApi;

  const limit = getAdminOffersLimit(getState());
  const offset = getAdminOffersOffset(getState());
  const sellerId = getAdminOffersSellerId(getState());
  const status = getAdminOffersStatus(getState());
  const sortBy = getAdminOffersSortBy(getState());
  const sortDirection = getAdminOffersSortDirection(getState());
  const startDate = getAdminOffersStartDate(getState());
  const endDate = getAdminOffersEndDate(getState());

  try {
    addQueryParams({
      limit: limit.toString(),
      offset: offset.toString(),
      status,
      sortDirection,
    });
    const response = await $api.get<ApiOffersResponse>(ApiRoutes.PRODUCTS, {
      params: {
        offset,
        limit,
        sellerId,
        status,
        sortDirection,
        sortBy,
        startDate,
        endDate,
      },
    });

    if (!response.data) {
      throw new Error();
    }

    return response.data;
  } catch (e) {
    return rejectWithValue(`error`);
  }
});

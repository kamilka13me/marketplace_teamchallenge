import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema';
import {
  getIsSellersLoading,
  getSellersLimit,
  getSellersOffset,
} from '@/enteties/Seller/model/selectors/getSellersSelectors';
import { fetchAllSellers } from '@/enteties/Seller/model/services/getAllSellers';
import { sellersActions } from '@/enteties/Seller/model/slice/sellersSlice';

export const fetchNextSellers = createAsyncThunk<void, void, ThunkConfig<string>>(
  'sellers/fetchNextSellers',
  async (_, thunkApi) => {
    const { getState, dispatch } = thunkApi;
    const offset = getSellersOffset(getState());
    const limit = getSellersLimit(getState());
    const isLoading = getIsSellersLoading(getState());

    if (!isLoading) {
      const currentPage = Math.ceil(offset / limit) + 1;
      const newOffset = currentPage * limit;

      dispatch(sellersActions.setOffset(newOffset));
      dispatch(fetchAllSellers({}));
    }
  },
);

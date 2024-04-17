import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema';
import {
  getSellerProductsPageIsLoading,
  getSellerProductsPageLimit,
  getSellerProductsPageOffset,
} from '@/features/managingProducts/model/selectors/sellerProductsPageSelectors';
import { fetchSellerProductsList } from '@/features/managingProducts/model/services/getSellerProducts';
import { sellerProductsPageActions } from '@/features/managingProducts/model/slice/sellerProductsSlice';

export const fetchNextSellerProductsPage = createAsyncThunk<
  void,
  void,
  ThunkConfig<string>
>('sellerProductsPage/fetchNextSellerProductsPage', async (_, thunkApi) => {
  const { getState, dispatch } = thunkApi;
  const offset = getSellerProductsPageOffset(getState());
  const limit = getSellerProductsPageLimit(getState());
  const isLoading = getSellerProductsPageIsLoading(getState());

  if (!isLoading) {
    const currentPage = Math.ceil(offset / limit) + 1;
    const newOffset = currentPage * limit;

    dispatch(sellerProductsPageActions.setOffset(newOffset));
    dispatch(fetchSellerProductsList({}));
  }
});

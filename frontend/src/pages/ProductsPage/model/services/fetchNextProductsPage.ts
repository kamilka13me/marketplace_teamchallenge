import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema';
import {
  getProductsPageIsLoading,
  getProductsPageLimit,
  getProductsPageOffset,
} from '@/pages/ProductsPage/model/selectors/productsPageSelectors';
import { fetchProductsList } from '@/pages/ProductsPage/model/services/getProductsList';
import { productsPageActions } from '@/pages/ProductsPage/model/slices/productsPageSlice';

export const fetchNextProductsPage = createAsyncThunk<void, void, ThunkConfig<string>>(
  'articlesPage/fetchNextArticlesPage',
  async (_, thunkApi) => {
    const { getState, dispatch } = thunkApi;
    const offset = getProductsPageOffset(getState());
    const limit = getProductsPageLimit(getState());
    const isLoading = getProductsPageIsLoading(getState());

    if (!isLoading) {
      const currentPage = Math.ceil(offset / limit) + 1;
      const newOffset = currentPage * limit;

      dispatch(productsPageActions.setOffset(newOffset));
      dispatch(fetchProductsList({}));
    }
  },
);

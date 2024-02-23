import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  getProductsPageHasMore,
  getProductsPageIsLoading,
  getProductsPageNum,
} from '@/pages/ProductsPage/model/productsPageSelectors';
import {
  fetchProductsList,
  ThunkConfig,
} from '@/pages/ProductsPage/model/services/getProductsList';
import { productsPageActions } from '@/pages/ProductsPage/model/slices/productsPageSlice';

export const fetchNextProductsPage = createAsyncThunk<void, void, ThunkConfig<string>>(
  'articlesPage/fetchNextArticlesPage',
  async (_, thunkApi) => {
    const { getState, dispatch } = thunkApi;
    const hasMore = getProductsPageHasMore(getState());
    const page = getProductsPageNum(getState());
    const isLoading = getProductsPageIsLoading(getState());

    if (hasMore && !isLoading) {
      dispatch(productsPageActions.setPage(page + 1));
      dispatch(fetchProductsList({}));
    }
  },
);

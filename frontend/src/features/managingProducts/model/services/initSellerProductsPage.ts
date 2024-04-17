import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema';
import { getSellerProductsPageInited } from '@/features/managingProducts/model/selectors/sellerProductsPageSelectors';
import { fetchSellerProductsList } from '@/features/managingProducts/model/services/getSellerProducts';
import { sellerProductsPageActions } from '@/features/managingProducts/model/slice/sellerProductsSlice';

export const initSellerProductsPage = createAsyncThunk<
  void,
  URLSearchParams,
  ThunkConfig<string>
>('sellerProductsPage/initSellerProductsPage', async (searchParams, thunkApi) => {
  const { getState, dispatch } = thunkApi;
  const inited = getSellerProductsPageInited(getState());

  if (!inited) {
    const sortByFromUrl = searchParams?.get('sortBy');
    const sortDirectionFromUrl = searchParams?.get('sortDirection') as '1' | '-1';

    if (sortDirectionFromUrl) {
      dispatch(sellerProductsPageActions.setSortDirection(sortDirectionFromUrl));
    }

    if (sortByFromUrl) {
      dispatch(sellerProductsPageActions.setSortBy(sortByFromUrl));
    }

    dispatch(sellerProductsPageActions.initState());
    dispatch(fetchSellerProductsList({}));
  }
});

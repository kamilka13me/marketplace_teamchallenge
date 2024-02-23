import { createAsyncThunk } from '@reduxjs/toolkit';

import { getProductsPageInited } from '@/pages/ProductsPage/model/productsPageSelectors';
import {
  fetchProductsList,
  ThunkConfig,
} from '@/pages/ProductsPage/model/services/getProductsList';
import { productsPageActions } from '@/pages/ProductsPage/model/slices/productsPageSlice';

export const initArticlesPage = createAsyncThunk<
  void,
  URLSearchParams,
  ThunkConfig<string>
>('productsPage/initProductsPage', async (searchParams, thunkApi) => {
  const { getState, dispatch } = thunkApi;
  const inited = getProductsPageInited(getState());

  if (!inited) {
    const nameFromUrl = searchParams.get('name');
    const discountFromUrl = searchParams.get('discount');
    const categoryFromUrl = searchParams.get('category');
    const offsetFromUrl = searchParams.get('offset');
    const quantityFromUrl = searchParams.get('quantity');
    const sortDirectionFromUrl = searchParams.get('sortDirection') as '1' | '-1';
    const sortByFromUrl = searchParams.get('sortBy');

    if (nameFromUrl) {
      dispatch(productsPageActions.setName(nameFromUrl));
    }

    if (discountFromUrl) {
      dispatch(productsPageActions.setDiscount(discountFromUrl));
    }

    if (categoryFromUrl) {
      dispatch(productsPageActions.setCategory(categoryFromUrl));
    }

    if (offsetFromUrl) {
      dispatch(productsPageActions.setOffset(offsetFromUrl));
    }

    if (quantityFromUrl) {
      dispatch(productsPageActions.setQuantity(quantityFromUrl));
    }

    if (sortDirectionFromUrl) {
      dispatch(productsPageActions.setSortDirection(sortDirectionFromUrl));
    }

    if (sortByFromUrl) {
      dispatch(productsPageActions.setSortBy(sortByFromUrl));
    }

    dispatch(productsPageActions.initState());
    dispatch(fetchProductsList({}));
  }
});

import { createAsyncThunk } from '@reduxjs/toolkit';

import { getProductsPageInited } from '@/pages/ProductsPage/model/selectors/productsPageSelectors';
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
    const categoryFromUrl = searchParams.get('category');
    const sortByFromUrl = searchParams.get('sortBy');
    const sortDirectionFromUrl = searchParams.get('sortDirection') as '1' | '-1';
    const discountFromUrl = searchParams.get('discount');
    const quantityFromUrl = searchParams.get('quantity');

    if (nameFromUrl) {
      dispatch(productsPageActions.setName(nameFromUrl));
    }

    if (discountFromUrl) {
      dispatch(productsPageActions.setDiscount(discountFromUrl));
    }

    if (categoryFromUrl) {
      dispatch(productsPageActions.setCategory(categoryFromUrl));
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

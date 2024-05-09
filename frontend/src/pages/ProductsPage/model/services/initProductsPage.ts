import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema';
import { fetchProductsList } from '@/pages/ProductsPage/model/services/getProductsList';
import { productsPageActions } from '@/pages/ProductsPage/model/slices/productsPageSlice';

export const initProductsPage = createAsyncThunk<
  void,
  URLSearchParams,
  ThunkConfig<string>
>('productsPage/initProductsPage', async (searchParams, thunkApi) => {
  const { dispatch } = thunkApi;

  const nameFromUrl = searchParams.get('name');
  const categoryFromUrl = searchParams.get('category');
  const sortByFromUrl = searchParams.get('sortBy');
  const sortDirectionFromUrl = searchParams.get('sortDirection') as '1' | '-1';
  const discountFromUrl = searchParams.get('discount');
  const quantityFromUrl = searchParams.get('quantity');

  if (nameFromUrl) dispatch(productsPageActions.setName(nameFromUrl));
  if (discountFromUrl) dispatch(productsPageActions.setDiscount(discountFromUrl));
  if (categoryFromUrl) dispatch(productsPageActions.setCategory(categoryFromUrl));
  if (quantityFromUrl) dispatch(productsPageActions.setQuantity(quantityFromUrl));
  if (sortDirectionFromUrl)
    dispatch(productsPageActions.setSortDirection(sortDirectionFromUrl));
  if (sortByFromUrl) dispatch(productsPageActions.setSortBy(sortByFromUrl));
  dispatch(fetchProductsList({}));
});

export default initProductsPage;

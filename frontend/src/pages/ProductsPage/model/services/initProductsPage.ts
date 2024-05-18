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
  const offsetFromUrl = searchParams.get('offset');
  const sellerIdFromUrl = searchParams.get('sellerId');
  const minRatingFromUrl = searchParams.get('minRating');
  const minPriceFromUrl = searchParams.get('minPrice');
  const maxPriceFromUrl = searchParams.get('maxPrice');

  if (nameFromUrl) dispatch(productsPageActions.setName(nameFromUrl));
  if (discountFromUrl) dispatch(productsPageActions.setDiscount(discountFromUrl));
  if (categoryFromUrl) dispatch(productsPageActions.setCategory(categoryFromUrl));
  if (quantityFromUrl) dispatch(productsPageActions.setQuantity(quantityFromUrl));
  if (sortDirectionFromUrl)
    dispatch(productsPageActions.setSortDirection(sortDirectionFromUrl));
  if (sortByFromUrl) dispatch(productsPageActions.setSortBy(sortByFromUrl));
  if (offsetFromUrl) dispatch(productsPageActions.setOffset(Number(offsetFromUrl)));
  if (sellerIdFromUrl) dispatch(productsPageActions.setSellerId(sellerIdFromUrl));
  if (minRatingFromUrl)
    dispatch(productsPageActions.setMinRating(Number(minRatingFromUrl)));
  if (minPriceFromUrl) dispatch(productsPageActions.setMinPrice(Number(minPriceFromUrl)));
  if (maxPriceFromUrl) dispatch(productsPageActions.setMaxPrice(Number(maxPriceFromUrl)));

  dispatch(fetchProductsList({}));
});

export default initProductsPage;

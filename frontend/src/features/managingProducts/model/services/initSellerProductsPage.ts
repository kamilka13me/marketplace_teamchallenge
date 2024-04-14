import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema';
import { getSellerProductsPageInited } from '@/features/managingProducts/model/selectors/sellerProductsPageSelectors';
import { sellerProductsPageActions } from '@/features/managingProducts/model/slice/sellerProductsSlice';
import { fetchProductsList } from '@/pages/ProductsPage/model/services/getProductsList';

export const initSellerProductsPage = createAsyncThunk<
  void,
  URLSearchParams,
  ThunkConfig<string>
>('sellerProductsPage/initSellerProductsPage', async (searchParams, thunkApi) => {
  const { getState, dispatch } = thunkApi;
  const inited = getSellerProductsPageInited(getState());

  if (!inited) {
    const nameFromUrl = searchParams?.get('name');
    const categoryFromUrl = searchParams?.get('category');
    const sortByFromUrl = searchParams?.get('sortBy');
    const sortDirectionFromUrl = searchParams?.get('sortDirection') as '1' | '-1';
    const discountFromUrl = searchParams?.get('discount');
    const quantityFromUrl = searchParams?.get('quantity');

    if (nameFromUrl) {
      dispatch(sellerProductsPageActions.setName(nameFromUrl));
    }

    if (discountFromUrl) {
      dispatch(sellerProductsPageActions.setDiscount(discountFromUrl));
    }

    if (categoryFromUrl) {
      dispatch(sellerProductsPageActions.setCategory(categoryFromUrl));
    }

    if (quantityFromUrl) {
      dispatch(sellerProductsPageActions.setQuantity(quantityFromUrl));
    }

    if (sortDirectionFromUrl) {
      dispatch(sellerProductsPageActions.setSortDirection(sortDirectionFromUrl));
    }

    if (sortByFromUrl) {
      dispatch(sellerProductsPageActions.setSortBy(sortByFromUrl));
    }

    dispatch(sellerProductsPageActions.initState());
    dispatch(fetchProductsList({}));
  }
});

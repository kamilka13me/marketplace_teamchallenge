import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema';
import {
  getProductCommentsPageIsLoading,
  getProductCommentsPageLimit,
  getProductCommentsPageOffset,
} from '@/pages/ProductPage/model/selectors/ProductCommentsListSelector';
import { fetchProductCommentsList } from '@/pages/ProductPage/model/services/fetchProductComments';
import { productCommentsActions } from '@/pages/ProductPage/model/slices/productCommentsSlice';

interface Props {
  productId: string;
}

export const fetchNextProductComments = createAsyncThunk<
  void,
  Props,
  ThunkConfig<string>
>('sellerPage/fetchNextProductCommentsPage', async ({ productId }, thunkApi) => {
  const { getState, dispatch } = thunkApi;

  const limit = getProductCommentsPageLimit(getState());
  const offset = getProductCommentsPageOffset(getState());
  const isLoading = getProductCommentsPageIsLoading(getState());

  if (!isLoading) {
    const currentPage = Math.ceil(offset / limit) + 1;
    const newOffset = currentPage * limit;

    dispatch(productCommentsActions.setOffset(newOffset));
    dispatch(fetchProductCommentsList({ productId }));
  }
});

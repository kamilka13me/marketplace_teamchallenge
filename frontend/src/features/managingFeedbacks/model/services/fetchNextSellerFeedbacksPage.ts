import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema';
import { sellerFeedbackPageActions } from '@/features/managingFeedbacks';
import {
  getSellerFeedbacksPageIsLoading,
  getSellerFeedbacksPageLimit,
  getSellerFeedbacksPageOffset,
} from '@/features/managingFeedbacks/model/selectors/feedbacksSelectors';
import { fetchSellerFeedbacksList } from '@/features/managingFeedbacks/model/services/getFeedbacks';

export const fetchNextSellerFeedbacksPage = createAsyncThunk<
  void,
  void,
  ThunkConfig<string>
>('sellerPage/fetchNextSellerFeedbacksPage', async (_, thunkApi) => {
  const { getState, dispatch } = thunkApi;
  const offset = getSellerFeedbacksPageOffset(getState());
  const limit = getSellerFeedbacksPageLimit(getState());
  const isLoading = getSellerFeedbacksPageIsLoading(getState());

  if (!isLoading) {
    const currentPage = Math.ceil(offset / limit) + 1;
    const newOffset = currentPage * limit;

    dispatch(sellerFeedbackPageActions.setOffset(newOffset));
    dispatch(fetchSellerFeedbacksList({}));
  }
});

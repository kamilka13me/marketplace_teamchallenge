import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema';
import { IComment } from '@/enteties/Comment';
import { getUserAuthData } from '@/enteties/User';
import {
  getSellerFeedbacksPageEndDate,
  getSellerFeedbacksPageLimit,
  getSellerFeedbacksPageOffset,
  getSellerFeedbacksPageStartDate,
} from '@/features/managingFeedbacks/model/selectors/feedbacksSelectors';
import { $api } from '@/shared/api/api';
import { ApiRoutes } from '@/shared/const/apiEndpoints';
import { addQueryParams } from '@/shared/lib/url/addQueryParams';

interface ApiResponse {
  totalComments: number;
  comments: IComment[];
}

interface FetchProductsListProps {
  replace?: boolean;
}

export const fetchSellerFeedbacksList = createAsyncThunk<
  ApiResponse,
  FetchProductsListProps,
  ThunkConfig<string>
>('sellerPage/fetchSellerFeedbacksList', async (props, thunkApi) => {
  const { rejectWithValue, getState } = thunkApi;

  const limit = getSellerFeedbacksPageLimit(getState());
  const startDate = getSellerFeedbacksPageStartDate(getState());
  const endDate = getSellerFeedbacksPageEndDate(getState());
  const offset = getSellerFeedbacksPageOffset(getState());
  const user = getUserAuthData(getState());

  try {
    addQueryParams({
      limit: limit.toString(),
      offset: offset.toString(),
    });
    const response = await $api.get<ApiResponse>(ApiRoutes.SELLER_FEEDBACKS, {
      params: {
        sellerId: user?._id || '',
        offset,
        limit,
        startDate,
        endDate,
      },
    });

    if (!response.data) {
      throw new Error();
    }

    return response.data;
  } catch (e) {
    return rejectWithValue('error');
  }
});

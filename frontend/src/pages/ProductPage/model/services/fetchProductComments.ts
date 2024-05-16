import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema';
import { IComment } from '@/enteties/Comment';
import {
  getProductCommentsPageLimit,
  getProductCommentsPageOffset,
} from '@/pages/ProductPage/model/selectors/ProductCommentsListSelector';
import { $api } from '@/shared/api/api';
import { ApiRoutes } from '@/shared/const/apiEndpoints';

interface ApiResponse {
  totalComments: number;
  comments: IComment[];
}

interface FetchProductsListProps {
  productId: string;
  replace?: boolean;
}

export const fetchProductCommentsList = createAsyncThunk<
  ApiResponse,
  FetchProductsListProps,
  ThunkConfig<string>
>('productPage/fetchProductCommentsList', async ({ productId }, thunkApi) => {
  const { rejectWithValue, getState } = thunkApi;

  const limit = getProductCommentsPageLimit(getState());
  const offset = getProductCommentsPageOffset(getState());

  try {
    const response = await $api.get<ApiResponse>(
      `${ApiRoutes.PRODUCT_COMMENTS}?productId=${productId}&limit=${limit}&offset=${offset}`,
    );

    if (!response.data) {
      throw new Error();
    }

    return response.data;
  } catch (e) {
    return rejectWithValue('error');
  }
});

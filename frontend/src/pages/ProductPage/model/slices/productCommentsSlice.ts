import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { StateSchema } from '@/app/providers/StoreProvider';
import { IComment } from '@/enteties/Comment';
import { fetchProductCommentsList } from '@/pages/ProductPage/model/services/fetchProductComments';
import { ProductsCommentsSchema } from '@/pages/ProductPage/model/types';

export const productCommentsAdapter = createEntityAdapter({
  selectId: (comment: IComment) => comment._id,
});

export const getProductComments = productCommentsAdapter.getSelectors<StateSchema>(
  (state) => state.productComments || productCommentsAdapter.getInitialState(),
);

export const productCommentsSlice = createSlice({
  name: 'productCommentsPageSlice',
  initialState: productCommentsAdapter.getInitialState<ProductsCommentsSchema>({
    ids: [],
    entities: {},
    isLoading: false,
    error: undefined,
    totalComments: 0,

    // pagination
    limit: 10,
    offset: 0,
    hasMore: true,
  }),
  reducers: {
    setOffset: (state, action: PayloadAction<number>) => {
      state.offset = action.payload;
    },
    resetState: (state) => {
      productCommentsAdapter.removeAll(state);
      state.offset = 0;
      state.hasMore = true;
      state.totalComments = 0;
      state.error = undefined;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductCommentsList.pending, (state, action) => {
        state.error = undefined;
        state.isLoading = true;

        if (action.meta.arg.replace) {
          productCommentsAdapter.removeAll(state);
        }
      })
      .addCase(fetchProductCommentsList.fulfilled, (state, action) => {
        state.isLoading = false;

        if (action.meta.arg.replace) {
          productCommentsAdapter.setAll(state, action.payload.comments);
        } else {
          productCommentsAdapter.addMany(state, action.payload.comments);
        }
        state.totalComments = action.payload.totalComments;
      })
      .addCase(fetchProductCommentsList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.toString();
      });
  },
});

export const { reducer: productCommentsReducer, actions: productCommentsActions } =
  productCommentsSlice;

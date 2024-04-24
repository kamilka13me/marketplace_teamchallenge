import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { StateSchema } from '@/app/providers/StoreProvider';
import { IComment } from '@/enteties/Comment';
import { fetchSellerFeedbacksList } from '@/features/managingFeedbacks/model/services/getFeedbacks';
import { SellerFeedbackPageSchema } from '@/features/managingFeedbacks/model/types/sellerFeedbackSchema';

export const sellerFeedbackAdapter = createEntityAdapter({
  selectId: (comment: IComment) => comment._id,
});

export const getSellerFeedbacks = sellerFeedbackAdapter.getSelectors<StateSchema>(
  (state) => state.sellerFeedbacks || sellerFeedbackAdapter.getInitialState(),
);

export const sellerFeedbackSlice = createSlice({
  name: 'sellerFeedbackPageSlice',
  initialState: sellerFeedbackAdapter.getInitialState<SellerFeedbackPageSchema>({
    ids: [],
    entities: {},
    isLoading: false,
    error: undefined,
    totalComments: 0,

    // pagination
    limit: 5,
    offset: 0,

    startDate: '',
    endDate: '',
  }),
  reducers: {
    setStartDate: (state, action: PayloadAction<Date>) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action: PayloadAction<Date>) => {
      state.endDate = action.payload;
    },
    setOffset: (state, action: PayloadAction<number>) => {
      state.offset = action.payload;
    },
    clearSortParams: (state) => {
      state.startDate = '';
      state.endDate = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSellerFeedbacksList.pending, (state, action) => {
        state.error = undefined;
        state.isLoading = true;

        if (action.meta.arg.replace) {
          sellerFeedbackAdapter.removeAll(state);
        }
      })
      .addCase(fetchSellerFeedbacksList.fulfilled, (state, action) => {
        state.isLoading = false;

        sellerFeedbackAdapter.setAll(state, action.payload.comments);
        state.totalComments = action.payload.totalComments;
      })
      .addCase(fetchSellerFeedbacksList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.toString();
      });
  },
});

export const { reducer: sellerFeedbackPageReducer, actions: sellerFeedbackPageActions } =
  sellerFeedbackSlice;

import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { StateSchema } from '@/app/providers/StoreProvider';
import { fetchAllSellers } from '@/enteties/Seller/model/services/getAllSellers';
import { SellersSchema, UserSeller } from '@/enteties/Seller/model/types/seller';

export const sellersAdapter = createEntityAdapter({
  selectId: (seller: UserSeller) => seller._id,
});

export const getSellers = sellersAdapter.getSelectors<StateSchema>(
  (state) => state.sellers || sellersAdapter.getInitialState(),
);

export const usersSlice = createSlice({
  name: 'sellersSlice',
  initialState: sellersAdapter.getInitialState<SellersSchema>({
    ids: [],
    entities: {},
    isLoading: false,
    error: undefined,
    totalSellers: 0,

    // pagination
    limit: 8,
    offset: 0,

    startDate: '',
    endDate: '',
    search: '',
    sortDirection: '1',
    _inited: false,
  }),
  reducers: {
    setStartDate: (state, action: PayloadAction<Date>) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action: PayloadAction<Date>) => {
      state.endDate = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setOffset: (state, action: PayloadAction<number>) => {
      state.offset = action.payload;
    },
    setSortDirection: (state, action: PayloadAction<'1' | '-1'>) => {
      state.sortDirection = action.payload;
    },
    clearSortParams: (state) => {
      state.sortDirection = '1';
    },
    initState: (state) => {
      state._inited = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllSellers.pending, (state, action) => {
        state.error = undefined;
        state.isLoading = true;

        if (action.meta.arg.replace) {
          sellersAdapter.removeAll(state);
        }
      })
      .addCase(fetchAllSellers.fulfilled, (state, action) => {
        state.isLoading = false;

        sellersAdapter.setAll(state, action.payload.users);
        state.totalSellers = action.payload.totalCount;
      })
      .addCase(fetchAllSellers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.toString();
      });
  },
});

export const { reducer: sellersReducer, actions: sellersActions } = usersSlice;

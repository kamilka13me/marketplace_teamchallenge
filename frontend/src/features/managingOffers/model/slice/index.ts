import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { fetchAdminOffersList } from '../services';
import { AdminOffersSchema } from '../types';

import { StateSchema } from '@/app/providers/StoreProvider';
import { Product } from '@/enteties/Product';

export const adminOffersAdapter = createEntityAdapter({
  selectId: (product: Product) => product._id,
});

export const getAdminOffers = adminOffersAdapter.getSelectors<StateSchema>(
  (state) => state.adminOffers || adminOffersAdapter.getInitialState(),
);

const slice = createSlice({
  name: 'adminOffers',
  initialState: adminOffersAdapter.getInitialState<AdminOffersSchema>({
    ids: [],
    entities: {},

    isLoading: false,
    error: undefined,
    totalOffers: 0,

    // pagination
    limit: 5,
    offset: 0,

    sellerId: '',
    status: '',
    sortBy: '',
    sortDirection: '-1',

    startDate: '',
    endDate: '',

    _inited: false,
  }),
  reducers: {
    setOffset: (state, action: PayloadAction<number>) => {
      state.offset = action.payload;
    },
    setSellerId: (state, action: PayloadAction<string>) => {
      state.sellerId = action.payload;
    },
    setStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
    },
    setSortDirection: (state, action: PayloadAction<'1' | '-1'>) => {
      state.sortDirection = action.payload;
    },
    setStartDate: (state, action: PayloadAction<Date>) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action: PayloadAction<Date>) => {
      state.endDate = action.payload;
    },
    initState: (state) => {
      state._inited = true;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAdminOffersList.fulfilled, (state, { payload }) => {
        adminOffersAdapter.setAll(state, payload.products);
        state.totalOffers = payload.count;

        state.isLoading = false;
      })
      .addCase(fetchAdminOffersList.pending, (state, action) => {
        if (action.meta.arg.replace) {
          adminOffersAdapter.removeAll(state);
        }

        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchAdminOffersList.rejected, (state, { payload }) => {
        state.error = payload as string;
        state.isLoading = false;
      }),
});

export const { reducer: adminOffersReducer, actions: adminOffersActions } = slice;

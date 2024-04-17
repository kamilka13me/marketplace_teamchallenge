import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { StateSchema } from '@/app/providers/StoreProvider';
import { SellerProduct } from '@/enteties/Product';
import { SellerProductsPageSchema } from '@/features/managingProducts';
import { fetchSellerProductsList } from '@/features/managingProducts/model/services/getSellerProducts';

export const sellerProductsAdapter = createEntityAdapter({
  selectId: (product: SellerProduct) => product._id,
});

export const getSellerProducts = sellerProductsAdapter.getSelectors<StateSchema>(
  (state) => state.sellerProducts || sellerProductsAdapter.getInitialState(),
);

export const sellerProductsSlice = createSlice({
  name: 'sellerProductsPageSlice',
  initialState: sellerProductsAdapter.getInitialState<SellerProductsPageSchema>({
    ids: [],
    entities: {},
    isLoading: false,
    error: undefined,
    totalProducts: 0,

    // pagination
    limit: 5,
    offset: 0,

    sortBy: '',
    sortDirection: '-1',

    _inited: false,
  }),
  reducers: {
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
    },
    setOffset: (state, action: PayloadAction<number>) => {
      state.offset = action.payload;
    },
    setSortDirection: (state, action: PayloadAction<'1' | '-1'>) => {
      state.sortDirection = action.payload;
    },
    clearSortParams: (state) => {
      state.sortBy = '';
      state.sortDirection = '1';
    },
    initState: (state) => {
      state._inited = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSellerProductsList.pending, (state, action) => {
        state.error = undefined;
        state.isLoading = true;

        if (action.meta.arg.replace) {
          sellerProductsAdapter.removeAll(state);
        }
      })
      .addCase(fetchSellerProductsList.fulfilled, (state, action) => {
        state.isLoading = false;

        sellerProductsAdapter.setAll(state, action.payload.products);
        state.totalProducts = action.payload.count;
      })
      .addCase(fetchSellerProductsList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.toString();
      });
  },
});

export const { reducer: sellerProductsPageReducer, actions: sellerProductsPageActions } =
  sellerProductsSlice;

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

    // pagination
    limit: 5,
    offset: 0,

    name: '',
    sortBy: '',
    discount: '0',
    category: '',
    quantity: '1',
    sortDirection: '1',

    _inited: false,
  }),
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
    },
    setDiscount: (state, action: PayloadAction<string>) => {
      state.discount = action.payload;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    setOffset: (state, action: PayloadAction<number>) => {
      state.offset = action.payload;
    },
    setQuantity: (state, action: PayloadAction<string>) => {
      state.quantity = action.payload;
    },
    setSortDirection: (state, action: PayloadAction<'1' | '-1'>) => {
      state.sortDirection = action.payload;
    },
    clearSortParams: (state) => {
      state.name = '';
      state.sortBy = '';
      state.discount = '0';
      state.category = '';
      state.quantity = '0';
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

        sellerProductsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchSellerProductsList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { reducer: sellerProductsPageReducer, actions: sellerProductsPageActions } =
  sellerProductsSlice;

import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { StateSchema } from '@/app/providers/StoreProvider';
import { Product } from '@/enteties/Product';
import { ProductsPageSchema } from '@/pages/ProductsPage';
import { fetchProductsList } from '@/pages/ProductsPage/model/services/getProductsList';

export const productsAdapter = createEntityAdapter({
  selectId: (product: Product) => product._id,
});

export const getProducts = productsAdapter.getSelectors<StateSchema>(
  (state) => state.products || productsAdapter.getInitialState(),
);

export const productsPageSlice = createSlice({
  name: 'productsPageSlice',
  initialState: productsAdapter.getInitialState<ProductsPageSchema>({
    ids: [],
    entities: {},
    isLoading: false,
    error: undefined,

    // pagination
    limit: 3,
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
      state.quantity = '1';
      state.sortDirection = '1';
    },
    initState: (state) => {
      state._inited = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsList.pending, (state, action) => {
        state.error = undefined;
        state.isLoading = true;

        if (action.meta.arg.replace) {
          productsAdapter.removeAll(state);
        }
      })
      .addCase(fetchProductsList.fulfilled, (state, action) => {
        state.isLoading = false;

        if (action.meta.arg.replace) {
          productsAdapter.setAll(state, action.payload);
        } else {
          productsAdapter.addMany(state, action.payload);
        }
      })
      .addCase(fetchProductsList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { reducer: productsPageReducer, actions: productsPageActions } =
  productsPageSlice;

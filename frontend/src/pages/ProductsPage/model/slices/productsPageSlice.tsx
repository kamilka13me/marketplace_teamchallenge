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

    name: '',
    sortBy: '',
    page: 1,
    hasMore: true,
    _inited: false,
    limit: 3,
    discount: '0',
    category: '',
    offset: '0',
    quantity: '1',
    sortDirection: '1',
  }),
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setDiscount: (state, action: PayloadAction<string>) => {
      state.discount = action.payload;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    setOffset: (state, action: PayloadAction<string>) => {
      state.offset = action.payload;
    },
    setQuantity: (state, action: PayloadAction<string>) => {
      state.quantity = action.payload;
    },
    setSortDirection: (state, action: PayloadAction<'1' | '-1'>) => {
      state.sortDirection = action.payload;
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
        state.hasMore = action.payload.length >= state.limit;

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

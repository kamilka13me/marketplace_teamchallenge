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
    limit: 12,
    offset: 0,
    name: '',
    sortBy: '',
    discount: '0',
    category: '',
    quantity: '1',
    sortDirection: '1',
    count: 0,
    sellerId: '',
    minRating: null,
    minPrice: null,
    maxPrice: null,
    status: 'published',
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
    setSellerId: (state, action: PayloadAction<string>) => {
      state.sellerId = action.payload;
    },
    setMinRating: (state, action: PayloadAction<number>) => {
      state.minRating = action.payload;
    },
    setMinPrice: (state, action: PayloadAction<number>) => {
      state.minPrice = action.payload;
    },
    setMaxPrice: (state, action: PayloadAction<number>) => {
      state.maxPrice = action.payload;
    },
    clearSortParams: (state) => {
      state.name = '';
      state.sortBy = '';
      state.discount = '0';
      state.category = '';
      state.quantity = '1';
      state.sortDirection = '1';
      state.offset = 0;
      state.count = 0;
      state.sellerId = '';
      state.minRating = null;
      state.minPrice = null;
      state.maxPrice = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsList.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
        productsAdapter.removeAll(state);
      })
      .addCase(fetchProductsList.fulfilled, (state, action) => {
        state.isLoading = false;
        productsAdapter.setAll(state, action.payload.products);
        state.count = action.payload.count;
      })
      .addCase(fetchProductsList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.toString();
      });
  },
});

export const { reducer: productsPageReducer, actions: productsPageActions } =
  productsPageSlice;

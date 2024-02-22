import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { Product } from '@/enteties/Product';

export const productsAdapter = createEntityAdapter({
  selectId: (product: Product) => product._id,
});

// export const getProducts = productsAdapter.getSelectors<StateSchema>((state) => state. )

export const productsPageSlice = createSlice({
  name: 'productsPageSlice',
  initialState: {},
  reducers: {},
});

export const { reducer: productsReducer } = productsPageSlice;

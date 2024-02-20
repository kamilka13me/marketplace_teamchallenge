import { createSlice } from '@reduxjs/toolkit';

import { getProducts } from '@/enteties/Product/model/services/getProducts';
import { ProductSchema } from '@/enteties/Product/model/types/productsSchema';

const initialState: ProductSchema = {
  products: [],
  isLoading: true,
};
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        state.products = action.payload;
        state.isLoading = false;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

// Action creators are generated for each case reducer function
export const { actions: productsActions } = productsSlice;
export const { reducer: productsReducer } = productsSlice;

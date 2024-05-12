import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getSellerProfileInfo } from '@/enteties/Seller/model/services/getSellerProfileInfo';
import { setNewSeller } from '@/enteties/Seller/model/services/setNewSeller';
import { setSellerInfo } from '@/enteties/Seller/model/services/setSellerInfo';
import { Seller, SellerSchema } from '@/enteties/Seller/model/types/seller';
import { setPasswordUser } from '@/enteties/User';

const initialState: SellerSchema = {
  isLoading: true,
};

export const sellerSlice = createSlice({
  name: 'seller',
  initialState,
  reducers: {
    setSellerData: (state, action: PayloadAction<Seller>) => {
      state.sellerData = action.payload;
    },
    resetError: (state) => {
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSellerProfileInfo.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(setNewSeller.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(setSellerInfo.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(setPasswordUser.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(getSellerProfileInfo.fulfilled, (state) => {
        state.isLoading = false;
        state.error = undefined;
      })
      .addCase(setNewSeller.fulfilled, (state) => {
        state.isLoading = false;
        state.error = undefined;
      })
      .addCase(setSellerInfo.fulfilled, (state) => {
        state.isLoading = false;
        state.error = undefined;
      })
      .addCase(setPasswordUser.fulfilled, (state) => {
        state.isLoading = false;
        state.error = undefined;
      })
      .addCase(getSellerProfileInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(setNewSeller.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(setSellerInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(setPasswordUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { actions: sellerInfoActions } = sellerSlice;
export const { reducer: sellerInfoReducer } = sellerSlice;

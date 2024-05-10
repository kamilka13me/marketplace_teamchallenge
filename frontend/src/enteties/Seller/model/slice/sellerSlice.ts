import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { setNewSeller } from '@/enteties/Seller/model/services/setNewSeller';
import { Seller, SellerSchema } from '@/enteties/Seller/model/types/seller';
import { setPasswordUser } from '@/enteties/User';
// import { setInformationUser } from '@/enteties/User/model/services/setInformationUser';

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
      .addCase(setNewSeller.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      // .addCase(setInformationUser.pending, (state) => {
      //   state.error = undefined;
      //   state.isLoading = true;
      // })
      .addCase(setPasswordUser.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(setNewSeller.fulfilled, (state) => {
        state.isLoading = false;
        state.error = undefined;
      })
      // .addCase(setInformationUser.fulfilled, (state) => {
      //   state.isLoading = false;
      //   state.error = undefined;
      // })
      .addCase(setPasswordUser.fulfilled, (state) => {
        state.isLoading = false;
        state.error = undefined;
      })
      .addCase(setNewSeller.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // .addCase(setInformationUser.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.error = action.payload as string;
      // })
      .addCase(setPasswordUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { actions: sellerInfoActions } = sellerSlice;
export const { reducer: sellerInfoReducer } = sellerSlice;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getUserByCredentials } from '../services/getUserByCredentials';
import { LoginSchema } from '../types/loginSchema';

const initialState: LoginSchema = {
  email: '',
  password: '',
  isLoading: true,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    resetError: (state) => {
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserByCredentials.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(getUserByCredentials.fulfilled, (state) => {
        state.isLoading = false;
        state.error = undefined;
      })
      .addCase(getUserByCredentials.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

// Action creators are generated for each case reducer function
export const { actions: actionLogin } = loginSlice;
export const { reducer: loginReducer } = loginSlice;

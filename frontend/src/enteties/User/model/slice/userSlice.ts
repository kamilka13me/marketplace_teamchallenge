import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

import { User, UserSchema } from '@/enteties/User';
import { getUserWishlist } from '@/enteties/User/model/services/getUserWishlist';
import { setInformationUser } from '@/enteties/User/model/services/setInformationUser';
import { setNewUser } from '@/enteties/User/model/services/setNewUser';
import { getUserByCredentials } from '@/features/userAuth/model/services/getUserByCredentials';
import { $api } from '@/shared/api/api';
import { ApiRoutes } from '@/shared/const/apiEndpoints';
import {
  COOKIE_KEY_EXPIRATION_DATE_OF_USER,
  COOKIE_KEY_TOKEN,
  COOKIE_KEY_USER,
} from '@/shared/const/cookies';

const initialState: UserSchema = {
  userWishlist: {
    wishlist: [],
    isLoading: true,
  },
  inited: false,
  isLoading: true,
};

const removeCookies = () => {
  Cookies.remove(COOKIE_KEY_USER);
  Cookies.remove(COOKIE_KEY_TOKEN);
  Cookies.remove(COOKIE_KEY_EXPIRATION_DATE_OF_USER);
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<User>) => {
      state.authData = action.payload;
    },
    setUserWishList: (state, action: PayloadAction<string[]>) => {
      state.userWishlist.wishlist = action.payload;
    },
    initAuthData: (state) => {
      const user = Cookies.get(COOKIE_KEY_USER);
      const token = Cookies.get(COOKIE_KEY_TOKEN);
      const inspDate = Cookies.get(COOKIE_KEY_EXPIRATION_DATE_OF_USER);

      if (user && token) {
        state.authData = JSON.parse(user);
        if (inspDate) {
          const storedExpirationDate = new Date(inspDate);
          const timeDifference = storedExpirationDate.getTime() - new Date().getTime();
          const hoursDifference = timeDifference / (1000 * 60 * 60); // max 7 days access token live

          if (hoursDifference < 5) {
            state.authData = undefined;
            removeCookies();
          }
        }
      } else {
        state.authData = undefined;
        removeCookies();
      }

      state.inited = true;
    },
    logout: (state) => {
      $api.delete(ApiRoutes.AUTHENTICATION);
      state.authData = undefined;
      removeCookies();
      localStorage.clear();
    },
    resetError: (state) => {
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserWishlist.pending, (state) => {
        state.userWishlist.error = undefined;
        state.userWishlist.isLoading = true;
      })
      .addCase(setNewUser.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(setInformationUser.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(getUserByCredentials.fulfilled, (state) => {
        state.userWishlist.isLoading = false;
      })
      .addCase(setNewUser.fulfilled, (state) => {
        state.isLoading = false;
        state.error = undefined;
      })
      .addCase(setInformationUser.fulfilled, (state) => {
        state.isLoading = false;
        state.error = undefined;
      })
      .addCase(getUserByCredentials.rejected, (state, action) => {
        state.userWishlist.isLoading = false;
        state.userWishlist.error = action.payload as string;
      })
      .addCase(setNewUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(setInformationUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;

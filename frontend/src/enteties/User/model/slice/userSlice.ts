import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

import { User, UserSchema } from '@/enteties/User';
import {
  COOKIE_KEY_EXPIRATION_DATE_OF_USER,
  COOKIE_KEY_TOKEN,
  COOKIE_KEY_USER,
} from '@/shared/const/cookies';

const initialState: UserSchema = {
  inited: false,
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
    initAuthData: (state) => {
      const user = Cookies.get(COOKIE_KEY_USER);
      const token = Cookies.get(COOKIE_KEY_TOKEN);
      const inspDate = Cookies.get(COOKIE_KEY_EXPIRATION_DATE_OF_USER);

      if (user && token) {
        state.authData = JSON.parse(user);
        if (inspDate) {
          const storedExpirationDate = new Date(inspDate);
          const timeDifference = storedExpirationDate.getTime() - new Date().getTime();
          const hoursDifference = timeDifference / (1000 * 60 * 60);

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
      state.authData = undefined;
      removeCookies();
    },
  },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;

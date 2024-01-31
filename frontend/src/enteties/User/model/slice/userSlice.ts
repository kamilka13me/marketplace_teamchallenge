import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

import { User, UserSchema } from '@/enteties/User';

const initialState: UserSchema = {};

const removeCookies = () => {
  Cookies.remove(`${import.meta.env.VITE_USER}`);
  Cookies.remove(`${import.meta.env.VITE_TOKEN}`);
  Cookies.remove(`${import.meta.env.VITE_EXPIRATION_DATE_OF_USER}`);
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<User>) => {
      state.authData = action.payload;
    },
    initAuthData: (state) => {
      const user = Cookies.get(`${import.meta.env.VITE_USER}`);
      const token = Cookies.get(`${import.meta.env.VITE_TOKEN}`);
      const inspDate = Cookies.get(`${import.meta.env.VITE_EXPIRATION_DATE_OF_USER}`);

      if (inspDate) {
        const storedExpirationDate = new Date(inspDate);
        const timeDifference = storedExpirationDate.getTime() - new Date().getTime();
        const hoursDifference = timeDifference / (1000 * 60 * 60);

        if (!user || !token || hoursDifference < 5) {
          state.authData = undefined;
          removeCookies();
        }

        if (user) {
          state.authData = JSON.parse(user);
        }
      } else {
        state.authData = undefined;
        removeCookies();
      }
    },
    logout: (state) => {
      state.authData = undefined;
      removeCookies();
    },
  },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;

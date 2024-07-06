import { createAsyncThunk } from '@reduxjs/toolkit';
import Bowser from 'bowser';
import Cookies from 'js-cookie';

import { User, userActions } from '@/enteties/User';
import { $api } from '@/shared/api/api';
import { ApiRoutes } from '@/shared/const/apiEndpoints';
import {
  COOKIE_KEY_EXPIRATION_DATE_OF_USER,
  COOKIE_KEY_TOKEN,
  COOKIE_KEY_USER,
} from '@/shared/const/cookies';

const EXPIRES_TIME = 14;

interface ApiResponse {
  accessToken: string;
  message: string;
  user: User;
}

interface LoginByUsernameProps {
  email: string;
  password: string;
}

const cookiesAttr: Cookies.CookieAttributes = {
  expires: EXPIRES_TIME,
  secure: true,
  sameSite: 'Strict',
};

export const getUserByCredentials = createAsyncThunk<ApiResponse, LoginByUsernameProps>(
  'login/getUserByCredentials',
  async (authData, thunkApi) => {
    const { dispatch, rejectWithValue } = thunkApi;
    const currentDate = new Date();

    try {
      const browser = Bowser.getParser(navigator.userAgent);
      const info = browser.getResult();

      const response = await $api.post<ApiResponse>(ApiRoutes.AUTHENTICATION, {
        ...authData,
        info,
        font: document.fonts,
        date: currentDate.getTimezoneOffset(),
        screen: {
          width: window.screen.availWidth,
          height: window.screen.availHeight,
          pixel: window.screen.pixelDepth,
        },
      });

      if (response.status !== 200) {
        if (response.status === 403) {
          return rejectWithValue(`:: ${response.statusText} `);
        }

        if (response.status === 422) {
          return rejectWithValue(`:: ${response.statusText} `);
        }

        if (response.status === 423) {
          return rejectWithValue(`:: ${response.statusText} `);
        }

        return rejectWithValue(`:: ${response.statusText} `);
      }

      const { accessToken, user } = response.data;

      const futureDate = new Date(currentDate);

      futureDate.setDate(currentDate.getDate() + EXPIRES_TIME);

      // Set cookies for user, expiration date when user removes from cookies
      Cookies.set(COOKIE_KEY_USER, JSON.stringify(response.data.user), cookiesAttr);
      Cookies.set(
        COOKIE_KEY_EXPIRATION_DATE_OF_USER,
        futureDate.toISOString(),
        cookiesAttr,
      );
      Cookies.set(COOKIE_KEY_TOKEN, accessToken, cookiesAttr);

      dispatch(userActions.setAuthData(user));

      return response.data;
    } catch (e: unknown) {
      if (e instanceof Error) {
        return rejectWithValue(`:: ${e.message}`);
      }

      return rejectWithValue('Unknown error occurred');
    }
  },
);

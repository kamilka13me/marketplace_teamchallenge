import axios from 'axios';
import Cookies from 'js-cookie';

import {
  COOKIE_KEY_EXPIRATION_DATE_OF_USER,
  COOKIE_KEY_TOKEN,
  COOKIE_KEY_USER,
} from '@/shared/const/cookies';

export const $api = axios.create({
  baseURL: '/api',
  timeout: 15000,
});

const clearCookies = () => {
  Cookies.remove(COOKIE_KEY_USER);
  Cookies.remove(COOKIE_KEY_TOKEN);
  Cookies.remove(COOKIE_KEY_EXPIRATION_DATE_OF_USER);
};

$api.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get(COOKIE_KEY_TOKEN);

    if (accessToken) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

$api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await $api.get(`/auth/refresh-token`);

        const { accessToken } = response.data;

        Cookies.set(COOKIE_KEY_TOKEN, accessToken, { secure: true, sameSite: 'Strict' });

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return axios(originalRequest);
      } catch (error) {
        /* eslint-disable no-console */
        console.log(`Error ${(error as Error).message}`);
      }
    }

    if (
      error.response.status === 419 ||
      (error.response.status === 400 && error.response.statusText === 'Token is required')
    ) {
      clearCookies();
      window.location.reload();
    }

    if (error.response.status === 500) {
      window.location.href = '/500';

      return;
    }

    return Promise.reject(error);
  },
);

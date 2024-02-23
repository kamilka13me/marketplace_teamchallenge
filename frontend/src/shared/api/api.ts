import axios from 'axios';
import Cookies from 'js-cookie';

export const $api = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    Authorization: `Bearer ${Cookies.get('token')}`,
  },
});

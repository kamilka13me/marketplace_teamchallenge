import { createAsyncThunk } from '@reduxjs/toolkit';

import { $api } from '@/shared/api/api';
import { ApiRoutes } from '@/shared/const/apiEndpoints';

interface ApiResponse extends newSellerDataProps {
  info: object;
}

interface newSellerDataProps {
  username: string;
  surname: string;
  email: string;
  password: string;
  legalName: string;
  legalAddress: string;
  city: string;
  cityIndex: string;
  idStateRegister: string;
  identificNumber: string;
  tax: boolean;
  contacts: {
    phone: string;
    person: string;
  }[];
  communication: {
    messenger: string;
    phone: string;
  }[];
  descriptCompany: string;
  generalName: string;
  generalCommunication: {
    messenger: string;
    phone: string;
  }[];
  emailAdvice: boolean;
  emailAdvertisement: boolean;
  emailMessage: boolean;
  conditions: boolean;
}

export const setNewSeller = createAsyncThunk<ApiResponse, newSellerDataProps>(
  'seller',
  async (newSellerData, thunkApi) => {
    const { rejectWithValue } = thunkApi;

    try {
      const response = await $api.post<ApiResponse>(ApiRoutes.SELLER, {
        ...newSellerData,
      });

      if (response.status !== 201) {
        if (response.status === 400) {
          return rejectWithValue(`:: ${response.statusText} `);
        }

        if (response.status === 409) {
          return rejectWithValue(`:: ${response.statusText} `);
        }

        return rejectWithValue(`:: ${response.statusText} `);
      }

      return response.data;
    } catch (e: unknown) {
      if (e instanceof Error) {
        return rejectWithValue(`:: ${e.message}`);
      }

      return rejectWithValue('Unknown error occurred');
    }
  },
);

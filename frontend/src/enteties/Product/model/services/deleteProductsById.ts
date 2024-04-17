import { createAsyncThunk } from '@reduxjs/toolkit';

import { $api } from '@/shared/api/api';
import { ApiRoutes } from '@/shared/const/apiEndpoints';

interface Props {
  _ids: string[];
}

export const deleteProductsById = createAsyncThunk<Props, string[]>(
  'product/DeleteProduct',
  async (_ids, thunkApi) => {
    const { rejectWithValue } = thunkApi;

    try {
      const response = await $api.delete(ApiRoutes.PRODUCTS, {
        data: {
          ids: _ids,
        },
      });

      if (response.status !== 200) {
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

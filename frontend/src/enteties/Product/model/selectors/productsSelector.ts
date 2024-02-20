import { StateSchema } from '@/app/providers/StoreProvider';

export const productsData = (state: StateSchema) => state.products.products;

export const productsIsLoading = (state: StateSchema) => state.products.isLoading;

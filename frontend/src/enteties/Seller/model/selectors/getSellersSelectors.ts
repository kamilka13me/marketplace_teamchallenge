import { StateSchema } from '@/app/providers/StoreProvider';

export const getIsSellersLoading = (state: StateSchema) => state.sellers.isLoading;

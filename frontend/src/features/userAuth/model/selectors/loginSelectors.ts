import { StateSchema } from '@/app/providers/StoreProvider';

export const loginIsLoading = (state: StateSchema) => state.login.isLoading;
export const loginHasError = (state: StateSchema) => state.login.error;

import { StateSchema } from '@/app/providers/StoreProvider';

export const getLoginEmail = (state: StateSchema) => state.login.email;
export const getLoginPassword = (state: StateSchema) => state.login.password;
export const loginIsLoading = (state: StateSchema) => state.login.isLoading;
export const loginHasError = (state: StateSchema) => state.login.error;

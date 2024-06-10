import { StateSchema } from '@/app/providers/StoreProvider';

export const getIsUsersLoading = (state: StateSchema) => state.users.isLoading;

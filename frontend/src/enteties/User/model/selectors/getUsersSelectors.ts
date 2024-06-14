import { StateSchema } from '@/app/providers/StoreProvider';

export const getIsUsersLoading = (state: StateSchema) => state.users.isLoading;

export const getUsersLength = (state: StateSchema) => state.users.totalUsers;

export const getUsersLimit = (state: StateSchema) => state.users.limit;

export const getUsersOffset = (state: StateSchema) => state.users.offset;
export const getUsersSearch = (state: StateSchema) => state.users.search;

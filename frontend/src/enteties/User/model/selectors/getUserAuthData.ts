import { StateSchema } from '@/app/providers/StoreProvider';

export const getUserAuthData = (state: StateSchema) => state.user.authData;

export const getWishlist = (state: StateSchema) => state.user.userWishlist;
export const getIsInitedAuthData = (state: StateSchema) => state.user.inited;

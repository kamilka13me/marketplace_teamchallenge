import { getIsInitedAuthData, getUserAuthData } from './model/selectors/getUserAuthData';
import { userActions, userReducer } from './model/slice/userSlice';
import { User, UserSchema, UserWithWishlist } from './model/types/user';

export type { User, UserWithWishlist, UserSchema };

export { userActions, userReducer, getUserAuthData, getIsInitedAuthData };

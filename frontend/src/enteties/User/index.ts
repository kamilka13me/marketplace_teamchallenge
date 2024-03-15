import {
  getIsInitedAuthData,
  getUserAuthData,
  getWishlist,
} from './model/selectors/getUserAuthData';
import { userActions, userReducer } from './model/slice/userSlice';
import { User, UserSchema, UserWithWishlist } from './model/types/user';

import { getUserWishlist } from '@/enteties/User/model/services/getUserWishlist';
import { setInformationUser } from '@/enteties/User/model/services/setInformationUser';
import { setNewUser } from '@/enteties/User/model/services/setNewUser';

export type { User, UserWithWishlist, UserSchema };

export {
  userActions,
  userReducer,
  getUserWishlist,
  getWishlist,
  getUserAuthData,
  getIsInitedAuthData,
  setNewUser,
  setInformationUser,
};

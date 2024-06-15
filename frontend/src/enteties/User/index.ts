import {
  getIsInitedAuthData,
  getUserAuthData,
  getWishlist,
} from './model/selectors/getUserAuthData';
import { userActions, userReducer } from './model/slice/userSlice';
import { User, UserSchema, UserWithWishlist } from './model/types/user';

import { fetchAllUsers } from '@/enteties/User/model/services/getAllUsers';
import { getUserWishlist } from '@/enteties/User/model/services/getUserWishlist';
import { setInformationUser } from '@/enteties/User/model/services/setInformationUser';
import { setNewUser } from '@/enteties/User/model/services/setNewUser';
import { setPasswordUser } from '@/enteties/User/model/services/setPasswordUser';
import { usersActions, usersReducer } from '@/enteties/User/model/slice/usersSlice';
import { UsersSchema } from '@/enteties/User/model/types/users';

export type { User, UserWithWishlist, UserSchema, UsersSchema };

export {
  userActions,
  userReducer,
  usersReducer,
  usersActions,
  getUserWishlist,
  getWishlist,
  getUserAuthData,
  getIsInitedAuthData,
  setNewUser,
  setInformationUser,
  setPasswordUser,
  fetchAllUsers,
};

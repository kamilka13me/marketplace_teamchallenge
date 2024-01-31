import { getUserAuthData } from './model/selectors/getUserAuthData';
import { userActions, userReducer } from './model/slice/userSlice';
import { User, UserSchema } from './model/types/user';

export type { User, UserSchema };

export { userActions, userReducer, getUserAuthData };

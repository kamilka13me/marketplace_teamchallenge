import { getUserAuthData } from '@/enteties/User/model/selectors/getUserAuthData';
import { userActions, userReducer } from '@/enteties/User/model/slice/userSlice';
import { User, UserSchema } from '@/enteties/User/types/user';

export type { User, UserSchema };

export { userActions, userReducer, getUserAuthData };

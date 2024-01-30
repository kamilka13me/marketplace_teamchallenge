import {
  loginHasError,
  loginIsLoading,
} from '@/features/userAuth/model/selectors/loginSelectors';
import { getUserByCredentials } from '@/features/userAuth/model/services/getUserByCredentials';
import { actionReducer, loginReducer } from '@/features/userAuth/model/slice/loginSlice';
import { LoginSchema } from '@/features/userAuth/model/types/loginSchema';

export type { LoginSchema };
export {
  actionReducer,
  loginReducer,
  getUserByCredentials,
  loginIsLoading,
  loginHasError,
};

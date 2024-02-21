import { UserSchema } from '@/enteties/User';
import { LoginSchema } from '@/features/userAuth';
import { rtkApi } from '@/shared/api/rtkApi';

export interface StateSchema {
  login: LoginSchema;
  user: UserSchema;

  [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;
}

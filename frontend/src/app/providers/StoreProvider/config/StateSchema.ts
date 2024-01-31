import { UserSchema } from '@/enteties/User';
import { LoginSchema } from '@/features/userAuth';

export interface StateSchema {
  login: LoginSchema;
  user: UserSchema;
}

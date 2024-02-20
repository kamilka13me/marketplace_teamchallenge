import { ProductSchema } from '@/enteties/Product';
import { UserSchema } from '@/enteties/User';
import { LoginSchema } from '@/features/userAuth';

export interface StateSchema {
  login: LoginSchema;
  user: UserSchema;
  products: ProductSchema;
}

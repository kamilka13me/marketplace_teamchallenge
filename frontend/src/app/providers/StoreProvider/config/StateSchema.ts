import { UserSchema } from '@/enteties/User';
import { LoginSchema } from '@/features/userAuth';
import { ProductsPageSchema } from '@/pages/ProductsPage';
import { rtkApi } from '@/shared/api/rtkApi';

export interface StateSchema {
  login: LoginSchema;
  user: UserSchema;
  products: ProductsPageSchema;

  [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;
}

import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';

import { StateSchema } from '../config/StateSchema';

import { userReducer } from '@/enteties/User';
import { loginReducer } from '@/features/userAuth';
import { productsPageReducer } from '@/pages/ProductsPage';
import { rtkApi } from '@/shared/api/rtkApi';

export function createReduxStore(initialState?: StateSchema) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    user: userReducer,
    login: loginReducer,
    products: productsPageReducer,

    [rtkApi.reducerPath]: rtkApi.reducer,
  };

  return configureStore({
    reducer: rootReducers,
    devTools: import.meta.env.DEV,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({}).concat(rtkApi.middleware),
    preloadedState: initialState,
  });
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];

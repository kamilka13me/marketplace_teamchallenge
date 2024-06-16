import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';

import { StateSchema } from '../config/StateSchema';

import { sellerInfoReducer } from '@/enteties/Seller/model/slice/sellerSlice';
import { sellersReducer } from '@/enteties/Seller/model/slice/sellersSlice';
import { userReducer } from '@/enteties/User';
import { usersReducer } from '@/enteties/User/model/slice/usersSlice';
import { sellerFeedbackPageReducer } from '@/features/managingFeedbacks';
import { adminOffersReducer } from '@/features/managingOffers';
import { sellerProductsPageReducer } from '@/features/managingProducts';
import { loginReducer } from '@/features/userAuth';
import { productCommentsReducer } from '@/pages/ProductPage';
import { productsPageReducer } from '@/pages/ProductsPage';
import { rtkApi } from '@/shared/api/rtkApi';

export function createReduxStore(initialState?: StateSchema) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    user: userReducer,
    users: usersReducer,
    login: loginReducer,
    sellerInfo: sellerInfoReducer,
    products: productsPageReducer,
    sellerProducts: sellerProductsPageReducer,
    sellerFeedbacks: sellerFeedbackPageReducer,
    productComments: productCommentsReducer,
    adminOffers: adminOffersReducer,
    sellers: sellersReducer,

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

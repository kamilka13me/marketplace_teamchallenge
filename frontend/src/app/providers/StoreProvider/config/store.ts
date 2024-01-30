import { configureStore } from '@reduxjs/toolkit';

import { StateSchema } from '../config/StateSchema';

import { loginReducer } from '@/features/userAuth';

export function createReduxStore(initialState?: StateSchema) {
  return configureStore<StateSchema>({
    reducer: {
      login: loginReducer,
    },
    preloadedState: initialState,
  });
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];

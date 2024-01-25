import { configureStore } from '@reduxjs/toolkit';

import { StateSchema } from '../config/StateSchema';

import { counterReducer } from '@/enteties/Counter/model/slice/CounterSlice';

export function createReduxStore(initialState?: StateSchema) {
  return configureStore<StateSchema>({
    reducer: {
      counter: counterReducer,
    },
    preloadedState: initialState,
  });
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];

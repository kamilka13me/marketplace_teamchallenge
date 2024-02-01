import { StateSchema } from './config/StateSchema';
import { AppDispatch, createReduxStore } from './config/store';
import StoreProvider from './ui/StoreProvider';

export type { StateSchema, AppDispatch };

export { StoreProvider, createReduxStore };

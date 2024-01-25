import { StateSchema } from '@/app/providers/StoreProvider';

export const counterValueSelector = (state: StateSchema) => state.counter.value;

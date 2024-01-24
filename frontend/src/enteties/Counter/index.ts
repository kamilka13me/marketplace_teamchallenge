import { counterValueSelector } from './model/selectors/CounterSelector';
import { counterActions, counterReducer } from './model/slice/CounterSlice';
import { CounterSchema } from './model/types/counterSchema';
import Counter from './ui/Counter';

export type { CounterSchema };
export { Counter, counterActions, counterReducer, counterValueSelector };

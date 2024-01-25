import { FC } from 'react';

import { counterValueSelector } from '../model/selectors/CounterSelector';
import { counterActions } from '../model/slice/CounterSlice';

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { Button } from '@/shared/ui/Button';

interface Props {}

const Counter: FC<Props> = () => {
  const { decrement, increment } = counterActions;

  const dispatch = useAppDispatch();
  const counterValue = useAppSelector(counterValueSelector);

  return (
    <>
      <Button onClick={() => dispatch(increment())}>Inc</Button>
      <div>{counterValue}</div>
      <Button onClick={() => dispatch(decrement())}>Decrement</Button>
    </>
  );
};

export default Counter;

import { FC } from 'react';

import BugButton from '@/app/providers/ErrorBoundary/ui/BugButton';
import { Counter } from '@/enteties/Counter';

interface Props {}

const MainPage: FC<Props> = () => {
  return (
    <div>
      <Counter />
      <BugButton />
    </div>
  );
};

export default MainPage;

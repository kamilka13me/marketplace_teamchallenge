import { FC } from 'react';

import BugButton from '@/app/providers/ErrorBoundary/ui/BugButton';

interface Props {}

const MainPage: FC<Props> = () => {
  return (
    <div>
      <BugButton />
    </div>
  );
};

export default MainPage;

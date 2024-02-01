import { FC, Suspense } from 'react';

import { AppRouter } from '@/app/providers/router';

const App: FC = () => {
  return (
    <div>
      <Suspense fallback="Loading...">
        <AppRouter />
      </Suspense>
    </div>
  );
};

export default App;

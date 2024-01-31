import { FC, Suspense, useEffect } from 'react';

import { AppRouter } from '@/app/providers/router';
import { userActions } from '@/enteties/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';

const App: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(userActions.initAuthData());
  }, [dispatch]);

  return (
    <div>
      <Suspense fallback="Loading...">
        <AppRouter />
      </Suspense>
    </div>
  );
};

export default App;

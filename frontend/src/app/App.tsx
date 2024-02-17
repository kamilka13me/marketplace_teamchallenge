import { FC, Suspense, useEffect } from 'react';

import { AppRouter } from '@/app/providers/router';
import { getIsInitedAuthData, userActions } from '@/enteties/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';

const App: FC = () => {
  const dispatch = useAppDispatch();
  const inited = useAppSelector(getIsInitedAuthData);

  useEffect(() => {
    dispatch(userActions.initAuthData());
  }, [dispatch]);

  return (
    <div>
      <Suspense fallback="Loading...">{inited && <AppRouter />}</Suspense>
    </div>
  );
};

export default App;

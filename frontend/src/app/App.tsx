import { FC, Suspense, useEffect } from 'react';

import { AppRouter } from '@/app/providers/router';
import { getIsInitedAuthData, userActions } from '@/enteties/User';
import { MainLayout } from '@/shared/layouts/MainLayout';
import MainLoaderLayout from '@/shared/layouts/MainLoaderLayout/MainLoaderLayout';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';

const App: FC = () => {
  const dispatch = useAppDispatch();
  const inited = useAppSelector(getIsInitedAuthData);

  useEffect(() => {
    if (!inited) {
      dispatch(userActions.initAuthData());
    }
  }, [dispatch, inited]);

  if (!inited) {
    return <MainLoaderLayout />;
  }

  return (
    <div>
      <Suspense fallback="">
        <MainLayout header={<>Header</>} content={<AppRouter />} footer={<>Footer</>} />
      </Suspense>
    </div>
  );
};

export default App;

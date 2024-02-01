import { FC, Suspense, useEffect } from 'react';

import { Link } from 'react-router-dom';

import { AppRouter } from '@/app/providers/router';
import { RouteConfig } from '@/app/providers/router/config/routeConfig';
import { getIsInitedAuthData, getUserAuthData, userActions } from '@/enteties/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { VStack } from '@/shared/ui/Stack';

const App: FC = () => {
  const dispatch = useAppDispatch();
  const inited = useAppSelector(getIsInitedAuthData);

  const user = useAppSelector(getUserAuthData);

  useEffect(() => {
    dispatch(userActions.initAuthData());
  }, [dispatch]);

  return (
    <div>
      <Suspense fallback="Loading...">
        <VStack gap="6">
          <Link to={RouteConfig.main.path}>Main</Link>
          {user && <Link to={RouteConfig.profile.path}>Profile</Link>}
        </VStack>
        {inited && <AppRouter />}
      </Suspense>
    </div>
  );
};

export default App;

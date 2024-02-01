import { FC, Suspense, useEffect } from 'react';

import { Link } from 'react-router-dom';

import { AppRouter } from '@/app/providers/router';
import { RouteConfig } from '@/app/providers/router/config/routeConfig';
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
      <Suspense fallback="Loading...">
        <div>
          {Object.values(RouteConfig).map((item) => {
            return (
              <Link key={item.path} to={item.path}>
                {item.path}
              </Link>
            );
          })}
        </div>
        {inited && <AppRouter />}
      </Suspense>
    </div>
  );
};

export default App;

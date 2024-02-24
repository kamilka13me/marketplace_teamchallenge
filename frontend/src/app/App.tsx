import { FC, Suspense, useEffect } from 'react';

import { AppRouter } from '@/app/providers/router';
import { getIsInitedAuthData, getUserAuthData, userActions } from '@/enteties/User';
import { getUserWishlist } from '@/enteties/User/model/services/getUserWishlist';
import { MainLayout } from '@/shared/layouts/MainLayout';
import MainLoaderLayout from '@/shared/layouts/MainLoaderLayout/MainLoaderLayout';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { Footer } from '@/widgets/Footer';
import { Header } from '@/widgets/Header';

const App: FC = () => {
  const dispatch = useAppDispatch();
  const inited = useAppSelector(getIsInitedAuthData);

  const user = useAppSelector(getUserAuthData);

  useEffect(() => {
    if (!inited) {
      dispatch(userActions.initAuthData());
    }
    if (inited && user) {
      dispatch(getUserWishlist({ _id: user._id }));
    }
  }, [dispatch, inited, user]);

  if (!inited) {
    return <MainLoaderLayout />;
  }

  return (
    <div>
      <Suspense fallback="">
        <MainLayout header={<Header />} content={<AppRouter />} footer={<Footer />} />
      </Suspense>
    </div>
  );
};

export default App;

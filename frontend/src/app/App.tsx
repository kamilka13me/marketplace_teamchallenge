import { FC, Suspense, useEffect } from 'react';

import { AppRouter } from '@/app/providers/router';
import { getIsInitedAuthData, getUserAuthData, userActions } from '@/enteties/User';
import { $api } from '@/shared/api/api';
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
      $api
        .get(`/users/${user?._id}`)
        .then((res) => {
          localStorage.setItem('wishlist', res.data.user.wishlist);
        })
        .catch((err) => {
          // eslint-disable-next-line
          console.error('Error in initWishlist:', err);
        });
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

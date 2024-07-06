import { FC, Suspense, useEffect } from 'react';

import Cookies from 'js-cookie';
import { useLocation } from 'react-router-dom';

import { AppRouter } from '@/app/providers/router';
import { getSellerProfileInfo } from '@/enteties/Seller/model/services/getSellerProfileInfo';
import {
  getIsInitedAuthData,
  getUserAuthData,
  getUserWishlist,
  userActions,
} from '@/enteties/User';
import { Page500 } from '@/pages/Page500';
import { $api } from '@/shared/api/api';
import { ApiRoutes } from '@/shared/const/apiEndpoints';
import { COOKIE_KEY_TOKEN, COOKIE_KEY_USER } from '@/shared/const/cookies';
import { MainLayout } from '@/shared/layouts/MainLayout';
import MainLoaderLayout from '@/shared/layouts/MainLoaderLayout/MainLoaderLayout';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { Footer } from '@/widgets/Footer';
import { Header } from '@/widgets/Header';

const App: FC = () => {
  const dispatch = useAppDispatch();
  const inited = useAppSelector(getIsInitedAuthData);

  const location = useLocation();

  const user = useAppSelector(getUserAuthData);

  useEffect(() => {
    if (!inited) {
      dispatch(userActions.initAuthData());
    }
    if (inited && user) {
      dispatch(getUserWishlist({ _id: user._id }));
      dispatch(getSellerProfileInfo({ sellerId: user._id }));
    }
  }, [dispatch, inited, user]);

  useEffect(() => {
    if (user) {
      try {
        $api.get(`${ApiRoutes.USER}/${user._id}`).then((res) => {
          Cookies.set(COOKIE_KEY_USER, JSON.stringify(res.data.user));
          dispatch(userActions.setAuthData(res.data.user));
        });

        $api.get(`auth/refresh-token`).then((res) => {
          const accessToken = decodeURIComponent(res.data.accessToken);

          Cookies.set(COOKIE_KEY_TOKEN, accessToken, {
            secure: true,
            sameSite: 'Strict',
          });
        });
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inited]);

  if (!inited) {
    return <MainLoaderLayout />;
  }

  if (location.pathname === '/500') {
    return (
      <Suspense fallback="">
        <Page500 />
      </Suspense>
    );
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

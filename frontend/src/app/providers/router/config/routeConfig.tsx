import { RouteProps } from 'react-router-dom';

import { UserRoles } from '@/enteties/User/model/types/userRoles';
import { MainPage } from '@/pages/MainPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
// import { ProductPage } from '@/pages/ProductPage';
// import { ProductsPage } from '@/pages/ProductsPage';
// import { ProductsPage } from '@/pages/ProductsPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { SellerPage } from '@/pages/SellerPage';
import { VerifyPage } from '@/pages/VerifyPage';
import {
  AppRoutes,
  getRouteMain,
  // getRouteProducts,
  // getRouteProduct,
  // getRouteProducts,
  getRouteProfile,
  getSellerProfile,
  getVerifyRoute,
} from '@/shared/const/routes';

export type AppRoutesProps = RouteProps & {
  path: string;
  authOnly?: boolean;
  roles?: UserRoles[];
};
export const RouteConfig: Record<AppRoutes, AppRoutesProps> = {
  [AppRoutes.MAIN]: {
    path: getRouteMain(),
    element: <MainPage />,
  },
  // [AppRoutes.PRODUCT]: {
  //   path: getRouteProduct(':id'),
  //   element: <ProductPage />,
  // },
  // [AppRoutes.PRODUCTS]: {
  //   path: getRouteProducts(),
  //   element: <ProductsPage />,
  // },
  [AppRoutes.PROFILE]: {
    path: getRouteProfile(':id'),
    authOnly: true,
    element: <ProfilePage />,
    roles: [UserRoles.USER, UserRoles.SUPER_ADMIN, UserRoles.ADMIN],
  },
  [AppRoutes.SELLER]: {
    path: getSellerProfile(':id'),
    authOnly: true,
    element: <SellerPage />,
    roles: [UserRoles.USER, UserRoles.SELLER, UserRoles.SUPER_ADMIN, UserRoles.ADMIN],
  },
  [AppRoutes.VERIFY]: {
    path: getVerifyRoute(':id'),
    element: <VerifyPage />,
  },
  [AppRoutes.NOT_FOUND]: {
    path: '*',
    element: <NotFoundPage />,
  },
};

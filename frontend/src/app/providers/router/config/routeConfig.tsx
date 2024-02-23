import { RouteProps } from 'react-router-dom';

import { UserRoles } from '@/enteties/User/model/types/userRoles';
import { MainPage } from '@/pages/MainPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ProductPage } from '@/pages/ProductPage';
import { ProductsPage } from '@/pages/ProductsPage';
import {
  AppRoutes,
  getRouteMain,
  getRouteProduct,
  getRouteProducts,
  getRouteProfile,
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
  [AppRoutes.PRODUCT]: {
    path: getRouteProduct(':id'),
    element: <ProductPage />,
  },
  [AppRoutes.PRODUCTS]: {
    path: getRouteProducts(),
    element: <ProductsPage />,
  },
  [AppRoutes.PROFILE]: {
    path: getRouteProfile(),
    authOnly: true,
    element: <div data-testid="ProfilePage">Profile</div>,
    roles: [UserRoles.USER, UserRoles.SUPER_ADMIN, UserRoles.ADMIN],
  },
  [AppRoutes.NOT_FOUND]: {
    path: '*',
    element: <NotFoundPage />,
  },
};

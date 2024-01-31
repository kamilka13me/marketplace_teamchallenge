import { RouteProps } from 'react-router-dom';

import { UserRoles } from '@/enteties/User/model/types/userRoles';
import { MainPage } from '@/pages/MainPage';
import {
  AppRoutes,
  getRouteMain,
  getRouteProfile,
  getRouteProtected,
} from '@/shared/const/routes';

export type AppRoutesProps = RouteProps & {
  authOnly?: boolean;
  roles?: UserRoles[];
};
export const RouteConfig: Record<AppRoutes, AppRoutesProps> = {
  [AppRoutes.MAIN]: {
    path: getRouteMain(),
    element: <MainPage />,
  },
  [AppRoutes.PROFILE]: {
    path: getRouteProfile(),
    authOnly: true,
    element: <div>Profile</div>,
  },
  [AppRoutes.TEST_ROLES]: {
    path: getRouteProtected(),
    authOnly: true,
    element: <div>Test</div>,
    roles: [UserRoles.SUPER_ADMIN],
  },
  [AppRoutes.NOT_FOUND]: {
    path: '*',
    element: <div>Not Found</div>,
  },
};

export enum AppRoutes {
  MAIN = 'main',
  PROFILE = 'profile',
  TEST_ROLES = 'roles',

  NOT_FOUND = 'not_found',
}

export const getRouteMain = () => '/';

export const getRouteProfile = () => '/profile';

export const getRouteProtected = () => '/test';

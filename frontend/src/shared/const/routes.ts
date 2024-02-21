export enum AppRoutes {
  MAIN = 'main',
  PRODUCT = 'product',
  PROFILE = 'profile',

  NOT_FOUND = 'not_found',
}

export const getRouteMain = () => '/';

export const getRouteProduct = (id: string) => `/product/${id}`;
export const getRouteProfile = () => '/profile';

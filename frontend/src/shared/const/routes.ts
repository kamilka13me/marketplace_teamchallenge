export enum AppRoutes {
  MAIN = 'main',
  // PRODUCT = 'product',
  // PRODUCTS = 'products',
  PROFILE = 'profile',

  NOT_FOUND = 'not_found',
}

export const getRouteMain = () => '/';

export const getRouteProduct = (id: string) => `/product/${id}`;

export const getRouteProducts = () => `/products`;

export const getRouteProfile = () => '/profile';

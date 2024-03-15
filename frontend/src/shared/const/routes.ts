export enum AppRoutes {
  MAIN = 'main',
  // PRODUCT = 'product',
  // PRODUCTS = 'products',
  PROFILE = 'profile',
  VERIFY = 'verify',

  NOT_FOUND = 'not_found',
}

export const getRouteMain = () => '/';

export const getRouteProduct = (id: string) => `/product/${id}`;

export const getRouteProducts = () => `/products`;

export const getServerErrorRoute = () => `/500`;

export const getVerifyRoute = (id: string) => `/verify/${id}`;

export const getRouteProfile = (tab?: string) => `/profile/${tab}`;

export enum AppRoutes {
  MAIN = 'main',
  // PRODUCT = 'product',
  // PRODUCTS = 'products',
  PROFILE = 'profile',
  SELLER = 'seller',
  ADMIN = 'admin',
  SELLER_REGISTRATION = 'seller_registration',
  VERIFY = 'verify',
  RECOVER_PASSWORD = 'recover_password',

  NOT_FOUND = 'not_found',
}

export const getRouteMain = () => '/';

export const getRouteProduct = (id: string) => `/product/${id}`;

export const getRouteProducts = () => `/products`;

export const getServerErrorRoute = () => `/500`;

export const getVerifyRoute = (id: string) => `/verify/${id}`;

export const getRecoverPasswordRoute = (id: string) => `/recovery/${id}`;

export const getRouteProfile = (tab?: string) => `/profile/${tab}`;

export const getSellerProfile = (tab?: string) => `/seller/${tab}`;

export const getAdminProfile = (tab?: string) => `/admin/${tab}`;

export const getSellerRegistration = () => `/seller_registration`;

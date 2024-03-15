export interface User {
  _id: string;
  username: string;
  surname: string;
  email: string;
  role: string;
}

export interface UserWithWishlist extends User {
  wishlist: string[];
}

export interface UserSchema {
  userWishlist: {
    wishlist: string[];
    error?: string;
    isLoading: boolean;
  };
  authData?: User;

  inited: boolean;
  error?: string;
  isLoading: boolean;
}

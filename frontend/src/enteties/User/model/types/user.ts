export interface User {
  _id: string;
  username: string;
  surname: string;
  email: string;
  role: string;
  dob?: string;
  phoneNumber?: string;
  isAccountConfirm: boolean;
  accountStatus?: string;
  created_at?: string;
  activity?: {
    _id: string;
    date: string;
  };
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

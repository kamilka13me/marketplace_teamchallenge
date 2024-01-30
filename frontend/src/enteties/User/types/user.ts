export interface User {
  _id: string;
  username: string;
  surname: string;
  email: string;
}

export interface UserSchema {
  authData?: User;

  isLogged: boolean;
}

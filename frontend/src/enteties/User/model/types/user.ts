export interface User {
  _id: string;
  username: string;
  surname: string;
  email: string;
  role: string;
}

export interface UserSchema {
  authData?: User;
}

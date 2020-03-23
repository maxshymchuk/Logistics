export type User = {
  _id?: string;
  name: string;
  surname: string;
  birthday: Date;
  email: string;
  phone: string;
  username: string;
  password: string;
  isAdmin: boolean;
};

export type UserSignUp = {
  name: string;
  surname: string;
  birthday: Date;
  email: string;
  phone: string;
  username: string;
  password: string;
};

export const defaultUser: User = {
  name: 'Name',
  surname: 'Surname',
  birthday: new Date(),
  email: 'Email',
  phone: 'Phone',
  username: 'Username',
  password: 'Password',
  isAdmin: false
};

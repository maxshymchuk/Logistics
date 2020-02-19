export type UserProps = {
  user: User;
};

export type User = {
  _id: string;
  name: string;
  surname: string;
  birthday: Date;
  email: string;
  phone: string;
  login: string;
  password: string;
  isAdmin: boolean;
};

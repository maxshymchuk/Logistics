import * as mongoose from 'mongoose';
import { userSchema } from '../schemas/users.schemas';

export const userModel = mongoose.model<UserMongo>('users', userSchema);

export type User = {
  name: string;
  surname: string;
  birthday: Date;
  email: string;
  phone: string;
  login: string;
  password: string;
  isAdmin: boolean;
};

export interface UserMongo extends mongoose.Document, User {}

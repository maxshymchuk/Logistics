import * as mongoose from 'mongoose';

import { userSchema } from '../schemas/user.schemas';

export const userModel = mongoose.model<UserMongo>("users", userSchema);

export type User = {
  name: string;
  surname: string;
  birthday: Date;
  email: string;
  phone: string;
  username: string;
  password: string;
  isAdmin: boolean;
};

export interface UserMongo extends mongoose.Document, User {}

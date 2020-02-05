import * as mongoose from 'mongoose';

export interface User extends mongoose.Document {
  name: string,
  surname: string,
  birthday: Date,
  email: string,
  phone: string,
  login: string,
  password: string,
}
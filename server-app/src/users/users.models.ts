import * as mongoose from 'mongoose';

export type User = {
  name: string,
  surname: string,
  birthday: Date,
  email: string,
  phone: string,
  login: string,
  password: string,
  isAdmin: boolean
}

export interface UserMongo extends mongoose.Document, User {}

export interface Autorization {
  login: string,
  password: string
}
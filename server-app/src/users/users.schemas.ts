import * as mongoose from 'mongoose';

// User Model
export const userSchema = new mongoose.Schema({
  name: String,
  surname: String,
  birthday: Date,
  email: String,
  phone: String,
  login: String,
  password: String,
})
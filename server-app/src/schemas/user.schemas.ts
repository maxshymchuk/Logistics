import * as mongoose from 'mongoose';

// User Model
export const userSchema = new mongoose.Schema({
  name: String,
  surname: String,
  birthday: Date,
  email: String,
  phone: String,
  username: String,
  password: String,
  isAdmin: {
    type: Boolean,
    default: false
  }
});

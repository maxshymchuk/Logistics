import * as mongoose from 'mongoose';

import { User, Autorization, UserMongo } from './users.models';
import { userSchema } from './users.schemas';

const userModel = mongoose.model<UserMongo>('users', userSchema);

async function findUserById(id: string): Promise<User> {
  let result: Promise<User>;
  try {
    result = userModel.findOne({ _id: id, isAdmin: false }).exec();
  } catch (e) {
    console.log('Invalid id');
  }
  return result;
}

async function isValidId(id: string): Promise<boolean> {
  const user = await findUserById(id);
  return !!user;
}

export async function getUsers(): Promise<User[]> {
  return userModel.find({ isAdmin: false }).exec();
}

export async function getUserById(id: string): Promise<User | string> {
  if (isValidId(id)) {
    const result = await findUserById(id);
    return result;
  } else {
    return 'User not found by this ID';
  }
}
  
export async function addUser(user: User): Promise<string> {
  const foundUser = await userModel.findOne({ login: user.login });
  if (foundUser) {
    return 'User cannot be added, try another login';
  } else {
    userModel.create(user, (err: Error) => err && console.log(err));
    return 'User added';
  }
}

export async function authorizeUser(user: Autorization): Promise<void> {
  // const foundedUser: User = await userModel.findOne({ login: user.login }).exec();
  // return (foundedUser.password === user.password) ? 
  //   /* auth, */ {
  //     content: 'User login',
  //     code: 200
  //   } : {
  //     content: 'Access denied, wrong password',
  //     code: 403
  //   }
}

export async function deleteUserById(id: string): Promise<string> {
  if (isValidId(id)) {
    userModel.deleteOne({ _id: id }).exec();
    return `User ${id} deleted`;
  } else {
    return 'User not found by this ID';
  }
}
  
export async function updateUser(user: UserMongo): Promise<string> {
  if (isValidId(user._id)) {
    userModel.updateOne({ _id: user._id }, user).exec();
    return `User ${user._id} updated`;
  } else {
    return 'User not found by this ID';
  }
}
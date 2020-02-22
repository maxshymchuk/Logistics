import * as mongoose from 'mongoose';
import { Autorization, User, UserMongo } from './users.models';
import { userSchema } from './users.schemas';

const userModel = mongoose.model<UserMongo>('users', userSchema);

async function findUserById(_id: string) {
  const order = await userModel.findOne({ _id }).catch<User>(e => console.log(e));
  return order;
}

export async function getUsers() {
  const users = await userModel.find({ isAdmin: false }).catch<User[]>(e => console.log(e));
  return users;
}

export async function getUserById(id: string): Promise<User | string> {
  const result = await findUserById(id);
  return result;
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
  // const foundedUser: User = await userModel.findOne({ login: user.login });
  // return (foundedUser.password === user.password) ?
  //   /* auth, */ {
  //     content: 'User login',
  //     code: 200
  //   } : {
  //     content: 'Access denied, wrong password',
  //     code: 403
  //   }
}

export async function deleteUserById(_id: string) {
  const tempUser = await findUserById(_id);
  if (tempUser) {
    await userModel.deleteOne({ _id });
    return `User ${_id} deleted`;
  } else {
    return 'User ID is not valid';
  }
}

export async function updateUser(user: UserMongo) {
  const tempUser = await findUserById(user._id);
  if (tempUser) {
    await userModel.updateOne({ _id: user._id }, user);
    return `User ${user._id} updated`;
  } else {
    return 'User ID is not valid';
  }
}

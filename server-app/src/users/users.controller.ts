import * as mongoose from 'mongoose';

import { CustomResponse } from '../models';
import { User } from './users.models';
import { userSchema } from './users.schemas';

const userModel = mongoose.model<User>('users', userSchema);

async function findUserById(id: string): Promise<User> {
  let result: Promise<User>;
  try {
    result = userModel.findOne({ _id: id }).exec();
  } catch (e) {
    console.log('Invalid id');
  }
  return result;
}

async function validatorUserId(id: string): Promise<CustomResponse> {
  return await findUserById(id) ? {
    status: {
      content: 'Ok',
      code: 200,
    },
    isFound: true
  } : {
    status: {
      content: 'User not found',
      code: 404,
    },
    isFound: false
  }
}

export async function getUsers(): Promise<CustomResponse['status']> {
  return {
    content: await userModel.find().exec(),
    code: 200
  }
}

export async function getUserById(id: string): Promise<CustomResponse['status']> {
  const validator = await validatorUserId(id);
  return !validator.isFound ? validator.status : {
    content: await findUserById(id),
    code: 200
  }
}
  
export async function addUser(user: User): Promise<CustomResponse['status']> {
  userModel.create(user, (err: Error) => err && console.log(err));
  return {
    content: 'User added',
    code: 201
  }
}

export async function deleteUserById(id: string): Promise<CustomResponse['status']> {
  const validator = await validatorUserId(id);
  validator.isFound && userModel.deleteOne({ _id: id }).exec();
  return !validator.isFound ? validator.status : {
    content: 'User deleted',
    code: 200
  }
}
  
export async function updateUser(user: User) {
  const validator = await validatorUserId(user._id);
  validator.isFound && userModel.updateOne({ _id: user._id }, user).exec();
  return !validator.isFound ? validator.status : {
    content: await findUserById(user._id),
    code: 200
  }
}
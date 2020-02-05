import * as mongoose from 'mongoose';

import { CustomResponse } from '../models';
import { User } from './users.models';
import { userSchema } from './userSchemas';

mongoose.connect('mongodb://127.0.0.1:27017/users', {useNewUrlParser: true});

const userModel = mongoose.model('users', userSchema);

// async function findUserById(id: string) {
//   return new Promise((resolve) => {
//     const user = users.find((i: any) => i.id == id);
//     resolve(user);
//   });
// }

// async function isValidUserId(id: string): Promise<CustomResponse> {
  // if (isNaN(1)) {
  //   return {
  //     status: {
  //       content: 'Id is not a number',
  //       code: 400,
  //     },
  //     isFound: false
  //   };
  // }
//   if (!(await findUserById(id))) {
//     return {
//       status: {
//         content: 'User not found',
//         code: 404,
//       },
//       isFound: false
//     };
//   }
//   return {
//     status: {
//       content: 'Ok',
//       code: 200,
//     },
//     isFound: true
//   }
// }

// export async function getUsers(): Promise<CustomResponse['status']> {
//   return {
//     content: users,
//     code: 200
//   }
// }

// export async function getUserById(id: string): Promise<CustomResponse['status']> {
//   const isValid = await isValidUserId(id);
//   return !isValid.isFound ? isValid.status : {
//     content: await findUserById(id),
//     code: 200
//   }
// }
  
// export async function getUserTracksId(id: string): Promise<CustomResponse['status']> {
//   const isValid = await isValidUserId(id);
//   return !isValid.isFound ? isValid.status : {
//     content: ((await findUserById(id)) as any).tracks,
//     code: 200
//   }
// }

export async function addUser(user: User): Promise<CustomResponse['status']> {
  userModel.create({
    name: user.name,
    surname: user.surname,
    birthday: user.birthday,
    email: user.email,
    phone: user.phone,
    login: user.login,
    password: user.password,
  }, (err: Error) => err && console.log(err));
  return {
    content: 'User added',
    code: 201
  }
}

// export async function deleteUserById(id: string): Promise<CustomResponse['status']> {
//   const isValid = await isValidUserId(id);
//   return !isValid.isFound ? isValid.status : {
//     content: (users.splice(users.findIndex((user: any) => user.id == id), 1), users),
//     code: 200
//   }
// }
  
// export async function updateUser(user: any) {
    
// }
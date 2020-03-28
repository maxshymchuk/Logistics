import axios from 'axios';

import { Message } from '../models/message.models';
import { User, UserSignUp } from '../models/user.models';

export async function getUsersData() {
  const message: Message<User[]> = (await axios.get('/users')).data;
  return message;
}

export async function authUser(data: {
  username: string;
  password: string;
}) {
  const message: Message<User> = (await axios.post('/login', data)).data;
  return message;
}

export async function regUser(user: UserSignUp) {
  const message: Message<string> = (await axios.post('/users/reg', user)).data;
  return message;
}

export async function addUser(user: User) {
  const message: Message<string> = (await axios.post('/users', user)).data;
  return message;
} 

export async function updateUser(user: User) {
  const message: Message<string> = (await axios.put('/users', user)).data;
  return message;
}

export async function getLoggedUser() {
  const message: Message<User> = (await axios.get('/login')).data;
  return message;
}

export async function logoutUser() {
  const message: Message<string> = (await axios.get('/logout')).data
  await message;
}

export async function removeUserById(id: string) {
  const message: Message<string> = (await axios.delete(`/users/${id}`)).data;
  return message;
}
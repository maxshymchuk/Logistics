import axios from 'axios';

import { ServerResponse } from '../models/message.models';
import { User } from '../models/user.models';

export async function getUsersData() {
  const response: ServerResponse<User[]> = (await axios.get('/users')).data;
  return response;
}

export async function authUser(data: {
  username: string;
  password: string;
}) {
  const response: ServerResponse<User> = (await axios.post('/login', data)).data;
  return response;
}

export async function regUser(user: User) {
  const response: ServerResponse<null> = (await axios.post('/users/reg', user)).data;
  return response;
}

export async function addUser(user: User) {
  const response: ServerResponse<null> = (await axios.post('/users', user)).data;
  return response;
} 

export async function updateUser(user: User) {
  const response: ServerResponse<null> = (await axios.put('/users', user)).data;
  return response;
}

export async function getLoggedUser() {
  const response: ServerResponse<User> = (await axios.get('/login')).data;
  return response;
}

export async function logoutUser() {
  const response: ServerResponse<null> = (await axios.get('/logout')).data;
  return response;
}

export async function removeUserById(id: string) {
  const response: ServerResponse<null> = (await axios.delete(`/users/${id}`)).data;
  return response;
}
import axios from 'axios';

import { User, UserSignUp } from '../models/users.models';

export async function getUsersData(): Promise<User[]> {
  return (await axios.get("/users")).data;
}

export async function authUser(data: {
  username: string;
  password: string;
}): Promise<User> {
  const res = await axios.post("/login", data);
  return res.data;
}

export async function regUser(user: UserSignUp): Promise<string> {
  const res = await axios.post("/users", user);
  return res.data;
}

export async function addUser(user: User): Promise<string> {
  const res = await axios.post("/users", user);
  return res.data;
}

export async function getLoggedUser(): Promise<User> {
  const res = await axios.get("/login");
  return res.data;
}

export async function logout() {
  await axios.get("/logout");
}

export async function removeUserById(id: string): Promise<string> {
  const res = (await axios.delete(`/users/${id}`)).data;
  return res;
}
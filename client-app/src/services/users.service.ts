import axios from "axios";

import { User, UserSignUp } from "../models/users.models";

export async function getUsersData() {
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

export async function getLoggedUser(): Promise<User> {
  const res = await axios.get("/login");
  return res.data;
}

export async function logout() {
  await axios.get("/logout");
}

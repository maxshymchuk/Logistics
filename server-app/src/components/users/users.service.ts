import { User, userModel, UserMongo } from '../../models/users.models';

async function findUserById(_id: string) {
  const user = await userModel
    .findOne({ _id })
    .catch<User>(e => console.log(e));
  return user;
}

export async function getUsers() {
  const users = await userModel
    .find()
    .sort({isAdmin: -1})
    .catch<User[]>(e => console.log(e));
  return users;
}

export async function getUserById(id: string): Promise<User | string> {
  const result = await findUserById(id);
  return result;
}

export async function addUser(user: User): Promise<string> {
  const foundUser = await userModel.findOne({ username: user.username });
  if (foundUser) {
    return "User cannot be added, try another login";
  } else {
    userModel.create(user, (err: Error) => err && console.log(err));
    return "User added";
  }
}

export async function deleteUserById(_id: string) {
  const user = await findUserById(_id);
  if (user) {
    await userModel.deleteOne({ _id });
    return `User ${_id} deleted`;
  } else {
    return "User ID is not valid";
  }
}

export async function updateUser(userMongo: UserMongo) {
  const user = await findUserById(userMongo._id);
  if (user) {
    await userModel.updateOne({ _id: userMongo._id }, userMongo);
    return `User ${userMongo._id} updated`;
  } else {
    return "User ID is not valid";
  }
}

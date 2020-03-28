import { errorMsg, successMsg } from '../../helpers/messages';
import { User, userModel, UserMongo } from '../../models/user.models';

async function findUserById(id: string) {
  const user = await userModel.findById(id);
  return user;
}

export async function getUsers() {
  try {
    const users = await userModel.find().sort({isAdmin: -1});
    if (users.length) {
      return successMsg(users);
    } else {
      return errorMsg('Cannot find users');
    }
  } catch (err) {
    return errorMsg(`Error while getting users (${err})`);
  }
}

export async function getUserById(id: string) {
  try {
    const user = await findUserById(id);
    if (user) {
      return successMsg(user);
    } else {
      return errorMsg('Cannot find user');
    }
  } catch (err) {
    return errorMsg(`Error while searching user (${err})`);
  }
}

export async function addUser(user: User) {
  try {
    const foundUser = await userModel.findOne({ username: user.username });
    if (!foundUser) {
      await userModel.create(user);
      return successMsg(`User "${user.username}" successfully added`);
    } else {
      return errorMsg(`Cannot add ${user.username}. Try another username`);
    }
  } catch (err) {
    return errorMsg(`Error while adding user (${err})`);
  }
}

export async function deleteUserById(id: string) {
  try {
    const user = await findUserById(id);
    if (user) {
      await userModel.findByIdAndDelete(id);
      return successMsg(`Successful delete of "${user.username}" (${id})`);
    } else {
      return errorMsg(`Cannot delete "${user.username}" (${id})`);
    }
  } catch (err) {
    return errorMsg(`Error while deleting user (${err})`);
  }
}

export async function updateUser(userMongo: UserMongo) {
  try {
    const user = await findUserById(userMongo._id);
    if (user) {
      await userModel.updateOne({ _id: userMongo._id }, userMongo);
      return successMsg(`Successful update of ${userMongo.username}`);
    } else {
      return errorMsg(`Cannot update user (${userMongo._id})`);
    }
  } catch (err) {
    return errorMsg(`Error while updating user (${err})`);
  }
}

import { errorResponse, successResponse } from '../../helpers/response';
import { User, userModel, UserMongo } from '../../models/user.models';

async function findUserById(id: string) {
  const user = await userModel.findById(id);
  return user;
}

export async function getUsers() {
  try {
    const users = await userModel.find().sort({isAdmin: -1});
    if (users.length) {
      return successResponse('Success', users);
    } else {
      return errorResponse('Cannot find users');
    }
  } catch (err) {
    return errorResponse(`Error while getting users (${err})`);
  }
}

export async function getUserById(id: string) {
  try {
    const user = await findUserById(id);
    if (user) {
      return successResponse('Success', user);
    } else {
      return errorResponse('Cannot find user');
    }
  } catch (err) {
    return errorResponse(`Error while searching user (${err})`);
  }
}

export async function addUser(user: User) {
  try {
    const foundUser = await userModel.findOne({ username: user.username });
    if (!foundUser) {
      await userModel.create(user);
      return successResponse(`User "${user.username}" successfully added`);
    } else {
      return errorResponse(`Cannot add ${user.username}. Try another username`);
    }
  } catch (err) {
    return errorResponse(`Error while adding user (${err})`);
  }
}

export async function deleteUserById(id: string) {
  try {
    const user = await findUserById(id);
    if (user) {
      await userModel.findByIdAndDelete(id);
      return successResponse(`Successful delete of "${user.username}" (${id})`);
    } else {
      return errorResponse(`Cannot delete "${user.username}" (${id})`);
    }
  } catch (err) {
    return errorResponse(`Error while deleting user (${err})`);
  }
}

export async function updateUser(userMongo: UserMongo) {
  try {
    const user = await findUserById(userMongo._id);
    if (user) {
      await userModel.updateOne({ _id: userMongo._id }, userMongo);
      return successResponse(`Successful update of ${userMongo.username}`);
    } else {
      return errorResponse(`Cannot update user (${userMongo._id})`);
    }
  } catch (err) {
    return errorResponse(`Error while updating user (${err})`);
  }
}

import { Message, MessageTypes } from '../../models/messages.models';
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

export async function addUser(user: User): Promise<Message> {
  const foundUser = await userModel.findOne({ username: user.username });
  if (!foundUser) {
    userModel.create(user, (err: Error) => {
      if (err) {
        console.log(err);
        // return {
        //   messageType: MessageTypes.Success,
        //   text: `User ${user.username} successfully added`
        // };
      }
    });
    return {
      messageType: MessageTypes.Success,
      text: `User ${user.username} successfully added`
    };
  } else {
    return {
      messageType: MessageTypes.Error,
      text: `Cannot add ${user.username}. Try another username`
    };
  }
}

export async function deleteUserById(_id: string): Promise<Message> {
  const user = await findUserById(_id);
  if (user) {
    await userModel.deleteOne({ _id });
    return {
      messageType: MessageTypes.Success,
      text: `Successful delete of ${user.username}`
    };
  } else {
    return {
      messageType: MessageTypes.Success,
      text: `Successful delete of ${user.username}`
    };
  }
}

export async function updateUser(userMongo: UserMongo): Promise<Message> {
  const user = await findUserById(userMongo._id);
  if (user) {
    await userModel.updateOne({ _id: userMongo._id }, userMongo);
    return {
      messageType: MessageTypes.Success,
      text: 'Successful update'
    };
  } else {
    return  {
      messageType: MessageTypes.Error,
      text: 'Cannot update user'
    };
  }
}

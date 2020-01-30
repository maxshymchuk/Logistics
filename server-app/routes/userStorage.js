const users = require('../userlist.js');

const trackStorage = require('./trackStorage.js');

async function findUserById(id) {
  return new Promise((resolve) => {
    const user = users.find(i => i.id == id);
    resolve(user);
  });
}

async function isValidUserId(id) {
  if (isNaN(id)) {
    return {
      status: {
        content: 'Id is not a number',
        code: 400,
      },
      isFound: false
    };
  }
  if (!(await findUserById(id))) {
    return {
      status: {
        content: 'User not found',
        code: 404,
      },
      isFound: false
    };
  }
  return {
    status: {
      content: 'Ok',
      code: 200,
    },
    isFound: true
  }
}

module.exports = {
  async getUsers() {
    return {
      content: users,
      code: 200
    }
  },
  async getUserById(id) {
    const isValid = await isValidUserId(id);
    return !isValid.isFound ? isValid.status : {
      content: await findUserById(id),
      code: 200
    }
  },
  async getUserTracksId(id) {
    const isValid = await isValidUserId(id);
    return !isValid.isFound ? isValid.status : {
      content: (await findUserById(id)).tracks,
      code: 200
    }
  },
  async addUser(body) {
    const user = {
      id: body.id,
      name: body.name,
      login: body.login,
      location: body.location,
      country: body.country,
      tracks: body.tracks
    }
    users.push(user);
    return {
      content: users,
      code: 201
    }
  },
  async deleteUserById(id) {
    const isValid = await isValidUserId(id);
    return !isValid.isFound ? isValid.status : {
      content: (users.splice(users.findIndex(user => user.id == id), 1), users),
      code: 200
    }
  },
  async updateUser(user) {
    // const id = user.id;
    // const isValid = await isValidUserId(id);
    // if (isValid.status) {
    //   Object.assign(await findUserById(id), user);
    //   return users;
    // } else {
    //   return isValid.error;
    // }
  }
}
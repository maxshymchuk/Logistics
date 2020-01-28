const users = require('../users.js');

const trackStorage = require('./trackStorage.js');

function findUserById(id) {
  return users.find(i => i.id == id);
}

function checkUserById(id) {
  if (isNaN(id)) {
    return 'Id is not a number';
  }
  if (!findUserById(id)) {
    return 'User not found';
  }
}

module.exports = {
  getUsers() {
    return users;
  },
  getUserById(id) {
    const failed = checkUserById(id);
    return failed ? failed : findUserById(id);
  },
  getUserTracks(id) {
    const failed = checkUserById(id);
    return failed ? failed : findUserById(id).tracks.map(i => trackStorage.getTrackById(i));
  },
  postUser(body) {
    const user = {
      name: body.name,
      login: body.login,
      country: body.country,
      tracks: body.tracks
    }
    return user;
  },
  deleteUserById(id) {
    const failed = checkUserById(id);
    return failed ? failed : users.splice(users.findIndex(user => user.id == id), 1), users;
  },
  updateUser(body) {
    const id = body.id;
    const failed = checkUserById(id);
    if (!failed) {
      const user = findUserById(id);
      for (let i in body) {
        user[i] = body[i];
      }
      return users;
    } else {
      return failed;
    }
  }
}
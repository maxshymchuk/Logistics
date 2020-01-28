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
    const check = checkUserById(id);
    return check ? check : findUserById(id);
  },
  getUserTracks(id) {
    const check = checkUserById(id);
    return check ? check : findUserById(id).tracks.map(i => trackStorage.getTrackById(i));
  },
  postUser(body) {
    const user = {
      name: body.name,
      login: body.login,
      country: body.country,
      tracks: body.tracks
    }
    return user;
  }
}
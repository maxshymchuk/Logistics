const users = require('../users.js');
const tracks = require('../tracks.js');

function checkUserById(id) {
  if (isNaN(id)) {
    return ['Id is not a number', false];
  }
  if (!users[id]) {
    return ['User not found', false];
  }
  return [users[id], true];
}

module.exports = {
  getUsers() {
    return users;
  },
  getUserById(id) {
    const check = checkUserById(id);
    return check[0];
  },
  getUserTracks(id) {
    const check = checkUserById(id);
    return check[1] ? check[0].tracks.map(i => tracks[i]) : check[0];
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
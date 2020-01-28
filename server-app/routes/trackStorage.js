const tracks = require('../tracks.js');

const userStorage = require('./userStorage.js');

function findTrackById(id) {
  return tracks.find(i => i.id == id);
}

function checkTrackId(id) {
  if (isNaN(id)) {
    return 'Id is not a number';
  }
  if (!findTrackById(id)) {
    return 'Track not found';
  }
}

module.exports = {
  getTracks() {
    return tracks;
  },
  getTrackById(id) {
    const failed = checkTrackId(id);
    return failed ? failed : findTrackById(id);
  },
  getTrackUser(id) {
    const failed = checkTrackId(id);
    return failed ? failed : userStorage.getUsers().find(user => user.tracks.includes(+id));
  }
}
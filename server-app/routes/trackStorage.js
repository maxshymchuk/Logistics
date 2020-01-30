const tracks = require('../tracklist.js');

async function findTrackById(id) {
  return new Promise((resolve, reject) => {
    const track = tracks.find(i => i.id == id);
    resolve(track);
  });
}

async function isValidTrackId(id) {
  if (isNaN(id)) {
    return {
      status: {
        content: 'Id is not a number',
        code: 400,
      },
      isFound: false
    };
  }
  if (!(await findTrackById(id))) {
    return {
      status: {
        content: 'Track not found',
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
  async getTracks() {
    return {
      content: tracks,
      code: 200
    }
  },
  async getTrackById(id) {
    const isValid = await isValidTrackId(id);
    return !isValid.isFound ? isValid.status : {
      content: (await findTrackById(id)),
      code: 200
    }
  },
  async getTrackUserId(id) {
    const isValid = await isValidTrackId(id);
    return !isValid.isFound ? isValid.status : {
      content: (await findTrackById(id)).ownerId,
      code: 200
    }
  }
}
const request = require('supertest');

const app = require('../app.js');

const userList = [
  {
    id: 1,
    name: "Gleb Glebov",
    login: "gleboff",
    country: "Belarus, Minsk",
    tracks: [1]
  },
  {
    id: 2,
    name: "Till Lindemann",
    login: "rammm",
    location: "Germany, Dusseldorf",
    tracks: [2]
  },
  {
    id: 3,
    name: "Max Shymchuk",
    login: "octorix",
    location: "Belarus, Minsk",
    tracks: [3, 4]
  }
]

const newUserList = [
  {
    id: 2,
    name: "Till Lindemann",
    login: "rammm",
    location: "Germany, Dusseldorf",
    tracks: [2]
  },
  {
    id: 3,
    name: "Max Shymchuk",
    login: "octorix",
    location: "Belarus, Minsk",
    tracks: [3, 4]
  },
  {
    id: 4,
    name: "Shhhhhhhhhh",
    login: "shhhhhhhhhh",
    location: "Shh, Shhh",
    tracks: []
  }
]

const newUser = {
  id: 4,
  name: "Shhhhhhhhhh",
  login: "shhhhhhhhhh",
  location: "Shh, Shhh",
  tracks: []
}

describe('Get Endpoints', () => {
  test('should return user list', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(userList);
  });
  test('should return user by id = 1', async () => {
    const res = await request(app).get('/users/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(userList[0]);
  });
  test('should return user (id = 1) tracks array', async () => {
    const res = await request(app).get('/users/1/tracks');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual([1]);
  });
  test('should return "user not found"', async () => {
    const res = await request(app).get('/users/666');
    expect(res.statusCode).toEqual(404);
    expect(res.text).toBe('User not found');
  });
  test('should return "Id is not a number"', async () => {
    const res = await request(app).get('/users/abcde');
    expect(res.statusCode).toEqual(400);
    expect(res.text).toBe('Id is not a number');
  });
})

describe('Post Endpoints', () => {
  test('should return new user list', async () => {
    const res = await request(app)
      .post('/users')
      .send(newUser);
    const list = userList.concat(newUser);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual(list);
  });
})

describe('Delete Endpoints', () => {
  test('should return new user list', async () => {
    const res = await request(app).delete('/users/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(newUserList);
  });
})
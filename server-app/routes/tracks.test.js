const request = require('supertest');

const app = require('../app.js');

const trackList = [
  {
    id: 1,
    description: "Description 1",
    currentLocation: "Moscow",
    ownerId: "1"
  },
  {
    id: 2,
    description: "Description 2",
    currentLocation: "USA",
    ownerId: "2"
  },
  {
    id: 3,
    description: "Description 3",
    currentLocation: "Norway",
    ownerId: "3"
  },
  {
    id: 4,
    description: "Description 4",
    currentLocation: "Sweden",
    ownerId: "3"
  }
]

describe('Get Endpoints', () => {
  test('should return track list', async () => {
    const res = await request(app).get('/tracks');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(trackList);
  });
  test('should return track by id = 1', async () => {
    const res = await request(app).get('/tracks/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(trackList[0]);
  });
  test('should return track (id = 1) owner id', async () => {
    const res = await request(app).get('/tracks/1/user');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toEqual('1');
  });
  test('should return "track not found"', async () => {
    const res = await request(app).get('/tracks/666');
    expect(res.statusCode).toEqual(404);
    expect(res.text).toBe('Track not found');
  });
  test('should return "Id is not a number"', async () => {
    const res = await request(app).get('/tracks/abcde');
    expect(res.statusCode).toEqual(400);
    expect(res.text).toBe('Id is not a number');
  });
})
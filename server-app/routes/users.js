const express = require('express');
const router = express.Router();

const users = require('../users.js');
const tracks = require('../tracks.js');

router.get('/', (req, res, next) => {
  res.send(users);
});

router.get('/:user_id(\\d+)', (req, res, next) => {
  const id = req.params.user_id;
  const user = users[id];
  user ? res.send(user) : res.send('Id not number');
});

router.get('/:user_id(\\d+)/tracks', (req, res, next) => {
  const id = req.params.user_id;
  const user = users[id];
  const trackList = user.tracks.reduce((acc, cur) => {
    acc.push(tracks[cur]);
    return acc;
  }, [])
  res.send(trackList);
});

router.post('/', (req, res) => {
  const { login, name, location } = req.body;
  const user = {
    name: name,
    login: login,
    location: location,
    tracks: []
  }
  users[++Object.entries(users).length] = user;
  res.send(req.body.user);
});

router.delete('/:user_id(\\d+)', (req, res) => {
  delete users['' + req.params.user_id];
  res.send(users);
});

router.put('/', (req, res) => {
  res.send('PUT request')
});

module.exports = router;
const express = require('express');
const router = express.Router();

const users = require('../users.json');
const tracks = require('../tracks.json');

router.get('/(:user_id(\\d+))?', (req, res, next) => {
  const id = req.params.user_id;
  if (id) {
    const user = users[id];
    user ? res.send(user) : res.send('User not found');
  } else {
    res.send(users);
  }
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

router.post('/new&:name([a-zA-Z_]+)', (req, res) => {
  const name = req.params.name;
  res.send(`POST request, name = ${name}`);
});

router.delete('/:user_id(\\d+)', (req, res) => {
  res.send('DELETE request');
});

router.put('/', (req, res) => {
  res.send('PUT request')
});

module.exports = router;
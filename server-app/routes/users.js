const express = require('express');
const router = express.Router();

const users = require('./userStorage.js');

router.get('/', (req, res) => {
  res.send(users.getUsers());
});

router.get('/:user_id', (req, res) => {
  const id = req.params.user_id;
  res.send(users.getUserById(id));
});

router.get('/:user_id/tracks', (req, res) => {
  const id = req.params.user_id;
  res.send(users.getUserTracks(id));
});

router.post('/', (req, res) => {
  res.send(users.postUser(req.body));
});

router.delete('/:user_id', (req, res) => {
  res.send(users);
});

router.put('/', (req, res) => {
  res.send('PUT request')
});

module.exports = router;
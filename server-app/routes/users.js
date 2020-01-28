const express = require('express');
const router = express.Router();

const userStorage = require('./userStorage.js');

router.get('/', (req, res) => {
  res.send(userStorage.getUsers());
});

router.get('/:user_id', (req, res) => {
  const id = req.params.user_id;
  res.send(userStorage.getUserById(id));
});

router.get('/:user_id/tracks', (req, res) => {
  const id = req.params.user_id;
  res.send(userStorage.getUserTracks(id));
});

router.post('/', (req, res) => {
  res.send(userStorage.postUser(req.body));
});

router.delete('/:user_id', (req, res) => {
  const id = req.params.user_id;
  res.send(userStorage.deleteUserById(id));
});

router.put('/', (req, res) => {
  res.send(userStorage.updateUser(req.body));
});

module.exports = router;
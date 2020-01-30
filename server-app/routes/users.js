const express = require('express');
const router = express.Router();

const userStorage = require('./userStorage.js');

router.get('/', async (req, res) => {
  const result = await userStorage.getUsers();
  res.status(result.code).send(result.content);
});

router.get('/:user_id', async (req, res) => {
  const result = await userStorage.getUserById(req.params.user_id);
  res.status(result.code).send(result.content);
});

router.get('/:user_id/tracks', async (req, res) => {
  const result = await userStorage.getUserTracksId(req.params.user_id);
  res.status(result.code).send(result.content);
});

router.post('/', async (req, res) => {
  const result = await userStorage.addUser(req.body);
  res.status(result.code).send(result.content);
});

router.delete('/:user_id', async (req, res) => {
  const result = await userStorage.deleteUserById(req.params.user_id);
  res.status(result.code).send(result.content);
});

router.put('/', async (req, res) => {
  const result = await userStorage.updateUser();
  res.status(result.code).send(result.content);
});

module.exports = router;
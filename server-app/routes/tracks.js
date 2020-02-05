const express = require('express');
const router = express.Router();

const trackStorage = require('./trackStorage.js');

router.get('/', async (req, res) => {
  const result = await trackStorage.getTracks();
  res.status(result.code).send(result.content);
});

router.get('/:track_id', async (req, res) => {
  const result = await trackStorage.getTrackById(req.params.track_id);
  res.status(result.code).send(result.content);
});

router.get('/:track_id/user', async (req, res) => {
  const result = await trackStorage.getTrackUserId(req.params.track_id);
  res.status(result.code).send(result.content);
});

module.exports = router;
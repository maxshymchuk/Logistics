const express = require('express');
const router = express.Router();

const trackStorage = require('./trackStorage.js');

router.get('/', (req, res) => {
  res.send(trackStorage.getTracks());
});

router.get('/:track_id', (req, res) => {
  const id = req.params.track_id;
  res.send(trackStorage.getTrackById(id));
});

router.get('/:track_id/user', (req, res) => {
  const id = req.params.track_id;
  res.send(trackStorage.getTrackUser(id));
});

module.exports = router;
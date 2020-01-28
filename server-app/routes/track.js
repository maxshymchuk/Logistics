const express = require('express');
const router = express.Router();

const tracks = require('../tracks.js');

router.get('/', (req, res) => {
  res.send(tracks);
});

router.get('/:track_id', (req, res) => {
  const id = req.params.track_id;
  if (id) {
    const track = tracks[id];
    track ? res.send(track) : res.send('Track not found');
  } else {
    res.send(tracks);
  }
});

module.exports = router;
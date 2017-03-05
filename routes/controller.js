const express = require('express');
const router = express.Router();
const Febreze = require('../service/febreze');
const Nest = require('../service/nest');

router.post("/vacation", function(req, res) {
  Febreze.update(req.body.location, null);
  if (req.body.location.toLowerCase() === 'swiss alps') {
    Nest.update(req.body.temp, 15, req.body.humidity);
  } else {
    Nest.update(req.body.temp, req.body.duration, req.body.humidity);
  }

  res.send("success");
});

module.exports = router;

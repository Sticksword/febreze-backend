const express = require('express');
const router = express.Router();
const Febreze = require('../service/febreze');
const Nest = require('../service/nest');

router.post("/vacation", function(req, res) {
  Febreze.update(req.body.location, null);
  Nest.update(req.body.temp, req.body.duration, null);

  res.send("success");
});

module.exports = router;

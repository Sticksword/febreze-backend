var express = require('express');
var router = express.Router();
const request = require('request-promise');
const Febreze = require('../controller/febreze');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

router.post('/test1', Febreze.turnPurple);
router.post('/test2', Febreze.pathLight);
router.post('/test3', Febreze.scentOne);
router.post('/test4', Febreze.scentTwo);

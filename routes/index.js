var express = require('express');
var router = express.Router();
const request = require('request-promise');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

router.post('/connect/febreze/:clientId', function(req, res, next) {
  

});

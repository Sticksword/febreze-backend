/*jshint esversion: 6 */

var express = require('express');
var router = express.Router();
const request = require('request-promise');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'nest' });
});



router.post('/', function(req, res) {
  console.log('=========');
  console.log(req.body);

  if (makeTemperaturePost(req.body.temp) === 0) {
    res.send('success');
  } else {
    res.send('error');
  }
});

function makeTemperaturePost (temp) {
  var options = {
    method: 'PUT',
    uri: 'https://developer-api.nest.com/devices/thermostats/XvVANsbisE06xwxNqVZNmqHfbGN0RAej',
    headers: {
      'Authorization': 'Bearer c.ZzwnlUv6cmKsoYVjbMmL5v6umieg06MHmp5VRnhJ3ekxr7NwPmr7QVjKm8eLQNjFafiOc3FP59E51TUfJCJ8oNRmnFyPYnQtS2TIwTzAAANina6TdhZoGIunxBPJlsvNjAl1W6AWR16fpF7B',
      'Content-Type': 'application/json'
    },
    body: "{'target_temperature_f': temp}",
    // json: true // Automatically stringifies the body to JSON
  };

  request.put(options)
    .then(function (parsedBody) {
      // POST succeeded...
      console.log('success');
      return 0;
    })
    .catch(function (err) {
      // POST failed...
      console.log(err);
      return -1;
    });
}

module.exports = router;

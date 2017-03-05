/*jshint esversion: 6 */

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'nest' });
});



router.post('/', function(req, res) {
  console.log('=========');
  console.log(req.body);

  makeTemperaturePost(req.body.temp, function(result) {
    res.send(result);
  });

});

// var request = require('request');
var request = require('request-promise');



function makeTemperaturePost (temp, next) {

  // var options = {
  //   method: 'PUT',
  //   url: 'https://developer-api.nest.com/devices/thermostats/XvVANsbisE06xwxNqVZNmqHfbGN0RAej',
  //   headers: {
  //     authorization: 'Bearer c.nz0cGM30l2SqHokV7GS2RjTTph84DLLOqb3Fwdgcwe5aaXKDolffeu8gDS6hgS2HK8NgjqrjR8ZtuG5v5yqNdcEW2hwHFLgPLEA2wqzHc33SM8GcVhhJpliLQDYktKx2xKpZcdRiL3mt1Qgc',
  //     'content-type': 'application/json'
  //   },
  //   body: { 'target_temperature_f': temp },
  //   json: true
  // };
  //
  // request(options, function (error, response, body) {
  //   if (error) throw new Error(error);
  //
  //   console.log(body);
  // });

  var options = {
    method: 'PUT',
    uri: 'https://developer-api.nest.com/devices/thermostats/XvVANsbisE06xwxNqVZNmqHfbGN0RAej',
    headers: {
      'Authorization': 'Bearer c.ZzwnlUv6cmKsoYVjbMmL5v6umieg06MHmp5VRnhJ3ekxr7NwPmr7QVjKm8eLQNjFafiOc3FP59E51TUfJCJ8oNRmnFyPYnQtS2TIwTzAAANina6TdhZoGIunxBPJlsvNjAl1W6AWR16fpF7B',
      'Content-Type': 'application/json'
    },
    body: {
      'target_temperature_f': temp
    },
    json: true, // Automatically stringifies the body to JSON
    // simple: false
  };

  request.put(options)
    .then(function (parsedBody) {
      // POST succeeded...
      console.log(parsedBody);
      next(parsedBody);
    })
    .catch(function (err) {
      // POST failed...
      if (err.statusCode === 307) {
        redirect(temp, err.response.headers.location, next);
      }
      else {
        next(err);
      }
    });
}

function redirect(temp, url, next) {
  console.log(url);
  var options = {
    method: 'PUT',
    uri: url,
    headers: {
      'Authorization': 'Bearer c.ZzwnlUv6cmKsoYVjbMmL5v6umieg06MHmp5VRnhJ3ekxr7NwPmr7QVjKm8eLQNjFafiOc3FP59E51TUfJCJ8oNRmnFyPYnQtS2TIwTzAAANina6TdhZoGIunxBPJlsvNjAl1W6AWR16fpF7B',
      'Content-Type': 'application/json'
    },
    body: {
      'target_temperature_f': parseInt(temp)
    },
    json: true, // Automatically stringifies the body to JSON
    // simple: false
  };

  request.put(options)
    .then(function (parsedBody) {
      console.log('redirect success');
      next('hurray');
    })
    .catch(function (err) {
      console.log('redirect error');
      next(err);
    });
}

module.exports = router;

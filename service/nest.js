const express = require('express');
const router = express.Router();
const request = require('request-promise');

const baseUri = 'https://developer-api.nest.com/devices/thermostats/XvVANsbisE06xwxNqVZNmqHfbGN0RAej';
const token = 'Bearer c.ZzwnlUv6cmKsoYVjbMmL5v6umieg06MHmp5VRnhJ3ekxr7NwPmr7QVjKm8eLQNjFafiOc3FP59E51TUfJCJ8oNRmnFyPYnQtS2TIwTzAAANina6TdhZoGIunxBPJlsvNjAl1W6AWR16fpF7B'

exports.update = function (temp, duration) {
  var body = {
    'target_temperature_f': parseInt(temp <= 50 ? 50 : temp >= 90 ? 90 : temp),
    'fan_timer_active': false
  }
  if (duration && duration != 0) {
    body.fan_timer_active = true;
    body.fan_timer_duration = parseInt(duration);
  }

  var options = {
    method: 'PUT',
    uri: baseUri,
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    },
    body: body,
    json: true,
  }

  request(options)
    .then(function(response) {
      return true;
    })
    .catch(function(err){
      // redirect if error status is 307
      if (err.statusCode === 307) {
        console.log("redirect");
        redirect(err.response.headers.location, options);
      }
    });
}

function redirect(location, options) {
  options.uri = location;
  console.log(options.uri);
  request(options)
    .then(function(response) {
      console.log("redirect success")
      return true;
    })
    .catch(function(err) {
      console.log(err);
      console.log("redirect error");
      return false;
    });
}

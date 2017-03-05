/*jshint esversion: 6 */
const express = require('express');
const router = express.Router();
const request = require('request-promise');

const nestUri = 'https://developer-api.nest.com';
const baseUri = 'https://developer-api.nest.com/devices/thermostats/XvVANsbisE06xwxNqVZNmqHfbGN0RAej';
const token = 'Bearer c.ZzwnlUv6cmKsoYVjbMmL5v6umieg06MHmp5VRnhJ3ekxr7NwPmr7QVjKm8eLQNjFafiOc3FP59E51TUfJCJ8oNRmnFyPYnQtS2TIwTzAAANina6TdhZoGIunxBPJlsvNjAl1W6AWR16fpF7B';

exports.update = function (temp, duration, humidity) {
  var body = {
    'target_temperature_f': parseInt(temp <= 50 ? 50 : temp >= 90 ? 90 : temp),
    'fan_timer_active': false

  };
  if (duration && duration !== 0) {
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
  };

  request(options)
    .then(function(response) {
      return true;
    })
    .catch(function(err) {
      // redirect if error status is 307
      if (err.statusCode === 307) {
        console.log("redirect from main update");
        redirect(err.response.headers.location, options);
        getHumidity(humidity);
        return true;
      }
    });
};

function getHumidity(humidity) {
  if (humidity === '') {
    return;
  }
  var options = {
    method: 'GET',
    uri: nestUri,
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    },
    json: true,
  };

  request(options)
    .then(function(response) {
      console.log(response.devices.thermostats.XvVANsbisE06xwxNqVZNmqHfbGN0RAej.humidity);
      var nestHumidity = response.devices.thermostats.XvVANsbisE06xwxNqVZNmqHfbGN0RAej.humidity;
      if (nestHumidity < humidity) {
        callHumi();
      }
      // var structure = firstChild(data.structures);
      // console.log(structure.thermostats[0]);
      // var thermostat = response.devices.thermostats[structure.thermostats[0]];
      // console.log(thermostat.humidity);
      return true;
    })
    .catch(function (err) {
      // redirect if error status is 307
      // if (err.statusCode === 307) {
      //   console.log("redirect from get Humidity");
      //   redirect(err.response.headers.location, options);
      // }
    });
}

function callHumi() {

  var body = {
    'access_token': '246382cdf7794bad141b411ec638b1c91c8b1553'
  };
  var options = {
    method: 'POST',
    uri: 'https://api.particle.io/v1/devices/2f003e001447353136383631/startHumi',
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    },
    body: body,
    json: true,
  };
}

/**
  Utility method to return the first child
  value of the passed in object.

  @method
  @param object
  @returns object
*/
function firstChild(object) {
  for(var key in object) {
    return object[key];
  }
}

function redirect(location, options) {
  options.uri = location;
  console.log(options.uri);
  request(options)
    .then(function(response) {
      console.log("redirect success");
      // return true;
    })
    .catch(function(err) {
      console.log(err);
      console.log("redirect error");
      // return false;
    });
}

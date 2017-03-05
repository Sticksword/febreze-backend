const request = require('request-promise');
const baseUri = 'https://na-hackathon-api.arrayent.io:443/v3/devices/33554447/';
const token = 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRfaWQiOiI4NTA2ZWUwMC0wMTFlLTExZTctYWU0Ni01ZmMyNDA0MmE4NTMiLCJlbnZpcm9ubWVudF9pZCI6Ijk0OGUyY2YwLWZkNTItMTFlNi1hZTQ2LTVmYzI0MDQyYTg1MyIsInVzZXJfaWQiOiI5MDAwMDk3Iiwic2NvcGVzIjoie30iLCJncmFudF90eXBlIjoiYXV0aG9yaXphdGlvbl9jb2RlIiwiaWF0IjoxNDg4NjYxNzI1LCJleHAiOjE0ODk4NzEzMjV9.m1m_nMRFhsGLJAXtKwIBoyh-vRnNUPdC-3Ud28HYvQv9iDkbZBUUYglcKnVNdZ30prpzSsXDRbD-t7OjnUJSAQ';

exports.turnPurple = function(req, res, next) {
  const options = {
    method: 'PUT',
    uri: baseUri,
    headers: {
      'Authorization': token,
      'content-type': 'application/json'
    },
    body: '[{"DeviceAction": "led_mode=1"},{"DeviceAction": "led_color=0,11,4,4,4"}]'
  };

  request(options)
    .then(function(response) {
      return res.send(response);
    })
    .catch(function(err) {
      return res.send(err);
    });
}

exports.pathLight = function(req, res, next) {
  const options = {
    method: 'PUT',
    uri: baseUri,
    headers: {
      'Authorization': token,
      'content-type': 'application/json'
    },
    body: '[{"DeviceAction": "led_mode=3" }]'
  };

  request(options)
    .then(function(response) {
      console.log("here");
      return res.send(response);
    })
    .catch(function(err) {
      console.log("error here!!!!!!!!!!!");
      return res.send(err);
    });
}

exports.scentOne = function(req, res, next) {
  const options = {
    method: 'PUT',
    uri: baseUri,
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    },
    body: '[{"DeviceAction": "scene_1=100,255,0,0,255,0"}, {"DeviceAction": "led_mode=1"}, {"DeviceAction": "led_color=0,2,4,4,4"}, {"DeviceAction": "heater_state=3"}]'
  }

  request(options)
    .then(function(response) {
      console.log("here");
      return res.send(response);
    })
    .catch(function(err) {
      console.log("error here!!!!!!!!!!!");
      return res.send(err);
    });

}

exports.scentTwo = function(req, res, next) {
  const options = {
    method: 'PUT',
    uri: baseUri,
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    },
    body: '[{"DeviceAction": "scene_1=0,255,0,100,255,0"}, {"DeviceAction": "led_mode=1"}, {"DeviceAction": "led_color=0,6,4,4,4"}, {"DeviceAction": "heater_state=4"}]'
  }

  request(options)
    .then(function(response) {
      console.log("here");
      return res.send(response);
    })
    .catch(function(err) {
      console.log("error here!!!!!!!!!!!");
      return res.send(err);
    });

}

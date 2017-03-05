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
    body: '[{"DeviceAction": "led_mode=1"},{"DeviceAction": "led_color=0,14,4,4,4"}]'
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
      return res.send(response);
    })
    .catch(function(err) {
      return res.send(err);
    });
}

exports.update = function(location, next) {
  // heater(scent) 1
  var scene = "100, 255, 0, 0, 0, 0";
  var ledColor = "0, 11, 4, 4, 4";
  var heaterState = 3;
  console.log(location);
  if (location === "Si Chuan") {
    // heater(scent) 2
    scent = "0, 0, 0, 100, 255, 0";
    ledColor = "0, 2, 4, 4, 4";
    heaterState = 4;
  }

  const options = {
    method: 'PUT',
    uri: baseUri,
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    },
    body: [
      {"DeviceAction": `scene_1=${scene}`},
      {"DeviceAction": "led_mode=1"},
      {"DeviceAction": `led_color=${ledColor}`},
      {"DeviceAction": 'heater_state_push=1'},
      {"DeviceAction": "trigger_1=127,0,1439,1"}
    ],
    json: true
  }
  // `[{"DeviceAction": "scene_1=${scene}"}, {"DeviceAction": "led_mode=1"}, {"DeviceAction": "led_color=${ledColor}"}, {"DeviceAction": "heater_state=${headerState}"}]`

  request(options)
    .then(function(response) {
      return true;
    })
    .catch(function(err) {
      return false;
    });

}

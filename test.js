var nestToken  = 'c.ZzwnlUv6cmKsoYVjbMmL5v6umieg06MHmp5VRnhJ3ekxr7NwPmr7QVjKm8eLQNjFafiOc3FP59E51TUfJCJ8oNRmnFyPYnQtS2TIwTzAAANina6TdhZoGIunxBPJlsvNjAl1W6AWR16fpF7B',
    thermostat = {},
    structure  = {};

var Firebase = require('firebase');

// Create a reference to the API using the provided token
var dataRef = new Firebase('wss://developer-api.nest.com');
dataRef.auth(nestToken);

/**
  Start listening for changes on this account,
  update appropriate views as data changes.
*/
dataRef.on('value', function (snapshot) {
  var data = snapshot.val();

  // For simplicity, we only care about the first
  // thermostat in the first structure
  structure = firstChild(data.structures),
  thermostat = data.devices.thermostats[structure.thermostats[0]];

  // TAH-361, device_id does not match the device's path ID
  thermostat.device_id = structure.thermostats[0];

  console.log(thermostat);
  console.log(structure);

});

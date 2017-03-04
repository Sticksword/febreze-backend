var qs = require("querystring");
var http = require("https");

var options = {
  "method": "POST",
  "hostname": "api.home.nest.com",
  "port": null,
  "path": "/oauth2/access_token",
  "headers": {
    "content-type": "application/x-www-form-urlencoded"
  }
};

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.write(qs.stringify({ code: 'GRAHUDGE',
  client_id: 'fca64803-9b4d-405a-a168-77ec855bb1a9',
  client_secret: 'jbjstV6qkZVl1a86cG84yQF6l',
  grant_type: 'authorization_code' }));
req.end();

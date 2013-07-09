#!/usr/bin/env node
var express = require('express')
  , fs = require('fs')
  , http = require('http')
  , https = require('https')
  , spdy = require('spdy');

// Set up server private key, public key certificate and CA certificate
// The ciphers options prevents using some ciphers not supported by Wireshark, such as DH and CAMELLIA
var sslOptions = {
  key: fs.readFileSync(__dirname + '/../ssh/localhost.key'),
  cert: fs.readFileSync(__dirname + '/../ssh/localhost.crt'),
  ca: fs.readFileSync(__dirname + '/../ca/cacert.pem'),
  ciphers: 'HIGH:!DSS:!DH:!CAMELLIA:!aGOST:!AESGCM:!aNULL@STRENGTH'
};

var app = express();
app.configure(function () {
  app.use(express.logger("dev"));
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.enable('trust proxy');
});

// Hello World
app.get('/hello', function (request, response) {
  response.set('Content-Type', 'text/plain');
  response.send('Hello World');
});

var getHeader = function(filename) {
  if (/\.css$/.test(filename)) {
    return { 'content-type': 'text/css' };
  }
  if (/\.js$/.test(filename)) {
    return { 'content-type': 'text/javascript' };
  }
  if (/\.json$/.test(filename)) {
    return { 'content-type': 'application/json' };
  }
  if (/\.png$/.test(filename)) {
    return { 'content-type': 'image/png' };
  }
  return {};
};

var pushStaticContent = function(response) {
  var staticDir = __dirname + '/../static/thoughtWorks_files/';
  var filenames = fs.readdirSync(staticDir).slice(0,5);
  filenames.forEach(function(filename) {
  //var filename = filenames[0];
    if (fs.lstatSync(staticDir + filename).isFile()) {
      response.push('/thoughtWorks_files/' + filename, getHeader(filename), function(error, stream) {
        if (error) throw error;
        console.log(filename);
        stream.end(fs.readFileSync(staticDir + filename));
      });
    }
  });
};

// When the home page is requested, push some static resources as well
// TODO Don't send the static resources if the page is requested again later by the same client
app.get('/', function (request, response) {
  if (response.push) {
    pushStaticContent(response);
  }
  response.sendfile('app/static/tw.html');
});

// Serve files from the app/static directory
app.get(/\/.+/, function (request, response) {
  response.sendfile('app/static' + request.path);
});

var httpPort = 8080;
http.createServer(app).listen(httpPort);

var httpsPort = 8443;
https.createServer(sslOptions, app).listen(httpsPort);

var spdyPort = 10443;
spdy.createServer(sslOptions, app).listen(spdyPort);

console.log('Server listening on HTTP port ' + httpPort + ', HTTPS port ' + httpsPort + ', and SPDY port ' + spdyPort);


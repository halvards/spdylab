#!/usr/bin/env node
var express = require('express')
  , crypto = require('crypto')
  , fs = require('fs')
  , http = require('http')
  , https = require('https')
  , spdy = require('spdy');

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

// Hello World, for experimentation
app.get('/hello', function (request, response) {
  response.set('Content-Type', 'text/plain');
  response.send('Hello World');
});

// Serve files from the app/static directory
app.get('/*', function (request, response) {
  response.sendfile('app/static' + request.path);
});

var httpPort = 8080;
http.createServer(app).listen(httpPort);

var httpsPort = 8443;
https.createServer(sslOptions, app).listen(httpsPort);

var spdyPort = 10443;
spdy.createServer(sslOptions, app).listen(spdyPort);

console.log('Server listening on HTTP port ' + httpPort + ', HTTPS port ' + httpsPort + ', and SPDY port ' + spdyPort);


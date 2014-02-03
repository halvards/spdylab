#!/usr/bin/env node
var express = require('express')
  , fs = require('fs')
  , http = require('http')
  , https = require('https')
  , spdy = require('spdy')
  , spdyPush = require('./spdy-push');

// Set up server private key, public key certificate and CA certificate
// The ciphers options prevents using some ciphers not supported by Wireshark, such as DH and CAMELLIA
var sslOptions = {
  key: fs.readFileSync(process.env.HOME + '/.ssh/localhost.key'),
  cert: fs.readFileSync(process.env.HOME + '/.ssh/localhost.crt'),
  ca: fs.readFileSync(process.env.HOME + '/.ca/cacert.pem'),
  ciphers: 'HIGH:!DSS:!DH:!CAMELLIA:!aGOST:!AESGCM:!aNULL@STRENGTH'
};

var app = express();
app.configure(function () {
  app.use(express.logger("dev"));
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(spdyPush.referrerPush());
  app.use(app.router);
  app.enable('trust proxy');
});

// Hello World
app.get('/hello', function (request, response) {
  response.set('Content-Type', 'text/plain');
  response.send('Hello World!');
});

// Used to test json responses
//app.get('/thoughtWorks_files/cookie_banner.js', function(request, response) {
//  response.json({'hello': 'world'});
//});

// When the '/tw.html' home page is requested as '/', push some static resources as well
app.get('/', function (request, response) {
//  response.writeHead(200, { 'content-type': 'text/html' });
  response.end(fs.readFileSync(__dirname + '/../static/tw.html'));
});

// Serve files from the app/static directory
app.get('/*', function (request, response) {
  response.end(fs.readFileSync(__dirname + '/../static' + request.path));
});

var httpPort = 8080;
http.createServer(app).listen(httpPort);

var httpsPort = 8443;
https.createServer(sslOptions, app).listen(httpsPort);

var spdyPort = 10443;
spdy.createServer(sslOptions, app).listen(spdyPort);

console.log('Server listening on HTTP port ' + httpPort + ', HTTPS port ' + httpsPort + ', and SPDY port ' + spdyPort);

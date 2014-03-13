#!/usr/bin/env node
var express = require('express')
  , fs = require('fs')
  , http = require('http')
  , https = require('https')
  , http2 = require('http2')
  , spdy = require('spdy')
  , spdyPush = require('spdy-referrer-push');

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
  app.use(spdyPush.referrer());
  app.use(app.router);
  app.enable('trust proxy');
});

// When the '/tw.html' home page is requested as '/', push some static resources as well
app.get('/', function (request, response) {
  fs.createReadStream(__dirname + '/../static/tw.html').pipe(response);
});

// Serve files from the app/static directory
app.get('/*', function (request, response) {
  fs.createReadStream(__dirname + '/../static' + request.path).pipe(response);
});

var httpPort = 8080;
http.createServer(app).listen(httpPort);

var httpsPort = 8443;
https.createServer(sslOptions, app).listen(httpsPort);

var spdyPort = 10443;
spdy.createServer(sslOptions, app).listen(spdyPort);

var http2Port = 12443;
http2.createServer(sslOptions, app).listen(http2Port);

console.log('Server listening on HTTP port ' + httpPort + ', HTTPS port ' + httpsPort + ', SPDY port ' + spdyPort + ', and HTTP/2 port ' + http2Port);

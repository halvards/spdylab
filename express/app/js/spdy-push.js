var fs = require('fs')
  , http = require('http')
  , urlParse = require('url').parse
  , logger = require('./logger')
  , expressRequest = require('express/lib/request')
  , expressResponse = require('express/lib/response');

logger.debugLevel = 'debug';

var pushRegexps = [
  /.*\.css/,
  /.*\.js/,
  /.*\.png/,
  /.*\.jpeg/,
  /.*\.jpg/,
  /.*\.gif/,
  /.*\.ico/,
  /.*\.woff/
];
var pushContentTypes = [
  "text/css",
  "text/javascript",
  "application/javascript",
  "application/x-javascript",
  "image/png",
  "image/x-png",
  "image/jpeg",
  "image/gif",
  "image/x-icon",
  "image/vnd.microsoft.icon"
];
var maxAssociatedResources = 32;
var referrerPushPeriod = 5000; // millis
var mainResources = {};

var isPushResource = function(url) {
  var result = false;
  pushRegexps.forEach(function (pushRegexp) {
    if (pushRegexp.test(url)) {
      result = true;
    }
  });
  return result;
};

var isMainResource = function(url) {
  return !isPushResource(url);
}

var getOrCreateMainResource = function(url) {
  if (!mainResources[url]) {
    var firstPushResourceAdded = -1;
    var pushResources = [];
    mainResources[url] = {
      name: url,
      firstPushResourceAdded: firstPushResourceAdded,
      getPushResources: function() {
        return pushResources.slice(0);
      },
      addPushResource: function(pushResourceUrl, host, referrer) {
        if (firstPushResourceAdded === -1) {
          firstPushResourceAdded = Date.now();
        }
        var delay = Date.now() - firstPushResourceAdded;
        if (urlParse(referrer).host !== host) {
          logger.debug("Skipped store of push metadata " + pushResourceUrl + " for main resource " + url + ": Hostname: " + host + " doesn't match referrer " + referrer);
          return false;
        }
        if (pushResources.length >= maxAssociatedResources) {
          logger.debug("Skipped store of push metadata " + pushResourceUrl + " for main resource " + url + ": Max associated resources (" + maxAssociatedResources + ") reached");
          return false;
        }
        if (delay > referrerPushPeriod) {
          logger.debug("Skipped store of push metadata " + pushResourceUrl + " for main resource " + url + ": Delay " + delay + "ms longer than referrerPushPeriod (" + referrerPushPeriod + "ms)");
          return false;
        }
        logger.debug("Adding: " + pushResourceUrl + " to: " + url + " with delay: " + delay + "ms.");
        pushResources.push(pushResourceUrl);
        logger.debug("Push resources for " + url + " are now " + pushResources);
        return true;
      }
    };
  }
  return mainResources[url];
};

var getContentType = function(url) {
  if (/.*\.css/.test(url)) {
    return 'text/css';
  }
  if (/.*\.js/.test(url)) {
    return 'application/javascript';
  }
  if (/.*\.png/.test(url)) {
    return 'image/png';
  }
  if (/.*\.jpe?g/.test(url)) {
    return 'image/jpeg';
  }
  if (/.*\.gif/.test(url)) {
    return 'image/gif';
  }
  if (/.*\.ico/.test(url)) {
    return 'image/x-icon';
  }
  if (/.*\.html?/.test(url)) {
    return 'text/html';
  }
  if (/.*\.json/.test(url)) {
    return 'application/json';
  }
  if (/.*\.txt/.test(url)) {
    return 'text/plain';
  }
  if (/.*\.woff/.test(url)) {
    return 'application/octet-stream';
  }
  return '';
};

var push = function(req, res, url) {
  logger.info("Server push " + url);
  var headers = { 'content-type': getContentType(url) };
  var internalRequest = { __proto__: expressRequest, app: req.app };
  internalRequest.socket = { remoteAddress: '127.0.0.1' };  // for logging
  internalRequest.method = 'GET';
  internalRequest.url = url;
  internalRequest.params = {};
  internalRequest.headers = {};
  internalRequest.body = {};
  internalRequest.query = {};
  internalRequest.files = {};
  var internalResponse = { __proto__: expressResponse, app: req.app };
  var stream = res.push(url, headers);
  internalResponse.end = function(data) {
    stream.end(data);
  };
  req.app.handle(internalRequest, internalResponse, function(error) {
    logger.warn("Error when pushing resource [" + url + "]: " + error.message);
  });
};

exports.referrerPush = function() {
  return function(req, res, next) {
    if (!res.push && typeof(a) !== 'function') {
      logger.debug("Not handling SPDY server push for URL " + req.url + " because req.push does not exist or is not a function");
      return next();
    }
    if (req.method !== 'GET') {
      logger.debug("Not handling SPDY server push for URL " + req.url + " because the HTTP method is " + req.method);
      return next();
    }
    if (req.headers['if-modified-since']) {
      logger.debug("Not handling SPDY server push for URL " + req.url + " because If-Modified-Since header is present");
      return next();
    }
    logger.debug("Handling server push for " + req.url);
    if (isMainResource(req.url)) {
      logger.debug("URL [" + req.url + "] is a main resource for SPDY server push");
      var mainResource = getOrCreateMainResource(req.url);
      var pushResources = mainResource.getPushResources();
      logger.debug("Pushing resources for URL [" + req.url + "]: " + pushResources);
      pushResources.forEach(function (pushResourceUrl) {
        push(req, res, pushResourceUrl);
      });
    } else if (isPushResource(req.url)) {
      logger.debug("URL [" + req.url + "] is a push resource for SPDY server push");
      var referrer = req.headers['referer'];
      if (referrer) {
        var mainResource = getOrCreateMainResource(urlParse(referrer).path);
        var pushResources = mainResource.getPushResources();
        if (pushResources.indexOf(req.url) === -1) {
          mainResource.addPushResource(req.url, req.headers['host'], referrer);
        } else {
          getOrCreateMainResource(req.url).getPushResources().forEach(function (pushResourceUrl) {
            push(req, res, pushResourceUrl);
          });
        }
      }
    }

    return next();
  };
};


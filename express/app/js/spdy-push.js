var fs = require('fs')
  , urlParse = require('url').parse
  , logger = require('./logger');

logger.debugLevel = 'info';

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

var push = function(response, url, baseDir) {
  logger.info("Server push " + url);
  var resource = fs.readFileSync(baseDir + url);
  var headers = {
    'content-type': getContentType(url),
    'content-length': resource.length
  };
  var stream = response.push(url, headers);
  stream.on('acknowledgement', function () {
  });
  stream.on('error', function (error) {
    logger.warn("Error when pushing resource " + url + ": " + error);
//    throw error;
  });
  stream.end(resource);
};

exports.referrerPush = function(baseDir) {
  var baseResourceDir = baseDir ? baseDir : "";

  return function(request, response, next) {
//    logger.debug("Headers:" + Object.keys(request.headers));
//    logger.debug("Protocol:" + request.protocol);
//    logger.debug("host:" + request.host);
//    logger.debug("hostname:" + request.hostname);
//    logger.debug("hostport:" + request.headers.host);
//    logger.debug("hostport2:" + request.headers['x-forwarded-host']);
//    logger.debug("port:" + request.port);
//    logger.debug("gethost:" + request.get('host'));
//    logger.debug("getport:" + request.get('port'));
//    logger.debug("app: " + Object.keys(request.app));
//    logger.debug("app.settings: " + Object.keys(request.app.settings));
//    logger.debug("settings.port: " + request.app.settings.port);
    if (!response.push && typeof(a) !== 'function') {
      logger.debug("Not handling SPDY server push for URL " + request.url + " because request.push does not exist or is not a function");
      return next();
    }
    if (request.method !== 'GET') {
      logger.debug("Not handling SPDY server push for URL " + request.url + " because the HTTP method is " + request.method);
      return next();
    }
    if (request.headers['if-modified-since']) {
      logger.debug("Not handling SPDY server push for URL " + request.url + " because If-Modified-Since header is present");
      return next();
    }
    logger.debug("handling server push for " + request.url);
    if (isMainResource(request.url)) {
      logger.debug("URL [" + request.url + "] is a main resource for SPDY server push");
      var mainResource = getOrCreateMainResource(request.url);
      var pushResources = mainResource.getPushResources();
      logger.debug("Pushing resources for URL [" + request.url + "]: " + pushResources);
      pushResources.forEach(function (pushResourceUrl) {
        push(response, pushResourceUrl, baseResourceDir);
      });
    } else if (isPushResource(request.url)) {
      logger.debug("URL [" + request.url + "] is a push resource for SPDY server push");
      var referrer = request.headers['referer'];
      if (referrer) {
        var mainResource = getOrCreateMainResource(urlParse(referrer).path);
        var pushResources = mainResource.getPushResources();
        if (pushResources.indexOf(request.url) === -1) {
          mainResource.addPushResource(request.url, request.headers['host'], referrer);
        } else {
          getOrCreateMainResource(request.url).getPushResources().forEach(function (pushResourceUrl) {
            push(response, pushResourceUrl, baseResourceDir);
          });
        }
      }
    }

    return next();
  };
};


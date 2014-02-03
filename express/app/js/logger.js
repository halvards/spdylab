var logger = exports;

var levels = ['error', 'warn', 'info', 'debug'];

logger.debugLevel = 'info';

logger.log = function (level, message) {
  var level = level || 'info';
  if (levels.indexOf(level.toLowerCase()) <= levels.indexOf(logger.debugLevel)) {
    if (typeof message !== 'string') {
      message = JSON.stringify(message);
    }
    console.log(level + ': ' + message);
  }
};

levels.forEach(function(level) {
  logger[level] = function (message) {
    logger.log(level, message);
  };
});

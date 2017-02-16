var _ = require('lodash');
var path = require('path');
var extend = require('deep-extend');
require('json5/lib/require');

function Config(opts) {}

function _getCallerFile() {
  try {
    var oldPrepareStackTrace = Error.prepareStackTrace;
    Error.prepareStackTrace = function(err, stack) { return stack; };
    var stack = new Error().stack;
    Error.prepareStackTrace = oldPrepareStackTrace;
    return stack[2].getFileName()
  } catch (err) {}
  return undefined;
}

Config.prototype.set = function (opts, silent) {
  if (typeof opts === 'object') {
    extend(this, opts);
  } else if (typeof opts === 'function') {
    extend(this, opts(this));
  } else if (typeof opts === 'string') {
    try {
      var callerFile = _getCallerFile();
      var moduleFile = path.join(path.dirname(callerFile), opts);
      var module = require(moduleFile);
      this.set(module)
    } catch (e) {
      if (!silent) { 
        console.log(e)
      }
    }
  }
}

Config.prototype.get = function (key) {
  return _.get(this, key);
}

Config.prototype.Config = Config;

module.exports = new Config();

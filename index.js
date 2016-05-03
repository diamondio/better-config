var _ = require('lodash');
var path = require('path');
var extend = require('deep-extend');

function Config(opts) {}

function _getCallerFile() {
  try {
    var err = new Error();
    var callerfile;
    var currentfile;

    Error.prepareStackTrace = function (err, stack) { return stack; };
    currentfile = err.stack.shift().getFileName();

    while (err.stack.length) {
      callerfile = err.stack.shift().getFileName();
      if(currentfile !== callerfile) return callerfile;
    }
  } catch (err) {}
  return undefined;
}

Config.prototype.set = function (opts, val) {
  if (typeof opts === 'object') {
    extend(this, opts);
  } else if (typeof opts === 'function') {
    extend(this, module(this));
  } else if (typeof opts === 'string') {
    try {
      var callerFile = _getCallerFile();
      var moduleFile = path.join(path.dirname(callerFile), opts);
      var module = require(moduleFile);
      this.set(module)
    } catch (e) {
      console.log(e)
    }
  }
}

Config.prototype.get = function (key) {
  return _.get(this, key);
}

Config.prototype.Config = Config;

module.exports = new Config();

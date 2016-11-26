
logger.log("{auth} Installing AuthMachine api")

// This is a fake plugin to experiment
// with injecting an API into Devkit

var TOKEN_KEY = 'tokenKey';

var requester = function(uri, type, data, cb) {
  var request = new XMLHttpRequest();
  request.open(type, uri, true);

  if (data !== null) {
    // Always assume JSON
    request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    request.send(JSON.stringify(data));
  } else {
    request.send(null);
  }

  // state changes
  request.onreadystatechange = function() {
    if (request.readyState === 4) { // done
      if (request.status === 200) { // complete
        cb(null, request.responseText);
      }
    }
  };
  request.addEventListener('error', function() {
    // TODO proper errors
    cb('error');
  }, false);
  request.addEventListener('abort', function() {
    // TODO proper errors
    cb('abort');
  }, false);
};

var AuthMachine = function(config) {
  this._config = config;
  this.isLoggedin = function() {
    return (localStorage.getItem(TOKEN_KEY) !== null);
  }
};

// APIs
AuthMachine.prototype.login = function(name, pass, cb) {
  // TODO: something like this
  // if (isLoggedin)
  //   return cb();

  // Send server request and return
  // requester(this._config.myserver,
  //   this._config.endpoints.login,
  //   'POST',
  //   {
  //     user: name,
  //     pass: pass
  //   }
  // ), cb;
  cb('error:no server connected yet');
}

module.exports = AuthMachine;

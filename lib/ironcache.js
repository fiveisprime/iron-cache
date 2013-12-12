var util = require('util');

module.exports = function ironcache(project, token, http) {

  var internals = {};

  //
  // List caches.
  //
  internals.list = function list(fn) {
    var uri = util.format('/projects/%s/caches', project);

    http(uri, token, 'GET', function(err, response, body) {
      if (err) return fn(err, null);
      if (response.statusCode !== 200) return fn(new Error(body.msg), null);

      fn(null, body);
    });
  };

  //
  // Get information about a cache.
  //
  internals.get = function get(cache, fn) {
    var uri = util.format('/projects/%s/caches/%s', project, cache);

    http(uri, token, 'GET', function(err, response, body) {
      if (err) return fn(err, null);
      if (response.statusCode !== 200) return fn(new Error(body.msg), null);

      fn(null, body);
    });
  };

  return internals;
};

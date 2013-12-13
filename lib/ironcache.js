var util = require('util');

module.exports = function ironcache(project, token, http) {

  var internals = {};

  //
  // Cache Management.
  // ===
  //

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
  internals.info = function get(cache, fn) {
    var uri = util.format('/projects/%s/caches/%s', project, cache);

    http(uri, token, 'GET', function(err, response, body) {
      if (err) return fn(err, null);
      if (response.statusCode !== 200) return fn(new Error(body.msg), null);

      fn(null, body);
    });
  };

  //
  // Delete a cache.
  //
  internals.delCache = function delCache(cache, fn) {
    var uri = util.format('/projects/%s/caches/%s', project, cache);

    http(uri, token, 'DELETE', function(err, response, body) {
      if (err) return fn(err, null);
      if (response.statusCode !== 200) return fn(new Error(body.msg), null);

      fn(null, body);
    });
  };

  //
  // Clear a cache.
  //
  internals.clearCache = function clearCache(cache, fn) {
    var uri = util.format('/projects/%s/caches/%s/clear', project, cache);

    http(uri, token, 'POST', function(err, response, body) {
      if (err) return fn(err, null);
      if (response.statusCode !== 200) return fn(new Error(body.msg), null);

      fn(null, body);
    });
  };


  //
  // Key Management.
  // ===
  //

  //
  // Add the specified key/value pair to the specified cache.
  //
  internals.put = function put(cache, key, data, fn) {
    var uri = util.format('/projects/%s/caches/%s/items/%s', project, cache, key);

    http(uri, token, 'PUT', data, function(err, response, body) {
      if (err) return fn(err, null);
      if (response.statusCode !== 200) return fn(new Error(body.msg), null);

      fn(null, body);
    });
  };

  //
  // Increment the value of the specified key in the specified cache.
  //
  internals.incr = function incr(cache, key, fn) {
    var uri = util.format('/projects/%s/caches/%s/items/%s/increment', project, cache, key);

    http(uri, token, 'POST', function(err, response, body) {
      if (err) return fn(err, null);
      if (response.statusCode !== 200) return fn(new Error(body.msg), null);

      fn(null, body);
    });
  };

  //
  // Get the value of the specified key from the specified cache.
  //
  internals.get = function get(cache, key, fn) {
    var uri = util.format('/projects/%s/caches/%s/items/%s', project, cache, key);

    http(uri, token, 'GET', function(err, response, body) {
      if (err) return fn(err, null);
      if (response.statusCode !== 200) return fn(new Error(body.msg), null);

      fn(null, body);
    });
  };

  //
  // Delete the specified key from the specified cache.
  //
  internals.del = function del(cache, key, fn) {
    var uri = util.format('/projects/%s/caches/%s/items/%s', project, cache, key);

    http(uri, token, 'DELETE', function(err, response, body) {
      if (err) return fn(err, null);
      if (response.statusCode !== 200) return fn(new Error(body.msg), null);

      fn(null, body);
    });
  };

  return internals;
};

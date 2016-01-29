//
//     Iron-Cache
//     Copyright(c) 2014 Matt Hernandez <matt@modulus.io>
//     MIT Licensed
//

var util = require('util');

//
// Generic handler for API responses. Includes default error handling.
//
function handleResponse(done, err, response, body) {
  if (err) return done(err, null);
  if (response.statusCode !== 200) return done(new Error(body.msg || 'Unknown error'), null);

  done(null, body);
}

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

    http(uri, token, 'GET', handleResponse.bind(null, fn));
  };

  //
  // Get information about a cache.
  //
  internals.info = function get(cache, fn) {
    var uri = util.format('/projects/%s/caches/%s', project, cache);

    http(uri, token, 'GET', handleResponse.bind(null, fn));
  };

  //
  // Delete a cache.
  //
  internals.delCache = function delCache(cache, fn) {
    var uri = util.format('/projects/%s/caches/%s', project, cache);

    http(uri, token, 'DELETE', handleResponse.bind(null, fn));
  };

  //
  // Clear a cache.
  //
  internals.clearCache = function clearCache(cache, fn) {
    var uri = util.format('/projects/%s/caches/%s/clear', project, cache);

    http(uri, token, 'POST', handleResponse.bind(null, fn));
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

    http(uri, token, 'PUT', data, handleResponse.bind(null, fn));
  };

  //
  // Increment the value of the specified key in the specified cache.
  //
  internals.incr = function incr(cache, key, amount, fn) {
    var uri = util.format('/projects/%s/caches/%s/items/%s/increment', project, cache, key);

    http(uri, token, 'POST', { amount: amount }, handleResponse.bind(null, fn));
  };

  //
  // Get the value of the specified key from the specified cache.
  //
  internals.get = function get(cache, key, fn) {
    var uri = util.format('/projects/%s/caches/%s/items/%s', project, cache, key);

    http(uri, token, 'GET', handleResponse.bind(null, fn));
  };

  //
  // Delete the specified key from the specified cache.
  //
  internals.del = function del(cache, key, fn) {
    var uri = util.format('/projects/%s/caches/%s/items/%s', project, cache, key);

    http(uri, token, 'DELETE', handleResponse.bind(null, fn));
  };

  return internals;
};

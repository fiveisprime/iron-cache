//
//     Iron-Cache
//     Copyright(c) 2014 Matt Hernandez <matt@modulus.io>
//     MIT Licensed
//

var request = require('request');

const rootUrl = 'https://cache-aws-us-east-1.iron.io/1';

//
// Expose the Iron Cache REST API.
//
module.exports = function http(uri, token, method, data, fn) {
  var options = {
    url: rootUrl + uri
  , method: method
  , json: true
  , qs: {
      oauth: token
    }
  };

  if (typeof data === 'function') {
    fn = data;
  } else {
    options.body = data;
  }

  request(options, fn);
};

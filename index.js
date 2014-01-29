//
//     Iron-Cache
//     Copyright(c) 2014 Matt Hernandez <matt@modulus.io>
//     MIT Licensed
//

var http = require('./lib/http');

exports.createClient = function(options) {
  if (!options) throw new Error('You must specify configuration options');
  if (!options.project) throw new Error('You must specify a project.');
  if (!options.token) throw new Error('You must specify a token.');

  return require('./lib/ironcache')(options.project, options.token, http);
};

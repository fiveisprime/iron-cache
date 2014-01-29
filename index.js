//
//     Iron-Cache
//     Copyright(c) 2014 Matt Hernandez <matt@modulus.io>
//     MIT Licensed
//

var http = require('./lib/http');

exports.createClient = function(project, token) {
  if (!project) throw new Error('You must specify a project.');
  if (!token) throw new Error('You must specify an OAuth token.');

  return require('./lib/ironcache')(project, token, http);
};

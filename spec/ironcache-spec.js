var lib       = require('../')
  , ironcache = require('../lib/ironcache');

describe('initialization', function() {

  it('should throw if missing configuration options', function() {
    (function() {
      lib();
    }).should.throw();
  });

});

describe('API calls', function() {

  it('should call `list` with the correct parameters', function() {
    var ic = ironcache('list', '123', function(uri, token, method) {
      uri.should.equal('/projects/list/caches');
      token.should.equal('123');
      method.should.equal('GET');
    });

    ic.list();
  });
  
  it('should call `get` with the correct parameters', function() {
    var ic = ironcache('get', '456', function(uri, token, method) {
      uri.should.equal('/projects/get/caches/cache');
      token.should.equal('456');
      method.should.equal('GET');
    });

    ic.get('cache');
  });
});

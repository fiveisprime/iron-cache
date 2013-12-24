var lib       = require('../')
  , ironcache = require('../lib/ironcache');

describe('ironcache', function() {

  describe('initialization', function() {

    it('should throw if missing configuration options', function() {
      (function() {
        lib();
      }).should.throw();
    });

  });

  describe('cache API calls', function() {

    it('should call `list` with the correct parameters', function(done) {
      var ic = ironcache('list', '123', function(uri, token, method) {
        uri.should.equal('/projects/list/caches');
        token.should.equal('123');
        method.should.equal('GET');

        done();
      });

      ic.list();
    });

    it('should call `info` with the correct parameters', function(done) {
      var ic = ironcache('info', '456', function(uri, token, method) {
        uri.should.equal('/projects/info/caches/info-cache');
        token.should.equal('456');
        method.should.equal('GET');

        done();
      });

      ic.info('info-cache');
    });

    it('should call `delCache` with the correct parameters', function(done) {
      var ic = ironcache('delCache', '789', function(uri, token, method) {
        uri.should.equal('/projects/delCache/caches/del-cache');
        token.should.equal('789');
        method.should.equal('DELETE');

        done();
      });

      ic.delCache('del-cache');
    });

    it('should call `clearCache` with the correct parameters', function(done) {
      var ic = ironcache('clearCache', '1011', function(uri, token, method) {
        uri.should.equal('/projects/clearCache/caches/clr-cache/clear');
        token.should.equal('1011');
        method.should.equal('POST');

        done();
      });

      ic.clearCache('clr-cache');
    });
  });

  describe('key API calls', function() {

    it('should call `put` with the correct parameters', function(done) {
      var ic = ironcache('put', '1213', function(uri, token, method, data) {
        uri.should.equal('/projects/put/caches/put-cache/items/key-name');
        token.should.equal('1213');
        method.should.equal('PUT');

        data.should.have.property('value');

        done();
      });

      ic.put('put-cache', 'key-name', { value: 'test' });
    });

    it('should call `incr` with the correct parameters', function(done) {
      var ic = ironcache('incr', '1415', function(uri, token, method, data) {
        uri.should.equal('/projects/incr/caches/incr-cache/items/key-name/increment');
        token.should.equal('1415');
        method.should.equal('POST');

        data.should.have.property('amount');

        done();
      });

      ic.incr('incr-cache', 'key-name', 1);
    });

    it('should call `get` with the correct parameters', function(done) {
      var ic = ironcache('get', '1617', function(uri, token, method) {
        uri.should.equal('/projects/get/caches/get-cache/items/key-name');
        token.should.equal('1617');
        method.should.equal('GET');

        done();
      });

      ic.get('get-cache', 'key-name');
    });

    it('should call `del` with the correct parameters', function(done) {
      var ic = ironcache('del', '1819', function(uri, token, method) {
        uri.should.equal('/projects/del/caches/del-cache/items/key-name');
        token.should.equal('1819');
        method.should.equal('DELETE');

        done();
      });

      ic.del('del-cache', 'key-name');
    });
  });

});

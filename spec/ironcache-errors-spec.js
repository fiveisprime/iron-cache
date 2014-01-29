var ironcache = require('../lib/ironcache');

describe('cache API errors', function() {

  it('should handle errors from `list`', function(done) {
    var ic = ironcache('list', '123', function(uri, token, method, fn) {
      fn(new Error('test error'));
    });

    ic.list(function(err) {
      err.should.exist;
      done();
    });
  });

  it('should return an error for invalid responses from `list`', function(done) {
    var ic = ironcache('list', '123', function(uri, token, method, fn) {
      fn(null, { statusCode: 500 }, { msg: 'test error' });
    });

    ic.list(function(err) {
      err.should.exist;
      done();
    });
  });

  it('should handle error from `info`', function(done) {
    var ic = ironcache('info', '456', function(uri, token, method, fn) {
      fn(new Error('test error'));
    });

    ic.info('info-cache', function(err) {
      err.should.exist;
      done();
    });
  });

  it('should return an error for invalid responses from `info`', function(done) {
    var ic = ironcache('info', '456', function(uri, token, method, fn) {
      fn(null, { statusCode: 500 }, { msg: 'test error' });
    });

    ic.info('info-cache', function(err) {
      err.should.exist;
      done();
    });
  });

  it('should handle error from `delCache`', function(done) {
    var ic = ironcache('del', '456', function(uri, token, method, fn) {
      fn(new Error('test error'));
    });

    ic.delCache('del-cache', function(err) {
      err.should.exist;
      done();
    });
  });

  it('should return an error for invalid responses from `delCache`', function(done) {
    var ic = ironcache('del', '456', function(uri, token, method, fn) {
      fn(null, { statusCode: 500 }, { msg: 'test error' });
    });

    ic.delCache('del-cache', function(err) {
      err.should.exist;
      done();
    });
  });

  it('should handle error from `clearCache`', function(done) {
    var ic = ironcache('clear', '456', function(uri, token, method, fn) {
      fn(new Error('test error'));
    });

    ic.clearCache('clear-cache', function(err) {
      err.should.exist;
      done();
    });
  });

  it('should return an error for invalid responses from `clearCache`', function(done) {
    var ic = ironcache('clear', '456', function(uri, token, method, fn) {
      fn(null, { statusCode: 500 }, { msg: 'test error' });
    });

    ic.clearCache('clear-cache', function(err) {
      err.should.exist;
      done();
    });
  });

});

describe('key API errors', function() {

  it('should handle error from `put`', function(done) {
    var ic = ironcache('put', '456', function(uri, token, method, data, fn) {
      fn(new Error('test error'));
    });

    ic.put('put-cache', 'key-name', { value: 'test' }, function(err) {
      err.should.exist;
      done();
    });
  });

  it('should return an error for invalid responses from `put`', function(done) {
    var ic = ironcache('put', '456', function(uri, token, method, data, fn) {
      fn(null, { statusCode: 500 }, { msg: 'test error' });
    });

    ic.put('put-cache', 'key-name', { value: 'test' }, function(err) {
      err.should.exist;
      done();
    });
  });

  it('should handle error from `incr`', function(done) {
    var ic = ironcache('incr', '456', function(uri, token, method, data, fn) {
      fn(new Error('test error'));
    });

    ic.incr('incr-cache', 'key-name', { value: 'test' }, function(err) {
      err.should.exist;
      done();
    });
  });

  it('should return an error for invalid responses from `incr`', function(done) {
    var ic = ironcache('incr', '456', function(uri, token, method, data, fn) {
      fn(null, { statusCode: 500 }, { msg: 'test error' });
    });

    ic.incr('incr-cache', 'key-name', { value: 'test' }, function(err) {
      err.should.exist;
      done();
    });
  });

  it('should handle error from `get`', function(done) {
    var ic = ironcache('get', '456', function(uri, token, method, fn) {
      fn(new Error('test error'));
    });

    ic.get('get-cache', 'key-name', function(err) {
      err.should.exist;
      done();
    });
  });

  it('should return an error for invalid responses from `get`', function(done) {
    var ic = ironcache('get', '456', function(uri, token, method, fn) {
      fn(null, { statusCode: 500 }, { msg: 'test error' });
    });

    ic.get('get-cache', 'key-name', function(err) {
      err.should.exist;
      done();
    });
  });

  it('should handle error from `del`', function(done) {
    var ic = ironcache('del', '456', function(uri, token, method, fn) {
      fn(new Error('test error'));
    });

    ic.del('del-cache', 'key-name', function(err) {
      err.should.exist;
      done();
    });
  });

  it('should return an error for invalid responses from `del`', function(done) {
    var ic = ironcache('del', '456', function(uri, token, method, fn) {
      fn(null, { statusCode: 500 }, { msg: 'test error' });
    });

    ic.del('del-cache', 'key-name', function(err) {
      err.should.exist;
      done();
    });
  });

});

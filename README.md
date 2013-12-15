ironcache [![Build Status](https://travis-ci.org/fiveisprime/ironcache.png?branch=master)](https://travis-ci.org/fiveisprime/ironcache)
=========

Node.js implementation of [Iron Cache](http://www.iron.io/cache).

[![NPM](https://nodei.co/npm/ironcache.png)](https://nodei.co/npm/ironcache/)

# Usage

Initialize using your project ID and OAuth token.

```js
var ironcache = require('ironcache')(
  '52a9e663601db21209124054'
, 'zsZBKJ7QYSldnRbRKOgDTFf3Gxw'
);
```

The API usage is split into two pieces: cache management and key management.

## Cache Management

Get information about the caches in the project, clear them and delete them.

### List Caches

Empty or nonexistent caches will return an empty array.

```js
ironcache.list(function(err, res) {
  if (err) throw err;
  console.log(res);
});
```

Response:

```js
[
  {
    "project_id": "PROJECT ID",
    "name": "CACHE NAME"
  },
  {
    "project_id": "PROJECT ID",
    "name": "CACHE NAME"
  }
]
```

### Cache Information

Get information about a cache.

```js
ironcache.info('my-cache', function(err, res) {
  if (err) throw err;
  console.log(res);
});
```

Response:

```js
{
  "size": "cache size"
}
```

### Clear Cache

Clear all items in a cache.

```js
ironcache.clearCache('my-cache', function(err, res) {
  if (err) throw err;
  console.log(res);
});
```

Response:

```js
{
  "msg": "Cleared."
}
```

### Delete Cache

Delete a cache and all items in it.

```js
ironcache.delCache('my-cache', function(err, res) {
  if (err) throw err;
  console.log(res);
});
```

Response:

```js
{
  "msg": "Deleted."
}
```

## Key Management

Add, update, and remove items in a cache.

### Put

Puts an item into a cache.

```js
ironcache.put('my-cache', 'key', { value: 'some data' }, function(err, res) {
  if (err) throw err;
  console.log(res);
});
```

Value is required and is the data that will be persisted in the key. Other
available properties include the following.

* `expires_in`: How long in seconds to keep the item in the cache before it is deleted. By default, items do not expire. Maximum is 2,592,000 seconds (30 days).
* `replace`: If set to true, only set the item if the item is already in the cache. If the item is not in the cache, do not create it.
* `add`: If set to true, only set the item if the item is not already in the cache. If the item is in the cache, do not overwrite it.
* `cas`: If set, the new item will only be placed in the cache if there is an existing item with a matching key and cas value. An item’s cas value is automatically generated and is included when the item is retrieved.

Response:

```js
{
  "msg": "Stored."
}
```

### Increment

Increment an item's value. The amount must be a number and attempting to
increment non-numeric values results in an error. Negative amounts may be passed
to decrement the value. The increment is atomic, so concurrent increments will
all be observed.

```js
ironcache.incr('my-cache', 'key', 1, function(err, res) {
  if (err) throw err;
  console.log(res);
});
```

Response:

```js
{
  "msg": "Added",
  "value": 132
}
```

### Get

Retrieve an item from the cache.

```js
ironcache.get('my-cache', 'key', function(err, res) {
  if (err) throw err;
  console.log(res);
});
```

Response:

```js
{
  "cache": "CACHE NAME",
  "key": "ITEM KEY",
  "value": "ITEM VALUE",
  "cas": "12345"
}
```

### Delete

Delete an item from the cache.

```js
ironcache.del('my-cache', 'key', function(err, res) {
  if (err) throw err;
  console.log(res);
});
```

Response:

```js
{
  "msg": "Deleted."
}
```

# License

The MIT License (MIT)

Copyright (c) 2013 Matt Hernandez

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

Iron-Cache [![NPM version](https://badge.fury.io/js/iron-cache.svg)](http://badge.fury.io/js/iron-cache) [![Build Status](https://travis-ci.org/fiveisprime/iron-cache.svg?branch=master)](https://travis-ci.org/fiveisprime/iron-cache)
==========

Node.js implementation of Iron's [IronCache](http://www.iron.io/cache) product.

# Usage

Create an [iron](http//www.iron.io) project. In your dashboard, click the
credentials link (the little key) to see your Project ID and Token. These are
required to use the IronCache API with this module.

Initialize the module using your Project ID and Token.

You can also add environment variables to your application to initialize the
module. These variables are `IRON_CACHE_PROJECT` and `IRON_CACHE_TOKEN`. When
using the environment variables, there is no need to pass the options object
when creating the client object.

```js
var ironcache = require('iron-cache');

// Pass an options object.
var client = ironcache.createClient({ project: 'project', token: 'token' });

// When using the environment variables IRON_CACHE_PROJECT & IRON_CACHE_TOKEN.
// This will throw an error if the environment variables are not set.
var client = ironcache.createClient();
```

The API usage is split into two pieces: [cache management](#cache-management)
and [key management](#key-management).

## Cache Management

These methods are used to manage your caches. Create a new cache by
[put](#put)ting a cache key/value pair to the cache.

### List Caches

Empty or nonexistent caches will return an empty array.

```js
client.list(function(err, res) {
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
client.info('my-cache', function(err, res) {
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
client.clearCache('my-cache', function(err, res) {
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
client.delCache('my-cache', function(err, res) {
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

CRUD the values stored in your caches.

### Put

Puts an item into a cache.

```js
client.put('my-cache', 'key', { value: 'some data' }, function(err, res) {
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
client.incr('my-cache', 'key', 1, function(err, res) {
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
client.get('my-cache', 'key', function(err, res) {
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
client.del('my-cache', 'key', function(err, res) {
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

Copyright (c) 2014 Matt Hernandez

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

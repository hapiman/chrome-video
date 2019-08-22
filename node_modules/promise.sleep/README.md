# promise.sleep
> promise.sleep

[![Build Status](https://img.shields.io/travis/magicdawn/promise.sleep.svg?style=flat-square)](https://travis-ci.org/magicdawn/promise.sleep)
[![Coverage Status](https://img.shields.io/codecov/c/github/magicdawn/promise.sleep.svg?style=flat-square)](https://codecov.io/gh/magicdawn/promise.sleep)
[![npm version](https://img.shields.io/npm/v/promise.sleep.svg?style=flat-square)](https://www.npmjs.com/package/promise.sleep)
[![npm downloads](https://img.shields.io/npm/dm/promise.sleep.svg?style=flat-square)](https://www.npmjs.com/package/promise.sleep)
[![npm license](https://img.shields.io/npm/l/promise.sleep.svg?style=flat-square)](http://magicdawn.mit-license.org)

## Install
```
npm i promise.sleep --save
```

## API

### `sleep`

```js
const sleep = require('promise.sleep');

sleep(100).then(function(){
  // blabla
});
```

### `sleep.Green`

```js
const Green = require('promise.sleep').Green;
const green = new Green({
  min: '1m',
  max: '10m',
  factor: '1m',
});
```

- `green.idle()` sleep a while
- `green.busy()` / `green.reset()` reset to `min`

## Changelog
[CHANGELOG.md](CHANGELOG.md)

## See Also

- [promise.timeout](https://github.com/magicdawn/promise.timeout)
- [promise.retry](https://github.com/magicdawn/promise.retry)
- [promise.map](https://github.com/magicdawn/promise.map)
- [promise.ify](https://github.com/magicdawn/promise.ify)
- [promise.cb](https://github.com/magicdawn/promise.cb)
- [promise.obj](https://github.com/magicdawn/promise.obj)
- [promise.sleep](https://github.com/magicdawn/promise.sleep)

## License
the MIT License http://magicdawn.mit-license.org
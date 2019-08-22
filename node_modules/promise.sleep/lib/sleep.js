'use strict';

/**
 * Module dependencies
 */

var assert = require('assert');
var $ms = require('ms');

module.exports = function sleep(ms) {
  if (ms !== 0) {
    assert(ms, 'the sleep duration can not be empty');
  }

  // covert
  if (typeof ms === 'string') {
    ms = $ms(ms);
  }

  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve(ms);
    }, ms);
  });
};
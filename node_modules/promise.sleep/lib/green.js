'use strict';

/**
 * Module dependencies
 */

var assert = require('assert');
var $ms = require('ms');
var sleep = require('./sleep');

var Green = module.exports = function Green(options) {
  if (!(this instanceof Green)) return new Green(options);

  assert(options.min, 'options.min can not be empty');
  assert(options.max, 'options.max can not be empty');
  assert(options.factor, 'options.factor can not be empty');
  this.options = options;
  var self = this;

  ['min', 'max'].forEach(function(key) {
    var val = self.options[key];
    if (typeof val === 'string') {
      self[key] = $ms(val);
    } else {
      self[key] = val;
    }
  });
  assert(this.min < this.max, 'min must less than max');

  var factor = this.options.factor;
  if (typeof factor === 'string') {
    this.factor = $ms(factor);
  } else {
    this.factor = factor;
  }
};

var g = Green.prototype;

g.idle = function() {
  if (!this.cur) {
    this.cur = this.min;
  } else {
    var computed;
    if (typeof this.factor === 'function') {
      computed = this.factor(this.cur);
    } else {
      computed = this.cur + this.factor;
    }
    this.cur = Math.min(this.max, computed);
  }

  return sleep(this.cur);
};

g.reset = g.busy = function() {
  delete this.cur;
};
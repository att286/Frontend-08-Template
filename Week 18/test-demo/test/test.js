var assert = require('assert');

// var add = require('../add.js').add;
// var mul = require('../add.js').mul;
import {add, mul} from '../add.js'

describe('add function testing', function () {
  it('1 + 2 should return 3', function () {
    assert.strictEqual(add(1, 2), 3);
  });

  it('10 + 2 should return 12', function () {
    assert.strictEqual(add(10, 2), 12);
  });

  it('10 * 2 should return 20', function () {
    assert.strictEqual(mul(10, 2), 20);
  });
})

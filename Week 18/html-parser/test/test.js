var assert = require('assert');

import {parseHTML} from '../src/parser.js'

describe('parse html:', function () {
  var html = '<a></a>';
  it(html, function () {
    let tree = parseHTML(html);
    // console.log(tree)
    assert.strictEqual(tree.children[0].tagName, 'a');
    assert.strictEqual(tree.children[0].children.length, 0);
  });

  var html2 = '<a href="https://www.baidu.com"></a>';
  it(html2, function () {
    let tree = parseHTML(html2);
    // console.log(tree)
    assert.strictEqual(tree.children.length, 1);
    assert.strictEqual(tree.children[0].children.length, 0);
  });

  var html3 = '<a href ></a>';
  it(html3, function () {
    let tree = parseHTML(html3);
    // console.log(tree)
    assert.strictEqual(tree.children.length, 1);
    assert.strictEqual(tree.children[0].children.length, 0);
  });

  var html4 = '<a href id></a>';
  it(html4, function () {
    let tree = parseHTML(html4);
    // console.log(tree)
    assert.strictEqual(tree.children.length, 1);
    assert.strictEqual(tree.children[0].children.length, 0);
  });

  var html5 = '<a href="https://www.baidu.com" id></a>';
  it(html5, function () {
    let tree = parseHTML(html5);
    // console.log(tree)
    assert.strictEqual(tree.children.length, 1);
    assert.strictEqual(tree.children[0].children.length, 0);
  });

  var html6 = '<a id=abc></a>';
  it(html6, function () {
    let tree = parseHTML(html6);
    // console.log(tree)
    assert.strictEqual(tree.children.length, 1);
    assert.strictEqual(tree.children[0].children.length, 0);
  });

  var html7 = '<a id=abc />';
  it(html7, function () {
    let tree = parseHTML(html7);
    // console.log(tree)
    assert.strictEqual(tree.children.length, 1);
    assert.strictEqual(tree.children[0].children.length, 0);
  });

  var html8 = "<a id='abc' />";
  it(html8, function () {
    let tree = parseHTML(html8);
    // console.log(tree)
    assert.strictEqual(tree.children.length, 1);
    assert.strictEqual(tree.children[0].children.length, 0);
  });

  var html9 = '<a />';
  it(html9, function () {
    let tree = parseHTML(html9);
    // console.log(tree)
    assert.strictEqual(tree.children.length, 1);
    assert.strictEqual(tree.children[0].children.length, 0);
  });

  var html10 = '<A />';
  it(html10 + ' upper case', function () {
    let tree = parseHTML(html10);
    // console.log(tree)
    assert.strictEqual(tree.children.length, 1);
    assert.strictEqual(tree.children[0].children.length, 0);
  });

  var html11 = '<>';
  it(html11, function () {
    let tree = parseHTML(html11);
    // console.log(tree)
    assert.strictEqual(tree.children.length, 1);
    assert.strictEqual(tree.children[0].type, 'text');
  });

  var html12 = '<a>hello</a>';
  it(html12, function () {
    let tree = parseHTML(html12);
    // console.log(tree)
    assert.strictEqual(tree.children.length, 1);
    assert.strictEqual(tree.children[0].children.length, 1);
  });

  var html13 = "<a  id='abc' />";
  it(html13, function () {
    let tree = parseHTML(html13);
    // console.log(tree)
    assert.strictEqual(tree.children.length, 1);
    assert.strictEqual(tree.children[0].children.length, 0);
  });
})

'use strict';

var Assert = require('./../../src/AssertJS/Assert');

module.exports = Assert;

if (typeof window !== 'undefined') {
    window.Assert = Assert;
}
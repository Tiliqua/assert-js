'use strict';

var assert = require('./AssertJS/Assert');

module.exports = assert;

if (typeof window !== 'undefined') {
    window.Assert = assert;
}
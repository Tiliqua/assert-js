'use strict';

var assert = require('./AssertJS/Assert').default;

module.exports = assert;

if (typeof window !== 'undefined') {
    window.Assert = assert;
}
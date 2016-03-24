'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Message = require('./InvalidValueException');

var _Message2 = _interopRequireDefault(_Message);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Assert = function () {
    function Assert() {
        _classCallCheck(this, Assert);
    }

    _createClass(Assert, null, [{
        key: 'instanceOf',

        /**
         * @param {object} objectValue
         * @param {function} instance
         */
        value: function instanceOf(objectValue, instance) {
            if ((typeof objectValue === 'undefined' ? 'undefined' : _typeof(objectValue)) !== 'object') {
                throw _Message2.default.expected("object", objectValue);
            }

            if (!(objectValue instanceof instance)) {
                throw _Message2.default.expectedInstanceOf(instance.name, objectValue);
            }
        }

        /**
         * @param {int} integerValue
         */

    }, {
        key: 'integer',
        value: function integer(integerValue) {
            if (!Number.isInteger(integerValue)) {
                throw _Message2.default.expected("integer", integerValue);
            }
        }

        /**
         * @param {number} numberValue
         */

    }, {
        key: 'number',
        value: function number(numberValue) {
            if (typeof numberValue !== 'number') {
                throw _Message2.default.expected("number", numberValue);
            }
        }

        /**
         * @param {string} stringValue
         */

    }, {
        key: 'string',
        value: function string(stringValue) {
            if (typeof stringValue !== "string") {
                throw _Message2.default.expected("string", stringValue);
            }
        }

        /**
         * @param {boolean} booleanValue
         */

    }, {
        key: 'boolean',
        value: function boolean(booleanValue) {
            if (typeof booleanValue !== 'boolean') {
                throw _Message2.default.expected("boolean", booleanValue);
            }
        }

        /**
         * @param {object} objectValue
         */

    }, {
        key: 'object',
        value: function object(objectValue) {
            if ((typeof objectValue === 'undefined' ? 'undefined' : _typeof(objectValue)) !== 'object') {
                throw _Message2.default.expected("object", objectValue);
            }
        }

        /**
         * @param {string} expectedFunctionName
         * @param {object} objectValue
         */

    }, {
        key: 'hasFunction',
        value: function hasFunction(expectedFunctionName, objectValue) {
            Assert.string(expectedFunctionName);
            Assert.object(objectValue);

            if (typeof objectValue[expectedFunctionName] !== 'function') {
                throw _Message2.default.expected('object to has function "' + expectedFunctionName + '"', objectValue);
            }
        }

        /**
         * @param {array} arrayValue
         */

    }, {
        key: 'array',
        value: function array(arrayValue) {
            if (!Array.isArray(arrayValue)) {
                throw _Message2.default.expected("array", arrayValue);
            }
        }

        /**
         * @param {function} functionValue
         */

    }, {
        key: 'isFunction',
        value: function isFunction(functionValue) {
            if (typeof functionValue !== 'function') {
                throw _Message2.default.expected("function", functionValue);
            }
        }

        /**
         * @param {int} requiredTreshold
         * @param {int} integerValue
         */

    }, {
        key: 'greaterThan',
        value: function greaterThan(requiredTreshold, integerValue) {
            Assert.number(requiredTreshold);
            Assert.number(integerValue);

            if (integerValue <= requiredTreshold) {
                throw 'Expected value ' + integerValue + ' to be greater than ' + requiredTreshold;
            }
        }

        /**
         * @param {array} arrayValue
         * @param {function} expectedInstance
         */

    }, {
        key: 'containsOnly',
        value: function containsOnly(arrayValue, expectedInstance) {
            this.array(arrayValue);

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = arrayValue[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var element = _step.value;

                    try {
                        this.instanceOf(element, expectedInstance);
                    } catch (error) {
                        throw _Message2.default.expectedInstanceOf(expectedInstance.name, element);
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }

        /**
         * @param {int} expectedCount
         * @param {array} arrayValue
         */

    }, {
        key: 'count',
        value: function count(expectedCount, arrayValue) {
            this.integer(expectedCount);
            this.array(arrayValue);

            if (arrayValue.length !== expectedCount) {
                throw 'Expected count ' + expectedCount + ', got ' + arrayValue.length;
            }
        }

        /**
         * @param {*} value
         */

    }, {
        key: 'notEmpty',
        value: function notEmpty(value) {
            if (value.length === 0) {
                throw _Message2.default.expected("not empty value", value);
            }
        }

        /**
         * @param {int} integerValue
         */

    }, {
        key: 'oddNumber',
        value: function oddNumber(integerValue) {
            this.integer(integerValue);

            if (integerValue % 2 !== 1) {
                throw _Message2.default.expected("odd number", integerValue);
            }
        }

        /**
         * @param {int} integerValue
         */

    }, {
        key: 'evenNumber',
        value: function evenNumber(integerValue) {
            this.integer(integerValue);

            if (integerValue % 2 !== 0) {
                throw _Message2.default.expected("even number", integerValue);
            }
        }
    }]);

    return Assert;
}();

exports.default = Assert;
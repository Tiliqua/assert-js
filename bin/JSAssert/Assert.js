'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _InvalidValueException = require('./InvalidValueException');

var _InvalidValueException2 = _interopRequireDefault(_InvalidValueException);

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
         * @param {function} expectedInstance
         * @param {string} [message]
         */
        value: function instanceOf(objectValue, expectedInstance) {
            var message = arguments.length <= 2 || arguments[2] === undefined ? "" : arguments[2];

            this.string(message, "Custom error message passed to Assert.instanceOf needs to be a valid string.");

            if ((typeof objectValue === 'undefined' ? 'undefined' : _typeof(objectValue)) !== 'object') {
                throw _InvalidValueException2.default.expected("object", objectValue, message);
            }

            this.isFunction(expectedInstance, "Expected argument needs to be a valid class instead of that got \"${received}\". Most likely there is typo in class name or file with class is missing export declaration.");

            if (!(objectValue instanceof expectedInstance)) {
                throw _InvalidValueException2.default.expected(expectedInstance.name, objectValue, message.length ? message : "Expected instance of \"${expected}\" but got \"${received}\".");
            }
        }

        /**
         * @param {int} integerValue
         * @param {string} [message]
         */

    }, {
        key: 'integer',
        value: function integer(integerValue) {
            var message = arguments.length <= 1 || arguments[1] === undefined ? "" : arguments[1];

            this.string(message, "Custom error message passed to Assert.integer needs to be a valid string.");

            if (!Number.isInteger(integerValue)) {
                throw _InvalidValueException2.default.expected("integer", integerValue, message);
            }
        }

        /**
         * @param {number} numberValue
         * @param {string} [message]
         */

    }, {
        key: 'number',
        value: function number(numberValue) {
            var message = arguments.length <= 1 || arguments[1] === undefined ? "" : arguments[1];

            this.string(message, "Custom error message passed to Assert.number needs to be a valid string.");

            if (typeof numberValue !== 'number') {
                throw _InvalidValueException2.default.expected("number", numberValue);
            }
        }

        /**
         * @param {string} stringValue
         * @param {string} [message]
         */

    }, {
        key: 'string',
        value: function string(stringValue) {
            var message = arguments.length <= 1 || arguments[1] === undefined ? "" : arguments[1];

            if (typeof message !== "string") {
                throw "Custom error message passed to Assert.string needs to be a valid string.";
            }

            if (typeof stringValue !== "string") {
                throw _InvalidValueException2.default.expected("string", stringValue, message);
            }
        }

        /**
         * @param {boolean} booleanValue
         * @param {string} [message]
         */

    }, {
        key: 'boolean',
        value: function boolean(booleanValue) {
            var message = arguments.length <= 1 || arguments[1] === undefined ? "" : arguments[1];

            this.string(message, "Custom error message passed to Assert.boolean needs to be a valid string.");

            if (typeof booleanValue !== 'boolean') {
                throw _InvalidValueException2.default.expected("boolean", booleanValue, message);
            }
        }

        /**
         * @param {object} objectValue
         * @param {string} [message]
         */

    }, {
        key: 'object',
        value: function object(objectValue) {
            var message = arguments.length <= 1 || arguments[1] === undefined ? "" : arguments[1];

            this.string(message, "Custom error message passed to Assert.object needs to be a valid string.");

            if ((typeof objectValue === 'undefined' ? 'undefined' : _typeof(objectValue)) !== 'object') {
                throw _InvalidValueException2.default.expected("object", objectValue, message);
            }
        }

        /**
         * @param {string} expectedFunctionName
         * @param {object} objectValue
         * @param {string} [message]
         */

    }, {
        key: 'hasFunction',
        value: function hasFunction(expectedFunctionName, objectValue) {
            var message = arguments.length <= 2 || arguments[2] === undefined ? "" : arguments[2];

            this.string(expectedFunctionName);
            this.object(objectValue);
            this.string(message, "Custom error message passed to Assert.hasFunction needs to be a valid string.");

            if (typeof objectValue[expectedFunctionName] !== 'function') {
                throw _InvalidValueException2.default.expected('object to has function "' + expectedFunctionName + '"', objectValue, message);
            }
        }

        /**
         * @param {array} arrayValue
         * @param {string} [message]
         */

    }, {
        key: 'array',
        value: function array(arrayValue) {
            var message = arguments.length <= 1 || arguments[1] === undefined ? "" : arguments[1];

            this.string(message, "Custom error message passed to Assert.array needs to be a valid string.");

            if (!Array.isArray(arrayValue)) {
                throw _InvalidValueException2.default.expected("array", arrayValue, message);
            }
        }

        /**
         * @param {function} functionValue
         * @param {string} [message]
         */

    }, {
        key: 'isFunction',
        value: function isFunction(functionValue) {
            var message = arguments.length <= 1 || arguments[1] === undefined ? "" : arguments[1];

            this.string(message, "Custom error message passed to Assert.isFunction needs to be a valid string.");

            if (typeof functionValue !== 'function') {
                throw _InvalidValueException2.default.expected("function", functionValue, message);
            }
        }

        /**
         * @param {int} expected
         * @param {int} integerValue
         * @param {string} [message]
         */

    }, {
        key: 'greaterThan',
        value: function greaterThan(expected, integerValue) {
            var message = arguments.length <= 2 || arguments[2] === undefined ? "" : arguments[2];

            this.number(expected);
            this.number(integerValue);
            this.string(message, "Custom error message passed to Assert.greaterThan needs to be a valid string.");

            if (integerValue <= expected) {
                throw message.length > 0 ? message : 'Expected value ' + integerValue + ' to be greater than ' + expected;
            }
        }

        /**
         * @param {int} expected
         * @param {int} integerValue
         * @param {string} [message]
         */

    }, {
        key: 'greaterThanOrEqual',
        value: function greaterThanOrEqual(expected, integerValue) {
            var message = arguments.length <= 2 || arguments[2] === undefined ? "" : arguments[2];

            this.number(expected);
            this.number(integerValue);
            this.string(message, "Custom error message passed to Assert.greaterThanOrEqual needs to be a valid string.");

            if (integerValue < expected) {
                throw message.length > 0 ? message : 'Expected value ' + integerValue + ' to be greater than ' + expected + ' or equal';
            }
        }

        /**
         * @param {int} expected
         * @param {int} integerValue
         * @param {string} [message]
         */

    }, {
        key: 'lessThan',
        value: function lessThan(expected, integerValue) {
            var message = arguments.length <= 2 || arguments[2] === undefined ? "" : arguments[2];

            this.number(expected);
            this.number(integerValue);
            this.string(message, "Custom error message passed to Assert.lessThan needs to be a valid string.");

            if (integerValue >= expected) {
                throw message.length > 0 ? message : 'Expected value ' + integerValue + ' to be less than ' + expected;
            }
        }

        /**
         * @param {int} expected
         * @param {int} integerValue
         * @param {string} [message]
         */

    }, {
        key: 'lessThanOrEqual',
        value: function lessThanOrEqual(expected, integerValue) {
            var message = arguments.length <= 2 || arguments[2] === undefined ? "" : arguments[2];

            this.number(expected);
            this.number(integerValue);
            this.string(message, "Custom error message passed to Assert.lessThanOrEqual needs to be a valid string.");

            if (integerValue > expected) {
                throw message.length > 0 ? message : 'Expected value ' + integerValue + ' to be less than ' + expected + ' or equal';
            }
        }

        /**
         * @param {array} arrayValue
         * @param {function} expectedInstance
         * @param {string} [message]
         */

    }, {
        key: 'containsOnly',
        value: function containsOnly(arrayValue, expectedInstance) {
            var message = arguments.length <= 2 || arguments[2] === undefined ? "" : arguments[2];

            this.array(arrayValue, "Assert.containsOnly require valid array, got \"${received}\".");
            this.string(message, "Custom error message passed to Assert.containsOnly needs to be a valid string.");

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = arrayValue[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var element = _step.value;

                    try {
                        this.instanceOf(element, expectedInstance, message);
                    } catch (error) {
                        throw _InvalidValueException2.default.expected(expectedInstance.name, element, message.length ? message : "Expected instance of \"${expected}\" but got \"${received}\".");
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
         * @param {string} [message]
         */

    }, {
        key: 'count',
        value: function count(expectedCount, arrayValue) {
            var message = arguments.length <= 2 || arguments[2] === undefined ? "" : arguments[2];

            this.integer(expectedCount);
            this.array(arrayValue);
            this.string(message, "Custom error message passed to Assert.count needs to be a valid string.");

            if (arrayValue.length !== expectedCount) {
                throw message.length ? message : 'Expected count ' + expectedCount + ', got ' + arrayValue.length;
            }
        }

        /**
         * @param {*} value
         * @param {string} [message]
         */

    }, {
        key: 'notEmpty',
        value: function notEmpty(value) {
            var message = arguments.length <= 1 || arguments[1] === undefined ? "" : arguments[1];

            this.string(message, "Custom error message passed to Assert.empty needs to be a valid string.");

            if (value.length === 0) {
                throw _InvalidValueException2.default.expected("not empty value", value, message);
            }
        }

        /**
         * @param {int} integerValue
         * @param {string} [message]
         */

    }, {
        key: 'oddNumber',
        value: function oddNumber(integerValue) {
            var message = arguments.length <= 1 || arguments[1] === undefined ? "" : arguments[1];

            this.integer(integerValue);
            this.string(message, "Custom error message passed to Assert.oddNumber needs to be a valid string.");

            if (integerValue % 2 !== 1) {
                throw _InvalidValueException2.default.expected("odd number", integerValue, message);
            }
        }

        /**
         * @param {int} integerValue
         * @param {string} [message]
         */

    }, {
        key: 'evenNumber',
        value: function evenNumber(integerValue) {
            var message = arguments.length <= 1 || arguments[1] === undefined ? "" : arguments[1];

            this.integer(integerValue);
            this.string(message, "Custom error message passed to Assert.evenNumber needs to be a valid string.");

            if (integerValue % 2 !== 0) {
                throw _InvalidValueException2.default.expected("even number", integerValue, message);
            }
        }

        /**
         * @param {string} stringValue
         * @param {string} [message]
         */

    }, {
        key: 'jsonString',
        value: function jsonString(stringValue) {
            var message = arguments.length <= 1 || arguments[1] === undefined ? "" : arguments[1];

            this.string(stringValue);
            this.string(message, "Custom error message passed to Assert.jsonString needs to be a valid string.");

            try {
                JSON.parse(stringValue);
            } catch (e) {
                throw _InvalidValueException2.default.expected("json string", stringValue, message);
            }
        }
    }]);

    return Assert;
}();

exports.default = Assert;
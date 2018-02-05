'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MessageFactory = require('./MessageFactory');
var ValueConverter = require('./ValueConverter');

var InvalidValueException = function () {
    function InvalidValueException() {
        _classCallCheck(this, InvalidValueException);
    }

    _createClass(InvalidValueException, null, [{
        key: 'expected',

        /**
         * @param {string} type
         * @param {*} value
         * @param {string} [message]
         * @returns {Error}
         */
        value: function expected(type, value) {
            var message = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";

            if (typeof message !== 'string') {
                throw new Error('Expected string but got "' + ValueConverter.toString(message) + '".');
            }

            if (message.length) {
                return new Error(MessageFactory.create(message, { expected: type, received: ValueConverter.toString(value) }));
            }

            return new Error('Expected ' + type + ' but got "' + ValueConverter.toString(value) + '".');
        }
    }]);

    return InvalidValueException;
}();

module.exports = InvalidValueException;
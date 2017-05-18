'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Assert = require('./Assert');

var _Assert2 = _interopRequireDefault(_Assert);

var _MessageFactory = require('./MessageFactory');

var _MessageFactory2 = _interopRequireDefault(_MessageFactory);

var _ValueConverter = require('./ValueConverter');

var _ValueConverter2 = _interopRequireDefault(_ValueConverter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
         * @returns {string}
         */
        value: function expected(type, value) {
            var message = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";

            _Assert2.default.string(message);

            if (message.length) {
                return _MessageFactory2.default.create(message, { expected: type, received: _ValueConverter2.default.toString(value) });
            }

            return 'Expected ' + type + ' but got "' + _ValueConverter2.default.toString(value) + '".';
        }
    }]);

    return InvalidValueException;
}();

exports.default = InvalidValueException;
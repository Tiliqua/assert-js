'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MessageFactory = require('./MessageFactory');

var ValueConverter = require('./ValueConverter');

var InvalidValueException =
/*#__PURE__*/
function () {
  function InvalidValueException() {
    _classCallCheck(this, InvalidValueException);
  }

  _createClass(InvalidValueException, null, [{
    key: "expected",

    /**
     * @param {string} type
     * @param {*} value
     * @param {string} [message]
     * @returns {Error}
     */
    value: function expected(type, value) {
      var message = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";

      if (typeof message !== 'string') {
        throw new Error("Expected string but got \"".concat(ValueConverter.toString(message), "\"."));
      }

      if (message.length) {
        return new Error(MessageFactory.create(message, {
          expected: type,
          received: ValueConverter.toString(value)
        }));
      }

      return new Error("Expected ".concat(type, " but got \"").concat(ValueConverter.toString(value), "\"."));
    }
  }]);

  return InvalidValueException;
}();

module.exports = InvalidValueException;
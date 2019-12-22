'use strict';

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ValueConverter =
/*#__PURE__*/
function () {
  function ValueConverter() {
    _classCallCheck(this, ValueConverter);
  }

  _createClass(ValueConverter, null, [{
    key: "toString",

    /**
     * @param {*} value
     * @returns {string}
     */
    value: function toString(value) {
      if (typeof value === 'string') {
        return "string[\"".concat(value, "\"]");
      }

      if (typeof value === 'number') {
        if (Number.isInteger(value)) {
          return "int[".concat(value, "]");
        }

        return "float[".concat(value, "]");
      }

      if (typeof value === 'boolean') {
        return "boolean[".concat(value ? "true" : "false", "]");
      }

      if (typeof value === 'function') {
        return "function[".concat(value.toString(), "]");
      }

      if (_typeof(value) === 'object') {
        if (Array.isArray(value)) {
          return "array[length: ".concat(value.length, "]");
        }

        if (value instanceof Map) {
          return "Map[size: ".concat(value.size, "]");
        }

        if (value instanceof WeakMap) {
          return "WeakMap[]";
        }

        if (value instanceof Set) {
          return "Set[size: ".concat(value.size, "]");
        }

        if (value instanceof WeakSet) {
          return "WeakSet[]";
        }

        if (value instanceof String) {
          return "String[\"".concat(value, "\"]");
        }

        if (value instanceof Number) {
          var source = value.valueOf();

          if (Number.isInteger(source)) {
            return "Number:int[".concat(source, "]");
          }

          return "Number:float[".concat(source, "]");
        }

        if (value instanceof Boolean) {
          return "Boolean[".concat(value.valueOf() ? "true" : "false", "]");
        }

        if (value instanceof Date) {
          return "Date[\"".concat(value.toUTCString(), "\"]");
        }

        if (value instanceof RegExp) {
          return "RegExp[".concat(value.toString(), "]");
        }

        return "object[".concat(JSON.stringify(value), "]");
      }

      if (typeof value === 'undefined') {
        return 'undefined';
      }

      throw "Unhandled type ".concat(_typeof(value));
    }
  }]);

  return ValueConverter;
}();

module.exports = ValueConverter;
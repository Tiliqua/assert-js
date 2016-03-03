'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Message = function () {
    function Message() {
        _classCallCheck(this, Message);
    }

    _createClass(Message, null, [{
        key: 'expected',
        value: function expected(type, value) {
            return 'Expected ' + type + ' but got "' + this.castToString(value) + '".';
        }
    }, {
        key: 'expectedInstanceOf',
        value: function expectedInstanceOf(instance, value) {
            return 'Expected instance of "' + instance + '" but got "' + this.castToString(value) + '".';
        }
    }, {
        key: 'castToString',
        value: function castToString(value) {
            if (typeof value === 'string') {
                return 'string["' + value + '"]';
            }

            if (typeof value === 'number') {
                if (Number.isInteger(value)) {
                    return 'int[' + value + ']';
                }

                return 'float[' + value + ']';
            }

            if (typeof value === 'boolean') {
                return 'boolean[' + (value ? "true" : "false") + ']';
            }

            if (typeof value === 'function') {
                return 'function[' + value.toString() + ']';
            }

            if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
                if (Array.isArray(value)) {
                    return 'array[length: ' + value.length + ']';
                }

                if (value instanceof Map) {
                    return 'Map[size: ' + value.size + ']';
                }

                if (value instanceof WeakMap) {
                    return 'WeakMap[]';
                }

                if (value instanceof Set) {
                    return 'Set[size: ' + value.size + ']';
                }

                if (value instanceof WeakSet) {
                    return 'WeakSet[]';
                }

                if (value instanceof String) {
                    return 'String["' + value + '"]';
                }

                if (value instanceof Number) {
                    var source = value.valueOf();

                    if (Number.isInteger(source)) {
                        return 'Number:int[' + source + ']';
                    }

                    return 'Number:float[' + source + ']';
                }

                if (value instanceof Boolean) {
                    return 'Boolean[' + (value.valueOf() ? "true" : "false") + ']';
                }

                if (value instanceof Date) {
                    return 'Date["' + value.toString() + '"]';
                }

                if (value instanceof RegExp) {
                    return 'RegExp[' + value.toString() + ']';
                }

                return 'object[' + JSON.stringify(value) + ']';
            }

            if (typeof value === 'undefined') {
                return 'undefined';
            }

            throw 'Unhandled type ' + (typeof value === 'undefined' ? 'undefined' : _typeof(value));
        }
    }]);

    return Message;
}();

exports.default = Message;
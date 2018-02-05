'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VALUE_NAME_REGEXP = /\${(.*?)}/g;

var MessageFactory = function () {
    function MessageFactory() {
        _classCallCheck(this, MessageFactory);
    }

    _createClass(MessageFactory, null, [{
        key: 'create',

        /**
         * @param {string} template
         * @param {object} [data]
         */
        value: function create(template) {
            var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            if (typeof template !== 'string') {
                throw new Error('Expected string but got "' + ValueConverter.toString(template) + '".');
            }

            if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) !== 'object') {
                throw new Error('Expected string but got "' + ValueConverter.toString(data) + '".');
            }

            return template.replace(VALUE_NAME_REGEXP, function (placeholder, propertyName) {
                if (data.hasOwnProperty(propertyName)) {
                    return data[propertyName];
                }

                return placeholder;
            });
        }
    }]);

    return MessageFactory;
}();

module.exports = MessageFactory;
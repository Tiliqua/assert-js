'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Assert = require('./Assert');

var _Assert2 = _interopRequireDefault(_Assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

            _Assert2.default.string(template);
            _Assert2.default.object(data);

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

exports.default = MessageFactory;
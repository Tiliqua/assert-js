'use strict';

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var InvalidValueException = require('./InvalidValueException');

var ValueConverter = require('./ValueConverter');

var Assert =
/*#__PURE__*/
function () {
  function Assert() {
    _classCallCheck(this, Assert);
  }

  _createClass(Assert, null, [{
    key: "instanceOf",

    /**
     * @param {object} objectValue
     * @param {function} expectedInstance
     * @param {string} [message]
     */
    value: function instanceOf(objectValue, expectedInstance) {
      var message = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
      this.string(message, "Custom error message passed to Assert.instanceOf needs to be a valid string.");

      if (_typeof(objectValue) !== 'object') {
        throw InvalidValueException.expected("object", objectValue, message);
      }

      if (!(objectValue instanceof expectedInstance)) {
        throw InvalidValueException.expected(expectedInstance.name, objectValue, message.length ? message : "Expected instance of \"${expected}\" but got \"${received}\".");
      }
    }
  }, {
    key: "instanceOneOf",
    value: function instanceOneOf(objectValue, expectedInstances) {
      var message = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
      this.string(message, "Custom error message passed to Assert.instanceOf needs to be a valid string.");
      this.array(expectedInstances);
      var instance = expectedInstances.find(function (expectedInstance) {
        return objectValue instanceof expectedInstance;
      });

      if (instance === undefined) {
        throw InvalidValueException.expected(expectedInstances.map(function (instance) {
          return ValueConverter.toString(instance);
        }).join(', '), objectValue, message.length ? message : "Expected instance of \"${expected}\" but got \"${received}\".");
      }
    }
    /**
     * @param {int} integerValue
     * @param {string} [message]
     */

  }, {
    key: "integer",
    value: function integer(integerValue) {
      var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
      this.string(message, "Custom error message passed to Assert.integer needs to be a valid string.");

      if (!Number.isInteger(integerValue)) {
        throw InvalidValueException.expected("integer", integerValue, message);
      }
    }
    /**
     * @param {number} numberValue
     * @param {string} [message]
     */

  }, {
    key: "number",
    value: function number(numberValue) {
      var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
      this.string(message, "Custom error message passed to Assert.number needs to be a valid string.");

      if (typeof numberValue !== 'number') {
        throw InvalidValueException.expected("number", numberValue);
      }
    }
    /**
     * @param {string} stringValue
     * @param {string} [message]
     */

  }, {
    key: "string",
    value: function string(stringValue) {
      var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

      if (typeof message !== "string") {
        throw new Error("Custom error message passed to Assert.string needs to be a valid string.");
      }

      if (typeof stringValue !== "string") {
        throw InvalidValueException.expected("string", stringValue, message);
      }
    }
    /**
     * @param {boolean} booleanValue
     * @param {string} [message]
     */

  }, {
    key: "boolean",
    value: function boolean(booleanValue) {
      var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
      this.string(message, "Custom error message passed to Assert.boolean needs to be a valid string.");

      if (typeof booleanValue !== 'boolean') {
        throw InvalidValueException.expected("boolean", booleanValue, message);
      }
    }
    /**
     * @param {boolean} value
     * @param {string} [message]
     */

  }, {
    key: "true",
    value: function _true(value) {
      var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
      this["boolean"](value);
      this.string(message, "Custom error message passed to Assert.true needs to be a valid string.");

      if (value !== true) {
        throw InvalidValueException.expected("true", value, message);
      }
    }
    /**
     * @param {boolean} value
     * @param {string} [message]
     */

  }, {
    key: "false",
    value: function _false(value) {
      var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
      this["boolean"](value);
      this.string(message, "Custom error message passed to Assert.false needs to be a valid string.");

      if (value !== false) {
        throw InvalidValueException.expected("false", value, message);
      }
    }
    /**
     * @param value
     * @param expectedValue
     * @param {string} [message]
     */

  }, {
    key: "equal",
    value: function equal(value, expectedValue) {
      var message = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";

      if (_typeof(value) !== 'object') {
        this["true"](value === expectedValue, message ? message : "Expected value ".concat(ValueConverter.toString(value), " to be equals ").concat(ValueConverter.toString(expectedValue), " but it's not."));
      } else {
        this.objectEqual(value, expectedValue, message ? message : "Expected value ".concat(ValueConverter.toString(value), " to be equals ").concat(ValueConverter.toString(expectedValue), " but it's not."));
      }
    }
    /**
     * @param {object} object
     * @param {object} expectedObject
     * @param {string} [message]
     */

  }, {
    key: "objectEqual",
    value: function objectEqual(object, expectedObject) {
      var _this = this;

      var message = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
      this.object(object, message);
      this.object(expectedObject, message);
      var objectProperties = Object.getOwnPropertyNames(object);
      var expectedObjectProperties = Object.getOwnPropertyNames(expectedObject);
      this["true"](objectProperties.length === expectedObjectProperties.length, message ? message : "Expected object ".concat(ValueConverter.toString(object), " to be equals ").concat(ValueConverter.toString(expectedObject), " but it's not."));
      objectProperties.forEach(function (objectProperty) {
        _this.equal(object[objectProperty], expectedObject[objectProperty], message ? message : "Expected object ".concat(ValueConverter.toString(object), " to be equals ").concat(ValueConverter.toString(expectedObject), " but it's not."));
      });
    }
    /**
     * @param {object} objectValue
     * @param {string} [message]
     */

  }, {
    key: "object",
    value: function object(objectValue) {
      var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
      this.string(message, "Custom error message passed to Assert.object needs to be a valid string.");

      if (_typeof(objectValue) !== 'object') {
        throw InvalidValueException.expected("object", objectValue, message);
      }
    }
    /**
     * @param {string} expectedFunctionName
     * @param {object} objectValue
     * @param {string} [message]
     */

  }, {
    key: "hasFunction",
    value: function hasFunction(expectedFunctionName, objectValue) {
      var message = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
      this.string(expectedFunctionName);
      this.object(objectValue);
      this.string(message, "Custom error message passed to Assert.hasFunction needs to be a valid string.");

      if (typeof objectValue[expectedFunctionName] !== 'function') {
        throw InvalidValueException.expected("object to has function \"".concat(expectedFunctionName, "\""), objectValue, message);
      }
    }
    /**
     * @param {string} expectedPropertyName
     * @param {object} objectValue
     * @param {string} [message]
     */

  }, {
    key: "hasProperty",
    value: function hasProperty(expectedPropertyName, objectValue) {
      var message = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
      this.string(expectedPropertyName);
      this.object(objectValue);
      this.string(message, "Custom error message passed to Assert.hasProperty needs to be a valid string.");

      if (typeof objectValue[expectedPropertyName] === 'undefined') {
        throw InvalidValueException.expected("object to has property \"".concat(expectedPropertyName, "\""), objectValue, message);
      }
    }
    /**
     * @param {array} expectedProperties
     * @param {object} objectValue
     * @param {string} [message]
     */

  }, {
    key: "hasProperties",
    value: function hasProperties(expectedProperties, objectValue) {
      var message = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
      this.object(objectValue);
      this.containsOnlyString(expectedProperties);
      this.string(message, "Custom error message passed to Assert.hasProperties needs to be a valid string.");
      expectedProperties.map(function (expectedProperty) {
        if (typeof objectValue[expectedProperty] === 'undefined') {
          throw InvalidValueException.expected("object to has properties \"".concat(expectedProperties.join(', '), "\""), objectValue, message);
        }
      });
    }
    /**
     * @param {array} arrayValue
     * @param {string} [message]
     */

  }, {
    key: "array",
    value: function array(arrayValue) {
      var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
      this.string(message, "Custom error message passed to Assert.array needs to be a valid string.");

      if (!Array.isArray(arrayValue)) {
        throw InvalidValueException.expected("array", arrayValue, message);
      }
    }
    /**
     * @param {*} value
     * @param {array} expectedElements
     * @param {string} [message]
     */

  }, {
    key: "oneOf",
    value: function oneOf(value, expectedElements) {
      var message = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
      this.string(message, "Custom error message passed to Assert.array needs to be a valid string.");
      this.array(expectedElements);
      var foundValue = expectedElements.find(function (expectedInstance) {
        return value === expectedInstance;
      });

      if (foundValue === undefined) {
        throw InvalidValueException.expected(expectedElements.map(function (elemenet) {
          return ValueConverter.toString(elemenet);
        }).join(', '), value, message.length ? message : "Expected one of \"${expected}\" but got \"${received}\".");
      }
    }
    /**
     * @param {function} functionValue
     * @param {string} [message]
     */

  }, {
    key: "isFunction",
    value: function isFunction(functionValue) {
      var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
      this.string(message, "Custom error message passed to Assert.isFunction needs to be a valid string.");

      if (typeof functionValue !== 'function') {
        throw InvalidValueException.expected("function", functionValue, message);
      }
    }
    /**
     * @param {int} expected
     * @param {int} integerValue
     * @param {string} [message]
     */

  }, {
    key: "greaterThan",
    value: function greaterThan(expected, integerValue) {
      var message = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
      this.number(expected);
      this.number(integerValue);
      this.string(message, "Custom error message passed to Assert.greaterThan needs to be a valid string.");

      if (integerValue <= expected) {
        throw new Error(message.length > 0 ? message : "Expected value ".concat(integerValue, " to be greater than ").concat(expected));
      }
    }
    /**
     * @param {int} expected
     * @param {int} integerValue
     * @param {string} [message]
     */

  }, {
    key: "greaterThanOrEqual",
    value: function greaterThanOrEqual(expected, integerValue) {
      var message = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
      this.number(expected);
      this.number(integerValue);
      this.string(message, "Custom error message passed to Assert.greaterThanOrEqual needs to be a valid string.");

      if (integerValue < expected) {
        throw new Error(message.length > 0 ? message : "Expected value ".concat(integerValue, " to be greater than ").concat(expected, " or equal"));
      }
    }
    /**
     * @param {int} expected
     * @param {int} integerValue
     * @param {string} [message]
     */

  }, {
    key: "lessThan",
    value: function lessThan(expected, integerValue) {
      var message = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
      this.number(expected);
      this.number(integerValue);
      this.string(message, "Custom error message passed to Assert.lessThan needs to be a valid string.");

      if (integerValue >= expected) {
        throw new Error(message.length > 0 ? message : "Expected value ".concat(integerValue, " to be less than ").concat(expected));
      }
    }
    /**
     * @param {int} expected
     * @param {int} integerValue
     * @param {string} [message]
     */

  }, {
    key: "lessThanOrEqual",
    value: function lessThanOrEqual(expected, integerValue) {
      var message = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
      this.number(expected);
      this.number(integerValue);
      this.string(message, "Custom error message passed to Assert.lessThanOrEqual needs to be a valid string.");

      if (integerValue > expected) {
        throw new Error(message.length > 0 ? message : "Expected value ".concat(integerValue, " to be less than ").concat(expected, " or equal"));
      }
    }
    /**
     * @param {array} arrayValue
     * @param {function} expectedInstance
     * @param {string} [message]
     */

  }, {
    key: "containsOnly",
    value: function containsOnly(arrayValue, expectedInstance) {
      var message = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
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
            throw InvalidValueException.expected(expectedInstance.name, element, message.length ? message : "Expected instance of \"${expected}\" but got \"${received}\".");
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
    /**
     * @param {array} arrayValue
     * @param {string} [message]
     */

  }, {
    key: "containsOnlyString",
    value: function containsOnlyString(arrayValue) {
      var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
      this.array(arrayValue, "Assert.containsOnlyString require valid array, got \"${received}\".");
      this.string(message, "Custom error message passed to Assert.containsOnly needs to be a valid string.");
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = arrayValue[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var element = _step2.value;

          try {
            this.string(element, message);
          } catch (error) {
            throw InvalidValueException.expected('string', arrayValue.map(function (value) {
              return ValueConverter.toString(value);
            }).join(', '), message.length ? message : "Expected array of \"${expected}\" but got \"${received}\".");
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
    /**
     * @param {array} arrayValue
     * @param {string} [message]
     */

  }, {
    key: "containsOnlyInteger",
    value: function containsOnlyInteger(arrayValue) {
      var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
      this.array(arrayValue, "Assert.containsOnlyInteger require valid array, got \"${received}\".");
      this.string(message, "Custom error message passed to Assert.containsOnly needs to be a valid string.");
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = arrayValue[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var element = _step3.value;

          try {
            this.integer(element, message);
          } catch (error) {
            throw InvalidValueException.expected('integer', arrayValue.map(function (value) {
              return ValueConverter.toString(value);
            }).join(', '), message.length ? message : "Expected array of \"${expected}\" but got \"${received}\".");
          }
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
            _iterator3["return"]();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }
    }
    /**
     * @param {array} arrayValue
     * @param {string} [message]
     */

  }, {
    key: "containsOnlyNumber",
    value: function containsOnlyNumber(arrayValue) {
      var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
      this.array(arrayValue, "Assert.containsOnlyNumber require valid array, got \"${received}\".");
      this.string(message, "Custom error message passed to Assert.containsOnly needs to be a valid string.");
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = arrayValue[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var element = _step4.value;

          try {
            this.number(element, message);
          } catch (error) {
            throw InvalidValueException.expected('number', arrayValue.map(function (value) {
              return ValueConverter.toString(value);
            }).join(', '), message.length ? message : "Expected array of \"${expected}\" but got \"${received}\".");
          }
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
            _iterator4["return"]();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
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
    key: "count",
    value: function count(expectedCount, arrayValue) {
      var message = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
      this.integer(expectedCount);
      this.array(arrayValue);
      this.string(message, "Custom error message passed to Assert.count needs to be a valid string.");

      if (arrayValue.length !== expectedCount) {
        throw new Error(message.length ? message : "Expected count ".concat(expectedCount, ", got ").concat(arrayValue.length));
      }
    }
    /**
     * @param {*} value
     * @param {string} [message]
     */

  }, {
    key: "notEmpty",
    value: function notEmpty(value) {
      var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
      this.string(message, "Custom error message passed to Assert.empty needs to be a valid string.");

      if (value.length === 0) {
        throw InvalidValueException.expected("not empty value", value, message);
      }
    }
    /**
     * @param {int} integerValue
     * @param {string} [message]
     */

  }, {
    key: "oddNumber",
    value: function oddNumber(integerValue) {
      var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
      this.integer(integerValue);
      this.string(message, "Custom error message passed to Assert.oddNumber needs to be a valid string.");

      if (integerValue % 2 !== 1) {
        throw InvalidValueException.expected("odd number", integerValue, message);
      }
    }
    /**
     * @param {int} integerValue
     * @param {string} [message]
     */

  }, {
    key: "evenNumber",
    value: function evenNumber(integerValue) {
      var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
      this.integer(integerValue);
      this.string(message, "Custom error message passed to Assert.evenNumber needs to be a valid string.");

      if (integerValue % 2 !== 0) {
        throw InvalidValueException.expected("even number", integerValue, message);
      }
    }
    /**
     * @param {string} stringValue
     * @param {string} [message]
     */

  }, {
    key: "jsonString",
    value: function jsonString(stringValue) {
      var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
      this.string(stringValue);
      this.string(message, "Custom error message passed to Assert.jsonString needs to be a valid string.");

      try {
        JSON.parse(stringValue);
      } catch (e) {
        throw InvalidValueException.expected("json string", stringValue, message);
      }
    }
    /**
     * @param {string} emailValue
     * @param {string} [message]
     */

  }, {
    key: "email",
    value: function email(emailValue) {
      var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
      this.string(emailValue);
      this.string(message, "Custom error message passed to Assert.email needs to be a valid string.");
      var regexp = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;

      if (!regexp.test(emailValue)) {
        throw InvalidValueException.expected("valid email address", emailValue, message);
      }
    }
    /**
     * @param {string} urlValue
     * @param {string} [message]
     */

  }, {
    key: "url",
    value: function url(urlValue) {
      var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
      this.string(urlValue);
      this.string(message, "Custom error message passed to Assert.url needs to be a valid string.");
      var regexp = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;

      if (!regexp.test(urlValue)) {
        throw InvalidValueException.expected("valid url", urlValue, message);
      }
    }
    /**
     * @param {string} uuidValue
     * @param {string} [message]
     */

  }, {
    key: "uuid",
    value: function uuid(uuidValue) {
      var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
      this.string(uuidValue);
      this.string(message, "Custom error message passed to Assert.uuid needs to be a valid string.");
      var regexp = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

      if (!regexp.test(uuidValue)) {
        throw InvalidValueException.expected("valid uuid", uuidValue, message);
      }
    }
    /**
     * @param {string} selector
     * @param {HTMLElement|HTMLDocument} htmlElement
     * @param {string} [message]
     */

  }, {
    key: "hasElement",
    value: function hasElement(selector, htmlElement) {
      var message = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
      this.string(selector);
      this.instanceOneOf(htmlElement, [HTMLElement, HTMLDocument]);
      this.string(message, "Custom error message passed to Assert.hasProperty needs to be a valid string.");

      if (null === htmlElement.querySelector(selector)) {
        throw InvalidValueException.expected("html element to has element under selector \"".concat(selector, "\""), htmlElement.outerHTML, message);
      }
    }
    /**
     * @param {string} attributeName
     * @param {HTMLElement} htmlElement
     * @param {string} [message]
     */

  }, {
    key: "hasAttribute",
    value: function hasAttribute(attributeName, htmlElement) {
      var message = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
      this.string(attributeName);
      this.instanceOf(htmlElement, HTMLElement);
      this.string(message, "Custom error message passed to Assert.hasAttribute needs to be a valid string.");
      var attribute = htmlElement.getAttribute(attributeName);

      if (null === attribute) {
        throw InvalidValueException.expected("html element with attribute \"".concat(attributeName, "\""), htmlElement.outerHTML, message);
      }
    }
    /**
     * @param {array} attributes
     * @param {HTMLElement} htmlElement
     * @param {string} [message]
     */

  }, {
    key: "hasAttributes",
    value: function hasAttributes(attributes, htmlElement) {
      var _this2 = this;

      var message = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
      this.containsOnlyString(attributes);
      this.instanceOf(htmlElement, HTMLElement);
      this.string(message, "Custom error message passed to Assert.hasAttributes needs to be a valid string.");
      attributes.map(function (attribute) {
        try {
          _this2.hasAttribute(attribute, htmlElement);
        } catch (e) {
          throw InvalidValueException.expected("html element with attributes \"".concat(attributes.join(', '), "\""), htmlElement.outerHTML, message);
        }
      });
    }
    /**
     * @param {function} callback
     * @param {object} [expectedError]
     */

  }, {
    key: "throws",
    value: function throws(callback) {
      var expectedError = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Error();
      this.isFunction(callback);

      try {
        callback();
      } catch (error) {
        if (_typeof(error) === 'object' && error instanceof Error && _typeof(expectedError) === 'object' && expectedError instanceof Error) {
          if (expectedError.message.length) {
            this.equal(error.message, expectedError.message, "Expected exception message \"".concat(error.message, "\" to be equals \"").concat(expectedError.message, "\" but it's not."));
          }

          return;
        }

        this.equal(error, expectedError, "Expected error of type ".concat(ValueConverter.toString(error), " to be equals ").concat(ValueConverter.toString(expectedError), " but it's not."));
        return;
      }

      throw InvalidValueException.expected(ValueConverter.toString(expectedError), null, "Expected from callback to throw an Error \"${expected}\" but it didn't.");
    }
  }]);

  return Assert;
}();

module.exports = Assert;
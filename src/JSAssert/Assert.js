'use strict';

import InvalidValueException from './InvalidValueException';

export default class Assert
{
    /**
     * @param {object} objectValue
     * @param {function} instance
     * @param {string} [message]
     */
    static instanceOf(objectValue, instance, message = "")
    {
        this.string(message, "Custom error message passed to Assert.instanceOf needs to be a valid string.");

        if (typeof objectValue !== 'object') {
            throw InvalidValueException.expected("object", objectValue, message);
        }

        if (!(objectValue instanceof instance)) {
            throw InvalidValueException.expected(
                instance.name,
                objectValue,
                message.length ? message : "Expected instance of \"${expected}\" but got \"${received}\"."
            );
        }
    }

    /**
     * @param {int} integerValue
     * @param {string} [message]
     */
    static integer(integerValue, message = "")
    {
        this.string(message, "Custom error message passed to Assert.integer needs to be a valid string.");

        if (!Number.isInteger(integerValue)) {
            throw InvalidValueException.expected("integer", integerValue, message);
        }
    }

    /**
     * @param {number} numberValue
     * @param {string} [message]
     */
    static number(numberValue, message = "")
    {
        this.string(message, "Custom error message passed to Assert.number needs to be a valid string.");

        if (typeof numberValue !== 'number') {
            throw InvalidValueException.expected("number", numberValue);
        }
    }

    /**
     * @param {string} stringValue
     * @param {string} [message]
     */
    static string(stringValue, message = "")
    {
        if (typeof message !== "string") {
            throw "Custom error message passed to Assert.string needs to be a valid string.";
        }

        if (typeof stringValue !== "string") {
            throw InvalidValueException.expected("string", stringValue, message);
        }
    }

    /**
     * @param {boolean} booleanValue
     * @param {string} [message]
     */
    static boolean(booleanValue, message = "")
    {
        this.string(message, "Custom error message passed to Assert.boolean needs to be a valid string.");

        if (typeof booleanValue !== 'boolean') {
            throw InvalidValueException.expected("boolean", booleanValue, message);
        }
    }

    /**
     * @param {object} objectValue
     * @param {string} [message]
     */
    static object(objectValue, message = "")
    {
        this.string(message, "Custom error message passed to Assert.object needs to be a valid string.");

        if (typeof objectValue !== 'object') {
            throw InvalidValueException.expected("object", objectValue, message);
        }
    }

    /**
     * @param {string} expectedFunctionName
     * @param {object} objectValue
     * @param {string} [message]
     */
    static hasFunction(expectedFunctionName, objectValue, message = "")
    {
        this.string(expectedFunctionName);
        this.object(objectValue);
        this.string(message, "Custom error message passed to Assert.hasFunction needs to be a valid string.");

        if (typeof objectValue[expectedFunctionName] !== 'function') {
            throw InvalidValueException.expected(`object to has function "${expectedFunctionName}"`, objectValue, message);
        }
    }

    /**
     * @param {array} arrayValue
     * @param {string} [message]
     */
    static array(arrayValue, message = "")
    {
        this.string(message, "Custom error message passed to Assert.array needs to be a valid string.");

        if (!Array.isArray(arrayValue)) {
            throw InvalidValueException.expected("array", arrayValue, message);
        }
    }

    /**
     * @param {function} functionValue
     * @param {string} [message]
     */
    static isFunction(functionValue, message = "")
    {
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
    static greaterThan(expected, integerValue, message = "")
    {
        this.number(expected);
        this.number(integerValue);
        this.string(message, "Custom error message passed to Assert.greaterThan needs to be a valid string.");

        if (integerValue <= expected) {
            throw message.length > 0 ? message : `Expected value ${integerValue} to be greater than ${expected}`;
        }
    }

    /**
     * @param {int} expected
     * @param {int} integerValue
     * @param {string} [message]
     */
    static greaterThanOrEqual(expected, integerValue, message = "")
    {
        this.number(expected);
        this.number(integerValue);
        this.string(message, "Custom error message passed to Assert.greaterThanOrEqual needs to be a valid string.");

        if (integerValue < expected) {
            throw message.length > 0 ? message : `Expected value ${integerValue} to be greater than ${expected} or equal`;
        }
    }

    /**
     * @param {int} expected
     * @param {int} integerValue
     * @param {string} [message]
     */
    static lessThan(expected, integerValue, message = "")
    {
        this.number(expected);
        this.number(integerValue);
        this.string(message, "Custom error message passed to Assert.lessThan needs to be a valid string.");

        if (integerValue >= expected) {
            throw message.length > 0 ? message : `Expected value ${integerValue} to be less than ${expected}`;
        }
    }

    /**
     * @param {int} expected
     * @param {int} integerValue
     * @param {string} [message]
     */
    static lessThanOrEqual(expected, integerValue, message = "")
    {
        this.number(expected);
        this.number(integerValue);
        this.string(message, "Custom error message passed to Assert.lessThanOrEqual needs to be a valid string.");

        if (integerValue > expected) {
            throw message.length > 0 ? message : `Expected value ${integerValue} to be less than ${expected} or equal`;
        }
    }

    /**
     * @param {array} arrayValue
     * @param {function} expectedInstance
     * @param {string} [message]
     */
    static containsOnly(arrayValue, expectedInstance, message = "")
    {
        this.array(arrayValue, "Assert.containsOnly require valid array, got \"${received}\".");
        this.string(message, "Custom error message passed to Assert.containsOnly needs to be a valid string.");

        for (let element of arrayValue) {
            try {
                this.instanceOf(element, expectedInstance, message);
            } catch (error) {
                throw InvalidValueException.expected(
                    expectedInstance.name,
                    element,
                    message.length ? message : "Expected instance of \"${expected}\" but got \"${received}\"."
                );
            }
        }
    }

    /**
     * @param {int} expectedCount
     * @param {array} arrayValue
     * @param {string} [message]
     */
    static count(expectedCount, arrayValue, message = "")
    {
        this.integer(expectedCount);
        this.array(arrayValue);
        this.string(message, "Custom error message passed to Assert.count needs to be a valid string.");

        if (arrayValue.length !== expectedCount) {
            throw message.length ? message : `Expected count ${expectedCount}, got ${arrayValue.length}`;
        }
    }

    /**
     * @param {*} value
     * @param {string} [message]
     */
    static notEmpty(value, message = "")
    {
        this.string(message, "Custom error message passed to Assert.empty needs to be a valid string.");

        if (value.length === 0) {
            throw InvalidValueException.expected("not empty value", value, message);
        }
    }


    /**
     * @param {int} integerValue
     * @param {string} [message]
     */
    static oddNumber(integerValue, message = "")
    {
        this.integer(integerValue);
        this.string(message, "Custom error message passed to Assert.oddNumber needs to be a valid string.");

        if ((integerValue % 2) !== 1) {
            throw InvalidValueException.expected("odd number", integerValue, message);
        }
    }

    /**
     * @param {int} integerValue
     * @param {string} [message]
     */
    static evenNumber(integerValue, message = "")
    {
        this.integer(integerValue);
        this.string(message, "Custom error message passed to Assert.evenNumber needs to be a valid string.");

        if ((integerValue % 2) !== 0) {
            throw InvalidValueException.expected("even number", integerValue, message);
        }
    }
}
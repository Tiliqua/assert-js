'use strict';

import InvalidValueException from './InvalidValueException';

export default class Assert
{
    /**
     * @param {object} objectValue
     * @param {function} instance
     */
    static instanceOf(objectValue, instance)
    {
        if (typeof objectValue !== 'object') {
            throw InvalidValueException.expected("object", objectValue);
        }

        if (!(objectValue instanceof instance)) {
            throw InvalidValueException.expectedInstanceOf(instance.name, objectValue);
        }
    }

    /**
     * @param {int} integerValue
     */
    static integer(integerValue)
    {
        if (!Number.isInteger(integerValue)) {
            throw InvalidValueException.expected("integer", integerValue);
        }
    }

    /**
     * @param {number} numberValue
     */
    static number(numberValue)
    {
        if (typeof numberValue !== 'number') {
            throw InvalidValueException.expected("number", numberValue);
        }
    }

    /**
     * @param {string} stringValue
     */
    static string(stringValue)
    {
        if (typeof stringValue !== "string") {
            throw InvalidValueException.expected("string", stringValue);
        }
    }

    /**
     * @param {boolean} booleanValue
     */
    static boolean(booleanValue)
    {
        if (typeof booleanValue !== 'boolean') {
            throw InvalidValueException.expected("boolean", booleanValue);
        }
    }

    /**
     * @param {object} objectValue
     */
    static object(objectValue)
    {
        if (typeof objectValue !== 'object') {
            throw InvalidValueException.expected("object", objectValue);
        }
    }

    /**
     * @param {string} expectedFunctionName
     * @param {object} objectValue
     */
    static hasFunction(expectedFunctionName, objectValue)
    {
        Assert.string(expectedFunctionName);
        Assert.object(objectValue);

        if (typeof objectValue[expectedFunctionName] !== 'function') {
            throw InvalidValueException.expected(`object to has function "${expectedFunctionName}"`, objectValue);
        }
    }

    /**
     * @param {array} arrayValue
     */
    static array(arrayValue)
    {
        if (!Array.isArray(arrayValue)) {
            throw InvalidValueException.expected("array", arrayValue);
        }
    }

    /**
     * @param {function} functionValue
     */
    static isFunction(functionValue)
    {
        if (typeof functionValue !== 'function') {
            throw InvalidValueException.expected("function", functionValue);
        }
    }

    /**
     * @param {int} expected
     * @param {int} integerValue
     */
    static greaterThan(expected, integerValue)
    {
        Assert.number(expected);
        Assert.number(integerValue);

        if (integerValue <= expected) {
            throw `Expected value ${integerValue} to be greater than ${expected}`;
        }
    }

    /**
     * @param {int} expected
     * @param {int} integerValue
     */
    static greaterThanOrEqual(expected, integerValue)
    {
        Assert.number(expected);
        Assert.number(integerValue);

        if (integerValue < expected) {
            throw `Expected value ${integerValue} to be greater than ${expected} or equal`;
        }
    }

    /**
     * @param {int} expected
     * @param {int} integerValue
     */
    static lessThan(expected, integerValue)
    {
        Assert.number(expected);
        Assert.number(integerValue);

        if (integerValue >= expected) {
            throw `Expected value ${integerValue} to be less than ${expected}`;
        }
    }

    /**
     * @param {int} expected
     * @param {int} integerValue
     */
    static lessThanOrEqual(expected, integerValue)
    {
        Assert.number(expected);
        Assert.number(integerValue);

        if (integerValue > expected) {
            throw `Expected value ${integerValue} to be less than ${expected} or equal`;
        }
    }

    /**
     * @param {array} arrayValue
     * @param {function} expectedInstance
     */
    static containsOnly(arrayValue, expectedInstance)
    {
        this.array(arrayValue);

        for (let element of arrayValue) {
            try {
                this.instanceOf(element, expectedInstance);
            } catch (error) {
                throw InvalidValueException.expectedInstanceOf(expectedInstance.name, element);
            }
        }
    }

    /**
     * @param {int} expectedCount
     * @param {array} arrayValue
     */
    static count(expectedCount, arrayValue)
    {
        this.integer(expectedCount);
        this.array(arrayValue);

        if (arrayValue.length !== expectedCount) {
            throw `Expected count ${expectedCount}, got ${arrayValue.length}`;
        }
    }

    /**
     * @param {*} value
     */
    static notEmpty(value)
    {
        if (value.length === 0) {
            throw InvalidValueException.expected("not empty value", value);
        }
    }


    /**
     * @param {int} integerValue
     */
    static oddNumber(integerValue)
    {
        this.integer(integerValue);

        if ((integerValue % 2) !== 1) {
            throw InvalidValueException.expected("odd number", integerValue);
        }
    }

    /**
     * @param {int} integerValue
     */
    static evenNumber(integerValue)
    {
        this.integer(integerValue);

        if ((integerValue % 2) !== 0) {
            throw InvalidValueException.expected("even number", integerValue);
        }
    }
}
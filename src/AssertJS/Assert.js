'use strict';

let InvalidValueException = require('./InvalidValueException');
let ValueConverter = require('./ValueConverter');

class Assert
{
    /**
     * @param {object} objectValue
     * @param {function} expectedInstance
     * @param {string} [message]
     */
    static instanceOf(objectValue, expectedInstance, message = "")
    {
        this.string(message, "Custom error message passed to Assert.instanceOf needs to be a valid string.");

        if (typeof objectValue !== 'object') {
            throw InvalidValueException.expected("object", objectValue, message);
        }

        if (!(objectValue instanceof expectedInstance)) {
            throw InvalidValueException.expected(
                expectedInstance.name,
                objectValue,
                message.length ? message : "Expected instance of \"${expected}\" but got \"${received}\"."
            );
        }
    }

    static instanceOneOf(objectValue, expectedInstances, message = "")
    {
        this.string(message, "Custom error message passed to Assert.instanceOf needs to be a valid string.");
        this.array(expectedInstances);

        let instance = expectedInstances.find((expectedInstance) => {
            return (objectValue instanceof expectedInstance)
        });

        if (instance === undefined) {
            throw InvalidValueException.expected(
                expectedInstances.map((instance) => {return ValueConverter.toString(instance); }).join(', '),
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
    static boolean(booleanValue, message = "")
    {
        this.string(message, "Custom error message passed to Assert.boolean needs to be a valid string.");

        if (typeof booleanValue !== 'boolean') {
            throw InvalidValueException.expected("boolean", booleanValue, message);
        }
    }

    /**
     * @param {boolean} value
     * @param {string} [message]
     */
    static true(value, message = "")
    {
        this.boolean(value);
        this.string(message, "Custom error message passed to Assert.true needs to be a valid string.");

        if (value !== true) {
            throw InvalidValueException.expected("true", value, message);
        }
    }

    /**
     * @param {boolean} value
     * @param {string} [message]
     */
    static false(value, message = "")
    {
        this.boolean(value);
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
    static equal(value, expectedValue, message = "")
    {
        if (typeof value !== 'object') {
            this.true(value === expectedValue, message ? message : `Expected value ${ValueConverter.toString(value)} to be equals ${ValueConverter.toString(expectedValue)} but it's not.`);
        } else {
            this.objectEqual(value, expectedValue, message ? message : `Expected value ${ValueConverter.toString(value)} to be equals ${ValueConverter.toString(expectedValue)} but it's not.`);
        }
    }

    /**
     * @param {object} object
     * @param {object} expectedObject
     * @param {string} [message]
     */
    static objectEqual(object, expectedObject, message = "")
    {
        this.object(object, message);
        this.object(expectedObject, message);

        let objectProperties = Object.getOwnPropertyNames(object);
        let expectedObjectProperties = Object.getOwnPropertyNames(expectedObject);

        this.true(objectProperties.length === expectedObjectProperties.length, message ? message : `Expected object ${ValueConverter.toString(object)} to be equals ${ValueConverter.toString(expectedObject)} but it's not.`);

        objectProperties.forEach((objectProperty) => {
            this.equal(object[objectProperty], expectedObject[objectProperty], message ? message : `Expected object ${ValueConverter.toString(object)} to be equals ${ValueConverter.toString(expectedObject)} but it's not.`);
        });
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
     * @param {string} expectedPropertyName
     * @param {object} objectValue
     * @param {string} [message]
     */
    static hasProperty(expectedPropertyName, objectValue, message = "")
    {
        this.string(expectedPropertyName);
        this.object(objectValue);
        this.string(message, "Custom error message passed to Assert.hasProperty needs to be a valid string.");

        if (typeof objectValue[expectedPropertyName] === 'undefined') {
            throw InvalidValueException.expected(`object to has property "${expectedPropertyName}"`, objectValue, message);
        }
    }

    /**
     * @param {array} expectedProperties
     * @param {object} objectValue
     * @param {string} [message]
     */
    static hasProperties(expectedProperties, objectValue, message = "")
    {
        this.object(objectValue);
        this.containsOnlyString(expectedProperties);
        this.string(message, "Custom error message passed to Assert.hasProperties needs to be a valid string.");

        expectedProperties.map((expectedProperty) => {
            if (typeof objectValue[expectedProperty] === 'undefined') {
                throw InvalidValueException.expected(`object to has properties "${expectedProperties.join(', ')}"`, objectValue, message);
            }
        });
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
     * @param {*} value
     * @param {array} expectedElements
     * @param {string} [message]
     */
    static oneOf(value, expectedElements, message = "")
    {
        this.string(message, "Custom error message passed to Assert.array needs to be a valid string.");
        this.array(expectedElements);

        let foundValue = expectedElements.find((expectedInstance) => {
            return value === expectedInstance;
        });

        if (foundValue === undefined) {
            throw InvalidValueException.expected(
                expectedElements.map((elemenet) => {return ValueConverter.toString(elemenet); }).join(', '),
                value,
                message.length ? message : "Expected one of \"${expected}\" but got \"${received}\"."
            );
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
            throw new Error(message.length > 0 ? message : `Expected value ${integerValue} to be greater than ${expected}`);
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
            throw new Error(message.length > 0 ? message : `Expected value ${integerValue} to be greater than ${expected} or equal`);
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
            throw new Error(message.length > 0 ? message : `Expected value ${integerValue} to be less than ${expected}`);
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
            throw new Error(message.length > 0 ? message : `Expected value ${integerValue} to be less than ${expected} or equal`);
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
     * @param {array} arrayValue
     * @param {string} [message]
     */
    static containsOnlyString(arrayValue, message = "")
    {
        this.array(arrayValue, "Assert.containsOnlyString require valid array, got \"${received}\".");
        this.string(message, "Custom error message passed to Assert.containsOnly needs to be a valid string.");

        for (let element of arrayValue) {
            try {
                this.string(element, message);
            } catch (error) {
                throw InvalidValueException.expected(
                    'string',
                    arrayValue.map((value) => { return ValueConverter.toString(value); }).join(', '),
                    message.length ? message : "Expected array of \"${expected}\" but got \"${received}\"."
                );
            }
        }
    }

    /**
     * @param {array} arrayValue
     * @param {string} [message]
     */
    static containsOnlyInteger(arrayValue, message = "")
    {
        this.array(arrayValue, "Assert.containsOnlyInteger require valid array, got \"${received}\".");
        this.string(message, "Custom error message passed to Assert.containsOnly needs to be a valid string.");

        for (let element of arrayValue) {
            try {
                this.integer(element, message);
            } catch (error) {
                throw InvalidValueException.expected(
                    'integer',
                    arrayValue.map((value) => { return ValueConverter.toString(value); }).join(', '),
                    message.length ? message : "Expected array of \"${expected}\" but got \"${received}\"."
                );
            }
        }
    }

    /**
     * @param {array} arrayValue
     * @param {string} [message]
     */
    static containsOnlyNumber(arrayValue, message = "")
    {
        this.array(arrayValue, "Assert.containsOnlyNumber require valid array, got \"${received}\".");
        this.string(message, "Custom error message passed to Assert.containsOnly needs to be a valid string.");

        for (let element of arrayValue) {
            try {
                this.number(element, message);
            } catch (error) {
                throw InvalidValueException.expected(
                    'number',
                    arrayValue.map((value) => { return ValueConverter.toString(value); }).join(', '),
                    message.length ? message : "Expected array of \"${expected}\" but got \"${received}\"."
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
            throw new Error(message.length ? message : `Expected count ${expectedCount}, got ${arrayValue.length}`);
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

    /**
     * @param {string} stringValue
     * @param {string} [message]
     */
    static jsonString(stringValue, message = "")
    {
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
    static email(emailValue, message = "")
    {
        this.string(emailValue);
        this.string(message, "Custom error message passed to Assert.email needs to be a valid string.");

        let regexp = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;

        if (!regexp.test(emailValue)) {
            throw InvalidValueException.expected("valid email address", emailValue, message);
        }
    }

    /**
     * @param {string} urlValue
     * @param {string} [message]
     */
    static url(urlValue, message = "")
    {
        this.string(urlValue);
        this.string(message, "Custom error message passed to Assert.url needs to be a valid string.");

        let regexp = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;

        if (!regexp.test(urlValue)) {
            throw InvalidValueException.expected("valid url", urlValue, message);
        }
    }

    /**
     * @param {string} uuidValue
     * @param {string} [message]
     */
    static uuid(uuidValue, message = "")
    {
        this.string(uuidValue);
        this.string(message, "Custom error message passed to Assert.uuid needs to be a valid string.");

        let regexp = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

        if (!regexp.test(uuidValue)) {
            throw InvalidValueException.expected("valid uuid", uuidValue, message);
        }
    }

    /**
     * @param {string} selector
     * @param {HTMLElement|HTMLDocument} htmlElement
     * @param {string} [message]
     */
    static hasElement(selector, htmlElement, message = "")
    {
        this.string(selector);
        this.instanceOneOf(htmlElement, [HTMLElement, HTMLDocument]);
        this.string(message, "Custom error message passed to Assert.hasProperty needs to be a valid string.");

        if (null === htmlElement.querySelector(selector)) {
            throw InvalidValueException.expected(`html element to has element under selector "${selector}"`, htmlElement.outerHTML, message);
        }
    }

    /**
     * @param {string} attributeName
     * @param {HTMLElement} htmlElement
     * @param {string} [message]
     */
    static hasAttribute(attributeName, htmlElement, message = "")
    {
        this.string(attributeName);
        this.instanceOf(htmlElement, HTMLElement);
        this.string(message, "Custom error message passed to Assert.hasAttribute needs to be a valid string.");

        let attribute = htmlElement.getAttribute(attributeName);

        if (null ===  attribute) {
            throw InvalidValueException.expected(`html element with attribute "${attributeName}"`, htmlElement.outerHTML, message);
        }
    }

    /**
     * @param {array} attributes
     * @param {HTMLElement} htmlElement
     * @param {string} [message]
     */
    static hasAttributes(attributes, htmlElement, message = "")
    {
        this.containsOnlyString(attributes);
        this.instanceOf(htmlElement, HTMLElement);
        this.string(message, "Custom error message passed to Assert.hasAttributes needs to be a valid string.");

        attributes.map((attribute) => {
            try {
                this.hasAttribute(attribute, htmlElement)
            } catch (e) {
                throw InvalidValueException.expected(`html element with attributes "${attributes.join(', ')}"`, htmlElement.outerHTML, message);
            }
        })
    }

    /**
     * @param {function} callback
     * @param {object} [expectedError]
     */
    static throws(callback, expectedError = new Error())
    {
        this.isFunction(callback);

        try {
            callback();
        } catch (error) {
            if (typeof error === 'object' && error instanceof Error && typeof expectedError === 'object' && expectedError instanceof Error) {

                if (expectedError.message.length) {
                    this.equal(error.message, expectedError.message, `Expected exception message "${error.message}" to be equals "${expectedError.message}" but it's not.`);
                }

                return ;
            }

            this.equal(error, expectedError, `Expected error of type ${ValueConverter.toString(error)} to be equals ${ValueConverter.toString(expectedError)} but it's not.`);

            return ;
        }

        throw InvalidValueException.expected(
            ValueConverter.toString(expectedError),
            null,
            "Expected from callback to throw an Error \"${expected}\" but it didn't."
        );
    }
}

module.exports = Assert;
'use strict';

import Assert from './Assert';
import MessageFactory from './MessageFactory';
import ValueConverter from './ValueConverter';

export default class InvalidValueException
{
    /**
     * @param {string} type
     * @param {*} value
     * @param {string} [message]
     * @returns {string}
     */
    static expected(type, value, message = "")
    {
        Assert.string(message);

        if (message.length) {
            return MessageFactory.create(message, {expected: type, received: ValueConverter.toString(value)});
        }

        return `Expected ${type} but got "${ValueConverter.toString(value)}".`
    }
}
'use strict';

import ValueConverter from './ValueConverter';

export default class InvalidValueException
{
    static expected(type, value)
    {
        return `Expected ${type} but got "${ValueConverter.toString(value)}".`
    }

    static expectedInstanceOf(instance, value)
    {
        return `Expected instance of \"${instance}\" but got "${ValueConverter.toString(value)}".`
    }
}
'use strict';

const VALUE_NAME_REGEXP = /\${(.*?)}/g;

class MessageFactory
{
    /**
     * @param {string} template
     * @param {object} [data]
     */
    static create(template, data = {})
    {
        if (typeof template !== 'string') {
            throw new Error(`Expected string but got "${ValueConverter.toString(template)}".`);
        }

        if (typeof data !== 'object') {
            throw new Error(`Expected string but got "${ValueConverter.toString(data)}".`);
        }

        return template.replace(VALUE_NAME_REGEXP, function(placeholder, propertyName) {
            if (data.hasOwnProperty(propertyName)) {
                return data[propertyName];
            }

            return placeholder;
        });
    }
}

module.exports = MessageFactory;
'use strict';

import Assert from './Assert';

const VALUE_NAME_REGEXP = /\${(.*?)}/g;

export default class MessageFactory
{
    /**
     * @param {string} template
     * @param {object} [data]
     */
    static create(template, data = {})
    {
        Assert.string(template);
        Assert.object(data);

        return template.replace(VALUE_NAME_REGEXP, function(placeholder, propertyName) {
            if (data.hasOwnProperty(propertyName)) {
                return data[propertyName];
            }

            return placeholder;
        });
    }
}
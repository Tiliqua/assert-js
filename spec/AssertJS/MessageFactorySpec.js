import MessageFactory from '../../src/AssertJS/MessageFactory';

describe("MessageFactory", () => {
    it("builds message from template using es6 template syntax ", () => {

        expect(MessageFactory.create("this is ${test}", {test: "value"})).toBe("this is value");
    });

    it("ignores placeholder that are missing values", () => {

        expect(MessageFactory.create("this is ${test}", {foo: "value"})).toBe("this is ${test}");
    });

    it("builds template from multiple placeholders", () => {

        expect(MessageFactory.create("this is ${foo} and this is ${bar}", {foo: "foo1", bar: "bar1"}))
            .toBe("this is foo1 and this is bar1");
    });
});
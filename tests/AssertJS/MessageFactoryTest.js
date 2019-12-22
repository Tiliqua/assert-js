import MessageFactory from '../../src/AssertJS/MessageFactory';
import Assert from '../../src/AssertJS/Assert'

describe("MessageFactory", () => {
    it("builds message from template using es6 template syntax ", () => {
        Assert.equal(MessageFactory.create("this is ${test}", {test: "value"}), "this is value");
    });

    it("ignores placeholder that are missing values", () => {
        Assert.equal(MessageFactory.create("this is ${test}", {foo: "value"}),"this is ${test}");
    });

    it("builds template from multiple placeholders", () => {
        Assert.equal(
            MessageFactory.create("this is ${foo} and this is ${bar}", {foo: "foo1", bar: "bar1"}),
            "this is foo1 and this is bar1"
        );
    });
});
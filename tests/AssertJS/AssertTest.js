import expect from 'expect.js';
import jsdom from 'jsdom';
const { JSDOM } = jsdom;
import Assert from '../../bin/es6/assert-js';

describe("Assert", () => {

    it("compares instance of", () => {
        Assert.instanceOf(new String("string"), String);
    });

    it("compares instance one of", () => {
        Assert.instanceOneOf(new String("string"), [String, Number]);
    });

    it ("throws error when asserting instance of non object", () => {
        expect(() => {Assert.instanceOf(1, String)}).to.throwError('Expected object but got "int[1]".');
        expect(() => {Assert.instanceOf(new Number(2), String)}).to.throwError(/Expected instance of "String" but got "Number:int\[2\]"./);
    });

    it ("throws error when custom error message in instanceOf assertion is not valid string", () => {
        expect(() => {Assert.instanceOf(1, String, new Number(1))}).to.throwError(/Custom error message passed to Assert.instanceOf needs to be a valid string./);
    });

    it ("throws error when compared different instances", () => {
        expect(() => {Assert.instanceOf(new Number(2), String)}).to.throwError(/Expected instance of "String" but got "Number:int\[2\]"./);
        expect(() => {Assert.instanceOf(new Number(2), String, "custom message")}).to.throwError(/custom message/);
    });

    it ("throws error when compared all different instances", () => {
        expect(() => {Assert.instanceOneOf(new Number(2), [String, Array] )}).to.throwError(/Expected instance of "function\[function String\(\) { \[native code\] }\], function\[function Array\(\) { \[native code\] }\]" but got "Number:int\[2\]"./);
        expect(() => {Assert.instanceOneOf(new Number(2), [String, Array], "custom message")}).to.throwError(/custom message/);
    });

    it ("asserts integers", () => {
        Assert.integer(125);
    });

    it ("throws error when asserting non integer as an interger", () => {
        expect(() => {Assert.integer("string")}).to.throwError(/Expected integer but got "string\["string"\]"./);
        expect(() => {Assert.integer(new Array([]))}).to.throwError(/Expected integer but got "array\[length: 1\]"./);
        expect(() => {Assert.integer(1.23)}).to.throwError(/Expected integer but got "float\[1.23\]"./);
        expect(() => {Assert.integer(true)}).to.throwError(/Expected integer but got "boolean\[true\]"./);
        expect(() => {Assert.integer(() => {})}).to.throwError(/Expected integer but got "function\[function \(\) {}\]"./);
        expect(() => {Assert.integer(() => {}, "custom message")}).to.throwError(/custom message/);
    });

    it ("asserts odd number", () => {
        Assert.oddNumber(3);
    });

    it ("throws error when asserting non odd number as odd", () => {
        expect(() => {Assert.oddNumber(4)}).to.throwError(/Expected odd number but got "int\[4\]"./);
        expect(() => {Assert.oddNumber(4, "custom message")}).to.throwError(/custom message/);
    });

    it ("asserts even number", () => {
        Assert.evenNumber(4);
    });

    it ("throws error when asserting non even number as even", () => {
        expect(() => {Assert.evenNumber(3)}).to.throwError(/Expected even number but got "int\[3\]"./);
        expect(() => {Assert.evenNumber(3, "custom message")}).to.throwError(/custom message/);
    });

    it ("asserts strings", () => {
        Assert.string("string");
        Assert.string("");
    });

    it ("throws error when asserting non string as an string", () => {
        expect(() => {Assert.string(123)}).to.throwError(/Expected string but got "int\[123\]"./);
        expect(() => {Assert.string(new Array([]))}).to.throwError(/Expected string but got "array\[length: 1\]"./);
        expect(() => {Assert.string(1.23)}).to.throwError(/Expected string but got "float\[1.23\]"./);
        expect(() => {Assert.string(true)}).to.throwError(/Expected string but got "boolean\[true\]"./);
        expect(() => {Assert.string(() => {})}).to.throwError(/Expected string but got "function\[function \(\) {}\]"./);
        expect(() => {Assert.string(() => {}, "custom message")}).to.throwError(/custom message/);
    });

    it ("throws error when custom message is not valid string", () => {
        expect(() => {Assert.string("", new Number(12))}).to.throwError(/Custom error message passed to Assert.string needs to be a valid string./);
    });

    it ("asserts boolean", () => {
        Assert.boolean(true);
        Assert.boolean(false);
    });

    it ("throws error when asserting non boolean as an boolean", () => {
        expect(() => {Assert.boolean(123)}).to.throwError(/Expected boolean but got "int\[123\]"./);
        expect(() => {Assert.boolean(new Array([]))}).to.throwError(/Expected boolean but got "array\[length: 1\]"./);
        expect(() => {Assert.boolean(1.23)}).to.throwError(/Expected boolean but got "float\[1.23\]"./);
        expect(() => {Assert.boolean(() => {})}).to.throwError(/Expected boolean but got "function\[function \(\) {}\]"./);
        expect(() => {Assert.boolean(() => {}, 'custom message')}).to.throwError(/custom message/);
    });

    it ("asserts true", () => {
        Assert.true(true);
    });

    it ("asserts false", () => {
        Assert.false(false);
    });

    it ("asserts object", () => {
        Assert.object({});
        Assert.object(new String("test"));
    });

    it ("throws error when asserting non object as an object", () => {
        expect(() => {Assert.object(123)}).to.throwError(/Expected object but got "int\[123\]"./);
        expect(() => {Assert.object(1.23)}).to.throwError(/Expected object but got "float\[1.23\]"./);
        expect(() => {Assert.object(() => {})}).to.throwError(/Expected object but got "function\[function \(\) {}\]"./);
        expect(() => {Assert.object(() => {}, 'custom message')}).to.throwError(/custom message/);
    });

    it ("asserts has function on anonymous object", () => {
        Assert.hasFunction("test", {test: () => {}});
    });

    it ("asserts has function on object", () => {
        Assert.hasFunction("concat", new String("test"));
    });

    it ("throws error when asserting that object has function that he does not have", () => {
        expect(() => {Assert.hasFunction("test", new String("test"))}).to.throwError(`Expected object to has function "test" but got "String["test"]".`);
        expect(() => {Assert.hasFunction("test", new String("test"), "custom message")}).to.throwError(`custom message`);
    });

    it ("asserts has property on anonymous object", () => {
        Assert.hasProperty("test", {test: 'value'});
    });

    it ("asserts has property on object", () => {
        class MyObject {
            constructor()
            {
                this.test = 'test';
            }
        }
        Assert.hasProperty("test", new MyObject());
    });

    it ("throws error when asserting that object has property that he does not have", () => {
        expect(() => {Assert.hasProperty("test", new String("test"))}).to.throwError(`Expected object to has property "test" but got "String["test"]".`);
        expect(() => {Assert.hasProperty("test", new String("test"), "custom message")}).to.throwError(`custom message`);
    });

    it ("asserts function", () => {
        Assert.isFunction(() => {});
    });

    it ("throws error when asserting non function as an function", () => {
        expect(() => {Assert.isFunction(123)}).to.throwError(/Expected function but got "int\[123\]"./);
        expect(() => {Assert.isFunction(new Array([]))}).to.throwError(/Expected function but got "array\[length: 1\]"./);
        expect(() => {Assert.isFunction(1.23)}).to.throwError(/Expected function but got "float\[1.23\]"./);
        expect(() => {Assert.isFunction(1.23, 'custom message')}).to.throwError(/custom message/);
    });

    it ("asserts values greater than", () => {
        Assert.greaterThan(10, 120);
    });

    it ("throws error when asserting value lower than", () => {
        expect(() => {Assert.greaterThan(10, 1)}).to.throwError(/Expected value 1 to be greater than 10/);
        expect(() => {Assert.greaterThan(10, 1, 'custom message')}).to.throwError(/custom message/);
    });

    it ("asserts values greater than or equal", () => {
        Assert.greaterThanOrEqual(10, 10);
    });

    it ("throws error when asserting value less than or equal", () => {
        expect(() => {Assert.greaterThanOrEqual(10, 1)}).to.throwError(/Expected value 1 to be greater than 10 or equal/);
        expect(() => {Assert.greaterThanOrEqual(10, 1, 'custom message')}).to.throwError(/custom message/);
    });

    it ("asserts values less than", () => {
        Assert.lessThan(10, 1);
    });

    it ("throws error when asserting value greater than", () => {
        expect(() => {Assert.lessThan(10, 100)}).to.throwError(/Expected value 100 to be less than 10/);
        expect(() => {Assert.lessThan(10, 100, 'custom message')}).to.throwError(/custom message/);
    });

    it ("asserts values less than or equal", () => {
        Assert.lessThanOrEqual(10, 10);
    });

    it ("throws error when asserting value greater than or equal", () => {
        expect(() => {Assert.lessThanOrEqual(10, 100)}).to.throwError(/Expected value 100 to be less than 10 or equal/);
        expect(() => {Assert.lessThanOrEqual(10, 100, 'custom message')}).to.throwError(/custom message/);
    });

    it ("asserts array", () => {
        Assert.array(new Array(5));
        Assert.array(['test1', 'test2']);
    });

    it ("throws error when asserting non array value as array", () => {
        expect(() => {Assert.array(123)}).to.throwError(/Expected array but got "int\[123\]"./);
        expect(() => {Assert.array(123, 'custom message')}).to.throwError(/custom message/);
    });

    it ("asserts contains only specific instances in array", () => {
        Assert.containsOnly(
            [
                new String("test"),
                new String("test1")
            ],
            String
        );
    });

    it ("throws error when contains only does not assert on array", () => {
        expect(() => {Assert.containsOnly(123)}).to.throwError(/Assert.containsOnly require valid array, got "int\[123\]"./);
    });

    it ("throws error when contains only has at least one non object element", () => {
        expect(() => {Assert.containsOnly([new String("test"), 132], String)}).to.throwError(/Expected instance of "String" but got "int\[132\]"./);
        expect(() => {Assert.containsOnly([new String("test"), 132], String, 'custom message')}).to.throwError(/custom message/);
    });

    it ("throws error when contains only has at least one non expected instance element", () => {
        expect(() => {Assert.containsOnly([new String("test"), new Number(23)], String)}).to.throwError(/Expected instance of "String" but got "Number:int\[23\]"./);
    });

    it ("asserts array count", () => {
        Assert.count(
            2,
            [
                new String("test"),
                new String("test1")
            ]
        );
    });

    it ("throws error when expected count different than array count", () => {
        expect(() => {Assert.count(3, [new String("test")])}).to.throwError(/Expected count 3, got 1/);
        expect(() => {Assert.count(3, [new String("test")], 'custom message')}).to.throwError(/custom message/);
    });

    it ("asserts not empty value", () => {
        Assert.notEmpty("test");
    });

    it ("throws error when asserting empty string as non empty value", () => {
        expect(() => {Assert.notEmpty("")}).to.throwError(/Expected not empty value but got "string\[""\]"./);
        expect(() => {Assert.notEmpty("", 'custom message')}).to.throwError(/custom message/);
    });

    it ("asserts json string", () => {
        Assert.jsonString('{"key":"value"}');
    });

    it ("throws error when expected json string is not valid", () => {
        expect(() => {Assert.jsonString('{"key":value"}')}).to.throwError(/Expected json string but got "string\["{"key":value"}"\]"./);
        expect(() => {Assert.jsonString('{"key":value"}', "custom message")}).to.throwError(/custom message/);
    });

    it ("asserts email", () => {
        Assert.email('norbert@orzechowicz.pl');
    });

    it ("throws error when email is not valid", () => {
        expect(() => {Assert.email('not_valid_email@com')}).to.throwError(/Expected valid email address but got "string\["not_valid_email@com"\]"./);
        expect(() => {Assert.email('not_valid_email@com', "custom message")}).to.throwError(/custom message/);
    });

    it ("asserts url", () => {
        Assert.url('http://foo.com/blah_blah');
        Assert.url('http://foo.com/blah_blah/');
        Assert.url('http://foo.com/blah_blah_(wikipedia)');
        Assert.url('http://foo.com/blah_blah_(wikipedia)_(again)');
        Assert.url('http://www.example.com/wpstyle/?p=364');
        Assert.url('https://www.example.com/foo/?bar=baz&inga=42&quux');
        Assert.url('http://✪df.ws/123');
        Assert.url('http://userid:password@example.com:8080');
        Assert.url('http://userid:password@example.com:8080/');
        Assert.url('http://userid@example.com');
        Assert.url('http://userid@example.com/');
        Assert.url('http://userid@example.com:8080/');
        Assert.url('http://userid:password@example.com');
        Assert.url('http://userid:password@example.com/');
        Assert.url('http://142.42.1.1/');
        Assert.url('http://foo.com/blah_(wikipedia)#cite-1');
        Assert.url('http://foo.com/unicode_(✪)_in_parens');
    });

    it ("throws error when url is not valid", () => {
        expect(() => {Assert.url('http://')}).to.throwError(/Expected valid url but got "string\["http:\/\/"\]"./);
        expect(() => {Assert.url('http://', "custom message")}).to.throwError(/custom message/);
    });

    it ("asserts uuid", () => {
        Assert.uuid('5e8a2b26-1479-11e6-a148-3e1d05defe78'); // version 1
        Assert.uuid('386f9c10-d886-49b4-8153-ba1873c684ed'); // version 4
    });

    it ("throws error when uuid is not valid", () => {
        expect(() => {Assert.uuid('1234567890')}).to.throwError(/Expected valid uuid but got "string\["1234567890"\]"./);
        expect(() => {Assert.uuid('1234567890', "custom message")}).to.throwError(/custom message/);
    });

    it ("asserts that document element exists under selector of HTMLDocument", () => {
        let dom = new JSDOM(`<body><div id="div"></div></body>`);

        global.HTMLDocument = dom.window.HTMLDocument;
        global.HTMLElement = dom.window.HTMLElement;

        Assert.hasElement('#div', dom.window.document);
    });

    it ("asserts that document element exists under selector of HTMLElement", () => {
        let dom = new JSDOM(`<body><div id="div"></div></body>`);

        global.HTMLDocument = dom.window.HTMLDocument;
        global.HTMLElement = dom.window.HTMLElement;

        Assert.hasElement('#div', dom.window.document.body);
    });

    it ("throws exception when document element does not exists under selector", () => {
        let dom = new JSDOM(`<body><div id="div"></div></body>`);

        global.HTMLDocument = dom.window.HTMLDocument;
        global.HTMLElement = dom.window.HTMLElement;

        expect(() => {Assert.hasElement('#not-exists', dom.window.document.body)}).to.throwError();
    });
});

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
        Assert.throws(() => {Assert.instanceOf(1, String)}, new Error('Expected object but got "int[1]".'));
        Assert.throws(() => {Assert.instanceOf(new Number(2), String)}, new Error("Expected instance of \"String\" but got \"Number:int[2]\"."));
    });

    it ("throws error when custom error message in instanceOf assertion is not valid string", () => {
        Assert.throws(
            () => {Assert.instanceOf(1, String, new Number(1))},
            new Error("Custom error message passed to Assert.instanceOf needs to be a valid string.")
        );
    });

    it ("throws error when compared different instances", () => {
        Assert.throws(() => {Assert.instanceOf(new Number(2), String)}, new Error("Expected instance of \"String\" but got \"Number:int[2]\"."));
        Assert.throws(() => {Assert.instanceOf(new Number(2), String, "custom message")}, new Error("custom message"));
    });

    it ("throws error when compared all different instances", () => {
        Assert.throws(() => {Assert.instanceOneOf(new Number(2), [String, Array] )}, new Error("Expected instance of \"function[function String() { [native code] }], function[function Array() { [native code] }]\" but got \"Number:int[2]\"."));
        Assert.throws(() => {Assert.instanceOneOf(new Number(2), [String, Array], "custom message")}, new Error("custom message"));
    });

    it ("asserts integers", () => {
        Assert.integer(125);
    });

    it ("throws error when asserting non integer as an interger", () => {
        Assert.throws(() => {Assert.integer("string")}, new Error("Expected integer but got \"string[\"string\"]\"."));
        Assert.throws(() => {Assert.integer(new Array([]))}, new Error("Expected integer but got \"array[length: 1]\"."));
        Assert.throws(() => {Assert.integer(1.23)}, new Error("Expected integer but got \"float[1.23]\"."));
        Assert.throws(() => {Assert.integer(true)}, new Error("Expected integer but got \"boolean[true]\"."));
        Assert.throws(() => {Assert.integer(() => {})}, new Error("Expected integer but got \"function[function () {}]\"."));
        Assert.throws(() => {Assert.integer(() => {}, "custom message")}, new Error("custom message"));
    });

    it ("asserts odd number", () => {
        Assert.oddNumber(3);
    });

    it ("throws error when asserting non odd number as odd", () => {
        Assert.throws(() => {Assert.oddNumber(4)}, new Error("Expected odd number but got \"int[4]\"."));
        Assert.throws(() => {Assert.oddNumber(4, "custom message")}, new Error("custom message"));
    });

    it ("asserts even number", () => {
        Assert.evenNumber(4);
    });

    it ("throws error when asserting non even number as even", () => {
        Assert.throws(() => {Assert.evenNumber(3)}, new Error("Expected even number but got \"int[3]\"."));
        Assert.throws(() => {Assert.evenNumber(3, "custom message")}, new Error("custom message"));
    });

    it ("asserts strings", () => {
        Assert.string("string");
        Assert.string("");
    });

    it ("throws error when asserting non string as an string", () => {
        Assert.throws(() => {Assert.string(123)}, new Error("Expected string but got \"int[123]\"."));
        Assert.throws(() => {Assert.string(new Array([]))}, new Error("Expected string but got \"array[length: 1]\"."));
        Assert.throws(() => {Assert.string(1.23)}, new Error("Expected string but got \"float[1.23]\"."));
        Assert.throws(() => {Assert.string(true)}, new Error("Expected string but got \"boolean[true]\"."));
        Assert.throws(() => {Assert.string(() => {})}, new Error("Expected string but got \"function[function () {}]\"."));
        Assert.throws(() => {Assert.string(() => {}, "custom message")}, new Error("custom message"));
    });

    it ("throws error when custom message is not valid string", () => {
        Assert.throws(() => {Assert.string("", new Number(12))}, new Error("Custom error message passed to Assert.string needs to be a valid string."));
    });

    it ("asserts boolean", () => {
        Assert.boolean(true);
        Assert.boolean(false);
    });

    it ("throws error when asserting non boolean as an boolean", () => {
        Assert.throws(() => {Assert.boolean(123)}, new Error("Expected boolean but got \"int[123]\"."));
        Assert.throws(() => {Assert.boolean(new Array([]))}, new Error("Expected boolean but got \"array[length: 1]\"."));
        Assert.throws(() => {Assert.boolean(1.23)}, new Error("Expected boolean but got \"float[1.23]\"."));
        Assert.throws(() => {Assert.boolean(() => {})}, new Error("Expected boolean but got \"function[function () {}]\"."));
        Assert.throws(() => {Assert.boolean(() => {}, 'custom message')}, new Error("custom message"));
    });

    it ("asserts equal values", () => {
        Assert.equal(true, true);
        Assert.equal(1, 1);
        Assert.equal("string", "string");
        Assert.equal({"object":1}, {"object":1});
        Assert.equal({"object":{"nested":[1,2,3]}}, {"object":{"nested":[1,2,3]}});
        Assert.equal([1,2,3], [1,2,3]);
    });

    it ("asserts throws error when values are not equal", () => {
        Assert.throws(() => {Assert.equal(true, false)}, new Error("Expected value boolean[true] to be equals boolean[false] but it's not."));
        Assert.throws(() => {Assert.equal({"object":{"nested":[1,2,3]}}, {"object":{"nested":[3,1,2]}})}, new Error("Expected value object[{\"object\":{\"nested\":[1,2,3]}}] to be equals object[{\"object\":{\"nested\":[3,1,2]}}] but it's not."));
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
        Assert.throws(() => {Assert.object(123)}, new Error("Expected object but got \"int[123]\"."));
        Assert.throws(() => {Assert.object(1.23)}, new Error("Expected object but got \"float[1.23]\"."));
        Assert.throws(() => {Assert.object(() => {})}, new Error("Expected object but got \"function[function () {}]\"."));
        Assert.throws(() => {Assert.object(() => {}, 'custom message')}, new Error("custom message"));
    });

    it ("asserts has function on anonymous object", () => {
        Assert.hasFunction("test", {test: () => {}});
    });

    it ("asserts has function on object", () => {
        Assert.hasFunction("concat", new String("test"));
    });

    it ("throws error when asserting that object has function that he does not have", () => {
        Assert.throws(() => {Assert.hasFunction("test", new String("test"))}, new Error("Expected object to has function \"test\" but got \"String[\"test\"]\"."));
        Assert.throws(() => {Assert.hasFunction("test", new String("test"), "custom message")}, new Error("custom message"));
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
        Assert.throws(() => {Assert.hasProperty("test", new String("test"))}, new Error("Expected object to has property \"test\" but got \"String[\"test\"]\"."));
        Assert.throws(() => {Assert.hasProperty("test", new String("test"), "custom message")}, new Error("custom message"));
    });

    it ("asserts has properties on anonymous object", () => {
        Assert.hasProperties(['test', 'foo', 'bar'], {test: 'value', foo: 'foo', bar: 'bar'});
    });

    it ("asserts has properties on object", () => {
        class MyObject {
            constructor()
            {
                this.test = 'test';
                this.foo = 'for';
                this.bar = 'bar';
            }
        }
        Assert.hasProperties(['test', 'foo', 'bar'], new MyObject());
    });

    it ("throws error when asserting that object has properties that he does not have", () => {
        Assert.throws(() => {Assert.hasProperties(["test", "foo"], new String("test"))}, new Error("Expected object to has properties \"test, foo\" but got \"String[\"test\"]\"."));
        Assert.throws(() => {Assert.hasProperties(["test", "foo"], new String("test"), "custom message")}, new Error("custom message"));
    });

    it ("asserts function", () => {
        Assert.isFunction(() => {});
    });

    it ("throws error when asserting non function as an function", () => {
        Assert.throws(() => {Assert.isFunction(123)}, new Error("Expected function but got \"int[123]\"."));
        Assert.throws(() => {Assert.isFunction(new Array([]))}, new Error("Expected function but got \"array[length: 1]\"."));
        Assert.throws(() => {Assert.isFunction(1.23)}, new Error("Expected function but got \"float[1.23]\"."));
        Assert.throws(() => {Assert.isFunction(1.23, 'custom message')}, new Error("custom message"));
    });

    it ("asserts values greater than", () => {
        Assert.greaterThan(10, 120);
    });

    it ("throws error when asserting value lower than", () => {
        Assert.throws(() => {Assert.greaterThan(10, 1)}, new Error("Expected value 1 to be greater than 10"));
        Assert.throws(() => {Assert.greaterThan(10, 1, 'custom message')}, new Error("custom message"));
    });

    it ("asserts values greater than or equal", () => {
        Assert.greaterThanOrEqual(10, 10);
    });

    it ("throws error when asserting value less than or equal", () => {
        Assert.throws(() => {Assert.greaterThanOrEqual(10, 1)}, new Error("Expected value 1 to be greater than 10 or equal"));
        Assert.throws(() => {Assert.greaterThanOrEqual(10, 1, 'custom message')}, new Error("custom message"));
    });

    it ("asserts values less than", () => {
        Assert.lessThan(10, 1);
    });

    it ("throws error when asserting value greater than", () => {
        Assert.throws(() => {Assert.lessThan(10, 100)}, new Error("Expected value 100 to be less than 10"));
        Assert.throws(() => {Assert.lessThan(10, 100, 'custom message')}, new Error("custom message"));
    });

    it ("asserts values less than or equal", () => {
        Assert.lessThanOrEqual(10, 10);
    });

    it ("throws error when asserting value greater than or equal", () => {
        Assert.throws(() => {Assert.lessThanOrEqual(10, 100)}, new Error("Expected value 100 to be less than 10 or equal"));
        Assert.throws(() => {Assert.lessThanOrEqual(10, 100, 'custom message')}, new Error("custom message"));
    });

    it ("asserts array", () => {
        Assert.array(new Array(5));
        Assert.array(['test1', 'test2']);
    });

    it ("throws error when asserting non array value as array", () => {
        Assert.throws(() => {Assert.array(123)}, new Error("Expected array but got \"int[123]\"."));
        Assert.throws(() => {Assert.array(123, 'custom message')}, new Error("custom message"));
    });

    it ("asserts one of", () => {
        Assert.oneOf(1, [2, 5, 6, 1]);
        Assert.oneOf('a', ['b', 'a', 'c']);
    });

    it ("throws error when asserting that element is non of expected", () => {
        Assert.throws(() => {Assert.oneOf('z', ['b', 'a', 'c'])}, new Error("Expected one of \"string[\"b\"], string[\"a\"], string[\"c\"]\" but got \"string[\"z\"]\"."));
        Assert.throws(() => {Assert.oneOf('z', ['b', 'a', 'c'], 'custom message')}, new Error("custom message"));
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
        Assert.throws(() => {Assert.containsOnly(123)}, new Error("Assert.containsOnly require valid array, got \"int[123]\"."));
    });

    it ("throws error when contains only has at least one non object element", () => {
        Assert.throws(() => {Assert.containsOnly([new String("test"), 132], String)}, new Error("Expected instance of \"String\" but got \"int[132]\"."));
        Assert.throws(() => {Assert.containsOnly([new String("test"), 132], String, 'custom message')}, new Error("custom message"));
    });

    it ("throws error when contains only has at least one non expected instance element", () => {
        Assert.throws(() => {Assert.containsOnly([new String("test"), new Number(23)], String)}, new Error("Expected instance of \"String\" but got \"Number:int[23]\"."));
    });

    it ("asserts contains only strings in array", () => {
        Assert.containsOnlyString(["test", "test1"]);
    });

    it ("asserts contains only integers in array", () => {
        Assert.containsOnlyInteger([1, 2]);
    });

    it ("asserts contains only numbers in array", () => {
        Assert.containsOnlyNumber([2, 10.25]);
    });

    it ("throws error when contains only strings has at least one non string element", () => {
        Assert.throws(() => {Assert.containsOnlyString([132, "test"])}, new Error("Expected array of \"string\" but got \"string[\"int[132], string[\"test\"]\"]\"."));
        Assert.throws(() => {Assert.containsOnlyString([132, "test"], 'custom message')}, new Error("custom message"));
    });

    it ("throws error when contains only integers has at least one non integer element", () => {
        Assert.throws(() => {Assert.containsOnlyInteger([132, "test"])}, new Error("Expected array of \"integer\" but got \"string[\"int[132], string[\"test\"]\"]\"."));
        Assert.throws(() => {Assert.containsOnlyInteger([132, "test"], 'custom message')}, new Error("custom message"));
    });

    it ("throws error when contains only numbers has at least one non number element", () => {
        Assert.throws(() => {Assert.containsOnlyNumber([132, "test"])}, new Error("Expected array of \"number\" but got \"string[\"int[132], string[\"test\"]\"]\"."));
        Assert.throws(() => {Assert.containsOnlyNumber([132, "test"], 'custom message')}, new Error("custom message"));
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
        Assert.throws(() => {Assert.count(3, [new String("test")])}, new Error("Expected count 3, got 1"));
        Assert.throws(() => {Assert.count(3, [new String("test")], 'custom message')}, new Error("custom message"));
    });

    it ("asserts not empty value", () => {
        Assert.notEmpty("test");
    });

    it ("throws error when asserting empty string as non empty value", () => {
        Assert.throws(() => {Assert.notEmpty("")}, new Error("Expected not empty value but got \"string[\"\"]\"."));
        Assert.throws(() => {Assert.notEmpty("", 'custom message')}, new Error("custom message"));
    });

    it ("asserts json string", () => {
        Assert.jsonString('{"key":"value"}');
    });

    it ("throws error when expected json string is not valid", () => {
        Assert.throws(() => {Assert.jsonString('{"key":value"}')}, new Error("Expected json string but got \"string[\"{\"key\":value\"}\"]\"."));
        Assert.throws(() => {Assert.jsonString('{"key":value"}', "custom message")}, new Error("custom message"));
    });

    it ("asserts email", () => {
        Assert.email('norbert@orzechowicz.pl');
    });

    it ("throws error when email is not valid", () => {
        Assert.throws(() => {Assert.email('not_valid_email@com')}, new Error("Expected valid email address but got \"string[\"not_valid_email@com\"]\"."));
        Assert.throws(() => {Assert.email('not_valid_email@com', "custom message")}, new Error("custom message"));
    });

    it ("asserts url", () => {
        Assert.url('http://foo.com/blah_blah');
        Assert.url('http://foo.com/blah_blah/');
        Assert.url('http://foo.com/blah_blah_(wikipedia)');
        Assert.url('http://foo.com/blah_blah_(wikipedia)_(again)');
        Assert.url('http://www.example.com/wpstyle/?p=364');
        Assert.url('https://www.example.com/foo/?bar=baz&inga=42&quux');
        Assert.url('http://userid:password@example.com:8080');
        Assert.url('http://userid:password@example.com:8080/');
        Assert.url('http://userid@example.com');
        Assert.url('http://userid@example.com/');
        Assert.url('http://userid@example.com:8080/');
        Assert.url('http://userid:password@example.com');
        Assert.url('http://userid:password@example.com/');
        Assert.url('http://142.42.1.1/');
        Assert.url('http://192.168.0.1:8000');
        Assert.url('http://127.0.0.1:8000');
        Assert.url('http://localhost:8000');
        Assert.url('http://localhost');
        Assert.url('http://foo.com/blah_(wikipedia)#cite-1');
        Assert.url('http://foo.com/unicode_(✪)_in_parens');
    });

    it ("throws error when url is not valid", () => {
        Assert.throws(() => {Assert.url('http://')}, new Error("Expected valid url but got \"string[\"http://\"]\"."));
        Assert.throws(() => {Assert.url('http://', "custom message")}, new Error("custom message"));
    });

    it ("asserts uuid", () => {
        Assert.uuid('5e8a2b26-1479-11e6-a148-3e1d05defe78'); // version 1
        Assert.uuid('386f9c10-d886-49b4-8153-ba1873c684ed'); // version 4
    });

    it ("throws error when uuid is not valid", () => {
        Assert.throws(() => {Assert.uuid('1234567890')}, new Error("Expected valid uuid but got \"string[\"1234567890\"]\"."));
        Assert.throws(() => {Assert.uuid('1234567890', "custom message")}, new Error("custom message"));
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

        Assert.throws(() => {Assert.hasElement('#not-exists', dom.window.document.body)}, new Error("Expected html element to has element under selector \"#not-exists\" but got \"string[\"<body><div id=\"div\"></div></body>\"]\"."));
    });

    it ("asserts that html element has data attribute", () => {
        let dom = new JSDOM(`<div id="test" data-test></div>`);

        global.HTMLElement = dom.window.HTMLElement;

        Assert.hasAttribute('data-test', dom.window.document.querySelector('#test'));
    });

    it ("asserts that html element has attribute", () => {
        let dom = new JSDOM(`<div id="test"></div>`);

        global.HTMLElement = dom.window.HTMLElement;

        Assert.hasAttribute('id', dom.window.document.querySelector('#test'));
    });

    it ("throws exception when html element does not have data attribute", () => {
        let dom = new JSDOM(`<div id="test" data-test></div>`);

        global.HTMLElement = dom.window.HTMLElement;

        Assert.throws(() => {Assert.hasAttribute('data-foo', dom.window.document.querySelector('#test'))}, new Error("Expected html element with attribute \"data-foo\" but got \"string[\"<div id=\"test\" data-test=\"\"></div>\"]\"."));
    });

    it ("asserts that html element has multiple attributes", () => {
        let dom = new JSDOM(`<div id="test" data-test></div>`);

        global.HTMLElement = dom.window.HTMLElement;

        Assert.hasAttributes(['id', 'data-test'], dom.window.document.querySelector('#test'));
    });

    it ("throws exception when html element does not have data attribute", () => {
        let dom = new JSDOM(`<div id="test" data-test></div>`);

        global.HTMLElement = dom.window.HTMLElement;

        Assert.throws(() => {Assert.hasAttributes(['data-foo', 'bar'], dom.window.document.querySelector('#test'))}, new Error("Expected html element with attributes \"data-foo, bar\" but got \"string[\"<div id=\"test\" data-test=\"\"></div>\"]\"."));
    });

    it ("throws exception when callback is not throwing expected exception", () => {
        Assert.throws(
            () => {
                Assert.throws(
                    () => {
                        // do nothing
                    },
                    new Error('Expected error message'),
                )
            },
            new Error("Expected from callback to throw an Error \"object[{}]\" but it didn't.")
        );
    });

    it ("throws exception when callback is not throwing expected exception type", () => {
        Assert.throws(
            () => {
                Assert.throws(
                    () => {
                        throw 'test';
                    },
                    new Error('test')
                )
            },
            new Error("Expected error of type string[\"test\"] to be equals object[{}] but it's not.")
        );
    });

    it ("throws exception when error message is different than expected but type matches", () => {
        Assert.throws(
            () => {
                Assert.throws(
                    () => {
                        throw new Error('unexpected message');
                    },
                    new Error('expected message')
                )
            },
            new Error("Expected exception message \"unexpected message\" to be equals \"expected message\" but it's not.")
        );
    });

    it ("throws exception when error type is different than expected error type", () => {
        Assert.throws(
            () => {
                Assert.throws(
                    () => {
                        throw new String('expected message');
                    },
                    new Error('expected message')
                )
            },
            new Error("Expected error of type String[\"expected message\"] to be equals object[{}] but it's not.")
        );
    });

    it ("asserts that thrown errors are the same", () => {
        Assert.throws(() => { throw new String('expected message'); }, new String('expected message'));
        Assert.throws(() => { throw 'expected message'; }, 'expected message');
        Assert.throws(() => { throw new Error(); });
        Assert.throws(() => { throw new Error('some not relevant error message'); }, new Error());
        Assert.throws(() => { throw new Error('some relevant error message'); }, new Error('some relevant error message'));
    });
});
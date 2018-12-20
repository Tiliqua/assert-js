# AssertJS

Javascript simple assertion library with no dependencies.

### License: MIT
### Status: [![Build Status](https://travis-ci.org/Tiliqua/assert-js.svg?branch=master)](https://travis-ci.org/Tiliqua/assert-js)

| Why should I even use it?

Answer depends on your aspirations. If your professional goal is to develop well designed, maintainable and regression free
code, then my advice is to start doing more offensive programming.
Instead of allowing people using your code to pass anything into your functions, throw them an error and force them to deal
with it. You are the architect, you design how your code should be used.

Example:

```js
/**
 * @param {HTMLElement} element
 */
function doSomethingWithHtmlElement(element)
{
    Assert.instanceOf(element, HTMLElement);

    // do your job
}
```

Now you are covered by the Assertion and you don't need to be worried that somebody might pass empty object {} to doSomethingWithHtmlElement.

**doSomethingWithHtmlElement function was designed to work with HTMLElement!**

I know, this is totally against [Duck Typing](https://en.wikipedia.org/wiki/Duck_typing) concept. If you believe that
Duck Typing is what you need then this library will bring you no value, don't use it.


## Usage

```
npm install assert-js --save
```

```js
let Assert = require('assert-js')

Assert.true(true);
Assert.false(false);
Assert.instanceOf(new String("test"), String);
Assert.instanceOneOf(new String("test"), [String, Number]);
Assert.containsOnly([new String("test"), new String("test")],String);
Assert.containsOnlyString(["test", "test1"]);
Assert.containsOnlyInteger([1, 2]);
Assert.containsOnlyNumber([2, 10.25]);
Assert.integer(1);
Assert.number(0.5);
Assert.oddNumber(3);
Assert.evenNumber(4);
Assert.greaterThan(1, 10);
Assert.greaterThanOrEqual(1, 1);
Assert.lessThan(10, 5);
Assert.lessThanOrEqual(1, 1);
Assert.string("string");
Assert.boolean(true);
Assert.equal(1, 1);
Assert.objectEqual({"key":"value"}, {"key":"value"});
Assert.object({id: 1});
Assert.hasFunction("testFunction", {testFunction: () => { alert('test'); } });
Assert.hasProperty("test", {test: 'value'});
Assert.isFunction(() => { alert('test'); });
Assert.array([1, 2, 3, 4, 5]);
Assert.count(0, []);
Assert.notEmpty(0, [1, 2, 3]);
Assert.jsonString('{"key": "value"}');
Assert.email('norbert@orzechowicz.pl');
Assert.url('https://github.com/Tiliqua/assert-js');
Assert.uuid('3e9009a0-4b2f-414e-bf02-ec0df56fc864');
Assert.hasElement('#div', window.document);
Assert.hasAttribute('data-test', window.document.querySelector('#test'));
Assert.hasAttributes(['data-test', 'id'], window.document.querySelector('#test'));
Assert.throws(() => { throw new Error('some relevant error message'); }, new Error('some relevant error message'));
```

---

```js
Assert.true(true);
```

Asserts that expression or value is equal to **true**.

Example:

```js
Assert.true(1 === 2); // this will throw an Error.
let falseValue = false;
Assert.true(falseValue); // this will throw an Error.
```

---


```js
Assert.false(false);
```

Asserts that expression or value is equal to **false**.

Example:

```js
Assert.false(1 !== 2); // this will throw an Error.
let falseValue = true;
Assert.false(falseValue); // this will throw an Error.
```

---

```js
Assert.instanceOf(new String("test"), String);
```

Asserts that value is an instance of specific class.

Example:

```js
let div = window.document.querySelector('#my-div');
Assert.instanceOf(element, HTMLDivElement);
```

---

```js
Assert.instanceOneOf(new String("test"), [String, Number]);
```

Asserts that value is an instance of at least one specific class.

Example:

```js
let div = window.document.querySelector('#my-div');
Assert.instanceOneOf(element, [HTMLDivElement, HTMLElement]);
```

---

```js
Assert.containsOnly([new String("test"), new String("test")],String);
```

Asserts that array contains only instances of specific class.

---

```js
Assert.containsOnlyString(["test", "test1"]);
```

Asserts that array contains only strings.

---

```js
Assert.containsOnlyInteger([1, 2]);
```

Asserts that array contains only integers.

---

```js
Assert.containsOnlyNumber([2, 10.25]);
```

Asserts that array contains only numbers.

---

```js
Assert.integer(1);
```

Asserts that value is valid integer.

---

```js
Assert.number(0.5);
```

Asserts that value is valid number (integer, float).

---

```js
Assert.oddNumber(3);
```

Asserts that value is odd number.

---

```js
Assert.evenNumber(4);
```

Asserts that value is event number.

---

```js
Assert.greaterThan(1, 10)
```

Asserts that number is greater than.

---

```js
Assert.greaterThanOrEqual(1, 1)
```

Asserts that number is greater than or equal.

---

```js
Assert.lessThan(10, 5)
```

Asserts that number is less than.

---

```js
Assert.lessThanOrEqual(1, 1)
```

Asserts that number is less than or equal.

---

```js
Assert.string("string");
```

Assert that value is valid string.

---

```js
Assert.boolean(true);
```

Asserts that value is valid boolean.

---

```js
Assert.object(1, 1);
```

Asserts that value is equal to expected value.

---

```js
Assert.objectEqual({"key":"value"}, {"key":"value"});
```

Asserts that object is equal to expected object.

---

```js
Assert.object({id: 1});
```

Asserts that value is valid object.

---

```js
Assert.hasFunction("testFunction", {testFunction: () => { alert('test'); }});
```

Asserts that object has function.

---

```js
Assert.hasProperty("test", {test: 'value'});
```

Asserts that object has property (it can also be a function).

---

```js
Assert.isFunction(() => { alert('test'); });
```

Asserts that value is valid function.

---

```js
Assert.array([1, 2, 3, 4, 5]);
```

Asserts that value is valid array.

---

```js
Assert.oneOf(4, [1, 2, 3, 4, 5]);
```

Asserts that value is one of expected values.

---


```js
Assert.count(0, []);
```

Asserts that array have specific number of elements.

---

```js
Assert.notEmpty(0, [1, 2, 3]);
```

Asserts that array is not empty.

---

```js
Assert.jsonString('{"key": "value"}');
```

Asserts that value is valid json string.

---

```js
Assert.email('norbert@orzechowicz.pl');
```

Asserts that string is valid email address.

---

```js
Assert.url('https://github.com/Tiliqua/assert-js');
```

Asserts that string is valid url.

---

```js
Assert.uuid('3e9009a0-4b2f-414e-bf02-ec0df56fc864');
```

Asserts that string is valid UUID.

---

```js
Assert.hasElement('#div', window.document);
```

Asserts that element has other element under selector.

Example:

```js
let dom = new JSDOM(`<body><div id="div"></div></body>`);

Assert.hasElement('#div', dom.window.document);
```

---

```js
Assert.hasAttribute('data-test', window.document.querySelector('#div'));
```

Asserts that element has expected attribute (it might be empty).

Example:

```js
let dom = new JSDOM(`<body><div id="div" data-test></div></body>`);

Assert.hasAttribute('data-test', dom.window.document.querySelector('#div'));
```

---

```js
Assert.hasAttributes(['data-test', 'foo'], window.document.querySelector('#div'));
```

Asserts that element has expected attributes (it might be empty).

Example:

```js
let dom = new JSDOM(`<body><div id="div" data-test></div></body>`);

Assert.hasAttributes(['data-test','id'], dom.window.document.querySelector('#div'));
```

---

```js
Assert.throws(() => { throw new Error('some relevant error message'); }, new Error('some relevant error message'));
```

Asserts that function throws expected exception. 

Example:

```js
Assert.throws(() => { throw new String('expected message'); }, new String('expected message'));
Assert.throws(() => { throw 'expected message'; }, 'expected message');
Assert.throws(() => { throw new Error(); });
Assert.throws(() => { throw new Error('some not relevant error message'); }, new Error());
Assert.throws(() => { throw new Error('some relevant error message'); }, new Error('some relevant error message'));
```

## Custom exception message

In order to customize error messages (for easier debugging) you can pass error message as a last parameter into
all assertions.

Examples:

```js
Assert.uuid('test', 'This value is not valid UUID.');
```

you can also use variables `expected` and `received` in your messages.

```js
Assert.string(1234, 'Expected ${expected} but got ${received}'); // it throws Error("Expected string but got int[1234]")
```

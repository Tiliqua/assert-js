import ValueConverter from '../../src/AssertJS/ValueConverter';
import Assert from '../../src/AssertJS/Assert';

describe("ValueConverter", () => {
    it("casts native string value to string", () => {
        Assert.equal(ValueConverter.toString("string"), "string[\"string\"]");
    });

    it("casts native integer value to string", () => {
        Assert.equal(ValueConverter.toString(1), "int[1]");
    });

    it("casts native negative integer value to string", () => {
        Assert.equal(ValueConverter.toString(-11), "int[-11]");
    });

    it("casts native float value to string", () => {
        Assert.equal(ValueConverter.toString(1.24), "float[1.24]");
    });

    it("casts native array value to string", () => {
        Assert.equal(ValueConverter.toString([1, 2, 3, 4, 5]), "array[length: 5]");
    });

    it("casts native negative float value to string", () => {
        Assert.equal(ValueConverter.toString(-1.24), "float[-1.24]");
    });

    it("casts native boolean value to string", () => {
        Assert.equal(ValueConverter.toString(true), "boolean[true]");
        Assert.equal(ValueConverter.toString(false), "boolean[false]");
    });

    it("casts native regexp value to string", () => {
        Assert.equal(ValueConverter.toString(/ab+c/), "RegExp[/ab+c/]");
    });

    it("casts native String object value to string", () => {
        Assert.equal(ValueConverter.toString(new String("string")), "String[\"string\"]");
    });

    it("casts native Number integer object value to string", () => {
        Assert.equal(ValueConverter.toString(new Number(1)), "Number:int[1]");
    });

    it("casts native Number negative integer object value to string", () => {
        Assert.equal(ValueConverter.toString(new Number(-1)), "Number:int[-1]");
    });

    it("casts native Number negative float object value to string", () => {
        Assert.equal(ValueConverter.toString(new Number(-1.25)), "Number:float[-1.25]");
    });

    it("casts native Number float object value to string", () => {
        Assert.equal(ValueConverter.toString(new Number(2.42)), "Number:float[2.42]");
    });

    it("casts native Boolean object value to string", () => {
        Assert.equal(ValueConverter.toString(new Boolean(true)), "Boolean[true]");
        Assert.equal(ValueConverter.toString(new Boolean(false)), "Boolean[false]");
    });

    it("casts native Date object value to string", () => {
        Assert.equal(ValueConverter.toString(new Date(Date.UTC(2015, 1, 10, 0, 0, 0))), "Date[\"Tue, 10 Feb 2015 00:00:00 GMT\"]");
    });

    it("casts native RegExp object value to string", () => {
        Assert.equal(ValueConverter.toString(new RegExp('ab+c')), "RegExp[/ab+c/]");
    });

    it("casts native Array object value to string", () => {
        Assert.equal(ValueConverter.toString(new Array()), "array[length: 0]");
    });

    it("casts native Map object value to string", () => {
        Assert.equal(ValueConverter.toString(new Map()), "Map[size: 0]");
    });

    it("casts native WeakMap object value to string", () => {
        Assert.equal(ValueConverter.toString(new WeakMap()), "WeakMap[]");
    });

    it("casts native Set object value to string", () => {
        Assert.equal(ValueConverter.toString(new Set()), "Set[size: 0]");
    });

    it("casts native WeakSet object value to string", () => {
        Assert.equal(ValueConverter.toString(new WeakSet()), "WeakSet[]");
    });

    it("casts simple objects value to string", () => {
        Assert.equal(ValueConverter.toString({id: 1, name: "test"}), `object[{"id":1,"name":"test"}]`);
    });

    it("casts function value to string", () => {
        Assert.equal(ValueConverter.toString((arg) => {}), `function[function (arg) {}]`);
    });
});
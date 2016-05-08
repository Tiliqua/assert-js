import ValueConverter from '../../src/AssertJS/ValueConverter';

describe("ValueConverter", () => {
    it("casts native string value to string", () => {
        expect(ValueConverter.toString("string")).toBe("string[\"string\"]");
    });

    it("casts native integer value to string", () => {
        expect(ValueConverter.toString(1)).toBe("int[1]");
    });

    it("casts native negative integer value to string", () => {
        expect(ValueConverter.toString(-11)).toBe("int[-11]");
    });

    it("casts native float value to string", () => {
        expect(ValueConverter.toString(1.24)).toBe("float[1.24]");
    });

    it("casts native array value to string", () => {
        expect(ValueConverter.toString([1, 2, 3, 4, 5])).toBe("array[length: 5]");
    });

    it("casts native negative float value to string", () => {
        expect(ValueConverter.toString(-1.24)).toBe("float[-1.24]");
    });

    it("casts native boolean value to string", () => {
        expect(ValueConverter.toString(true)).toBe("boolean[true]");
        expect(ValueConverter.toString(false)).toBe("boolean[false]");
    });

    it("casts native regexp value to string", () => {
        expect(ValueConverter.toString(/ab+c/)).toBe("RegExp[/ab+c/]");
    });

    it("casts native String object value to string", () => {
        expect(ValueConverter.toString(new String("string"))).toBe("String[\"string\"]");
    });

    it("casts native Number integer object value to string", () => {
        expect(ValueConverter.toString(new Number(1))).toBe("Number:int[1]");
    });

    it("casts native Number negative integer object value to string", () => {
        expect(ValueConverter.toString(new Number(-1))).toBe("Number:int[-1]");
    });

    it("casts native Number negative float object value to string", () => {
        expect(ValueConverter.toString(new Number(-1.25))).toBe("Number:float[-1.25]");
    });

    it("casts native Number float object value to string", () => {
        expect(ValueConverter.toString(new Number(2.42))).toBe("Number:float[2.42]");
    });

    it("casts native Boolean object value to string", () => {
        expect(ValueConverter.toString(new Boolean(true))).toBe("Boolean[true]");
        expect(ValueConverter.toString(new Boolean(false))).toBe("Boolean[false]");
    });

    it("casts native Date object value to string", () => {
        expect(ValueConverter.toString(new Date(Date.UTC(2015, 1, 10, 0, 0, 0)))).toBe("Date[\"Tue, 10 Feb 2015 00:00:00 GMT\"]");
    });

    it("casts native RegExp object value to string", () => {
        expect(ValueConverter.toString(new RegExp('ab+c'))).toBe("RegExp[/ab+c/]");
    });

    it("casts native Array object value to string", () => {
        expect(ValueConverter.toString(new Array())).toBe("array[length: 0]");
    });

    it("casts native Map object value to string", () => {
        expect(ValueConverter.toString(new Map())).toBe("Map[size: 0]");
    });

    it("casts native WeakMap object value to string", () => {
        expect(ValueConverter.toString(new WeakMap())).toBe("WeakMap[]");
    });

    it("casts native Set object value to string", () => {
        expect(ValueConverter.toString(new Set())).toBe("Set[size: 0]");
    });

    it("casts native WeakSet object value to string", () => {
        expect(ValueConverter.toString(new WeakSet())).toBe("WeakSet[]");
    });

    it("casts simple objects value to string", () => {
        expect(ValueConverter.toString({id: 1, name: "test"})).toBe(`object[{"id":1,"name":"test"}]`);
    });

    it("casts function value to string", () => {
        expect(ValueConverter.toString((arg) => {})).toBe(`function[function (arg) {}]`);
    });
});
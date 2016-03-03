import Message from '../../src/JSAssert/Message';

describe("Message", () => {
    it("casts native string value to string", () => {
        expect(Message.castToString("string")).toBe("string[\"string\"]");
    });

    it("casts native integer value to string", () => {
        expect(Message.castToString(1)).toBe("int[1]");
    });

    it("casts native negative integer value to string", () => {
        expect(Message.castToString(-11)).toBe("int[-11]");
    });

    it("casts native float value to string", () => {
        expect(Message.castToString(1.24)).toBe("float[1.24]");
    });

    it("casts native array value to string", () => {
        expect(Message.castToString([1, 2, 3, 4, 5])).toBe("array[length: 5]");
    });

    it("casts native negative float value to string", () => {
        expect(Message.castToString(-1.24)).toBe("float[-1.24]");
    });

    it("casts native boolean value to string", () => {
        expect(Message.castToString(true)).toBe("boolean[true]");
        expect(Message.castToString(false)).toBe("boolean[false]");
    });

    it("casts native regexp value to string", () => {
        expect(Message.castToString(/ab+c/)).toBe("RegExp[/ab+c/]");
    });

    it("casts native String object value to string", () => {
        expect(Message.castToString(new String("string"))).toBe("String[\"string\"]");
    });

    it("casts native Number integer object value to string", () => {
        expect(Message.castToString(new Number(1))).toBe("Number:int[1]");
    });

    it("casts native Number negative integer object value to string", () => {
        expect(Message.castToString(new Number(-1))).toBe("Number:int[-1]");
    });

    it("casts native Number negative float object value to string", () => {
        expect(Message.castToString(new Number(-1.25))).toBe("Number:float[-1.25]");
    });

    it("casts native Number float object value to string", () => {
        expect(Message.castToString(new Number(2.42))).toBe("Number:float[2.42]");
    });

    it("casts native Boolean object value to string", () => {
        expect(Message.castToString(new Boolean(true))).toBe("Boolean[true]");
        expect(Message.castToString(new Boolean(false))).toBe("Boolean[false]");
    });

    it("casts native Date object value to string", () => {
        expect(Message.castToString(new Date("2015-01-10"))).toBe("Date[\"Sat Jan 10 2015 01:00:00 GMT+0100 (CET)\"]");
    });

    it("casts native RegExp object value to string", () => {
        expect(Message.castToString(new RegExp('ab+c'))).toBe("RegExp[/ab+c/]");
    });

    it("casts native Array object value to string", () => {
        expect(Message.castToString(new Array())).toBe("array[length: 0]");
    });

    it("casts native Map object value to string", () => {
        expect(Message.castToString(new Map())).toBe("Map[size: 0]");
    });

    it("casts native WeakMap object value to string", () => {
        expect(Message.castToString(new WeakMap())).toBe("WeakMap[]");
    });

    it("casts native Set object value to string", () => {
        expect(Message.castToString(new Set())).toBe("Set[size: 0]");
    });

    it("casts native WeakSet object value to string", () => {
        expect(Message.castToString(new WeakSet())).toBe("WeakSet[]");
    });

    it("casts simple objects value to string", () => {
        expect(Message.castToString({id: 1, name: "test"})).toBe(`object[{"id":1,"name":"test"}]`);
    });

    it("casts function value to string", () => {
        expect(Message.castToString((arg) => {})).toBe(`function[function (arg) {}]`);
    });
});
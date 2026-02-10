import { parseCoordinate } from "../../src/parsers/parseCoordinate";
import { describe, test, expect } from "bun:test";

describe("parseCoordinate", () => {
    describe("happy path", () => {
        test("should return a Number if given a valid input", () => {
            expect(parseCoordinate(1)).toEqual(1);
            expect(parseCoordinate("1")).toEqual(1);
            expect(parseCoordinate(0)).toEqual(0);
        });
    });

    describe("unhappy path", () => {
        test("should throw if input is neither a number nor string is null", () => {
            expect(() => parseCoordinate(null)).toThrow(/expected number or string, received object/i);
            expect(() => parseCoordinate(undefined)).toThrow(/expected number or string, received undefined/i);
            expect(() => parseCoordinate(true)).toThrow(/expected number or string, received boolean/i);
            expect(() => parseCoordinate([])).toThrow(/expected number or string, received object/i);
        });

        test("should throw if input is an empty value", () => {
            expect(() => parseCoordinate("")).toThrow(/expected non-empty value, received empty value/i);
            expect(() => parseCoordinate("   ")).toThrow(/expected non-empty value, received empty value/i);
        });

        test("should throw if coordinate is not an integer", () => {
            expect(() => parseCoordinate(1.5)).toThrow(/expected an integer, received 1.5/i);
            expect(() => parseCoordinate("a")).toThrow(/expected an integer, received NaN/);
        });

        test("should throw if coordinate is not positive", () => {
            expect(() => parseCoordinate(-1)).toThrow(/expected a non-negative integer, received -1/i);
        });
    });
});

import { parsePlateauLimits } from "../../src/parsers/parsePlateauLimits";
import { describe, test, expect } from "bun:test";

describe("parsePlateauLimits", () => {
    describe("happy path", () => {
        test("should return a Coordinate object if given a valid input array", () => {
            expect(parsePlateauLimits([5, 5])).toEqual([5, 5]);
            expect(parsePlateauLimits([5, "5"])).toEqual([5, 5]);
        });
    });

    describe("unhappy path", () => {
        test("should throw if input is not an array", () => {
            expect(() => parsePlateauLimits("a")).toThrow(/expected array, received string/i);
            expect(() => parsePlateauLimits({})).toThrow(/expected array, received object/i);
            expect(() => parsePlateauLimits(null)).toThrow(/expected array, received object/i);
            expect(() => parsePlateauLimits(undefined)).toThrow(/expected array, received undefined/i);
        });

        test("should throw if input is not of size 2", () => {
            expect(() => parsePlateauLimits([1])).toThrow(/expected 2 elements in array/);
            expect(() => parsePlateauLimits([1, 3, 4])).toThrow(/expected 2 elements in array/);
        });

        test("should propagate errors from coordinate parser", () => {
            expect(() => parsePlateauLimits([1, "a"])).toThrow();
        });
    });
});

import { parsePlateauLimits } from "../../src/parsers/plateauLimitParser";
import { describe, test, expect } from "bun:test";

describe("parsePlateauLimits", () => {
    describe("happy path", () => {
        test("should return a Coordinate object if given a valid input array", () => {
            expect(parsePlateauLimits([5, 5])).toEqual([5, 5]);
        });
    });

    describe("unhappy path", () => {
        test("should throw if input is not an array", () => {
            expect(() => parsePlateauLimits("a" as any)).toThrow(
                "input should be an array",
            );
            expect(() => parsePlateauLimits({} as any)).toThrow(
                "input should be an array",
            );
        });

        test("should throw if plateauLimitsRow is not of size 2", () => {
            expect(() => parsePlateauLimits([1])).toThrow(
                "plateauLimitsRow should have 2 values",
            );
            expect(() => parsePlateauLimits([1, 3, 4])).toThrow(
                "plateauLimitsRow should have 2 values",
            );
            expect(() => parsePlateauLimits([1, 3, "A"])).toThrow(
                "plateauLimitsRow should have 2 values",
            );
        });

        test("should throw if plateauLimitsRow has one or more empty coordinates", () => {
            expect(() => parsePlateauLimits(["", 1])).toThrow(
                "coordinate should be non-empty",
            );
            expect(() => parsePlateauLimits([1, " "])).toThrow(
                "coordinate should be non-empty",
            );
        });

        test("should throw if plateauLimitsRow contains non-integer coordinates", () => {
            expect(() => parsePlateauLimits([1, "a"])).toThrow(
                "coordinate should be an integer",
            );
            expect(() => parsePlateauLimits([1, 1.5])).toThrow(
                "coordinate should be an integer",
            );
        });

        test("should throw if input array contains negative numbers", () => {
            expect(() => parsePlateauLimits([1, -1])).toThrow(
                "coordinate should be positive",
            );
        });
    });
});

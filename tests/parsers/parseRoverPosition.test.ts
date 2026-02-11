import { describe, test, expect } from "bun:test";
import { Direction, type PositionData } from "../../src/definitions";
import { parseRoverPosition } from "../../src/parsers/parseRoverPosition";

describe("parseRoverPosition", () => {
    describe("happy path", () => {
        const input: unknown = [1, 2, "N"];
        const output: PositionData = { coordinates: [1, 2], direction: Direction.NORTH };
        test("should return a PositionData if given a valid input", () => {
            expect(parseRoverPosition(input)).toEqual(output);
        });
    });

    describe("unhappy path", () => {
        describe("parseRoverPosition", () => {
            test("should throw if input is not an array", () => {
                expect(() => parseRoverPosition("a")).toThrow("expected array, received 'string'");
                expect(() => parseRoverPosition({})).toThrow("expected array, received 'object'");
                expect(() => parseRoverPosition(null)).toThrow("expected array, received 'object'");
                expect(() => parseRoverPosition(undefined)).toThrow("expected array, received 'undefined'");
            });

            test("should throw if input is an array not of size 3", () => {
                expect(() => parseRoverPosition([1, 2])).toThrow("expected 3 elements in array, received 2");
                expect(() => parseRoverPosition([1, 2, 3, 4])).toThrow("expected 3 elements in array, received 4");
            });

            test("should propagate errors from coordinate parser", () => {
                expect(() => parseRoverPosition([1, {}, "N"])).toThrow("expected number or string, received 'object'");
            });

            test("should propagate errors from direction parser", () => {
                expect(() => parseRoverPosition([1, 2, 1])).toThrow("expected string, received 'number'");
            });
        });
    });
});

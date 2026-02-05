import { parseCoordinate } from "../../src/parsers/parserUtils";
import { describe, test, expect } from "bun:test";

describe("parserUtils", () => {
    describe("parseCoordinate", () => {
        describe("happy path", () => {
            test("should return a Number if given a valid input value", () => {
                expect(parseCoordinate(1, "test-entity")).toEqual(1);
                expect(parseCoordinate("1", "test-entity")).toEqual(1);
            });
        });

        describe("unhappy path", () => {
            test("should throw if coordinate is a non-empty string", () => {
                expect(() => parseCoordinate("", "test-entity")).toThrow(
                    "coordinate should be non-empty",
                );
                expect(() => parseCoordinate(" ", "test-entity")).toThrow(
                    "coordinate should be non-empty",
                );
            });

            test("should throw if coordinate is not an integer", () => {
                expect(() => parseCoordinate(1.5, "test-entity")).toThrow(
                    "coordinate should be an integer",
                );
                expect(() => parseCoordinate("a", "test-entity")).toThrow(
                    "coordinate should be an integer",
                );
            });

            test("should throw if coordinate is not positive", () => {
                expect(() => parseCoordinate(-1, "test-entity")).toThrow(
                    "coordinate should be positive",
                );
            });
        });
    });
});

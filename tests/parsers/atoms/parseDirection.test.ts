import { Direction } from "../../../src/definitions";
import { parseDirection } from "../../../src/parsers/atoms";
import { describe, test, expect } from "bun:test";

describe("parseDirection", () => {
    describe("happy path", () => {
        test("should return a Direction if given a valid input", () => {
            expect(parseDirection("N")).toEqual(Direction.NORTH);
            expect(parseDirection("S")).toEqual(Direction.SOUTH);
            expect(parseDirection("E")).toEqual(Direction.EAST);
            expect(parseDirection("W")).toEqual(Direction.WEST);
        });
    });

    describe("unhappy path", () => {
        test("should throw if input is not a string", () => {
            expect(() => parseDirection(1)).toThrow("expected string, received 'number'");
            expect(() => parseDirection(null)).toThrow("expected string, received 'object'");
            expect(() => parseDirection(undefined)).toThrow("expected string, received 'undefined'");
            expect(() => parseDirection(true)).toThrow("expected string, received 'boolean'");
            expect(() => parseDirection([])).toThrow("expected string, received 'object'");
        });

        test("should throw if input is not a single character", () => {
            expect(() => parseDirection("")).toThrow("expected a single character, received ''");
            expect(() => parseDirection("1N")).toThrow("expected a single character, received '1N'");
            expect(() => parseDirection("NN")).toThrow("expected a single character, received 'NN'");
        });

        test("should throw if input is not one of Direction", () => {
            expect(() => parseDirection("A")).toThrow("expected one of [N,S,E,W], received A");
            expect(() => parseDirection("1")).toThrow("expected one of [N,S,E,W], received 1");
        });
    });
});

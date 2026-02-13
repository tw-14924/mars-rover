import { describe, test, expect } from "bun:test";
import { Instruction } from "../../../src/definitions";
import { parseRoverInstructions } from "../../../src/parsers/molecules/parseRoverInstructions";

describe("parseRoverInstructions", () => {
    describe("happy path", () => {
        const input: unknown = ["LMR"];
        const output: Instruction[] = [Instruction.LEFT, Instruction.MOVE, Instruction.RIGHT];
        test("should return an array of Instruction if given a valid input array", () => {
            expect(parseRoverInstructions(input)).toEqual(output);
        });
    });

    describe("unhappy path", () => {
        test("should throw if input is not an array", () => {
            expect(() => parseRoverInstructions("a")).toThrow("expected array, received 'string'");
            expect(() => parseRoverInstructions({})).toThrow("expected array, received 'object'");
            expect(() => parseRoverInstructions(null)).toThrow("expected array, received 'object'");
            expect(() => parseRoverInstructions(undefined)).toThrow("expected array, received 'undefined'");
        });

        test("should throw if input is not an array of size 1", () => {
            expect(() => parseRoverInstructions([])).toThrow("expected 1 element in array, received 0");
            expect(() => parseRoverInstructions(["A", "B"])).toThrow("expected 1 element in array, received 2");
        });

        test("should throw if input's content is not a string", () => {
            expect(() => parseRoverInstructions([1])).toThrow("expected string, received 'number");
            expect(() => parseRoverInstructions([{}])).toThrow("expected string, received 'object'");
            expect(() => parseRoverInstructions([null])).toThrow("expected string, received 'object'");
            expect(() => parseRoverInstructions([undefined])).toThrow("expected string, received 'undefined'");
        });

        test("should throw if input's content is an empty string", () => {
            expect(() => parseRoverInstructions([""])).toThrow("expected non-empty string, received empty string");
        });

        test("should throw if input's content is not one of Instruction", () => {
            expect(() => parseRoverInstructions(["A"])).toThrow("expected one of [L,R,M], received 'A'");
            expect(() => parseRoverInstructions(["1"])).toThrow("expected one of [L,R,M], received '1'");
        });
    });
});

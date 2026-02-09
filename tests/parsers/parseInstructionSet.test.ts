import type { InstructionSet } from "../../src/definitions";
import { parseInstructionSet } from "../../src/parsers/parseInstructionSet";
import { describe, test, expect } from "bun:test";

// prettier-ignore
const input = [
    [5, 5],
    [1, 2, "N"],
    ["LMLMLMLMM"],
    [3, 3, "E"],
    ["MMRMMRMRRM"],
];
const output: InstructionSet = {
    plateauLimits: [5, 5],
    rovers: [
        {
            position: {
                coordinates: [1, 2],
                direction: "N",
            },
            instructions: ["L", "M", "L", "M", "L", "M", "L", "M", "M"],
        },
        {
            position: {
                coordinates: [3, 3],
                direction: "E",
            },
            instructions: ["M", "M", "R", "M", "M", "R", "M", "R", "R", "M"],
        },
    ],
};

describe("parseInstructionSet", () => {
    describe("happy path", () => {
        test("should return a valid InstructionSet object given a valid input", () => {
            expect(parseInstructionSet(input)).toEqual(output);
        });
    });

    describe("unhappy path", () => {
        test("should throw if input is not an array", () => {
            expect(() => parseInstructionSet("a")).toThrow(/expected array, received string/i);
            expect(() => parseInstructionSet({})).toThrow(/expected array, received object/i);
            expect(() => parseInstructionSet(null)).toThrow(/expected array, received object/i);
            expect(() => parseInstructionSet(undefined)).toThrow(/expected array, received undefined/i);
        });

        test("should throw if input is an empty array", () => {
            expect(() => parseInstructionSet([])).toThrow(/expected non-empty array/);
        });
    });
});

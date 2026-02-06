import type { InstructionSet, RawInput } from "../../src/definitions";
import { parseInstructionSet } from "../../src/parsers/instructionSetParser";
import { describe, test, expect } from "bun:test";

// prettier-ignore
const input: RawInput = [
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
        test("should return a matching InstructionSet object given a RawInput", () => {
            expect(parseInstructionSet(input)).toEqual(output);
        });
    });

    describe("unhappy path", () => {
        test("should throw if raw input is not an array", () => {
            expect(() => parseInstructionSet("a" as any)).toThrow(
                "Input must be an array",
            );
        });

        test("should throw if plateau limits row is undefined", () => {
            expect(() => parseInstructionSet([undefined as any])).toThrow(
                "Plateau row is missing",
            );
        });
    });
});

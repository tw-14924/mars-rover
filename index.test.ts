import { processInstructionSet } from ".";
import { describe, test, expect } from "bun:test";

// prettier-ignore
const testInput = [
    [5, 5], 
    [1, 2, "N"], 
    ["LMLMLMLMM"],
    [3, 3, "E"], 
    ["MMRMMRMRRM"]
];
const expectedOutput = [
    [1, 3, "N"],
    [5, 1, "E"],
];

describe("processInstructionSet", () => {
    test("should return correct expected output if given valid inputs", () => {
        expect(processInstructionSet(testInput)).toEqual(expectedOutput);
    });
});

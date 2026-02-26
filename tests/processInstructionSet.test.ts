import { describe, test, expect } from "bun:test";
import { processInstructionSet } from "../src/processInstructionSet";
import type { ProcessedResults } from "../src/shared/definitions";

describe("processInstructionSet", () => {
    test("should return correct expected output if given valid inputs", () => {
        const testInput = [[5, 5], [1, 2, "N"], ["LMLMLMLMM"], [3, 3, "E"], ["MMRMMRMRRM"]];
        const expectedOutput: ProcessedResults = [
            [1, 3, "N"],
            [5, 1, "E"],
        ];

        expect(processInstructionSet(testInput)).toEqual(expectedOutput);
    });

    test("should handle sequential movement where one rover follows another rover's path", () => {
        const testInput = [[5, 5], [3, 3, "N"], ["M"], [3, 2, "N"], ["M"]];
        const expectedOutput: ProcessedResults = [
            [3, 4, "N"],
            [3, 3, "N"],
        ];

        expect(processInstructionSet(testInput)).toEqual(expectedOutput);
    });

    test("should throw error if one rover collides into another ", () => {
        const testInput = [[5, 5], [3, 2, "N"], ["M"], [3, 3, "E"], ["L"]];
        expect(() => processInstructionSet(testInput)).toThrow();
    });
});

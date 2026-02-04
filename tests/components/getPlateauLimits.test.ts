import { getPlateauLimits } from "../../app/services/getPlateauLimits";
import { describe, test, expect } from "bun:test";
import type { Coordinates } from "../../constants";

// prettier-ignore
const input = [
    [5, 5], 
    [1, 2, "N"], 
    ["LMLMLMLMM"],
    [3, 3, "E"], 
    ["MMRMMRMRRM"]
];
const output: Coordinates = [5, 5];

describe("processInput", () => {
    test("should return just the first line as output given the entire instruction set", () => {
        expect(getPlateauLimits(input)).toEqual(output);
    });
});

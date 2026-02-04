import { getAllRoverCoordinates } from "../../app/services/getAllRoverCoordinates";
import { describe, test, expect } from "bun:test";
import type { Coordinates } from "../../constants";

// prettier-ignore
const input = [
    [5, 5],
    [1, 2, "N"],
    ["LMLMLMLMM"],
    [3, 3, "E"],
    ["MMRMMRMRRM"],
];
const output: Coordinates[] = [
    [1, 2],
    [3, 3],
];

describe("processInput", () => {
    test("should return just the first line as output given the entire instruction set", () => {
        expect(getAllRoverCoordinates(input)).toEqual(output);
    });

    test("should throw an error if input order is wrong", () => {
        expect(() =>
            getAllRoverCoordinates([...input, ["E", 3, 3]]),
        ).toThrowError();
    });
});

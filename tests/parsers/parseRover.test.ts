import type { RoverData } from "../../src/shared/definitions";
import { parseRover } from "../../src/parsers/parseRover";
import { describe, test, expect } from "bun:test";

describe("parseRover", () => {
    describe("happy path", () => {
        const input: unknown[] = [[1, 2, "N"], ["LMR"]];
        const output: RoverData[] = [
            {
                position: {
                    coordinates: [1, 2],
                    direction: "N",
                },
                instructions: ["L", "M", "R"],
            },
        ];
        test("should return an array of RoverData if given a valid input array", () => {
            expect(parseRover(input)).toEqual(output);
        });
    });

    describe("unhappy path", () => {
        test("should throw if input does not contain data pairs", () => {
            expect(() => parseRover([[1, 2, "N"]])).toThrow("expected data pairs, received 1 row");
        });

        test("should propagate errors from rover position parser", () => {
            expect(() => parseRover([{}, ["LMR"]])).toThrow("expected array, received 'object'");
        });

        test("should propagate errors from rover instructions parser", () => {
            expect(() => parseRover([[1, 2, "N"], {}])).toThrow("expected array, received 'object'");
        });
    });
});

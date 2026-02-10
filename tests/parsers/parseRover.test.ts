import type { RoverData } from "../../src/definitions";
import { parseRover } from "../../src/parsers/parseRover";
import { describe, test, expect } from "bun:test";

describe("parseRover", () => {
    describe("happy path", () => {
        const input: unknown[] = [[1, 2, "N"], ["LMLMLMLMM"]];
        const output: RoverData[] = [
            {
                position: {
                    coordinates: [1, 2],
                    direction: "N",
                },
                instructions: ["L", "M", "L", "M", "L", "M", "L", "M", "M"],
            },
        ];
        test("should return an array of RoverData if given a valid input array", () => {
            expect(parseRover(input)).toEqual(output);
        });
    });

    describe("unhappy path", () => {
        test("should throw if input array does not contain data pairs", () => {
            expect(() => parseRover([[1, 2, "N"]])).toThrow("data should be in pairs");
        });

        test("should throw if either positionRow and instructionRow is not an array", () => {
            expect(() => parseRover([[1, 2, "N"], {}])).toThrow("positionRow and instructionRow should be arrays");
        });

        describe("parseRoverPosition", () => {
            test("should throw if positionRow is not of size 3", () => {
                expect(() => parseRover([[1, 2], ["LMLMLMLMM"]])).toThrow("positionRow should have 3 values");
                expect(() => parseRover([[2, "N"], ["LMLMLMLMM"]])).toThrow("positionRow should have 3 values");
            });

            test("should throw if positionRow has one or more empty coordinates", () => {
                expect(() => parseRover([[1, "", "N"], ["LMLMLMLMM"]])).toThrow(
                    /expected non-empty value, received empty value/i,
                );
                expect(() => parseRover([[" ", 2, "N"], ["LMLMLMLMM"]])).toThrow(
                    /expected non-empty value, received empty value/i,
                );
            });

            test("should throw if positionRow contains non-integer coordinates", () => {
                expect(() => parseRover([[1, "a", "N"], ["LMLMLMLMM"]])).toThrow(/expected an integer, received NaN/i);
                expect(() => parseRover([[1, 2.5, "N"], ["LMLMLMLMM"]])).toThrow(/expected an integer, received 2.5/i);
            });

            test("should throw if direction value is invalid", () => {
                expect(() => parseRover([[1, 2, "X"], ["LMLMLMLMM"]])).toThrow("direction should be one of");
            });
        });

        describe("parseRoverInstructions", () => {
            test("should throw if instructionRow is not of size 1", () => {
                expect(() =>
                    parseRover([
                        [1, 2, "N"],
                        ["LMLMLMLMM", "LRM"],
                    ]),
                ).toThrow("instructionRow should have 1 value only");
            });

            test("should throw if instruction is not a string", () => {
                expect(() => parseRover([[1, 2, "N"], [123]])).toThrow("instruction should be string type");
                expect(() => parseRover([[1, 2, "N"], [{}]])).toThrow("instruction should be string type");
            });

            test("should throw if an instruction value is invalid", () => {
                expect(() => parseRover([[1, 2, "N"], ["X"]])).toThrow("instruction should be one of");
            });
        });
    });
});

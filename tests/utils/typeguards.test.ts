import {
    isValidPositionData,
    isValidInstructionData,
    isMoveInstruction,
    isCoordinates,
} from "../../app/utils/typeguards";
import { describe, test, expect } from "bun:test";

describe("isCoordinates", () => {
    test("should return true if array contains only two numbers and false for everything else", () => {
        expect(isCoordinates([5, 5])).toBeTrue();
        expect(isCoordinates([5, 5, 5])).toBeFalse();
    });
});

describe("isPositionData", () => {
    test("should return true if array fulfils a PositionData type", () => {
        expect(isValidPositionData(["a"])).toBeFalse();
        expect(isValidPositionData([1])).toBeFalse();
        expect(isValidPositionData([1, 1, "F"])).toBeFalse();
        expect(isValidPositionData([1, 1, "N"])).toBeTrue();
    });
});

describe("isValidInstructionData", () => {
    test("should return true if instructionData is valid", () => {
        expect(isValidInstructionData(["ABC"])).toBeFalse();
        expect(isValidInstructionData(["ABM"])).toBeFalse();
        expect(isValidInstructionData([123])).toBeFalse();
        expect(isValidInstructionData(["MMM"])).toBeTrue();
    });
});

describe("isMoveInstruction", () => {
    test("should return true if instruction value is 'M' ", () => {
        expect(isMoveInstruction("F")).toBeFalse();
        expect(isMoveInstruction("M")).toBeTrue();
    });
});

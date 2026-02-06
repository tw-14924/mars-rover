import {
    isValidInstructionData,
    isMoveInstruction,
} from "../../src/typeguards";
import { describe, test, expect } from "bun:test";

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

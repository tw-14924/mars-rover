import { isMoveInstruction, isRotateInstruction } from "../../src/typeguards";
import { describe, test, expect } from "bun:test";

describe("isRotateInstruction", () => {
  test("should return true if instruction value is 'L' ", () => {
    expect(isRotateInstruction("X")).toBeFalse();
    expect(isRotateInstruction("L")).toBeTrue();
    expect(isRotateInstruction("R")).toBeTrue();
  });
});

describe("isMoveInstruction", () => {
  test("should return true if instruction value is 'M' ", () => {
    expect(isMoveInstruction("F")).toBeFalse();
    expect(isMoveInstruction("M")).toBeTrue();
  });
});

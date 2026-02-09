import { isDirection, isInstruction, isMoveInstruction, isRotateInstruction } from "../../src/typeguards";
import { describe, test, expect } from "bun:test";

describe("isRotateInstruction", () => {
  test("should return true if instruction value is one of 'L', 'R' ", () => {
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

describe("isDirection", () => {
  test("should return true if direction value is one of 'N', 'S', 'E', 'W' ", () => {
    expect(isDirection("X")).toBeFalse();
    expect(isDirection("N")).toBeTrue();
    expect(isDirection("S")).toBeTrue();
    expect(isDirection("E")).toBeTrue();
    expect(isDirection("W")).toBeTrue();
  });
});

describe("isInstruction", () => {
  test("should return true if instruction value is one of 'L', 'R', 'M' ", () => {
    expect(isInstruction("X")).toBeFalse();
    expect(isInstruction("L")).toBeTrue();
    expect(isInstruction("R")).toBeTrue();
    expect(isInstruction("M")).toBeTrue();
  });
});

import { moveRover, rotateRover } from "../../app/services/controlRover";
import { describe, test, expect } from "bun:test";

describe("rotateRover", () => {
    test("should update the current direction of a rover given a rotation instruction", () => {
        expect(rotateRover([1, 2, "N"], "L")).toEqual([1, 2, "W"]);
        expect(rotateRover([1, 2, "S"], "R")).toEqual([1, 2, "W"]);
    });
});

describe("moveRover", () => {
    test("should update the current coordinates of a rover given a valid move instruction", () => {
        expect(moveRover([1, 2, "N"], [5, 5], [[5, 5]])).toEqual([1, 3, "N"]);
        expect(moveRover([1, 2, "S"], [5, 5], [[5, 5]])).toEqual([1, 1, "S"]);
        expect(moveRover([1, 2, "E"], [5, 5], [[5, 5]])).toEqual([2, 2, "E"]);
        expect(moveRover([1, 2, "W"], [5, 5], [[5, 5]])).toEqual([0, 2, "W"]);
    });

    test("should throw an error if move instruction causes rover to exceed plateau limits", () => {
        expect(() => moveRover([0, 5, "N"], [5, 5], [[5, 5]])).toThrowError();
        expect(() => moveRover([0, 0, "S"], [5, 5], [[5, 5]])).toThrowError();
        expect(() => moveRover([5, 0, "E"], [5, 5], [[5, 5]])).toThrowError();
        expect(() => moveRover([0, 0, "W"], [5, 5], [[5, 5]])).toThrowError();
    });

    test("should throw an error if move instruction causes collision", () => {
        expect(() => moveRover([0, 1, "N"], [5, 5], [[0, 2]])).toThrowError();
    });
});

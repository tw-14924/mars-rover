import { moveRover, rotateRover } from "../../app/services/controlRover";
import { describe, test, expect } from "bun:test";
import { Direction, RotateInstruction, MoveInstruction } from "../../constants";

describe("rotateRover", () => {
    test("should update the current direction of a rover given a rotation instruction", () => {
        expect(
            rotateRover([1, 2, Direction.NORTH], RotateInstruction.LEFT),
        ).toEqual([1, 2, Direction.WEST]);
        expect(
            rotateRover([1, 2, Direction.SOUTH], RotateInstruction.RIGHT),
        ).toEqual([1, 2, Direction.WEST]);
    });
});

describe("moveRover", () => {
    test("should update the current coordinates of a rover given a valid move instruction", () => {
        expect(moveRover([1, 2, Direction.NORTH], [5, 5], [[5, 5]])).toEqual([
            1,
            3,
            Direction.NORTH,
        ]);
        expect(moveRover([1, 2, Direction.SOUTH], [5, 5], [[5, 5]])).toEqual([
            1,
            1,
            Direction.SOUTH,
        ]);
        expect(moveRover([1, 2, Direction.EAST], [5, 5], [[5, 5]])).toEqual([
            2,
            2,
            Direction.EAST,
        ]);
        expect(moveRover([1, 2, Direction.WEST], [5, 5], [[5, 5]])).toEqual([
            0,
            2,
            Direction.WEST,
        ]);
    });

    test("should throw an error if move instruction causes rover to exceed plateau limits", () => {
        expect(() =>
            moveRover([0, 5, Direction.NORTH], [5, 5], [[5, 5]]),
        ).toThrowError();
        expect(() =>
            moveRover([0, 0, Direction.SOUTH], [5, 5], [[5, 5]]),
        ).toThrowError();
        expect(() =>
            moveRover([5, 0, Direction.EAST], [5, 5], [[5, 5]]),
        ).toThrowError();
        expect(() =>
            moveRover([0, 0, Direction.WEST], [5, 5], [[5, 5]]),
        ).toThrowError();
    });

    test("should throw an error if move instruction causes collision", () => {
        expect(() =>
            moveRover([0, 1, Direction.NORTH], [5, 5], [[0, 2]]),
        ).toThrowError();
    });
});

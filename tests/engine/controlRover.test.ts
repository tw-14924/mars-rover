import { moveRover, rotateRover } from "../../src/engine/controlRover";
import { describe, test, expect } from "bun:test";
import { Direction, Instruction, type Coordinates, type PositionData } from "../../src/shared/definitions";

const basePosition: PositionData = { coordinates: [1, 2], direction: Direction.NORTH };
const plateauLimits: Coordinates = [5, 5];
const otherRoversCoordinates: Coordinates[] = [];

describe("rotateRover", () => {
    test("should update the current direction of a rover given a valid rotation instruction", () => {
        expect(rotateRover(basePosition, Instruction.LEFT)).toEqual({ ...basePosition, direction: Direction.WEST });
        expect(rotateRover(basePosition, Instruction.RIGHT)).toEqual({ ...basePosition, direction: Direction.EAST });
    });
});

describe("moveRover", () => {
    test("should update the current coordinates of a rover given a valid move instruction", () => {
        const move = (direction: Direction) =>
            moveRover({ coordinates: [1, 2], direction }, plateauLimits, otherRoversCoordinates);

        expect(move(Direction.NORTH)).toEqual({ coordinates: [1, 3], direction: Direction.NORTH });
        expect(move(Direction.SOUTH)).toEqual({ coordinates: [1, 1], direction: Direction.SOUTH });
        expect(move(Direction.EAST)).toEqual({ coordinates: [2, 2], direction: Direction.EAST });
        expect(move(Direction.WEST)).toEqual({ coordinates: [0, 2], direction: Direction.WEST });
    });

    test("should throw an error if move instruction causes rover to exceed plateau limits", () => {
        const move = (coordinates: Coordinates, direction: Direction) =>
            moveRover({ coordinates, direction }, plateauLimits, otherRoversCoordinates);

        expect(() => move([5, 5], Direction.NORTH)).toThrowError();
        expect(() => move([0, 0], Direction.SOUTH)).toThrowError();
        expect(() => move([5, 5], Direction.EAST)).toThrowError();
        expect(() => move([0, 0], Direction.WEST)).toThrowError();
    });

    test("should throw an error if move instruction causes collision", () => {
        expect(() => moveRover(basePosition, plateauLimits, [[1, 3]])).toThrowError();
    });
});

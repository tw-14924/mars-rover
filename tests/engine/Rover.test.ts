import { Rover } from "../../src/engine/Rover";
import { describe, test, expect } from "bun:test";
import { Direction, Instruction, type Coordinates, type PositionData } from "../../src/shared/definitions";

const getBasePosition = (): PositionData => ({ coordinates: [1, 2], direction: Direction.NORTH });
const plateauLimits: Coordinates = [5, 5];
const otherRoversCoordinates: Coordinates[] = [];

describe("rover entity (rotation)", () => {
    test("should update the current direction of a rover given a valid rotation instruction", () => {
        const rover = new Rover(getBasePosition());

        rover.rotate(Instruction.LEFT);
        expect(rover.state.direction).toEqual(Direction.WEST);

        rover.rotate(Instruction.RIGHT);
        expect(rover.state.direction).toEqual(Direction.NORTH);
    });
});

describe("rover entity (move)", () => {
    test("should update the current coordinates of a rover given a valid move instruction", () => {
        const roverN = new Rover({ coordinates: [1, 2], direction: Direction.NORTH });
        expect(roverN.move(plateauLimits, otherRoversCoordinates).coordinates).toEqual([1, 3]);

        const roverS = new Rover({ coordinates: [1, 2], direction: Direction.SOUTH });
        expect(roverS.move(plateauLimits, otherRoversCoordinates).coordinates).toEqual([1, 1]);

        const roverE = new Rover({ coordinates: [1, 2], direction: Direction.EAST });
        expect(roverE.move(plateauLimits, otherRoversCoordinates).coordinates).toEqual([2, 2]);

        const roverW = new Rover({ coordinates: [1, 2], direction: Direction.WEST });
        expect(roverW.move(plateauLimits, otherRoversCoordinates).coordinates).toEqual([0, 2]);
    });

    test("should throw an error if move instruction causes rover to exceed plateau limits", () => {
        const moveAtLimit = (coords: Coordinates, dir: Direction) =>
            new Rover({ coordinates: coords, direction: dir }).move(plateauLimits, otherRoversCoordinates);

        expect(() => moveAtLimit([5, 5], Direction.NORTH)).toThrow();
        expect(() => moveAtLimit([0, 0], Direction.SOUTH)).toThrow();
        expect(() => moveAtLimit([5, 5], Direction.EAST)).toThrow();
        expect(() => moveAtLimit([0, 0], Direction.WEST)).toThrow();
    });

    test("should throw an error if move instruction causes collision", () => {
        const rover = new Rover(getBasePosition());
        const collisions: Coordinates[] = [[1, 3]];

        expect(() => rover.move(plateauLimits, collisions)).toThrow();
    });
});

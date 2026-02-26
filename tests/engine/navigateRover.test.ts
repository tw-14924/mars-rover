import { describe, test, expect } from "bun:test";
import { navigateRover } from "../../src/engine/navigateRover";
import type { RoverData, Coordinates, PositionData } from "../../src/shared/definitions";

describe("navigateRover", () => {
    const plateau: [number, number] = [5, 5];
    const obstacles: Coordinates[] = [];

    test("should navigate a set of mixed instructions correctly", () => {
        const rover: RoverData = {
            position: { coordinates: [1, 2], direction: "N" },
            instructions: ["L", "M", "L", "M", "L", "M", "L", "M", "M"],
        };

        expect(navigateRover(rover, plateau, obstacles)).toEqual({ coordinates: [1, 3], direction: "N" });
    });

    test("should return a new position without modifying the input rover", () => {
        const originalPosition: PositionData = {
            coordinates: [1, 2],
            direction: "N",
        };

        const rover: RoverData = {
            position: originalPosition,
            instructions: ["M", "M"],
        };

        const result = navigateRover(rover, [5, 5], []);

        expect(rover.position).toBe(originalPosition);
        expect(result).not.toBe(originalPosition);
    });
});

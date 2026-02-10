import { type RoverData } from "../definitions";
import { parseRoverInstructions } from "./parseRoverInstructions";
import { parseRoverPosition } from "./parseRoverPosition";

export const parseRover = (roverRows: unknown[]): RoverData[] => {
    if (roverRows.length % 2 !== 0) {
        throw new Error("rover data: data should be in pairs");
    }

    const rovers: RoverData[] = [];

    for (let i = 0; i < roverRows.length; i += 2) {
        const positionRow = roverRows[i];
        const instructionRow = roverRows[i + 1];

        if (!Array.isArray(positionRow) || !Array.isArray(instructionRow)) {
            throw new Error("rover data: positionRow and instructionRow should be arrays");
        }

        rovers.push({
            position: parseRoverPosition(positionRow),
            instructions: parseRoverInstructions(instructionRow),
        });
    }

    return rovers;
};

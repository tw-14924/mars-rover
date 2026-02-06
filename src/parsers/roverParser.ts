import {
    Direction,
    Instruction,
    type PositionData,
    type RoverData,
} from "../definitions";
import { parseCoordinate } from "./parserUtils";

const parseRoverPosition = (positionRow: unknown[]): PositionData => {
    if (positionRow.length !== 3) {
        throw new Error(
            `rover position: positionRow should have 3 values, but got ${positionRow.length}`,
        );
    }

    const [rawX, rawY, rawDirection] = positionRow;

    const x = parseCoordinate(rawX, "rover position");
    const y = parseCoordinate(rawY, "rover position");

    const direction = String(rawDirection).toUpperCase();
    const validDirections: string[] = Object.values(Direction);

    if (!validDirections.includes(direction)) {
        throw new Error(
            `rover position: direction should be one of ${validDirections.join(", ")}, but got ${rawDirection}`,
        );
    }

    return {
        coordinates: [x, y],
        direction: direction as Direction,
    };
};

const parseRoverInstructions = (instructionRow: unknown[]): Instruction[] => {
    if (instructionRow.length !== 1) {
        throw new Error(
            `rover instruction: instructionRow should have 1 value only, got ${instructionRow.length}`,
        );
    }

    const [instruction] = instructionRow;

    if (typeof instruction !== "string") {
        throw new Error("rover instruction: instruction should be string type");
    }

    const instructionArray = instruction.split("");
    const validInstructions: string[] = Object.values(Instruction);

    for (const instruction of instructionArray) {
        if (!validInstructions.includes(instruction)) {
            throw new Error(
                `rover instruction: instruction should be one of ${validInstructions.join(", ")}, but got ${instruction}`,
            );
        }
    }

    return instructionArray as Instruction[];
};

export const parseRoverData = (roverRows: unknown[]): RoverData[] => {
    if (roverRows.length % 2 !== 0) {
        throw new Error("rover data: data should be in pairs");
    }

    const rovers: RoverData[] = [];

    for (let i = 0; i < roverRows.length; i += 2) {
        const positionRow = roverRows[i];
        const instructionRow = roverRows[i + 1];

        if (!Array.isArray(positionRow) || !Array.isArray(instructionRow)) {
            throw new Error(
                "rover data: positionRow and instructionRow should be arrays",
            );
        }

        rovers.push({
            position: parseRoverPosition(positionRow),
            instructions: parseRoverInstructions(instructionRow),
        });
    }

    return rovers;
};

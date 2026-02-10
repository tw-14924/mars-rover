import { Direction, Instruction, type PositionData, type RoverData } from "../definitions";
import { isDirection, isInstruction } from "../typeguards";
import { parseCoordinate } from "./parseCoordinate";

const parseRoverPosition = (positionRow: unknown[]): PositionData => {
    if (positionRow.length !== 3) {
        throw new Error(`rover position: positionRow should have 3 values, but got ${positionRow.length}`);
    }

    const [rawX, rawY, rawDirection] = positionRow;

    const x = parseCoordinate(rawX);
    const y = parseCoordinate(rawY);

    const direction = String(rawDirection).toUpperCase();
    if (!isDirection(direction)) {
        throw new Error(
            `rover direction: direction should be one of ${Object.values(Direction).join(", ")}, but got ${direction}`,
        );
    }

    return {
        coordinates: [x, y],
        direction: direction,
    };
};

const parseRoverInstructions = (instructionRow: unknown[]): Instruction[] => {
    const validatedInstructions: Instruction[] = [];

    if (instructionRow.length !== 1) {
        throw new Error(`rover instruction: instructionRow should have 1 value only, got ${instructionRow.length}`);
    }

    const [instruction] = instructionRow;

    if (typeof instruction !== "string") {
        throw new Error("rover instruction: instruction should be string type");
    }

    const instructionArray = instruction.split("");

    for (const instruction of instructionArray) {
        if (!isInstruction(instruction)) {
            throw new Error(
                `rover instruction: instruction should be one of ${Object.values(Instruction).join(", ")}, but got ${instruction}`,
            );
        }
        validatedInstructions.push(instruction);
    }

    return validatedInstructions;
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
            throw new Error("rover data: positionRow and instructionRow should be arrays");
        }

        rovers.push({
            position: parseRoverPosition(positionRow),
            instructions: parseRoverInstructions(instructionRow),
        });
    }

    return rovers;
};

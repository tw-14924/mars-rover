import type { InstructionSet } from "../definitions";
import { parsePlateauLimits } from "./parsePlateauLimits";
import { parseRover } from "./parseRover";

export const parseInstructionSet = (input: unknown): InstructionSet => {
    const context = "parseInstructionSet";

    if (!Array.isArray(input)) {
        throw new Error(`${context}: expected array, received ${typeof input}`);
    }

    if (input.length === 0) {
        throw new Error(`${context}: expected non-empty array, received empty array`);
    }

    const [plateauRow, ...roverRows] = input;

    const plateauLimits = parsePlateauLimits(plateauRow);
    const rovers = parseRover(roverRows);

    return { plateauLimits, rovers };
};

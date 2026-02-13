import type { InstructionSet } from "../shared/definitions";
import { parsePlateauLimits } from "./molecules";
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

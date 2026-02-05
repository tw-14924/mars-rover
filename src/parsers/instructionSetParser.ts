import type { RawInput, InstructionSet } from "../definitions";
import { parsePlateauLimits } from "./plateauLimitParser";
import { parseRoverData } from "./roverParser";

export const parseInstructionSet = (rawInput: RawInput): InstructionSet => {
    if (!Array.isArray(rawInput)) {
        throw new Error("Input must be an array");
    }

    const [plateauRow, ...roverRows] = rawInput;

    if (plateauRow === undefined) {
        throw new Error("Plateau row is missing");
    }
    const plateauLimits = parsePlateauLimits(plateauRow);

    const rovers = parseRoverData(roverRows);

    return { plateauLimits, rovers };
};

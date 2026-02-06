import {
    Direction,
    Instruction,
    type Coordinates,
    type PositionData,
} from "./definitions";
import { isEnumValue } from "../app/utils/generics";

const validCharacters: Record<Instruction, boolean> = {
    L: true,
    R: true,
    M: true,
};

const isValidInstructionData = (
    array: (string | number)[],
): array is string[] => {
    if (array.length !== 1) return false;

    const [instructionData] = array;

    if (typeof instructionData !== "string") {
        return false;
    }

    const instructionDataArray = instructionData.split("");
    return instructionDataArray.every((char) => char in validCharacters);
};

const isRotateInstruction = (
    value: unknown,
): value is Exclude<Instruction, typeof Instruction.MOVE> => {
    return isEnumValue(Instruction, value) && value !== Instruction.MOVE;
};

const isMoveInstruction = (
    value: unknown,
): value is Exclude<
    Instruction,
    typeof Instruction.LEFT | typeof Instruction.RIGHT
> => {
    return isEnumValue(Instruction, value) && value === Instruction.MOVE;
};

export { isValidInstructionData, isMoveInstruction, isRotateInstruction };

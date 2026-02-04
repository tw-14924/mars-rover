import {
    Direction,
    MoveInstruction,
    RotateInstruction,
    type PositionData,
    type InstructionData,
    type Coordinates,
} from "../../constants";
import { isEnumValue } from "./generics";

const isValidPositionData = (
    array: (string | number)[],
): array is PositionData => {
    if (array.length !== 3) return false;

    const [x, y, direction] = array;

    return (
        typeof x === "number" && typeof y === "number" && isDirection(direction)
    );
};

const validCharacters: Record<InstructionData, boolean> = {
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

const isCoordinates = (array: (string | number)[]): array is Coordinates => {
    if (array.length !== 2) return false;
    return array.every((element) => typeof element === "number");
};

const isDirection = (value: unknown): value is Direction => {
    return isEnumValue(Direction, value);
};

const isRotateInstruction = (value: unknown): value is RotateInstruction => {
    return isEnumValue(RotateInstruction, value);
};

const isMoveInstruction = (value: unknown): value is MoveInstruction => {
    return isEnumValue(MoveInstruction, value);
};

export {
    isCoordinates,
    isValidPositionData,
    isValidInstructionData,
    isMoveInstruction,
    isRotateInstruction,
};

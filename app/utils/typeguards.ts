// prettier-ignore
import type { Direction, PositionData, InstructionData, MoveInstruction, Coordinates, RotateInstruction } from "../../constants";

const isCoordinates = (array: (string | number)[]): array is Coordinates => {
    if (array.length !== 2) return false;
    return array.every((element) => typeof element === "number");
};

const isValidPositionData = (
    array: (string | number)[],
): array is PositionData => {
    if (array.length !== 3) return false;

    const [x, y, direction] = array;

    const directions: Direction[] = ["N", "S", "E", "W"];

    return (
        typeof x === "number" &&
        typeof y === "number" &&
        directions.includes(direction as Direction)
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

const isMoveInstruction = (value: string): value is MoveInstruction => {
    const moveInstruction: MoveInstruction[] = ["M"];

    return moveInstruction.includes(value as MoveInstruction);
};

const isRotateInstruction = (value: string): value is RotateInstruction => {
    const rotateInstruction: RotateInstruction[] = ["L", "R"];

    return rotateInstruction.includes(value as RotateInstruction);
};

export {
    isCoordinates,
    isValidPositionData,
    isValidInstructionData,
    isMoveInstruction,
    isRotateInstruction,
};

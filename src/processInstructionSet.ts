import { isMoveInstruction, isRotateInstruction } from "./shared/typeguards";
import { moveRover, rotateRover } from "./engine/controlRover";
import type { ProcessedResults, RawInput } from "./shared/definitions";
import { parseInstructionSet } from "./parsers";

const processInstructionSet = (rawInput: RawInput): ProcessedResults => {
    const returnArray: ProcessedResults = [];

    try {
        const { plateauLimits, rovers } = parseInstructionSet(rawInput);

        if (rovers.length === 0) {
            return returnArray;
        }

        const currentRoverPositions = rovers.map((rover) => rover.position.coordinates);

        for (const [i, currentRover] of rovers.entries()) {
            let updatedRoverPosition = currentRover.position;
            const otherRoversCoordinates = currentRoverPositions.filter((_, index) => index !== i);

            for (const instruction of currentRover.instructions) {
                if (isMoveInstruction(instruction)) {
                    updatedRoverPosition = moveRover(updatedRoverPosition, plateauLimits, otherRoversCoordinates);
                } else if (isRotateInstruction(instruction)) {
                    updatedRoverPosition = rotateRover(updatedRoverPosition, instruction);
                }

                currentRoverPositions[i] = updatedRoverPosition.coordinates;
            }

            currentRover.position = updatedRoverPosition;
            returnArray.push([
                updatedRoverPosition.coordinates[0],
                updatedRoverPosition.coordinates[1],
                updatedRoverPosition.direction,
            ]);
        }
    } catch (error) {
        console.error("Something went wrong:", error);
        throw error;
    }

    return returnArray;
};

export { processInstructionSet };

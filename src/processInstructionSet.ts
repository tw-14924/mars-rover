import type { ProcessedResults, RawInput } from "./shared/definitions";
import { parseInstructionSet } from "./parsers";
import { navigateRover } from "./engine/navigateRover";

const processInstructionSet = (rawInput: RawInput): ProcessedResults => {
    const returnArray: ProcessedResults = [];

    try {
        const { plateauLimits, rovers } = parseInstructionSet(rawInput);

        if (rovers.length === 0) {
            return returnArray;
        }

        const currentRoverPositions = rovers.map((rover) => rover.position.coordinates);

        for (const [i, currentRover] of rovers.entries()) {
            const otherRoversCoordinates = currentRoverPositions.filter((_, index) => index !== i);

            const finalPosition = navigateRover(currentRover, plateauLimits, otherRoversCoordinates);

            currentRoverPositions[i] = finalPosition.coordinates;
            returnArray.push([finalPosition.coordinates[0], finalPosition.coordinates[1], finalPosition.direction]);
        }
    } catch (error) {
        console.error("Something went wrong:", error);
        throw error;
    }

    return returnArray;
};

export { processInstructionSet };

import { isMoveInstruction, isRotateInstruction } from "./shared/typeguards";
import type { ProcessedResults, RawInput } from "./shared/definitions";
import { parseInstructionSet } from "./parsers";
import { Rover } from "./engine/Rover";

const processInstructionSet = (rawInput: RawInput): ProcessedResults => {
    const returnArray: ProcessedResults = [];

    try {
        const { plateauLimits, rovers } = parseInstructionSet(rawInput);

        if (rovers.length === 0) {
            return returnArray;
        }

        for (const currentRover of rovers) {
            const roverEntity = new Rover(currentRover.position);

            const otherRoversCoordinates = rovers
                .filter((rover) => rover !== currentRover)
                .map((rover) => rover.position.coordinates);

            for (const instruction of currentRover.instructions) {
                if (isMoveInstruction(instruction)) {
                    roverEntity.move(plateauLimits, otherRoversCoordinates);
                } else if (isRotateInstruction(instruction)) {
                    roverEntity.rotate(instruction);
                }
            }

            const finalState = roverEntity.state;
            currentRover.position = finalState;
            returnArray.push([finalState.coordinates[0], finalState.coordinates[1], finalState.direction]);
        }
    } catch (error) {
        console.error("Something went wrong:", error);
    }

    return returnArray;
};

export { processInstructionSet };

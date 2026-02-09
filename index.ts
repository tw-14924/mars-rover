import { isMoveInstruction, isRotateInstruction } from "./src/typeguards";
import { moveRover, rotateRover } from "./src/engine/controlRover";
import type { ProcessedResults, RawInput } from "./src/definitions";
import { parseInstructionSet } from "./src/parsers/parseInstructionSet";

const processInstructionSet = (rawInput: RawInput): ProcessedResults => {
    const returnArray: ProcessedResults = [];

    try {
        const { plateauLimits, rovers } = parseInstructionSet(rawInput);

        if (rovers.length === 0) {
            return returnArray;
        }

        for (const currentRover of rovers) {
            let updatedRoverPosition = currentRover.position;

            const otherRoversCoordinates = rovers
                .filter((rover) => rover !== currentRover)
                .map((rover) => rover.position.coordinates);

            for (const instruction of currentRover.instructions) {
                console.log("start position: ", currentRover.position);
                console.log("Instruction: ", instruction);

                if (isMoveInstruction(instruction)) {
                    console.log("performing move instruction");

                    updatedRoverPosition = moveRover(updatedRoverPosition, plateauLimits, otherRoversCoordinates);
                } else if (isRotateInstruction(instruction)) {
                    console.log("performing rotate instruction");
                    updatedRoverPosition = rotateRover(updatedRoverPosition, instruction);
                }

                console.log("updatedRoverPosition: ", updatedRoverPosition);
                console.log("***********************************");
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
    }

    return returnArray;
};

export { processInstructionSet };

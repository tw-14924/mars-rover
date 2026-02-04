import { getPlateauLimits } from "./app/services/getPlateauLimits";
import { getAllRoverCoordinates } from "./app/services/getAllRoverCoordinates";
import {
    isMoveInstruction,
    isRotateInstruction,
    isValidInstructionData,
    isValidPositionData,
} from "./app/utils/typeguards";
import { moveRover, rotateRover } from "./app/services/controlRover";
import type { Coordinates } from "./constants";

const processInstructionSet = (
    instructionSet: (string | number)[][],
): (string | number)[][] => {
    console.log("hello world");

    const returnArray = [];
    const plateauLimits = getPlateauLimits(instructionSet);
    let allRoverCoordinates = getAllRoverCoordinates(instructionSet);

    console.log("allRoverCoordinates: ", allRoverCoordinates);

    const roversInfo = instructionSet.slice(1);
    for (let index = 0; index < roversInfo.length; index += 2) {
        const positionData = roversInfo[index];
        if (positionData === undefined) {
            throw new Error("Error fetching rover's positionData");
        }
        if (!isValidPositionData(positionData)) {
            throw new Error("Invalid position data");
        }

        const instructionData = roversInfo[index + 1];
        if (instructionData === undefined) {
            throw new Error("Error fetching rover's instructionData");
        }

        if (!isValidInstructionData(instructionData)) {
            throw new Error("Invalid instruction data");
        }

        let currentPosition = positionData;
        const reducedRoverCoordinates = allRoverCoordinates.filter(
            (x) => x === currentPosition.slice(0, 2),
        );

        instructionData[0]!.split("").forEach((instruction) => {
            if (isMoveInstruction(instruction)) {
                currentPosition = moveRover(
                    currentPosition,
                    plateauLimits,
                    reducedRoverCoordinates,
                );
            } else if (isRotateInstruction(instruction)) {
                currentPosition = rotateRover(currentPosition, instruction);
            }
        });

        allRoverCoordinates.push(currentPosition.slice(0, 2) as Coordinates);
        returnArray.push(currentPosition);
    }

    return returnArray;
};

export { processInstructionSet };

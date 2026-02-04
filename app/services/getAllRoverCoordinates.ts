import type { Coordinates } from "../../constants";
import { isCoordinates } from "../utils/typeguards";

const getAllRoverCoordinates = (
    instructionSet: (string | number)[][],
): Coordinates[] => {
    const allRoverCoordinates = [];
    for (let index = 1; index < instructionSet.length; index += 2) {
        const positionData = instructionSet[index]!;
        const roverCoordinate = positionData.slice(0, 2);

        if (!isCoordinates(roverCoordinate)) {
            throw new Error("Error fetching all rovers' coordinate");
        }
        allRoverCoordinates.push(roverCoordinate);
    }
    return allRoverCoordinates;
};

export { getAllRoverCoordinates };

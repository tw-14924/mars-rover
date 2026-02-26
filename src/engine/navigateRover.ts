import { isMoveInstruction, isRotateInstruction } from "../shared/typeguards";
import { moveRover, rotateRover } from "./controlRover";
import type { RoverData, PositionData, Coordinates } from "../shared/definitions";

export const navigateRover = (rover: RoverData, plateau: [number, number], obstacles: Coordinates[]): PositionData => {
    let currentPosition = structuredClone(rover.position);

    for (const instruction of rover.instructions) {
        if (isMoveInstruction(instruction)) {
            currentPosition = moveRover(currentPosition, plateau, obstacles);
        } else if (isRotateInstruction(instruction)) {
            currentPosition = rotateRover(currentPosition, instruction);
        }
    }

    return currentPosition;
};

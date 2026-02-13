import { type PositionData } from "../../shared/definitions";
import { parseCoordinate, parseDirection } from "../atoms";

export const parseRoverPosition = (input: unknown): PositionData => {
    const context = "parseRoverPosition";

    if (!Array.isArray(input)) {
        throw new Error(`${context}: expected array, received '${typeof input}'`);
    }

    if (input.length !== 3) {
        throw new Error(`${context}: expected 3 elements in array, received ${input.length}`);
    }

    const [rawX, rawY, rawDirection] = input;

    const x = parseCoordinate(rawX);
    const y = parseCoordinate(rawY);
    const direction = parseDirection(rawDirection);

    return {
        coordinates: [x, y],
        direction: direction,
    };
};

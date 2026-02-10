import { Direction, type PositionData } from "../definitions";
import { isDirection } from "../typeguards";
import { parseCoordinate } from "./parseCoordinate";

export const parseRoverPosition = (positionRow: unknown[]): PositionData => {
    if (positionRow.length !== 3) {
        throw new Error(`rover position: positionRow should have 3 values, but got ${positionRow.length}`);
    }

    const [rawX, rawY, rawDirection] = positionRow;

    const x = parseCoordinate(rawX);
    const y = parseCoordinate(rawY);

    const direction = String(rawDirection).toUpperCase();
    if (!isDirection(direction)) {
        throw new Error(
            `rover direction: direction should be one of ${Object.values(Direction).join(", ")}, but got ${direction}`,
        );
    }

    return {
        coordinates: [x, y],
        direction: direction,
    };
};

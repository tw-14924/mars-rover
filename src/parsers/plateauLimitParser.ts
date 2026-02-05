import type { Coordinates } from "../definitions";
import { parseCoordinate } from "./parserUtils";

export const parsePlateauLimits = (
    plateauLimitsRow: unknown[],
): Coordinates => {
    if (!Array.isArray(plateauLimitsRow))
        throw new Error("plateau limits: input should be an array");

    if (plateauLimitsRow.length !== 2)
        throw new Error(
            `plateau limits: plateauLimitsRow should have 2 values, but got ${plateauLimitsRow.length}`,
        );

    const [rawX, rawY] = plateauLimitsRow;

    const x = parseCoordinate(rawX, "plateau limits");
    const y = parseCoordinate(rawY, "plateau limits");

    return [x, y];
};

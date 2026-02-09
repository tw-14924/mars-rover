import type { Coordinates } from "../definitions";
import { parseCoordinate } from "./parserUtils";

export const parsePlateauLimits = (input: unknown): Coordinates => {
    const context = "parsePlateauLimits";

    if (!Array.isArray(input)) {
        throw new Error(`${context}: expected array, received ${typeof input}`);
    }

    if (input.length !== 2) {
        throw new Error(`${context}: expected 2 elements in array, received ${input.length}`);
    }

    const [rawX, rawY] = input;

    const x = parseCoordinate(rawX, "plateau limits");
    const y = parseCoordinate(rawY, "plateau limits");

    return [x, y];
};

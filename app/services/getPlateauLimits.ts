import type { Coordinates } from "../../constants";
import { isCoordinates } from "../utils/typeguards";

const getPlateauLimits = (testInput: (string | number)[][]): Coordinates => {
    const plateauLimits = testInput[0]!;

    if (!isCoordinates(plateauLimits)) {
        throw new Error("Error getting plateau limits");
    }
    return plateauLimits;
};

export { getPlateauLimits };

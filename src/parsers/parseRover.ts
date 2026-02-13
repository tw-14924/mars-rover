import { type RoverData } from "../shared/definitions";
import { parseRoverPosition, parseRoverInstructions } from "./molecules";

export const parseRover = (input: unknown[]): RoverData[] => {
    const context = "parseRover";

    if (input.length % 2 !== 0) {
        throw new Error(`${context}: expected data pairs, received ${input.length} rows`);
    }

    const rovers: RoverData[] = [];

    for (let i = 0; i < input.length; i += 2) {
        const positionRow = input[i];
        const instructionRow = input[i + 1];

        rovers.push({
            position: parseRoverPosition(positionRow),
            instructions: parseRoverInstructions(instructionRow),
        });
    }

    return rovers;
};

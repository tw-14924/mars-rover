import { Direction } from "../../definitions";
import { isDirection } from "../../typeguards";

export const parseDirection = (input: unknown): Direction => {
    const context = "parseDirection";

    if (typeof input !== "string") {
        throw new Error(`${context}: expected string, received '${typeof input}'`);
    }

    if (input.length !== 1) {
        throw new Error(`${context}: expected a single character, received '${input}'`);
    }

    if (!isDirection(input)) {
        throw new Error(`${context}: expected one of [${Object.values(Direction)}], received ${input}`);
    }

    return input;
};

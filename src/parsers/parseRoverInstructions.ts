import { Instruction } from "../definitions";
import { isInstruction } from "../typeguards";

export const parseRoverInstructions = (input: unknown): Instruction[] => {
    const context = "parseRoverInstructions";

    if (!Array.isArray(input)) {
        throw new Error(`${context}: expected array, received '${typeof input}'`);
    }

    if (input.length !== 1) {
        throw new Error(`${context}: expected 1 element in array, received ${input.length}`);
    }

    const [instructionString] = input;

    if (typeof instructionString !== "string") {
        throw new Error(`${context}: expected string, received '${typeof instructionString}'`);
    }

    if (instructionString.length === 0) {
        throw new Error(`${context}: expected non-empty string, received empty string`);
    }

    const validatedInstructions: Instruction[] = [];

    const instructionChars = instructionString.split("");

    for (const char of instructionChars) {
        if (!isInstruction(char)) {
            throw new Error(`${context}: expected one of [${Object.values(Instruction)}], received '${char}'`);
        }
        validatedInstructions.push(char);
    }

    return validatedInstructions;
};

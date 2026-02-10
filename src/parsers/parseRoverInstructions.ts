import { Instruction } from "../definitions";
import { isInstruction } from "../typeguards";

export const parseRoverInstructions = (instructionRow: unknown[]): Instruction[] => {
    const validatedInstructions: Instruction[] = [];

    if (instructionRow.length !== 1) {
        throw new Error(`rover instruction: instructionRow should have 1 value only, got ${instructionRow.length}`);
    }

    const [instruction] = instructionRow;

    if (typeof instruction !== "string") {
        throw new Error("rover instruction: instruction should be string type");
    }

    const instructionArray = instruction.split("");

    for (const instruction of instructionArray) {
        if (!isInstruction(instruction)) {
            throw new Error(
                `rover instruction: instruction should be one of ${Object.values(Instruction).join(", ")}, but got ${instruction}`,
            );
        }
        validatedInstructions.push(instruction);
    }

    return validatedInstructions;
};

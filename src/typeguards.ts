import { Instruction } from "./definitions";
import { isEnumValue } from "./generics";

const isRotateInstruction = (value: unknown): value is Exclude<Instruction, typeof Instruction.MOVE> => {
  return isEnumValue(Instruction, value) && value !== Instruction.MOVE;
};

const isMoveInstruction = (
  value: unknown,
): value is Exclude<Instruction, typeof Instruction.LEFT | typeof Instruction.RIGHT> => {
  return isEnumValue(Instruction, value) && value === Instruction.MOVE;
};

export { isMoveInstruction, isRotateInstruction };

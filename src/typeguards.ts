import { Instruction, Direction } from "./definitions";
import { isEnumValue } from "./generics";

const isRotateInstruction = (value: unknown): value is Exclude<Instruction, typeof Instruction.MOVE> => {
  return isEnumValue(Instruction, value) && value !== Instruction.MOVE;
};

const isMoveInstruction = (
  value: unknown,
): value is Exclude<Instruction, typeof Instruction.LEFT | typeof Instruction.RIGHT> => {
  return isEnumValue(Instruction, value) && value === Instruction.MOVE;
};

const isDirection = (value: unknown): value is Direction => {
  return isEnumValue(Direction, value);
};

const isInstruction = (value: unknown): value is Instruction => {
  return isEnumValue(Instruction, value);
};

export { isMoveInstruction, isRotateInstruction, isDirection, isInstruction };

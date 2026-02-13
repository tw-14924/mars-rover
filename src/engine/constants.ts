import { Direction, Instruction } from "../shared/definitions";

const rotations: Record<Direction, Record<Exclude<Instruction, typeof Instruction.MOVE>, Direction>> = {
    [Direction.NORTH]: {
        [Instruction.LEFT]: Direction.WEST,
        [Instruction.RIGHT]: Direction.EAST,
    },
    [Direction.SOUTH]: {
        [Instruction.LEFT]: Direction.EAST,
        [Instruction.RIGHT]: Direction.WEST,
    },
    [Direction.EAST]: {
        [Instruction.LEFT]: Direction.NORTH,
        [Instruction.RIGHT]: Direction.SOUTH,
    },
    [Direction.WEST]: {
        [Instruction.LEFT]: Direction.SOUTH,
        [Instruction.RIGHT]: Direction.NORTH,
    },
};

const moves: Record<Direction, { dx: number; dy: number }> = {
    [Direction.NORTH]: { dx: 0, dy: 1 },
    [Direction.SOUTH]: { dx: 0, dy: -1 },
    [Direction.EAST]: { dx: 1, dy: 0 },
    [Direction.WEST]: { dx: -1, dy: 0 },
};

export { rotations, moves };

enum Direction {
    NORTH = "N",
    SOUTH = "S",
    EAST = "E",
    WEST = "W",
}

enum RotateInstruction {
    LEFT = "L",
    RIGHT = "R",
}

enum MoveInstruction {
    MOVE = "M",
}

type PositionData = [number, number, Direction];
type InstructionData = RotateInstruction | MoveInstruction;
type Coordinates = [number, number];

export { Direction, RotateInstruction, MoveInstruction };

export type { PositionData, InstructionData, Coordinates };

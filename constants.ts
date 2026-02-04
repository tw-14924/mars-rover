enum Direction {
    NORTH = "N",
    SOUTH = "S",
    EAST = "E",
    WEST = "W",
}

type PositionData = [number, number, Direction];
type RotateInstruction = "L" | "R";
type MoveInstruction = "M";
type InstructionData = RotateInstruction | MoveInstruction;
type Coordinates = [number, number];

export { Direction };

export type {
    PositionData,
    RotateInstruction,
    MoveInstruction,
    InstructionData,
    Coordinates,
};

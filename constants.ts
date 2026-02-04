type Direction = "N" | "E" | "S" | "W";
type PositionData = [number, number, Direction];
type RotateInstruction = "L" | "R";
type MoveInstruction = "M";
type InstructionData = RotateInstruction | MoveInstruction;
type Coordinates = [number, number];

export type {
    Direction,
    PositionData,
    RotateInstruction,
    MoveInstruction,
    InstructionData,
    Coordinates,
};

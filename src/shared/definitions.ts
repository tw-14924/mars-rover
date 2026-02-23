type RawInput = unknown[][];
type Coordinates = [number, number];
type FinalPosition = [number, number, Direction];
type ProcessedResults = FinalPosition[];

const Direction = {
    NORTH: "N",
    SOUTH: "S",
    EAST: "E",
    WEST: "W",
} as const;
type Direction = (typeof Direction)[keyof typeof Direction];

const Instruction = {
    LEFT: "L",
    RIGHT: "R",
    MOVE: "M",
} as const;
type Instruction = (typeof Instruction)[keyof typeof Instruction];

interface PositionData {
    coordinates: Coordinates;
    direction: Direction;
}

interface RoverData {
    position: PositionData;
    instructions: Instruction[];
}

interface InstructionSet {
    plateauLimits: Coordinates;
    rovers: RoverData[];
}

export { Direction, Instruction };

export type { RawInput, Coordinates, PositionData, RoverData, InstructionSet, ProcessedResults };

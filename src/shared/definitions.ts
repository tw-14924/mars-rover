type RawInput = unknown[][];

type Coordinates = [number, number];

const Direction = {
    NORTH: "N",
    SOUTH: "S",
    EAST: "E",
    WEST: "W",
} as const;
type Direction = (typeof Direction)[keyof typeof Direction];

type PositionData = {
    coordinates: Coordinates;
    direction: Direction;
};

const Instruction = {
    LEFT: "L",
    RIGHT: "R",
    MOVE: "M",
} as const;

type Instruction = (typeof Instruction)[keyof typeof Instruction];

type RoverData = {
    position: PositionData;
    instructions: Instruction[];
};

type InstructionSet = {
    plateauLimits: Coordinates;
    rovers: RoverData[];
};

type FinalPosition = [number, number, Direction];

type ProcessedResults = FinalPosition[];

export { Direction, Instruction };

export type {
    RawInput,
    Coordinates,
    PositionData,
    RoverData,
    InstructionSet,
    ProcessedResults,
};

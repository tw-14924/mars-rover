import {
    Direction,
    Instruction,
    type Coordinates,
    type PositionData,
} from "../definitions";

const rotations: Record<
    Direction,
    Record<Exclude<Instruction, typeof Instruction.MOVE>, Direction>
> = {
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

const rotateRover = (
    position: PositionData,
    instruction: Exclude<Instruction, typeof Instruction.MOVE>,
): PositionData => {
    const direction = position.direction;
    const newDirection = rotations[direction][instruction];

    return {
        coordinates: position.coordinates,
        direction: newDirection,
    };
};

const moveRover = (
    position: PositionData,
    limits: Coordinates,
    allRoverCoordinates: Coordinates[],
): PositionData => {
    const coordinates = position.coordinates;
    const direction = position.direction;
    const x = coordinates[0];
    const y = coordinates[1];
    const { dx, dy } = moves[direction];

    const updatedX = x + dx;
    const updatedY = y + dy;

    if (isExceedPlateau(updatedX, updatedY, limits[0], limits[1])) {
        throw new Error("Instruction causes rover to exceed plateau limits");
    }

    if (isCollide([updatedX, updatedY], allRoverCoordinates)) {
        throw new Error("Instruction causes rover collision");
    }

    return {
        coordinates: [updatedX, updatedY],
        direction: direction,
    };
};

const isExceedPlateau = (x1: number, y1: number, x2: number, y2: number) => {
    return x1 < 0 || y1 < 0 || x1 > x2 || y1 > y2;
};

// prettier-ignore
const isCollide = (roverCoordinates: Coordinates, allRoverCoordinates: Coordinates[] ) => {
    return allRoverCoordinates.some(
        (coord) => coord[0] === roverCoordinates[0] && coord[1] === roverCoordinates[1]
    )
};

export { rotateRover, moveRover };

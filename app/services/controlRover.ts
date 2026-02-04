import {
    Direction,
    type Coordinates,
    type PositionData,
    type RotateInstruction,
} from "../../constants";

const rotations: Record<Direction, Record<RotateInstruction, Direction>> = {
    [Direction.NORTH]: { L: Direction.WEST, R: Direction.EAST },
    [Direction.SOUTH]: { L: Direction.EAST, R: Direction.WEST },
    [Direction.EAST]: { L: Direction.NORTH, R: Direction.SOUTH },
    [Direction.WEST]: { L: Direction.SOUTH, R: Direction.NORTH },
};

const moves: Record<Direction, { dx: number; dy: number }> = {
    [Direction.NORTH]: { dx: 0, dy: 1 },
    [Direction.SOUTH]: { dx: 0, dy: -1 },
    [Direction.EAST]: { dx: 1, dy: 0 },
    [Direction.WEST]: { dx: -1, dy: 0 },
};

const rotateRover = (
    position: PositionData,
    instruction: RotateInstruction,
): PositionData => {
    const [x, y, direction] = position;
    const newDirection = rotations[direction][instruction];

    return [x, y, newDirection];
};

const moveRover = (
    position: PositionData,
    limits: Coordinates,
    allRoverCoordinates: Coordinates[],
): PositionData => {
    const [x, y, direction] = position;
    const { dx, dy } = moves[direction];

    const updatedX = x + dx;
    const updatedY = y + dy;

    if (isExceedPlateau(updatedX, updatedY, limits[0], limits[1])) {
        throw new Error("Instruction causes rover to exceed plateau limits");
    }

    if (isCollide([updatedX, updatedY], allRoverCoordinates)) {
        throw new Error("Instruction causes rover collision");
    }

    return [updatedX, updatedY, direction];
};

const isExceedPlateau = (x1: number, y1: number, x2: number, y2: number) => {
    return x1 < 0 || y1 < 0 || x1 > x2 || y1 > y2;
};

// prettier-ignore
const isCollide = (roverCoordinates: Coordinates, allRoverCoordinates: Coordinates[] ) => {
    console.log("roverCoordinates: ", roverCoordinates)
    return allRoverCoordinates.some(
        (coord) => coord[0] === roverCoordinates[0] && coord[1] === roverCoordinates[1]
    )
};

export { rotateRover, moveRover };

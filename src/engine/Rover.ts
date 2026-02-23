import { type Coordinates, type PositionData, Instruction } from "../shared/definitions";
import { moves, rotations } from "./constants";

const isExceedPlateau = (x1: number, y1: number, x2: number, y2: number) => {
    return x1 < 0 || y1 < 0 || x1 > x2 || y1 > y2;
};

// prettier-ignore
const isCollide = (roverCoordinates: Coordinates, allRoverCoordinates: Coordinates[] ) => {
    return allRoverCoordinates.some(
        (coord) => coord[0] === roverCoordinates[0] && coord[1] === roverCoordinates[1]
    )
};

export class Rover<P extends PositionData> {
    constructor(public state: P) {}

    rotate(instruction: Exclude<Instruction, typeof Instruction.MOVE>): P {
        const newDir = rotations[this.state.direction][instruction];

        this.state = {
            ...this.state,
            direction: newDir,
        };

        return this.state;
    }

    move(limits: Coordinates, allRoverCoordinates: Coordinates[]): P {
        const [x, y] = this.state.coordinates;
        const { dx, dy } = moves[this.state.direction];

        const updatedX = x + dx;
        const updatedY = y + dy;

        if (isExceedPlateau(updatedX, updatedY, limits[0], limits[1])) {
            throw new Error("Instruction causes rover to exceed plateau limits");
        }
        if (isCollide([updatedX, updatedY], allRoverCoordinates)) {
            throw new Error("Instruction causes rover collision");
        }

        this.state = {
            ...this.state,
            coordinates: [updatedX, updatedY],
        };

        return this.state;
    }
}

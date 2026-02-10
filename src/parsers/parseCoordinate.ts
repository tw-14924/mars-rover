export const parseCoordinate = (input: unknown): number => {
    const context = "parseCoordinate";

    if (typeof input !== "number" && typeof input !== "string") {
        throw new Error(`${context}: expected number or string, received ${typeof input}`);
    }

    if (typeof input === "string" && input.trim() === "") {
        throw new Error(`${context}: expected non-empty value, received empty value`);
    }

    const coordinate = Number(input);

    if (!Number.isInteger(coordinate)) {
        throw new Error(`${context}: expected an integer, received ${coordinate}`);
    }

    if (coordinate < 0) {
        throw new Error(`${context}: expected a non-negative integer, received ${coordinate}`);
    }

    return coordinate;
};

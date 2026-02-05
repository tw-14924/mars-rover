export const parseCoordinate = (value: unknown, entity: string): number => {
    if (typeof value === "string" && value.trim() === "") {
        throw new Error(`${entity}: coordinate should be non-empty`);
    }

    const num = Number(value);

    if (!Number.isInteger(num)) {
        throw new Error(`${entity}: coordinate should be an integer`);
    }

    if (num < 0) {
        throw new Error(`${entity}: coordinate should be positive`);
    }

    return num;
};

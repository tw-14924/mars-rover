const isEnumValue = <Type extends string>(
    enumObject: Record<string, Type>,
    value: unknown,
): value is Type => {
    return (
        Object.values(enumObject).includes(value as Type) &&
        typeof value === "string"
    );
};

export { isEnumValue };

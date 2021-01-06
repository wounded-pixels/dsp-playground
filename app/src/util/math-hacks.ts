export function clamp(value: number, min: number, max: number) {
    if (value > max) {
        return max;
    }

    if (value < min) {
        return min;
    }

    return value;
}

export function snap(value: number, digits: number) {
    const multiplier = 10 ** digits;
    return Math.round(value*multiplier) / multiplier;
}

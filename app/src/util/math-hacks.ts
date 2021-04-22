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

export function convolve(signal: number[], kernel: number[]) {
    const output: number[] = [];
    const maxOutputIndex = signal.length + kernel.length - 1;
    for (let outIndex = 0; outIndex < maxOutputIndex; outIndex++) {
        output.push(0);
        for (let kernelIndex = 0; kernelIndex < kernel.length; kernelIndex++) {
            const signalIndex = outIndex - kernelIndex;
            if (signalIndex < 0 || signalIndex >= signal.length) {
                continue;
            }

            output[outIndex] += signal[signalIndex] * kernel[kernelIndex];
        }
    }

    return output;
}

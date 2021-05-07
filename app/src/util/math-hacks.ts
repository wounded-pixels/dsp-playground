import {CurveParameters} from "../model/types";

export function round(raw: number, multiplier = 100) {
    return Math.round(raw * multiplier) / multiplier;
}

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

export function createSignal(length: number, curveParameters: CurveParameters[]) {
    const values = [];

    const lowestFrequency = Math.min(...curveParameters.map(cp => cp.frequency));
    const interval = 4 * Math.PI / lowestFrequency; // we want the overall signal to repeat twice
    const dt = interval / length;

    for (let time = 0; time < interval; time = time + dt) {
        let value = 0;
        for (const curveParameter of curveParameters) {
            value = value + curveParameter.amplitude * Math.sin(curveParameter.frequency * time);
        }

        values.push(value);
    }

    return values;
}
